<?php
/**
 * Plugin Name: HALO CPT
 * Description: Registers iol_case_study, iol_news, and iol_team CPTs and their taxonomies for HALO FastHub.
 * Version:     1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', 'halo_register_post_types' );
add_action( 'init', 'halo_register_taxonomies' );
add_action( 'acf/init', 'halo_register_cpt_fields' );
register_activation_hook( __FILE__, 'halo_seed_terms' );

/* ── Post Types ──────────────────────────────────────────────── */

function halo_register_post_types(): void {

    register_post_type( 'iol_case_study', [
        'label'       => 'Case Studies',
        'labels'      => [ 'name'=>'Case Studies', 'singular_name'=>'Case Study', 'add_new_item'=>'Add Case Study', 'edit_item'=>'Edit Case Study' ],
        'public'      => true,
        'has_archive' => false,
        'rewrite'     => [ 'slug'=>'case-study' ],
        'supports'    => [ 'title', 'thumbnail', 'page-attributes' ],
        'menu_icon'   => 'dashicons-portfolio',
        'show_in_rest'=> false,
    ] );

    register_post_type( 'iol_news', [
        'label'       => 'News',
        'labels'      => [ 'name'=>'News', 'singular_name'=>'Article', 'add_new_item'=>'Add Article', 'edit_item'=>'Edit Article' ],
        'public'      => true,
        'has_archive' => false,
        'rewrite'     => [ 'slug'=>'article' ],
        'supports'    => [ 'title', 'thumbnail' ],
        'menu_icon'   => 'dashicons-megaphone',
        'show_in_rest'=> true,
    ] );

    register_post_type( 'iol_team', [
        'label'        => 'Team',
        'labels'       => [ 'name'=>'Team', 'singular_name'=>'Team member', 'add_new_item'=>'Add Team Member' ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'supports'     => [ 'title', 'page-attributes' ],
        'menu_icon'    => 'dashicons-groups',
        'show_in_rest' => false,
    ] );

    register_post_type( 'halo_spec_table', [
        'label'        => 'Spec Tables',
        'labels'       => [ 'name'=>'Spec Tables', 'singular_name'=>'Spec Table', 'add_new_item'=>'Add Spec Table', 'edit_item'=>'Edit Spec Table' ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'supports'     => [ 'title' ],
        'menu_icon'    => 'dashicons-list-view',
        'show_in_rest' => false,
    ] );
}

/* ── Taxonomies ──────────────────────────────────────────────── */

function halo_register_taxonomies(): void {

    register_taxonomy( 'cs_sector', 'iol_case_study', [
        'label'        => 'Sector',
        'labels'       => [ 'name'=>'Sectors', 'singular_name'=>'Sector', 'add_new_item'=>'Add Sector' ],
        'public'       => true,
        'hierarchical' => false,
        'rewrite'      => [ 'slug'=>'sector' ],
        'show_in_rest' => false,
    ] );

    register_taxonomy( 'news_category', 'iol_news', [
        'label'        => 'Category',
        'labels'       => [ 'name'=>'Categories', 'singular_name'=>'Category', 'add_new_item'=>'Add Category' ],
        'public'       => true,
        'hierarchical' => false,
        'rewrite'      => [ 'slug'=>'news-category' ],
        'show_in_rest' => true,
    ] );
}

/* ── Seed default terms on activation ────────────────────────── */

function halo_seed_terms(): void {
    foreach ( [ 'Fleet', 'Workplace', 'Destination' ] as $term ) {
        if ( ! term_exists( $term, 'cs_sector' ) ) {
            wp_insert_term( $term, 'cs_sector' );
        }
    }
    foreach ( [ 'Whitepaper', 'Article', 'Press', 'Webinar' ] as $term ) {
        if ( ! term_exists( $term, 'news_category' ) ) {
            wp_insert_term( $term, 'news_category' );
        }
    }
    flush_rewrite_rules();
}

/* ── ACF fields for CPTs ─────────────────────────────────────── */

function halo_register_cpt_fields(): void {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) return;

    /* Case Study ─────────────────────────────────────────────── */
    acf_add_local_field_group( [
        'key'      => 'group_halo_case_study',
        'title'    => 'Case Study Details',
        'location' => [ [ [ 'param'=>'post_type', 'operator'=>'==', 'value'=>'iol_case_study' ] ] ],
        'fields'   => [
            [ 'key'=>'field_cs_client',       'name'=>'cs_client',       'label'=>'Client name',        'type'=>'text' ],
            [ 'key'=>'field_cs_hero_tone',    'name'=>'cs_hero_tone',    'label'=>'Hero background',     'type'=>'select',
              'choices'=>['dark'=>'Dark (black)','light'=>'Light (white)','offwhite'=>'Off-white','warm'=>'Warm (sand)'],
              'default_value'=>'dark', 'instructions'=>'Background colour of the case study hero section.' ],
            [ 'key'=>'field_cs_summary',      'name'=>'cs_summary',      'label'=>'Summary (hero sub)',  'type'=>'textarea', 'rows'=>2, 'instructions'=>'One or two sentences — appears below the title on the case study page.' ],
            [ 'key'=>'field_cs_card_summary', 'name'=>'cs_card_summary', 'label'=>'Card summary',        'type'=>'text', 'instructions'=>'Short excerpt for case study cards on archive and related sections.' ],
            [ 'key'=>'field_cs_hero_image',   'name'=>'cs_hero_image',   'label'=>'Hero image',          'type'=>'image', 'return_format'=>'array', 'preview_size'=>'medium' ],
            [ 'key'=>'field_cs_client_logo',  'name'=>'cs_client_logo',  'label'=>'Client logo',         'type'=>'image', 'return_format'=>'array', 'preview_size'=>'thumbnail' ],
            [ 'key'=>'field_cs_stat1v', 'name'=>'cs_stat1_value', 'label'=>'Stat 1 value', 'type'=>'text', 'placeholder'=>'40%' ],
            [ 'key'=>'field_cs_stat1l', 'name'=>'cs_stat1_label', 'label'=>'Stat 1 label', 'type'=>'text', 'placeholder'=>'reduction in energy costs' ],
            [ 'key'=>'field_cs_stat2v', 'name'=>'cs_stat2_value', 'label'=>'Stat 2 value', 'type'=>'text' ],
            [ 'key'=>'field_cs_stat2l', 'name'=>'cs_stat2_label', 'label'=>'Stat 2 label', 'type'=>'text' ],
            [ 'key'=>'field_cs_stat3v', 'name'=>'cs_stat3_value', 'label'=>'Stat 3 value', 'type'=>'text' ],
            [ 'key'=>'field_cs_stat3l', 'name'=>'cs_stat3_label', 'label'=>'Stat 3 label', 'type'=>'text' ],
        ],
        'menu_order' => 0,
        'position'   => 'normal',
    ] );

    /* News ───────────────────────────────────────────────────── */
    acf_add_local_field_group( [
        'key'      => 'group_halo_news',
        'title'    => 'Article Details',
        'location' => [ [ [ 'param'=>'post_type', 'operator'=>'==', 'value'=>'iol_news' ] ] ],
        'fields'   => [
            [ 'key'=>'field_news_excerpt',    'name'=>'news_excerpt',    'label'=>'Excerpt',         'type'=>'textarea', 'rows'=>2, 'instructions'=>'Shown on cards and as the hero subtitle.' ],
            [ 'key'=>'field_news_read_time',  'name'=>'news_read_time',  'label'=>'Read time (mins)','type'=>'number', 'min'=>1 ],
            [ 'key'=>'field_news_hero_image', 'name'=>'news_hero_image', 'label'=>'Hero image',      'type'=>'image', 'return_format'=>'array', 'preview_size'=>'medium' ],
        ],
        'menu_order' => 0,
        'position'   => 'normal',
    ] );

    /* Team ───────────────────────────────────────────────────── */
    acf_add_local_field_group( [
        'key'      => 'group_halo_team',
        'title'    => 'Team member details',
        'location' => [ [ [ 'param'=>'post_type', 'operator'=>'==', 'value'=>'iol_team' ] ] ],
        'fields'   => [
            [ 'key'=>'field_team_role',  'name'=>'team_role',  'label'=>'Job title',   'type'=>'text' ],
            [ 'key'=>'field_team_photo', 'name'=>'team_photo', 'label'=>'Photo',       'type'=>'image', 'return_format'=>'array', 'preview_size'=>'thumbnail' ],
            [ 'key'=>'field_team_bio',   'name'=>'team_bio',   'label'=>'Short bio',   'type'=>'textarea', 'rows'=>3, 'instructions'=>'1-2 sentences about this person.' ],
        ],
        'menu_order' => 0,
        'position'   => 'side',
    ] );

    /* Spec Table ─────────────────────────────────────────────── */
    acf_add_local_field_group( [
        'key'      => 'group_halo_spec_table',
        'title'    => 'Spec Table Rows',
        'location' => [ [ [ 'param'=>'post_type', 'operator'=>'==', 'value'=>'halo_spec_table' ] ] ],
        'fields'   => [
            [
                'key'          => 'field_hst_rows',
                'name'         => 'rows',
                'label'        => 'Rows',
                'type'         => 'repeater',
                'button_label' => 'Add row',
                'sub_fields'   => [
                    [ 'key'=>'field_hst_spec',  'name'=>'spec',  'label'=>'Specification', 'type'=>'text', 'required'=>1, 'placeholder'=>'AC Power Output' ],
                    [ 'key'=>'field_hst_value', 'name'=>'value', 'label'=>'Value',         'type'=>'text', 'required'=>1, 'placeholder'=>'7.4kW / 22kW' ],
                    [ 'key'=>'field_hst_note',  'name'=>'note',  'label'=>'Note (optional)', 'type'=>'text' ],
                ],
            ],
        ],
        'menu_order' => 0,
        'position'   => 'normal',
    ] );
}
