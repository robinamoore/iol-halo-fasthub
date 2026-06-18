<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', function () {
    // GP auto-enqueues style.css as 'generate-child'. Dequeue it — we use
    // halo-styles.css instead so Cloudflare's cache of style.css can't interfere.
    wp_dequeue_style( 'generate-child' );
    wp_deregister_style( 'generate-child' );

    // halo-styles.css holds all the real CSS. style.css is theme header only.
    // New URL = Cloudflare has no stale cached copy of it.
    wp_enqueue_style(
        'halo-style',
        get_stylesheet_directory_uri() . '/halo-styles.css',
        [ 'generate-style' ],
        wp_get_theme()->get( 'Version' )
    );
    // Montserrat is loaded by GP's font_manager (generate_settings) — no enqueue needed here.
}, 20 ); // priority 20 — runs after GP's own wp_enqueue_scripts (priority 10)

/* Logo width — output inline CSS from GP Customizer setting + live preview binding */
add_action( 'wp_head', function () {
    $settings = get_theme_mod( 'generate_settings', [] );
    $width    = absint( $settings['logo_width'] ?? 0 );
    if ( $width ) {
        echo '<style>.halo-logo{width:' . $width . 'px;height:auto}</style>' . "\n";
    }
}, 99 );

add_action( 'customize_preview_init', function () {
    wp_add_inline_script( 'customize-preview', "
        wp.customize( 'generate_settings[logo_width]', function( value ) {
            value.bind( function( to ) {
                document.querySelectorAll( '.halo-logo' ).forEach( function( el ) {
                    el.style.width  = to ? to + 'px' : '';
                    el.style.height = 'auto';
                } );
            } );
        } );
    " );
} );

/* Output favicon from media library (set via site_icon option by seeder) */
add_action( 'wp_head', function () {
    $favicon = get_stylesheet_directory_uri() . '/images/favicon.png';
    echo '<link rel="icon" type="image/png" href="' . esc_url( $favicon ) . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url( $favicon ) . '">' . "\n";
}, 1 );

/**
 * Logo output — renders whatever is uploaded via Customizer → Site Identity → Logo.
 * Falls back to logo-placeholder.png if nothing has been uploaded yet.
 * Uses GP's official filter so the site-logo wrapper and home link come from GP.
 */
add_filter( 'generate_logo_output', function ( $html ) {
    $logo_id = get_theme_mod( 'custom_logo' );
    if ( $logo_id ) {
        $logo_src = wp_get_attachment_image_url( $logo_id, 'full' );
        $logo_alt = get_post_meta( $logo_id, '_wp_attachment_image_alt', true ) ?: 'HALO FastHub';
    } else {
        $logo_src = get_stylesheet_directory_uri() . '/images/logo-placeholder.png';
        $logo_alt = 'HALO FastHub';
    }
    $settings  = wp_parse_args( get_theme_mod( 'generate_settings' ), generate_get_defaults() );
    $logo_width = absint( $settings['logo_width'] ?? 0 );
    $size_style = $logo_width ? sprintf( 'width:%dpx;height:auto;', $logo_width ) : '';
    return sprintf(
        '<div class="site-logo">
            <a href="%s" rel="home" aria-label="HALO FastHub — home">
                <img src="%s" alt="%s" class="halo-logo custom-logo"%s>
            </a>
        </div>',
        esc_url( home_url( '/' ) ),
        esc_url( $logo_src ),
        esc_attr( $logo_alt ),
        $size_style ? ' style="' . esc_attr( $size_style ) . '"' : ''
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
 * -------------------------------------------------------------------------
 * Front-end fingerprint removal
 * Strips the signals that reveal WordPress / GeneratePress to scanners
 * (Wappalyzer, BuiltWith, view-source inspection).
 * -------------------------------------------------------------------------
 */

// 1. Remove WP + GP generator <meta> tags
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'generate_add_generator', '__return_false' );

// 2. Remove WP REST API & oEmbed discovery links from <head>
remove_action( 'wp_head', 'rest_output_link_wp_head',        10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links',   10 );
remove_action( 'wp_head', 'wp_shortlink_wp_head',            10 );

// 3. Remove X-Pingback header and <link rel="pingback"> from <head>
remove_action( 'wp_head', 'pingback_link_rel' );
add_filter( 'wp_headers', function( $headers ) {
    unset( $headers['X-Pingback'] );
    return $headers;
} );

// 4. Strip generate-* body classes (GP structural classnames visible in source)
add_filter( 'body_class', function( $classes ) {
    return array_values( array_filter( $classes, function( $class ) {
        return strpos( $class, 'generate' ) === false;
    } ) );
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

/**
 * Remove GP's Drawer menu locations — we use the standard horizontal nav only.
 * Without this, WP shows an "No menus assigned yet" admin notice for the
 * empty drawer locations.
 */
add_filter( 'generate_nav_location_args', function ( $locations ) {
    unset( $locations['drawer'] );
    unset( $locations['mobile-drawer'] );
    return $locations;
} );
