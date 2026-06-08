<?php
/**
 * HALO — One-shot tone + heading-size fixer.
 *
 * Runs two targeted SQL UPDATEs on postmeta:
 *   1. Any %tone% meta_value = 'dark'  → 'light'
 *   2. Any %heading_size% meta_value = 'large' → 'small'
 *
 * Authenticated via the same HMAC token as the DB endpoints.
 * Visit: https://thatsbetter.co.uk/halo-fix-tones.php?token=TOKEN
 *
 * Generate token locally:
 *   python3 -c "import hmac,hashlib,time; s=open('bin/.halo-secret').read().strip(); m=int(time.time())//60; print(hmac.new(s.encode(),str(m).encode(),hashlib.sha256).hexdigest())"
 *
 * DELETE this file once run.
 */

if ( php_sapi_name() === 'cli' ) exit( 'HTTP only.' );

require_once __DIR__ . '/wp-load.php';

/* ── Auth ──────────────────────────────────────────────────────── */
$secret = get_option( 'halo_deploy_secret', '' );
if ( ! $secret ) { http_response_code( 500 ); die( 'halo_deploy_secret not set.' ); }

$token = $_GET['token'] ?? '';
$valid = false;
$now   = (int) ( time() / 60 );
for ( $m = $now - 5; $m <= $now + 5; $m++ ) {
    if ( hash_equals( hash_hmac( 'sha256', (string) $m, $secret ), $token ) ) {
        $valid = true; break;
    }
}
if ( ! $valid ) { http_response_code( 403 ); die( 'Forbidden.' ); }

/* ── Fix ───────────────────────────────────────────────────────── */
global $wpdb;

$dark_fixed = $wpdb->query(
    "UPDATE {$wpdb->postmeta}
     SET meta_value = 'light'
     WHERE meta_key LIKE '%tone%'
       AND meta_value = 'dark'"
);

$xl_fixed = $wpdb->query(
    "UPDATE {$wpdb->postmeta}
     SET meta_value = 'small'
     WHERE meta_key LIKE '%heading_size%'
       AND meta_value = 'large'"
);

/* ── Report ────────────────────────────────────────────────────── */
header( 'Content-Type: text/plain' );
echo "✓ Done.\n";
echo "  dark → light rows updated: {$dark_fixed}\n";
echo "  XL   → small rows updated: {$xl_fixed}\n";
echo "\nDelete this file once confirmed.\n";
exit;
