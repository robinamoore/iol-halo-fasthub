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

/* Activate via /wp-admin/?halo_populate=1 */
add_action( 'admin_init', function () {
    if ( isset( $_GET['halo_populate'] ) && current_user_can( 'manage_options' ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';
        halo_populate_all();
        wp_die( '<h2>HALO data populated.</h2><p><a href="' . esc_url( home_url() ) . '">View site →</a></p>' );
    }
} );

