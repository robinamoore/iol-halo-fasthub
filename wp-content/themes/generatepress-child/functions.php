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
 * Stacked logo lockup — HALO on top, FastHub below.
 * Uses GP's official filter so the rest of GP's logo logic (link, classes) still runs.
 */
add_filter( 'generate_logo_output', function ( $html ) {
    $dir  = get_stylesheet_directory_uri() . '/images/';
    $halo = $dir . 'logo-halo-dark.png';
    $hub  = $dir . 'logo-fasthub-dark.png';
    return sprintf(
        '<div class="site-logo">
            <a href="%s" rel="home" aria-label="HALO FastHub — home">
                <div class="halo-logo-stack">
                    <img src="%s" alt="HALO" class="halo-logo-stack__halo">
                    <img src="%s" alt="FastHub" class="halo-logo-stack__fasthub">
                </div>
            </a>
        </div>',
        esc_url( home_url( '/' ) ),
        esc_url( $halo ),
        esc_url( $hub )
    );
}, 10, 1 );

/**
 * Move the mobile hamburger breakpoint to 1100px.
 * GP Free drops at 768px by default; this filter is the official GP hook.
 * Matches the max-width media query in style.css.
 */
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
