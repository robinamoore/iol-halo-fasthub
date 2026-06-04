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

/*
 * Replace GP's default site branding with the HALO FastHub logo image.
 * Falls back gracefully to the WP custom_logo attachment once the seeder
 * has run; until then serves the file directly from the theme.
 */
add_action( 'init', function () {
    remove_action( 'generate_header', 'generate_site_branding' );
} );

add_action( 'generate_header', function () {
    /* Prefer the WP media-library attachment (set by seeder) */
    if ( has_custom_logo() ) {
        echo '<div class="site-branding">';
        the_custom_logo();
        echo '</div>';
        return;
    }
    /* Fallback: serve logo directly from theme images */
    $src = get_stylesheet_directory_uri() . '/images/logo-fasthub-dark.png';
    echo '<div class="site-branding">'
       . '<a href="' . esc_url( home_url( '/' ) ) . '" class="custom-logo-link" rel="home" itemprop="url">'
       . '<img src="' . esc_url( $src ) . '" alt="HALO FastHub" height="36" class="halo-logo">'
       . '</a>'
       . '</div>';
}, 10 );

/**
 * Move the mobile hamburger breakpoint to 1100px.
 * GP Free's "Float Right" nav only natively drops at 768px; this filter
 * is the official GP hook to change it without GP Premium.
 * Matches the max-width used in style.css mobile nav block.
 */
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
