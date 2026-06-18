<?php
/**
 * HALO — one-shot DB restore from the pre-import backup.
 * Restores pre-import-20260618-112207.sql.gz created by the last db-push.
 * DELETE THIS FILE after running it once.
 */
if ( php_sapi_name() === 'cli' ) exit( 'HTTP only.' );

$secret = trim( (string) @file_get_contents( __DIR__ . '/.halo-deploy-secret' ) );
if ( ! $secret ) { http_response_code( 500 ); die( 'Not configured.' ); }

$token = $_GET['token'] ?? '';
$now   = (int)( time() / 60 );
$valid = false;
foreach ( [ $now, $now - 1, $now + 1 ] as $t ) {
    if ( hash_equals( hash_hmac( 'sha256', (string)$t, $secret ), $token ) ) {
        $valid = true; break;
    }
}
if ( ! $valid ) { http_response_code( 403 ); die( 'Forbidden.' ); }

$backup = __DIR__ . '/wp-content/backups/db/pre-import-20260618-112207.sql.gz';
if ( ! file_exists( $backup ) ) { http_response_code( 404 ); die( 'Backup not found: ' . $backup ); }

require_once __DIR__ . '/wp-load.php';
global $wpdb;

$sql = gzdecode( file_get_contents( $backup ) );
if ( ! $sql ) { http_response_code( 500 ); die( 'Failed to decompress backup.' ); }

$wpdb->query( 'SET FOREIGN_KEY_CHECKS=0' );

$ok = 0; $fail = 0; $errors = [];
foreach ( array_filter( array_map( 'trim', explode( ";\n", $sql ) ) ) as $stmt ) {
    if ( $wpdb->query( $stmt ) === false ) {
        $fail++;
        if ( count( $errors ) < 10 ) $errors[] = substr( $stmt, 0, 120 );
    } else {
        $ok++;
    }
}

$wpdb->query( 'SET FOREIGN_KEY_CHECKS=1' );

header( 'Content-Type: application/json' );
echo json_encode( [ 'ok' => $ok, 'fail' => $fail, 'errors' => $errors, 'backup' => $backup ] );
