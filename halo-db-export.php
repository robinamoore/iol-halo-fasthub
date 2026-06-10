<?php
/**
 * HALO — Live DB export endpoint.
 *
 * Returns a gzip'd SQL dump of the entire WP database.
 * Authenticated via a time-based HMAC token (±5 min window).
 *
 * URL:   https://thatsbetter.co.uk/halo-db-export.php?token=TOKEN
 * Token: HMAC-SHA256( floor(unix_time / 60), halo_deploy_secret )
 *
 * Normally called by bin/db-pull.sh — not accessed directly.
 */

if ( php_sapi_name() === 'cli' ) exit( 'HTTP only.' );

require_once __DIR__ . '/wp-load.php';

/* ── Auth ──────────────────────────────────────────────────────── */

$secret = trim( (string) @file_get_contents( __DIR__ . '/.halo-deploy-secret' ) )
    ?: get_option( 'halo_deploy_secret', '' );
if ( ! $secret ) {
    http_response_code( 500 );
    die( 'halo_deploy_secret not configured. Run halo-webhook-setup.php first.' );
}

$token = $_GET['token'] ?? '';
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

/* ── Export ────────────────────────────────────────────────────── */

set_time_limit( 300 );
ini_set( 'memory_limit', '256M' );

global $wpdb;
$tables   = $wpdb->get_col( 'SHOW TABLES' );
$site_url = get_option( 'siteurl', '' );

$buf  = "-- HALO FastHub database export\n";
$buf .= "-- Site:      {$site_url}\n";
$buf .= "-- Generated: " . gmdate( 'Y-m-d H:i:s' ) . " UTC\n";
$buf .= "-- Tables:    " . count( $tables ) . "\n\n";
$buf .= "SET NAMES utf8mb4;\n";
$buf .= "SET FOREIGN_KEY_CHECKS = 0;\n";
$buf .= "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n\n";

foreach ( $tables as $table ) {

    /* Structure */
    $create = $wpdb->get_row( "SHOW CREATE TABLE `{$table}`", ARRAY_N );
    $buf .= "-- Table: {$table}\n";
    $buf .= "DROP TABLE IF EXISTS `{$table}`;\n";
    $buf .= $create[1] . ";\n\n";

    /* Data — batch of 250 rows at a time */
    $total  = (int) $wpdb->get_var( "SELECT COUNT(*) FROM `{$table}`" );
    $offset = 0;

    while ( $offset < $total ) {
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery
        $rows = $wpdb->get_results(
            $wpdb->prepare( "SELECT * FROM `{$table}` LIMIT 250 OFFSET %d", $offset ),
            ARRAY_A
        );
        if ( ! $rows ) break;

        $cols = '`' . implode( '`, `', array_keys( $rows[0] ) ) . '`';
        $vals = [];
        foreach ( $rows as $row ) {
            $parts = array_map(
                fn( $v ) => ( $v === null ) ? 'NULL' : "'" . esc_sql( $v ) . "'",
                $row
            );
            $vals[] = '(' . implode( ', ', $parts ) . ')';
        }
        $buf .= "INSERT INTO `{$table}` ({$cols}) VALUES\n" . implode( ",\n", $vals ) . ";\n";
        $offset += 250;
    }
    $buf .= "\n";
}

$buf .= "SET FOREIGN_KEY_CHECKS = 1;\n";

/* ── Output ────────────────────────────────────────────────────── */

$filename = 'halo-db-' . gmdate( 'Ymd-His' ) . '.sql';
header( 'Content-Type: application/gzip' );
header( 'Content-Disposition: attachment; filename="' . $filename . '.gz"' );
header( 'X-HALO-Site: '   . esc_attr( $site_url ) );
header( 'X-HALO-Tables: ' . count( $tables ) );
// phpcs:ignore WordPress.Security.EscapeOutput
echo gzencode( $buf, 6 );
exit;
