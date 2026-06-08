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
 * Logo output — single combined lockup (HALO and FastHub are one unit per brand guidelines).
 * Replace logo-placeholder.png with the final brand asset when supplied.
 * Spec: 300 × 100 px PNG, black version, transparent background.
 * Uses GP's official filter so the site-logo wrapper and home link come from GP.
 */
add_filter( 'generate_logo_output', function ( $html ) {
    $logo = get_stylesheet_directory_uri() . '/images/logo-placeholder.png';
    return sprintf(
        '<div class="site-logo">
            <a href="%s" rel="home" aria-label="HALO FastHub — home">
                <img src="%s" alt="HALO FastHub" class="halo-logo" width="800" height="200">
            </a>
        </div>',
        esc_url( home_url( '/' ) ),
        esc_url( $logo )
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

/**
 * Remove the native WordPress Excerpt metabox from CPTs that use
 * ACF editorial fields instead (news_excerpt, cs_summary etc.).
 * Without this, the WP excerpt box duplicates the ACF excerpt field.
 */
add_action( 'add_meta_boxes', function () {
    remove_meta_box( 'postexcerpt', 'iol_news',       'normal' );
    remove_meta_box( 'postexcerpt', 'iol_case_study', 'normal' );
} );
