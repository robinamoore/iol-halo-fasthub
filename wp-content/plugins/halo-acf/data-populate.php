<?php
/**
 * HALO ACF — one-shot data population.
 * Trigger: /wp-admin/?halo_populate=1 (logged in as admin)
 *
 * Creates stub pages with seed sections so the editor has something to work from.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

function halo_populate_all(): void {
    halo_seed_taxonomy_terms();
    halo_create_pages();
}

function halo_seed_taxonomy_terms(): void {
    foreach ( [ 'Fleet', 'Workplace', 'Destination' ] as $term ) {
        if ( ! term_exists( $term, 'cs_sector' ) ) wp_insert_term( $term, 'cs_sector' );
    }
    foreach ( [ 'Whitepaper', 'Article', 'Press', 'Webinar' ] as $term ) {
        if ( ! term_exists( $term, 'news_category' ) ) wp_insert_term( $term, 'news_category' );
    }
}

function halo_create_pages(): void {
    $pages = [
        [ 'title'=>'Home',                'slug'=>'home',                'front'=>true ],
        [ 'title'=>'Product',             'slug'=>'product',             'front'=>false ],
        [ 'title'=>'Technical deep dive', 'slug'=>'technical-deep-dive', 'front'=>false ],
        [ 'title'=>'Case Studies',        'slug'=>'case-studies',        'front'=>false ],
        [ 'title'=>'About',               'slug'=>'about',               'front'=>false ],
        [ 'title'=>'News',                'slug'=>'news',                'front'=>false ],
        [ 'title'=>'Contact',             'slug'=>'contact',             'front'=>false ],
    ];

    foreach ( $pages as $p ) {
        if ( get_page_by_path( $p['slug'] ) ) continue;

        $id = wp_insert_post( [
            'post_type'   => 'page',
            'post_status' => 'publish',
            'post_title'  => $p['title'],
            'post_name'   => $p['slug'],
        ] );

        if ( $p['front'] && ! is_wp_error( $id ) ) {
            update_option( 'show_on_front', 'page' );
            update_option( 'page_on_front', $id );
        }
    }

    flush_rewrite_rules();
}
