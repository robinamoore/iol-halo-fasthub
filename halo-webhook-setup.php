<?php
/**
 * HALO — one-time webhook setup.
 * Run once at https://thatsbetter.co.uk/halo-webhook-setup.php
 * It generates a deploy secret and stores it in the WP options table.
 * Copy the secret shown and add it to the GitHub webhook.
 * DELETE THIS FILE immediately after running.
 */
require_once __DIR__ . '/wp-load.php';
if ( ! current_user_can( 'manage_options' ) ) {
    http_response_code( 403 );
    die( 'Log in to WP admin first.' );
}

$existing = get_option( 'halo_deploy_secret', '' );

if ( isset( $_POST['regenerate'] ) || ! $existing ) {
    $secret = bin2hex( random_bytes( 32 ) );
    update_option( 'halo_deploy_secret', $secret, false );
    $existing = $secret;
    $msg = 'New secret generated and saved.';
} else {
    $msg = 'Existing secret retrieved.';
}
?>
<!doctype html>
<html>
<head><title>HALO Deploy Secret</title>
<style>body{font-family:monospace;max-width:700px;margin:3rem auto;padding:1rem}
code{background:#f0f0f0;padding:.25rem .5rem;border-radius:3px;word-break:break-all;display:block;margin:.5rem 0;font-size:1.1rem}
.warn{color:#c00;font-weight:bold}</style>
</head>
<body>
<h2>HALO Deploy Secret</h2>
<p><?php echo esc_html( $msg ); ?></p>
<p><strong>Your webhook secret:</strong></p>
<code><?php echo esc_html( $existing ); ?></code>

<h3>GitHub webhook setup</h3>
<ol>
    <li>Go to <a href="https://github.com/robinamoore/iol-halo-fasthub/settings/hooks" target="_blank">GitHub → Settings → Webhooks → Add webhook</a></li>
    <li>Payload URL: <code>https://thatsbetter.co.uk/halo-webhook.php</code></li>
    <li>Content type: <code>application/json</code></li>
    <li>Secret: paste the secret above</li>
    <li>Events: <strong>Just the push event</strong></li>
    <li>Active: ✓ checked</li>
    <li>Click <strong>Add webhook</strong></li>
</ol>

<p class="warn">⚠ Delete this file (halo-webhook-setup.php) from the server immediately after noting the secret above.</p>

<form method="post">
    <button name="regenerate" value="1" onclick="return confirm('Regenerate? The old secret will stop working.')">Regenerate secret</button>
</form>
</body>
</html>
