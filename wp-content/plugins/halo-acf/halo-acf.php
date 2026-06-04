<?php
/**
 * Plugin Name: HALO ACF
 * Description: ACF field groups and section rendering for HALO FastHub.
 * Version:     1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'HALO_ACF_DIR', plugin_dir_path( __FILE__ ) );

require_once HALO_ACF_DIR . 'fields.php';
require_once HALO_ACF_DIR . 'render.php';

/* Render footer before the GP footer element */
add_action( 'generate_before_footer', 'halo_render_footer' );

/* Filter-pill JS for cs_grid / news_archive sections */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'halo-filter-pills',
        plugin_dir_url( __FILE__ ) . 'filter-pills.js',
        [],
        '1.0.0',
        true
    );
} );

/* Run seeder via URL param or admin-bar button */
add_action( 'admin_init', function () {
    if ( isset( $_GET['halo_populate'] ) && current_user_can( 'manage_options' ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';
        halo_populate_all();
        wp_die( '
            <style>body{font-family:sans-serif;padding:3rem;background:#f0ebe3}</style>
            <h2 style="color:#1a1a1a">✓ HALO site populated.</h2>
            <p>Pages, nav menu, demo case studies and news articles created.</p>
            <p><a href="' . esc_url( home_url( '/layout-test/' ) ) . '" style="color:#f7a803">View layout test →</a> &nbsp;
               <a href="' . esc_url( home_url() ) . '">View home page →</a></p>
        ' );
    }
} );

/* Admin notice with setup button when pages not yet seeded */
add_action( 'admin_notices', function () {
    if ( ! current_user_can( 'manage_options' ) ) return;
    if ( get_page_by_path( 'home' ) ) return; // already seeded
    $url = add_query_arg( 'halo_populate', '1', admin_url() );
    echo '<div class="notice notice-warning" style="padding:1rem;display:flex;align-items:center;gap:1.5rem">
        <strong>HALO FastHub</strong> — site not yet populated.
        <a href="' . esc_url( $url ) . '" class="button button-primary" style="background:#f7a803;border-color:#e09700;color:#1a1a1a;font-weight:600">
            Run site setup →
        </a>
        <span style="color:#666;font-size:13px">Creates all pages, nav menu, demo content.</span>
    </div>';
} );

