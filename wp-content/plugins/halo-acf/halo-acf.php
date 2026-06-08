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
require_once HALO_ACF_DIR . 'css-editor.php';

/* Auto-upload all theme assets to media library on plugin activation */
register_activation_hook( __FILE__, function () {
    require_once HALO_ACF_DIR . 'data-populate.php';
    halo_seed_all_assets();
} );

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

/* ── Editor: disable Gutenberg, hide TinyMCE, surface ACF only ────── */

/* 1. Kill the block editor for all HALO post types */
add_filter( 'use_block_editor_for_post_type', function ( $use, $post_type ) {
    $types = [ 'page', 'post', 'cs_item', 'news_item' ];
    return in_array( $post_type, $types, true ) ? false : $use;
}, 10, 2 );

/* 2. Remove the standard content textarea — ACF fields are the only editor */
add_action( 'init', function () {
    foreach ( [ 'page', 'post', 'cs_item', 'news_item' ] as $type ) {
        remove_post_type_support( $type, 'editor' );
    }
} );

/* 3. In Classic Editor, move ACF metabox to the top so it's immediately visible */
add_filter( 'acf/settings/metabox_placement', function () {
    return 'normal'; // normal (top), side, or after_title
} );

/* ── Duplicate post / page ────────────────────────────────────────── */

/* Add "Duplicate" link to row actions in list tables */
add_filter( 'page_row_actions', 'halo_duplicate_row_action', 10, 2 );
add_filter( 'post_row_actions', 'halo_duplicate_row_action', 10, 2 );

function halo_duplicate_row_action( array $actions, \WP_Post $post ): array {
    if ( ! current_user_can( 'edit_posts' ) ) return $actions;
    $url = wp_nonce_url(
        add_query_arg( [ 'action' => 'halo_duplicate', 'post' => $post->ID ], admin_url( 'admin-post.php' ) ),
        'halo_duplicate_' . $post->ID
    );
    $actions['duplicate'] = '<a href="' . esc_url( $url ) . '">Duplicate</a>';
    return $actions;
}

/* Handle the duplicate action */
add_action( 'admin_post_halo_duplicate', function () {
    $post_id = absint( $_GET['post'] ?? 0 );
    if ( ! $post_id || ! current_user_can( 'edit_posts' ) ) wp_die( 'Not allowed.' );
    check_admin_referer( 'halo_duplicate_' . $post_id );

    $original = get_post( $post_id );
    if ( ! $original ) wp_die( 'Post not found.' );

    /* Create the duplicate as a draft */
    $new_id = wp_insert_post( [
        'post_title'   => $original->post_title . ' (Copy)',
        'post_content' => $original->post_content,
        'post_excerpt' => $original->post_excerpt,
        'post_type'    => $original->post_type,
        'post_status'  => 'draft',
        'post_author'  => get_current_user_id(),
        'post_parent'  => $original->post_parent,
        'menu_order'   => $original->menu_order,
        'post_name'    => '',
    ] );

    if ( is_wp_error( $new_id ) ) wp_die( $new_id->get_error_message() );

    /* Copy all post meta (includes ACF flexible content) */
    foreach ( get_post_meta( $post_id ) as $key => $values ) {
        foreach ( $values as $value ) {
            add_post_meta( $new_id, $key, $value );
        }
    }

    /* Copy taxonomies */
    foreach ( get_object_taxonomies( $original->post_type ) as $tax ) {
        $terms = wp_get_object_terms( $post_id, $tax, [ 'fields' => 'ids' ] );
        if ( $terms && ! is_wp_error( $terms ) ) {
            wp_set_object_terms( $new_id, $terms, $tax );
        }
    }

    wp_redirect( admin_url( 'edit.php?post_type=' . $original->post_type ) );
    exit;
} );

