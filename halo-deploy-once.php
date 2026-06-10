<?php
/**
 * HALO one-shot deploy — pulls all tracked files from GitHub via cURL.
 * Upload to public_html root, visit once, then DELETE.
 *
 * Usage: https://thatsbetter.co.uk/halo-deploy-once.php?run=1
 */
if ( ( $_GET['run'] ?? '' ) !== '1' ) {
    die( '<p>Add <code>?run=1</code> to run the deploy.</p>' );
}

$repo  = 'robinamoore/iol-halo-fasthub';
$sha   = '6bab1f8'; // latest commit
$base  = "https://raw.githubusercontent.com/{$repo}/{$sha}/";
$root  = __DIR__;

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
    'halo-webhook.php',
];

function curl_get( $url ) {
    $ch = curl_init( $url );
    curl_setopt_array( $ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'halo-deploy/1.0',
    ] );
    $body = curl_exec( $ch );
    $code = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
    curl_close( $ch );
    return ( $body !== false && $code === 200 ) ? $body : false;
}

$ok   = 0;
$fail = 0;
$log  = [];

foreach ( $files as $rel ) {
    $data = curl_get( $base . $rel );

    if ( $data === false ) {
        $log[] = [ 'status' => 'FAIL', 'file' => $rel, 'reason' => 'fetch failed' ];
        $fail++;
        continue;
    }

    $dest = $root . '/' . $rel;
    $dir  = dirname( $dest );
    if ( ! is_dir( $dir ) ) mkdir( $dir, 0755, true );

    $written = file_put_contents( $dest, $data );
    if ( $written === false ) {
        $log[] = [ 'status' => 'FAIL', 'file' => $rel, 'reason' => 'write failed' ];
        $fail++;
    } else {
        $log[] = [ 'status' => 'OK', 'file' => $rel, 'bytes' => $written ];
        $ok++;
    }
}

// Also update this webhook's halo-webhook.php via the same cURL
// (already included in $files above)

header( 'Content-Type: text/html; charset=utf-8' );
?><!DOCTYPE html>
<html>
<head><title>HALO Deploy</title>
<style>body{font-family:sans-serif;padding:2rem;background:#f0ebe3}
h2{color:#1a1a1a}.ok{color:#2a7a2a}.fail{color:#c00}
table{border-collapse:collapse;width:100%;margin-top:1rem}
td,th{padding:.4rem .8rem;border:1px solid #ccc;font-size:13px}
th{background:#1a1a1a;color:#fff;text-align:left}
tr.ok-row td:first-child{color:#2a7a2a;font-weight:600}
tr.fail-row td:first-child{color:#c00;font-weight:600}
</style></head>
<body>
<h2>HALO One-Shot Deploy — SHA <?= htmlspecialchars( $sha ) ?></h2>
<p><strong class="<?= $fail ? 'fail' : 'ok' ?>"><?= $ok ?> files OK, <?= $fail ?> failed</strong></p>
<table>
<tr><th>Status</th><th>File</th><th>Detail</th></tr>
<?php foreach ( $log as $entry ): ?>
<tr class="<?= $entry['status'] === 'OK' ? 'ok-row' : 'fail-row' ?>">
    <td><?= $entry['status'] ?></td>
    <td><?= htmlspecialchars( $entry['file'] ) ?></td>
    <td><?= isset( $entry['bytes'] ) ? $entry['bytes'] . ' bytes' : htmlspecialchars( $entry['reason'] ) ?></td>
</tr>
<?php endforeach; ?>
</table>
<?php if ( $ok === count( $files ) ): ?>
<p class="ok" style="margin-top:1.5rem;font-size:1.1em">&#10003; All files deployed. <strong>Delete this file from the server now.</strong></p>
<?php else: ?>
<p class="fail" style="margin-top:1.5rem">Some files failed — check write permissions.</p>
<?php endif; ?>
<p style="margin-top:1rem"><a href="/" style="color:#f7a803">View site &rarr;</a></p>
</body></html>
<?php
// Self-delete after successful full deploy (optional — comment out if you want to keep for review)
// if ( $fail === 0 ) @unlink( __FILE__ );
