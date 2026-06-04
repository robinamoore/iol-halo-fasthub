<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'after_setup_theme', function () {
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 434,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
} );

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'halo-style', get_stylesheet_uri(), [ 'generate-style' ], wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap', [], null );
} );

/* Output favicon from theme images folder */
add_action( 'wp_head', function () {
    $favicon = get_stylesheet_directory_uri() . '/images/favicon.png';
    echo '<link rel="icon" type="image/png" href="' . esc_url( $favicon ) . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url( $favicon ) . '">' . "\n";
}, 1 );

/**
 * Move the mobile hamburger breakpoint to 1100px.
 * GP Free's "Float Right" nav only natively drops at 768px; this filter
 * is the official GP hook to change it without GP Premium.
 * Matches the max-width used in style.css mobile nav block.
 */
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
