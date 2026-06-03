<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'halo-style', get_stylesheet_uri(), [ 'generate-style' ], wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap', [], null );
} );

/**
 * Move the mobile hamburger breakpoint to 1100px.
 * GP Free's "Float Right" nav only natively drops at 768px; this filter
 * is the official GP hook to change it without GP Premium.
 * Matches the max-width used in style.css mobile nav block.
 */
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
