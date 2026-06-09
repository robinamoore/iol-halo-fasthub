<?php
/**
 * HALO FastHub — GitHub push webhook receiver.
 *
 * Triggered automatically by GitHub when main is pushed.
 * Validates the HMAC-SHA256 signature, then pulls every tracked
 * theme/plugin file directly from the specific commit SHA so there
 * are no CDN-caching surprises.
 *
 * Secret is stored in the WP options table (halo_deploy_secret).
 * Run halo-webhook-setup.php once to generate it, then add to GitHub.
 *
 * Log: appended to halo-deploy.log in public_html root.
 */

// Read raw body before WP can consume it
$raw = file_get_contents( 'php://input' );

// Minimal WP bootstrap — just enough for get_option() and DB
define( 'SHORTINIT', true );
require_once __DIR__ . '/wp-load.php';

// ── Auth ─────────────────────────────────────────────────────────────

$secret = get_option( 'halo_deploy_secret', '' );

if ( ! $secret ) {
    http_response_code( 500 );
    file_put_contents( __DIR__ . '/halo-deploy.log', date( 'c' ) . " ERROR: halo_deploy_secret not set\n", FILE_APPEND );
    die( 'Not configured.' );
}

$expected = 'sha256=' . hash_hmac( 'sha256', $raw, $secret );
$received = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if ( ! hash_equals( $expected, $received ) ) {
    http_response_code( 403 );
    file_put_contents( __DIR__ . '/halo-deploy.log', date( 'c' ) . " ERROR: bad signature\n", FILE_APPEND );
    die( 'Forbidden.' );
}

// ── Payload ───────────────────────────────────────────────────────────

$payload = json_decode( $raw, true );

if ( ( $payload['ref'] ?? '' ) !== 'refs/heads/main' ) {
    http_response_code( 200 );
    die( 'Not main — skipped.' );
}

$sha     = $payload['after'] ?? 'main';
$pusher  = $payload['pusher']['name'] ?? 'unknown';
$message = $payload['head_commit']['message'] ?? '';
// GitHub token for private repo access — stored in WP options as halo_github_token
$gh_token = get_option( 'halo_github_token', '' );
$base     = "https://raw.githubusercontent.com/robinamoore/iol-halo-fasthub/{$sha}/";
$root    = __DIR__;

// ── Files to deploy ───────────────────────────────────────────────────
// All PHP/JS/CSS files tracked in the repo under theme + plugins.
// Images excluded (binary, change rarely, use Media Library instead).

$files = [
    'wp-content/plugins/halo-acf/css-editor.php',
    'wp-content/plugins/halo-acf/data-populate.php',
    'wp-content/plugins/halo-acf/fields.php',
    'wp-content/plugins/halo-acf/filter-pills.js',
    'wp-content/plugins/halo-acf/halo-acf.php',
    'wp-content/plugins/halo-acf/render.php',
    'wp-content/plugins/halo-cpt/halo-cpt.php',
    'wp-content/themes/generatepress-child/functions.php',
    'wp-content/themes/generatepress-child/page.php',
    'wp-content/themes/generatepress-child/single-iol_case_study.php',
    'wp-content/themes/generatepress-child/single-iol_news.php',
    'wp-content/themes/generatepress-child/style.css',
    // DB sync endpoints — deployed alongside the webhook
    'halo-db-export.php',
    'halo-db-import.php',
    // One-shot fixers — delete from server after use
    'halo-fix-tones.php',
    'halo-import-media-live.php',
];

// ── Deploy ────────────────────────────────────────────────────────────

$log   = [];
$log[] = str_repeat( '-', 60 );
$log[] = date( 'c' );
$log[] = "SHA:    {$sha}";
$log[] = "Pusher: {$pusher}";
$log[] = "Msg:    " . substr( $message, 0, 80 );
$log[] = '';

$ok = 0; $fail = 0;

// Build stream context with GitHub auth if token is set
$gh_context = null;
if ( $gh_token ) {
    $gh_context = stream_context_create( [
        'http' => [
            'header'        => "Authorization: token {$gh_token}\r\nUser-Agent: halo-webhook/1.0\r\n",
            'ignore_errors' => true,
        ],
    ] );
}

foreach ( $files as $rel ) {
    $data = $gh_context
        ? @file_get_contents( $base . $rel, false, $gh_context )
        : @file_get_contents( $base . $rel );
    if ( $data === false || ( $gh_token && str_starts_with( trim( $data ), '404' ) ) ) {
        $log[]  = "SKIP  {$rel}";
        $fail++;
    } else {
        $dest = $root . '/' . $rel;
        file_put_contents( $dest, $data );
        $log[]  = "OK    {$rel} (" . strlen( $data ) . " bytes)";
        $ok++;
    }
}

$log[] = '';
$log[] = "Result: {$ok} OK, {$fail} skipped";
$log[] = '';

file_put_contents( __DIR__ . '/halo-deploy.log', implode( "\n", $log ) . "\n", FILE_APPEND );

http_response_code( 200 );
echo "OK {$ok}/" . count( $files ) . " files deployed from {$sha}";
