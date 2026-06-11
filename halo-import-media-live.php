<?php
/**
 * One-shot: import 3ti team photos + logos into the media library.
 * Live/Clook version — fetches directly from 3ti.co.uk.
 * DELETE after use.
 */
// Token auth — same deploy secret as the webhook, no browser login needed.
$secret_file = __DIR__ . '/.halo-deploy-secret';
$secret      = is_file( $secret_file ) ? trim( file_get_contents( $secret_file ) ) : '';
$minute      = (int) ( time() / 60 );
$valid        = false;
foreach ( [ $minute, $minute - 1, $minute + 1 ] as $m ) {
    if ( hash_equals( hash_hmac( 'sha256', (string) $m, $secret ), (string) ( $_GET['token'] ?? '' ) ) ) {
        $valid = true; break;
    }
}
if ( ! $valid ) { http_response_code( 403 ); die( 'Forbidden.' ); }

require_once __DIR__ . '/wp-load.php';

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$sources = [
    // Team photos
    'Max-Aitken-Non-Executive-Director-in-Board.jpg' => 'https://3ti.co.uk/wp-content/uploads/2025/03/Max-Aitken-Non-Executive-Director-in-Board.jpg',
    'Mark-Potter.jpg'                                => 'https://3ti.co.uk/wp-content/uploads/2025/03/Mark-Potter.jpg',
    'Benedikt-Von-Thungen-Photo.jpg'                 => 'https://3ti.co.uk/wp-content/uploads/2025/03/Benedikt-Von-Thungen-Photo.jpg',
    'Alex-Tupman.png'                                => 'https://3ti.co.uk/wp-content/uploads/2025/03/Alex-Tupman.png',
    'CA-Photo-2.jpg'                                 => 'https://3ti.co.uk/wp-content/uploads/2025/03/CA-Photo-2.jpg',
    'SYLWIA-1.jpg'                                   => 'https://3ti.co.uk/wp-content/uploads/2025/03/SYLWIA-1.jpg',
    // Logos
    'university-of-surrey-logo.png'                  => 'https://3ti.co.uk/wp-content/uploads/2025/02/university-of-surrey-logo.png',
    'merseyside-police-logo.png'                     => 'https://3ti.co.uk/wp-content/uploads/2025/02/merseyside-police-logo.png',
    'segen-uk-200pxpng.png'                          => 'https://3ti.co.uk/wp-content/uploads/2025/03/segen-uk-200pxpng.png',
    'Silverstone_Circuit_logo-white-1-1024x203.png'  => 'https://3ti.co.uk/wp-content/uploads/2025/02/Silverstone_Circuit_logo-white-1-1024x203.png',
    'Silverstone_Circuit_logo-white-2.png'           => 'https://3ti.co.uk/wp-content/uploads/2025/02/Silverstone_Circuit_logo-white-2.png',
    'Charge-Safe-logo-white.png'                     => 'https://3ti.co.uk/wp-content/uploads/2025/03/Charge-Safe-logo-white.png',
    'B-corp-logo-transparent-White-500height.png'    => 'https://3ti.co.uk/wp-content/uploads/2025/03/B-corp-logo-transparent-White-500height.png',
    'bentley-logo-white.png'                         => 'https://3ti.co.uk/wp-content/uploads/2025/02/bentley-logo-white.png',
    'National_Health_Service_logo-white.png'         => 'https://3ti.co.uk/wp-content/uploads/2025/02/National_Health_Service_logo-white.png',
    'Surrey_County_Council-logo-white.png'           => 'https://3ti.co.uk/wp-content/uploads/2025/02/Surrey_County_Council-logo-white.png',
    'JLR-logo-white.png'                             => 'https://3ti.co.uk/wp-content/uploads/2025/02/JLR-logo-white.png',
    'Network-Rail-Logo-white.png'                    => 'https://3ti.co.uk/wp-content/uploads/2025/02/Network-Rail-Logo-white.png',
];

$log = [];

foreach ( $sources as $filename => $url ) {
    // Skip if already imported
    $existing = get_posts( [
        'post_type'   => 'attachment',
        'meta_key'    => '_wp_attached_file',
        'meta_value'  => $filename,
        'compare'     => 'LIKE',
        'fields'      => 'ids',
        'numberposts' => 1,
    ] );
    if ( $existing ) {
        $log[] = "– {$filename}: already in library";
        continue;
    }

    $data = @file_get_contents( $url );
    if ( ! $data || strlen( $data ) < 500 ) {
        $log[] = "✗ {$filename}: failed to fetch";
        continue;
    }

    $tmp = wp_tempnam( $filename );
    file_put_contents( $tmp, $data );

    $file_array = [
        'name'     => $filename,
        'tmp_name' => $tmp,
        'type'     => mime_content_type( $tmp ),
        'error'    => 0,
        'size'     => strlen( $data ),
    ];

    $id = media_handle_sideload( $file_array, 0 );

    if ( is_wp_error( $id ) ) {
        $log[] = "✗ {$filename}: " . $id->get_error_message();
    } else {
        $log[] = "✓ {$filename} → ID {$id}";
    }
}

echo '<style>body{font-family:sans-serif;padding:2rem;background:#f0ebe3}</style>';
echo '<h2>Media import complete</h2><ul>';
foreach ( $log as $line ) echo '<li>' . esc_html( $line ) . '</li>';
echo '</ul><p><a href="/wp-admin/upload.php">View Media Library →</a></p>';
echo '<p style="color:#999;font-size:12px">Delete halo-import-media-live.php from the WP root once done.</p>';