/* Run seeder via URL param or admin-bar button */
add_action( 'admin_init', function () {
    if ( ! current_user_can( 'manage_options' ) ) return;

    /* Single-page force-reseed (clears then reseeds one page) */
    if ( isset( $_GET['halo_seed_page'] ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';
        $slug = sanitize_key( $_GET['halo_seed_page'] );
        $page = get_page_by_path( $slug );
        if ( $page ) {
            delete_field( 'page_sections', $page->ID );
            $fn = 'halo_seed_' . str_replace( '-', '_', $slug );
            if ( function_exists( $fn ) ) {
                $spec_id = get_posts(['post_type'=>'halo_spec_table','posts_per_page'=>1,'fields'=>'ids'])[0] ?? 0;
                $fn( $page->ID, $spec_id );
                wp_die( '<style>body{font-family:sans-serif;padding:2rem}</style><p>✓ Seeded: <strong>' . esc_html( $slug ) . '</strong> (ID ' . $page->ID . '). <a href="' . esc_url( get_permalink( $page->ID ) ) . '">View page →</a></p>' );
            }
            wp_die( 'No seed function found for: ' . esc_html( $fn ) );
        }
        wp_die( 'Page not found: ' . esc_html( $slug ) );
    }

    /* CPT-only seeder (case studies, news, team — safe to re-run, skips existing) */
    if ( isset( $_GET['halo_seed_cpts'] ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';
        halo_seed_demo_case_studies();
        halo_seed_demo_news();
        halo_seed_team_members();
        wp_die( '<style>body{font-family:sans-serif;padding:2rem}</style><h2>✓ CPTs seeded.</h2><p>Case studies, news articles and team members created (existing entries skipped).</p>' );
    }

    /* Force-reseed everything — clears all page_sections first, then reseeds.
     * Use this to apply data-populate.php changes to content that already exists. */
    if ( isset( $_GET['halo_force_reseed'] ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';

        /* Clear page_sections on every page */
        $pages = get_posts( [ 'post_type' => 'page', 'posts_per_page' => -1, 'fields' => 'ids' ] );
        foreach ( $pages as $pid ) delete_field( 'page_sections', $pid );

        /* Clear page_sections on every CPT post */
        foreach ( [ 'iol_case_study', 'iol_news' ] as $type ) {
            $posts = get_posts( [ 'post_type' => $type, 'posts_per_page' => -1, 'fields' => 'ids', 'post_status' => 'any' ] );
            foreach ( $posts as $pid ) delete_field( 'page_sections', $pid );
        }

        halo_populate_all();

        wp_die( '
            <style>body{font-family:sans-serif;padding:3rem;background:#f0ebe3}</style>
            <h2 style="color:#1a1a1a">✓ Force-reseed complete.</h2>
            <p>All page_sections cleared and reseeded from scratch.</p>
            <p><a href="' . esc_url( home_url( '/layout-test/' ) ) . '" style="color:#f7a803">View layout test →</a> &nbsp;
               <a href="' . esc_url( home_url() ) . '">View home page →</a></p>
        ' );
    }

    /* Full site seeder */
    if ( isset( $_GET['halo_populate'] ) ) {
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

    /* Store GitHub token for private-repo webhook deploys */
    if ( isset( $_GET['halo_set_github_token'] ) ) {
        $tok = sanitize_text_field( wp_unslash( $_GET['halo_set_github_token'] ) );
        update_option( 'halo_github_token', $tok );
        wp_die( '<style>body{font-family:sans-serif;padding:2rem}</style><p>✓ GitHub token saved. Future webhook deploys will use it.</p>' );
    }

    /* Fix tones: SQL UPDATE dark→light and XL heading→small across all postmeta */
    if ( isset( $_GET['halo_fix_tones'] ) ) {
        global $wpdb;
        $dark = $wpdb->query( "UPDATE {$wpdb->postmeta} SET meta_value='light' WHERE meta_key LIKE '%tone%' AND meta_value='dark'" );
        $xl   = $wpdb->query( "UPDATE {$wpdb->postmeta} SET meta_value='small' WHERE meta_key LIKE '%heading_size%' AND meta_value='large'" );
        wp_die(
            '<style>body{font-family:sans-serif;padding:2rem}</style>' .
            '<h2>✓ Tones fixed.</h2>' .
            "<p>dark → light rows: <strong>{$dark}</strong><br>" .
            "XL → small rows: <strong>{$xl}</strong></p>"
        );
    }

    /* Upload theme assets (logo + favicon) to media library only */
    if ( isset( $_GET['halo_upload_media'] ) ) {
        require_once HALO_ACF_DIR . 'data-populate.php';
        halo_seed_logo_and_favicon();
        $media_url = admin_url( 'upload.php' );
        wp_die( '
            <style>body{font-family:sans-serif;padding:3rem;background:#f0ebe3}</style>
            <h2 style="color:#1a1a1a">✓ Media assets uploaded.</h2>
            <p>Logo and favicon are now in the media library and set as the site logo/icon.</p>
            <p><a href="' . esc_url( $media_url ) . '" style="color:#f7a803">View Media Library →</a></p>
        ' );
    }
} );

/* Admin notice with setup buttons */
add_action( 'admin_notices', function () {
    if ( ! current_user_can( 'manage_options' ) ) return;

    /* Media upload notice — show whenever logo is not yet in the library */
    if ( get_page_by_path( 'home' ) && ! get_theme_mod( 'custom_logo' ) ) {
        $url = add_query_arg( 'halo_upload_media', '1', admin_url() );
        echo '<div class="notice notice-info" style="padding:1rem;display:flex;align-items:center;gap:1.5rem">
            <strong>HALO FastHub</strong> — logo not yet in media library.
            <a href="' . esc_url( $url ) . '" class="button button-primary" style="background:#f7a803;border-color:#e09700;color:#1a1a1a;font-weight:600">
                Upload logo &amp; favicon →
            </a>
        </div>';
        return;
    }

    /* Full setup notice — show when site hasn't been seeded at all */
    if ( ! get_page_by_path( 'home' ) ) {
        $url = add_query_arg( 'halo_populate', '1', admin_url() );
        echo '<div class="notice notice-warning" style="padding:1rem;display:flex;align-items:center;gap:1.5rem">
            <strong>HALO FastHub</strong> — site not yet populated.
            <a href="' . esc_url( $url ) . '" class="button button-primary" style="background:#f7a803;border-color:#e09700;color:#1a1a1a;font-weight:600">
                Run site setup →
            </a>
            <span style="color:#666;font-size:13px">Creates all pages, nav menu, demo content.</span>
        </div>';
    }
} );

