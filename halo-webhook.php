<?php
/**
 * HALO FastHub -- GitHub push webhook receiver.
 *
 * Triggered automatically by GitHub when main is pushed.
 * Validates the HMAC-SHA256 signature, then pulls every tracked
 * theme/plugin file directly from the specific commit SHA.
 *
 * Secret stored in .halo-deploy-secret (one line, not web-accessible).
 * Log: appended to halo-deploy.log in public_html root.
 */

// Read raw body before anything else touches it
$raw = file_get_contents( 'php://input' );

// -- Auth -----------------------------------------------------------------

$secret_file = __DIR__ . '/.halo-deploy-secret';
$secret      = is_file( $secret_file ) ? trim( file_get_contents( $secret_file ) ) : '';

if ( ! $secret ) {
    http_response_code( 500 );
    file_put_contents( __DIR__ . '/halo-deploy.log', date( 'c' ) . " ERROR: secret file missing\n", FILE_APPEND );
    die( 'Not configured.' );
}

$expected = 'sha256=' . hash_hmac( 'sha256', $raw, $secret );
$received = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if ( ! hash_equals( $expected, $received ) ) {
    http_response_code( 403 );
    file_put_contents( __DIR__ . '/halo-deploy.log', date( 'c' ) . " ERROR: bad signature\n", FILE_APPEND );
    die( 'Forbidden.' );
}

// -- Payload --------------------------------------------------------------

$payload = json_decode( $raw, true );

if ( ( $payload['ref'] ?? '' ) !== 'refs/heads/main' ) {
    http_response_code( 200 );
    die( 'Not main -- skipped.' );
}

$sha     = $payload['after'] ?? 'main';
$pusher  = $payload['pusher']['name'] ?? 'unknown';
$message = $payload['head_commit']['message'] ?? '';
$base    = "https://raw.githubusercontent.com/robinamoore/iol-halo-fasthub/{$sha}/";
$root    = __DIR__;

// -- Files to deploy ------------------------------------------------------

$files = [
    'wp-content/plugins/halo-acf/css-editor.php',
    'wp-content/plugins/halo-acf/data-populate.php',
    'wp-content/plugins/halo-acf/fields.php',
    'wp-content/plugins/halo-acf/filter-pills.js',
    'wp-content/plugins/halo-acf/halo-acf.php',
    'wp-content/plugins/halo-acf/render.php',
    'wp-content/plugins/halo-cpt/halo-cpt.php',
    'wp-content/themes/generatepress-child/404.php',
    'wp-content/themes/generatepress-child/functions.php',
    'wp-content/themes/generatepress-child/iol-404.php',
    'wp-content/themes/generatepress-child/page.php',
    'wp-content/themes/generatepress-child/single-iol_case_study.php',
    'wp-content/themes/generatepress-child/single-iol_news.php',
    'wp-content/themes/generatepress-child/style.css',
    'halo-db-export.php',
    'halo-db-import.php',
    'halo-webhook.php',
];

// -- Fetch helper (cURL with file_get_contents fallback) ------------------

function halo_fetch( string $url ): string|false {
    if ( function_exists( 'curl_init' ) ) {
        $ch = curl_init( $url );
        curl_setopt_array( $ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => 15,
            CURLOPT_USERAGENT      => 'halo-webhook/2.0',
        ] );
        $body = curl_exec( $ch );
        $code = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
        curl_close( $ch );
        return ( $body !== false && $code === 200 ) ? $body : false;
    }
    return @file_get_contents( $url );
}

// -- Deploy ---------------------------------------------------------------

$log   = [];
$log[] = str_repeat( '-', 60 );
$log[] = date( 'c' );
$log[] = "SHA:    {$sha}";
$log[] = "Pusher: {$pusher}";
$log[] = "Msg:    " . substr( $message, 0, 80 );
$log[] = '';

$ok = 0; $fail = 0;

foreach ( $files as $rel ) {
    $data    = halo_fetch( $base . $rel );
    $trimmed = trim( (string) $data );

    $bad = $data === false
        || preg_match( '/^(404|401|403|Not Found|Bad credentials)/i', $trimmed )
        || ( str_ends_with( $rel, '.php' ) && ! str_contains( $trimmed, '<?php' ) && strlen( $trimmed ) < 500 );

    if ( $bad ) {
        $log[]  = "SKIP  {$rel}";
        $fail++;
        continue;
    }

    $dest    = $root . '/' . $rel;
    $dir     = dirname( $dest );
    if ( ! is_dir( $dir ) ) mkdir( $dir, 0755, true );

    $written = file_put_contents( $dest, $data );
    if ( $written === false ) {
        $log[]  = "FAIL  {$rel} (write error)";
        $fail++;
    } else {
        $log[]  = "OK    {$rel} ({$written}b)";
        $ok++;
    }
}

$log[] = '';
$log[] = "Result: {$ok} OK, {$fail} failed";
$log[] = '';

file_put_contents( __DIR__ . '/halo-deploy.log', implode( "\n", $log ) . "\n", FILE_APPEND );

http_response_code( 200 );
echo "OK {$ok}/" . count( $files ) . " deployed from {$sha}";
