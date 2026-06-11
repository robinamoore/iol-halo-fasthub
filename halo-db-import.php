<?php
/**
 * HALO — Live DB import endpoint.
 *
 * Accepts a gzip'd SQL dump via POST and imports it into the WP database.
 * Backs up the current live DB first (saves locally on the server).
 * Authenticated via a time-based HMAC token.
 *
 * Called by bin/db-push.sh — not accessed directly.
 *
 * ⚠ This REPLACES the live database. Only use when pushing deliberate
 *   content or config changes from local. Never push without a backup.
 */

if ( php_sapi_name() === 'cli' ) exit( 'HTTP only.' );

require_once __DIR__ . '/wp-load.php';

/* ── Auth ──────────────────────────────────────────────────────── */

$secret = trim( (string) @file_get_contents( __DIR__ . '/.halo-deploy-secret' ) )
    ?: get_option( 'halo_deploy_secret', '' );
if ( ! $secret ) {
    http_response_code( 500 );
    die( 'halo_deploy_secret not configured.' );
}

$token = $_POST['token'] ?? $_GET['token'] ?? '';
$valid = false;
$now   = (int) ( time() / 60 );
for ( $m = $now - 5; $m <= $now + 5; $m++ ) {
    if ( hash_equals( hash_hmac( 'sha256', (string) $m, $secret ), $token ) ) {
        $valid = true;
        break;
    }
}
if ( ! $valid ) {
    http_response_code( 403 );
    die( 'Forbidden.' );
}

if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
    die( "POST a gzip'd SQL file as field 'sqlfile'." );
}

/* ── Receive file ───────────────────────────────────────────────── */

if ( empty( $_FILES['sqlfile']['tmp_name'] ) ) {
    http_response_code( 400 );
    die( "No file received. POST field name must be 'sqlfile'." );
}

$tmp = $_FILES['sqlfile']['tmp_name'];

/* Decompress if gzip */
$sql = file_get_contents( $tmp );
if ( substr( $sql, 0, 2 ) === "\x1f\x8b" ) {
    $sql = gzdecode( $sql );
    if ( $sql === false ) {
        http_response_code( 400 );
        die( 'Could not decompress gzip file.' );
    }
}

/* Basic sanity check */
if ( stripos( $sql, 'INSERT INTO' ) === false && stripos( $sql, 'CREATE TABLE' ) === false ) {
    http_response_code( 400 );
    die( 'File does not look like a SQL dump.' );
}

/* ── Backup current live DB first ──────────────────────────────── */

set_time_limit( 300 );
ini_set( 'memory_limit', '256M' );

global $wpdb;
$backup_dir = __DIR__ . '/wp-content/backups/db';
@mkdir( $backup_dir, 0755, true );

$backup_file = $backup_dir . '/pre-import-' . gmdate( 'Ymd-His' ) . '.sql.gz';

/* Simple export of current state */
$tables = $wpdb->get_col( 'SHOW TABLES' );
$backup = "-- Pre-import backup: " . gmdate( 'Y-m-d H:i:s' ) . " UTC\nSET FOREIGN_KEY_CHECKS=0;\n\n";
foreach ( $tables as $t ) {
    $create  = $wpdb->get_row( "SHOW CREATE TABLE `{$t}`", ARRAY_N );
    $backup .= "DROP TABLE IF EXISTS `{$t}`;\n" . $create[1] . ";\n\n";
    $rows    = $wpdb->get_results( "SELECT * FROM `{$t}`", ARRAY_A );
    if ( $rows ) {
        $cols    = '`' . implode( '`, `', array_keys( $rows[0] ) ) . '`';
        $vals    = array_map( fn( $r ) => '(' . implode( ', ', array_map(
            fn( $v ) => $v === null ? 'NULL' : "'" . esc_sql( $v ) . "'", $r
        ) ) . ')', $rows );
        $backup .= "INSERT INTO `{$t}` ({$cols}) VALUES\n" . implode( ",\n", $vals ) . ";\n\n";
    }
}
$backup .= "SET FOREIGN_KEY_CHECKS=1;\n";
file_put_contents( $backup_file, gzencode( $backup, 6 ) );

/* ── Import ─────────────────────────────────────────────────────── */

/*
 * mysqldump wraps FOREIGN_KEY_CHECKS=0 in /*!40014...*/ conditional comments.
 * Set it explicitly here so DROP TABLE IF EXISTS succeeds on tables that are
 * referenced by foreign keys. Restored after the loop.
 */
$wpdb->query( 'SET FOREIGN_KEY_CHECKS = 0' );

/* Split on semicolons, execute statement by statement */
$statements = preg_split( '/;\s*\n/', $sql );
$ok = 0; $fail = 0; $errors = [];

foreach ( $statements as $stmt ) {
    $stmt = trim( $stmt );
    // Skip blank lines and pure SQL comments (-- ...).
    // Keep /*!...*/ MySQL conditional comments — mysqldump uses these for
    // ENGINE/charset settings and they must be executed, not skipped.
    if ( ! $stmt || strpos( $stmt, '--' ) === 0 ) continue;
    // phpcs:ignore WordPress.DB.DirectDatabaseQuery
    $result = $wpdb->query( $stmt );
    if ( $result === false ) {
        $fail++;
        $errors[] = substr( $stmt, 0, 100 ) . '… — ' . $wpdb->last_error;
    } else {
        $ok++;
    }
}
$wpdb->query( 'SET FOREIGN_KEY_CHECKS = 1' );

/* ── Response ───────────────────────────────────────────────────── */

header( 'Content-Type: application/json' );
echo wp_json_encode( [
    'ok'          => $ok,
    'fail'        => $fail,
    'backup'      => basename( $backup_file ),
    'errors'      => array_slice( $errors, 0, 10 ),
] );
exit;
