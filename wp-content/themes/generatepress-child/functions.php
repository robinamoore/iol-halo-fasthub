<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'halo-style', get_stylesheet_uri(), [ 'generate-style' ], wp_get_theme()->get( 'Version' ) );
    // Montserrat is loaded by GP's font_manager (generate_settings) — no enqueue needed here.
} );

/* Output favicon from media library (set via site_icon option by seeder) */
add_action( 'wp_head', function () {
    $favicon = get_stylesheet_directory_uri() . '/images/favicon.png';
    echo '<link rel="icon" type="image/png" href="' . esc_url( $favicon ) . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url( $favicon ) . '">' . "\n";
}, 1 );

/**
 * Move the mobile hamburger breakpoint to 1100px.
 * GP Free drops at 768px by default; this filter is the official GP hook.
 * Matches the max-width media query in style.css.
 */
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
