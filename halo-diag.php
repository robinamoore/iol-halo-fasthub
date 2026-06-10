<?php
/**
 * HALO deploy diagnostic — delete after use.
 */
if ( ! isset( $_GET['run'] ) ) die( 'Add ?run=1' );

define( 'SHORTINIT', true );
require_once __DIR__ . '/wp-load.php';

$out = [];

// 1. Check deploy secret
$secret = get_option( 'halo_deploy_secret', '' );
$out[] = 'deploy_secret: ' . ( $secret ? 'SET (' . strlen($secret) . ' chars)' : 'MISSING' );

// 2. Check GitHub token
$token = get_option( 'halo_github_token', '' );
$out[] = 'github_token: ' . ( $token ? 'SET (' . strlen($token) . ' chars, starts ' . substr($token,0,8) . ')' : 'MISSING' );

// 3. Test write permission to theme dir
$test_file = __DIR__ . '/wp-content/themes/generatepress-child/.write-test';
$wrote = file_put_contents( $test_file, 'ok' );
$out[] = 'theme_dir_writable: ' . ( $wrote !== false ? 'YES' : 'NO' );
if ( $wrote !== false ) @unlink( $test_file );

// 4. Test write permission to plugin dir
$test_file2 = __DIR__ . '/wp-content/plugins/halo-acf/.write-test';
$wrote2 = file_put_contents( $test_file2, 'ok' );
$out[] = 'plugin_dir_writable: ' . ( $wrote2 !== false ? 'YES' : 'NO' );
if ( $wrote2 !== false ) @unlink( $test_file2 );

// 5. Test fetch from GitHub
$sha = 'd2c1fe5';
$url = "https://raw.githubusercontent.com/robinamoore/iol-halo-fasthub/{$sha}/wp-content/themes/generatepress-child/style.css";
$data = @file_get_contents( $url );
$out[] = 'github_fetch: ' . ( $data !== false ? 'OK (' . strlen($data) . ' bytes, first 40: ' . substr(trim($data),0,40) . ')' : 'FAILED' );

// 6. Check log write
$log_path = __DIR__ . '/halo-deploy.log';
$log_wrote = file_put_contents( $log_path, date('c') . " DIAG RUN\n", FILE_APPEND );
$out[] = 'log_writable: ' . ( $log_wrote !== false ? 'YES' : 'NO' );

// 7. PHP allow_url_fopen
$out[] = 'allow_url_fopen: ' . ( ini_get('allow_url_fopen') ? 'ON' : 'OFF' );

header( 'Content-Type: text/plain' );
echo implode( "\n", $out ) . "\n";
