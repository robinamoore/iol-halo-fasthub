<?php
/**
 * HALO ACF — field group registration.
 * All field keys prefixed field_halo_ for uniqueness.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'acf/init', 'halo_register_field_group' );

function halo_register_field_group(): void {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) return;

    $tone_choices = [
        'light'    => 'Light (white)',
        'offwhite' => 'Off-white',
        'warm'     => 'Warm (sand)',
        'dark'     => 'Dark (black)',
    ];

    $pad_choices = [
        'none'   => 'None (0)',
        'small'  => 'Small (20px)',
        'medium' => 'Medium (48px)',
        'large'  => 'Large (96px)',
    ];

    /* Returns padding_top + padding_bottom fields with layout-unique keys */
    $pf = function( string $pfx ) use ( $pad_choices ): array {
        return [
            [ 'key' => "field_halo_{$pfx}_pad_top",    'name' => 'padding_top',    'label' => 'Top padding',
              'type' => 'select', 'choices' => $pad_choices, 'default_value' => 'small',
              'instructions' => 'Space above the first content element.' ],
            [ 'key' => "field_halo_{$pfx}_pad_bottom", 'name' => 'padding_bottom', 'label' => 'Bottom padding',
              'type' => 'select', 'choices' => $pad_choices, 'default_value' => 'large',
              'instructions' => 'Space below the last content element.' ],
        ];
    };

    acf_add_local_field_group( [
        'key'      => 'group_halo_page_sections',
        'title'    => 'Page Sections',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ] ] ],
        'fields'   => [

            [
                'key'          => 'field_halo_sections',
                'label'        => 'Page Sections',
                'name'         => 'page_sections',
                'type'         => 'flexible_content',
                'button_label' => 'Add section',
                'layouts'      => array_map( function( array $layout ) use ( $pf ): array {
                    $pfx = str_replace( 'layout_halo_', '', $layout['key'] );
                    $layout['sub_fields'] = array_merge( $layout['sub_fields'], $pf( $pfx ) );
                    return $layout;
                }, [

                    /* ── 01 · Page Hero ───────────────────────────── */
                    [
                        'key'        => 'layout_halo_hero',
                        'name'       => 'page_hero',
                        'label'      => '01 · Page Hero',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_hero_tone', 'name'=>'tone', 'label'=>'Background colour', 'type'=>'select',
                              'choices'=>$tone_choices, 'default_value'=>'dark',
                              'instructions'=>'Split/compact: controls the section background. Full-bleed: the photo covers the section — only the stat bar below will change colour. Dark is recommended for full-bleed.' ],
                            [
                                'key'           => 'field_halo_hero_style',
                                'name'          => 'style',
                                'label'         => 'Hero style',
                                'type'          => 'select',
                                'choices'       => [
                                    'split'     => 'Split — headline left, image panel right',
                                    'fullbleed' => 'Full-bleed — photo background with gradient overlay',
                                    'compact'   => 'Compact — text only, no image (inner pages)',
                                ],
                                'default_value' => 'split',
                                'instructions'  => 'Full-bleed uses the image as a full-height background. Split shows it as a side panel.',
                            ],
                            [ 'key'=>'field_halo_hero_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow', 'type'=>'text' ],
                            [ 'key'=>'field_halo_hero_title', 'name'=>'title', 'label'=>'Title', 'type'=>'textarea', 'rows'=>3, 'required'=>1, 'instructions'=>'Use line breaks for multiline headlines. Each line becomes a new line in the heading.' ],
                            [ 'key'=>'field_halo_hero_sub',     'name'=>'sub',     'label'=>'Sub-copy / support bar left', 'type'=>'textarea', 'rows'=>2, 'instructions'=>'In full-bleed style this becomes the support bar left-column text.' ],
                            [ 'key'=>'field_halo_hero_cta1_label', 'name'=>'cta1_label', 'label'=>'Primary CTA label', 'type'=>'text', 'placeholder'=>'Make an enquiry' ],
                            [ 'key'=>'field_halo_hero_cta1_url',   'name'=>'cta1_url',   'label'=>'Primary CTA URL',   'type'=>'text' ],
                            [ 'key'=>'field_halo_hero_cta2_label', 'name'=>'cta2_label', 'label'=>'Secondary CTA label', 'type'=>'text' ],
                            [ 'key'=>'field_halo_hero_cta2_url',   'name'=>'cta2_url',   'label'=>'Secondary CTA URL',   'type'=>'text' ],
                            [
                                'key'=>'field_halo_hero_image', 'name'=>'image', 'label'=>'Hero image',
                                'type'=>'image', 'return_format'=>'array', 'preview_size'=>'medium',
                                'instructions'=>'Split: right panel (900×600px). Full-bleed: background (1440×720px recommended).',
                                'conditional_logic'=>[ [ [ 'field'=>'field_halo_hero_style','operator'=>'!=','value'=>'compact' ] ] ],
                            ],
                            [ 'key'=>'field_halo_hero_stat1v', 'name'=>'stat1_value', 'label'=>'Stat 1 value', 'type'=>'text', 'placeholder'=>'£2,500' ],
                            [ 'key'=>'field_halo_hero_stat1u', 'name'=>'stat1_unit',  'label'=>'Stat 1 unit',  'type'=>'text', 'placeholder'=>'/ mo', 'instructions'=>'Small inline suffix after the number, e.g. "/ mo", "day", "required".' ],
                            [ 'key'=>'field_halo_hero_stat1l', 'name'=>'stat1_label', 'label'=>'Stat 1 label', 'type'=>'text', 'placeholder'=>'Starting lease' ],
                            [ 'key'=>'field_halo_hero_stat2v', 'name'=>'stat2_value', 'label'=>'Stat 2 value', 'type'=>'text', 'placeholder'=>'1' ],
                            [ 'key'=>'field_halo_hero_stat2u', 'name'=>'stat2_unit',  'label'=>'Stat 2 unit',  'type'=>'text', 'placeholder'=>'day' ],
                            [ 'key'=>'field_halo_hero_stat2l', 'name'=>'stat2_label', 'label'=>'Stat 2 label', 'type'=>'text', 'placeholder'=>'Install time' ],
                            [ 'key'=>'field_halo_hero_stat3v', 'name'=>'stat3_value', 'label'=>'Stat 3 value', 'type'=>'text', 'placeholder'=>'0' ],
                            [ 'key'=>'field_halo_hero_stat3u', 'name'=>'stat3_unit',  'label'=>'Stat 3 unit',  'type'=>'text', 'placeholder'=>'required' ],
                            [ 'key'=>'field_halo_hero_stat3l', 'name'=>'stat3_label', 'label'=>'Stat 3 label', 'type'=>'text', 'placeholder'=>'Grid upgrade' ],
                        ],
                    ],

                    /* ── 02 · CTA Band ────────────────────────────── */
                    [
                        'key'        => 'layout_halo_cta_band',
                        'name'       => 'cta_band',
                        'label'      => '02 · CTA Band',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_cta_tone',       'name'=>'tone',       'label'=>'Background colour', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'dark' ],
                            [ 'key'=>'field_halo_cta_eyebrow',    'name'=>'eyebrow',    'label'=>'Eyebrow (optional)', 'type'=>'text', 'placeholder'=>'Enquire' ],
                            [ 'key'=>'field_halo_cta_title',      'name'=>'title',      'label'=>'Heading', 'type'=>'textarea', 'rows'=>2, 'required'=>1, 'placeholder'=>'Ready to power your fleet?' ],
                            [ 'key'=>'field_halo_cta_heading_size', 'name'=>'heading_size', 'label'=>'Heading size', 'type'=>'select',
                              'choices'=>['large'=>'Large','medium'=>'Medium','small'=>'Small'], 'default_value'=>'large' ],
                            [ 'key'=>'field_halo_cta_sub',        'name'=>'sub',        'label'=>'Subline', 'type'=>'textarea', 'rows'=>2 ],
                            [ 'key'=>'field_halo_cta_btn1_label', 'name'=>'btn1_label', 'label'=>'Button 1 label', 'type'=>'text', 'placeholder'=>'Make an enquiry' ],
                            [ 'key'=>'field_halo_cta_btn1_url',   'name'=>'btn1_url',   'label'=>'Button 1 URL',   'type'=>'text' ],
                            [ 'key'=>'field_halo_cta_btn2_label', 'name'=>'btn2_label', 'label'=>'Button 2 label (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_cta_btn2_url',   'name'=>'btn2_url',   'label'=>'Button 2 URL (optional)',   'type'=>'text' ],
                        ],
                    ],

                    /* ── 03 · Section Intro ───────────────────────── */
                    [
                        'key'        => 'layout_halo_section_intro',
                        'name'       => 'section_intro',
                        'label'      => '03 · Section Intro',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_si_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_si_align',   'name'=>'align',   'label'=>'Alignment',  'type'=>'select', 'choices'=>['center'=>'Centre','left'=>'Left'], 'default_value'=>'center' ],
                            [ 'key'=>'field_halo_si_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow',    'type'=>'text' ],
                            [ 'key'=>'field_halo_si_heading', 'name'=>'heading', 'label'=>'Heading',    'type'=>'text', 'required'=>1 ],
                            [ 'key'=>'field_halo_si_sub',     'name'=>'sub',     'label'=>'Sub text',   'type'=>'textarea', 'rows'=>3 ],
                        ],
                    ],

                    /* ── 04 · Column Layout ───────────────────────── */
                    [
                        'key'        => 'layout_halo_columns',
                        'name'       => 'column_layout',
                        'label'      => '04 · Column Layout',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_cl_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_cl_cols',    'name'=>'cols',    'label'=>'Columns',    'type'=>'select', 'choices'=>['2'=>'2','3'=>'3','4'=>'4'], 'default_value'=>'3', 'instructions'=>'Columns on desktop. Always stacks to 1 on mobile.' ],
                            [ 'key'=>'field_halo_cl_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_cl_heading', 'name'=>'heading', 'label'=>'Heading (optional)', 'type'=>'text' ],
                            [
                                'key'          => 'field_halo_cl_items',
                                'name'         => 'items',
                                'label'        => 'Items',
                                'type'         => 'repeater',
                                'button_label' => 'Add item',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_cl_item_image',       'name'=>'image',       'label'=>'Image (optional)', 'type'=>'image', 'return_format'=>'array', 'preview_size'=>'thumbnail' ],
                                    [ 'key'=>'field_halo_cl_item_eyebrow',     'name'=>'eyebrow',     'label'=>'Eyebrow',          'type'=>'text' ],
                                    [ 'key'=>'field_halo_cl_item_title',       'name'=>'title',       'label'=>'Title',            'type'=>'text', 'required'=>1 ],
                                    [ 'key'=>'field_halo_cl_item_body',        'name'=>'body',        'label'=>'Body text',        'type'=>'textarea', 'rows'=>3 ],
                                    [ 'key'=>'field_halo_cl_item_link_label',  'name'=>'link_label',  'label'=>'Link label',       'type'=>'text' ],
                                    [ 'key'=>'field_halo_cl_item_link_url',    'name'=>'link_url',    'label'=>'Link URL',         'type'=>'text' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 05 · Stat Grid ───────────────────────────── */
                    [
                        'key'        => 'layout_halo_stats',
                        'name'       => 'stat_grid',
                        'label'      => '05 · Stat Grid',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_sg_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'warm' ],
                            [ 'key'=>'field_halo_sg_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_sg_heading', 'name'=>'heading', 'label'=>'Heading (optional)', 'type'=>'text' ],
                            [
                                'key'          => 'field_halo_sg_stats',
                                'name'         => 'stats',
                                'label'        => 'Statistics',
                                'type'         => 'repeater',
                                'button_label' => 'Add stat',
                                'min'          => 2,
                                'max'          => 5,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_sg_val',  'name'=>'value', 'label'=>'Value', 'type'=>'text', 'required'=>1, 'placeholder'=>'500+' ],
                                    [ 'key'=>'field_halo_sg_lbl',  'name'=>'label', 'label'=>'Label', 'type'=>'text', 'required'=>1, 'placeholder'=>'charge points installed' ],
                                    [ 'key'=>'field_halo_sg_note', 'name'=>'note',  'label'=>'Note (optional)', 'type'=>'text' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 06 · Story Rows ──────────────────────────── */
                    [
                        'key'        => 'layout_halo_story_rows',
                        'name'       => 'story_rows',
                        'label'      => '06 · Story Rows',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_sr_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_sr_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_sr_heading', 'name'=>'heading', 'label'=>'Heading (optional)', 'type'=>'text' ],
                            [
                                'key'          => 'field_halo_sr_rows',
                                'name'         => 'rows',
                                'label'        => 'Rows',
                                'type'         => 'repeater',
                                'button_label' => 'Add row',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_sr_step',  'name'=>'step',  'label'=>'Step / label (optional)', 'type'=>'text', 'placeholder'=>'Step 01' ],
                                    [ 'key'=>'field_halo_sr_title', 'name'=>'title', 'label'=>'Title',                   'type'=>'text', 'required'=>1 ],
                                    [ 'key'=>'field_halo_sr_body',  'name'=>'body',  'label'=>'Body text',               'type'=>'textarea', 'rows'=>3 ],
                                    [ 'key'=>'field_halo_sr_image', 'name'=>'image', 'label'=>'Image',                   'type'=>'image', 'return_format'=>'array', 'preview_size'=>'medium' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 07 · Pull Quote ──────────────────────────── */
                    [
                        'key'        => 'layout_halo_pull_quote',
                        'name'       => 'pull_quote',
                        'label'      => '07 · Pull Quote',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_pq_tone',        'name'=>'tone',        'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_pq_quote',       'name'=>'quote',       'label'=>'Quote text', 'type'=>'textarea', 'required'=>1, 'rows'=>3, 'instructions'=>'Do not include quotation marks — they are added automatically.' ],
                            [ 'key'=>'field_halo_pq_attribution', 'name'=>'attribution', 'label'=>'Attribution', 'type'=>'text', 'placeholder'=>'Jane Smith, Fleet Manager, Acme Corp' ],
                        ],
                    ],

                    /* ── 08 · Spec Table ──────────────────────────── */
                    [
                        'key'        => 'layout_halo_spec_table',
                        'name'       => 'spec_table',
                        'label'      => '08 · Spec Table',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_st_tone',         'name'=>'tone',         'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_st_eyebrow',      'name'=>'eyebrow',      'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_st_heading',      'name'=>'heading',      'label'=>'Heading (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_st_use_defaults', 'name'=>'use_defaults', 'label'=>'Use HALO FastHub default spec', 'type'=>'true_false', 'ui'=>1, 'default_value'=>1, 'instructions'=>'Pre-fills with standard HALO FastHub specifications. Untick to enter custom rows.' ],
                            [
                                'key'               => 'field_halo_st_rows',
                                'name'              => 'custom_rows',
                                'label'             => 'Custom spec rows',
                                'type'              => 'repeater',
                                'button_label'      => 'Add row',
                                'instructions'      => 'Only used when "Use default spec" is unticked.',
                                'conditional_logic' => [ [ [ 'field'=>'field_halo_st_use_defaults','operator'=>'!=value','value'=>'1' ] ] ],
                                'sub_fields'        => [
                                    [ 'key'=>'field_halo_st_spec',  'name'=>'spec',  'label'=>'Spec name', 'type'=>'text', 'required'=>1, 'placeholder'=>'AC Power Output' ],
                                    [ 'key'=>'field_halo_st_value', 'name'=>'value', 'label'=>'Value',     'type'=>'text', 'required'=>1, 'placeholder'=>'7.4kW / 22kW' ],
                                    [ 'key'=>'field_halo_st_note',  'name'=>'note',  'label'=>'Note',      'type'=>'text' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 09 · Accordion ───────────────────────────── */
                    [
                        'key'        => 'layout_halo_accordion',
                        'name'       => 'accordion',
                        'label'      => '09 · Accordion',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_ac_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_ac_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_ac_heading', 'name'=>'heading', 'label'=>'Heading (optional)', 'type'=>'text' ],
                            [
                                'key'          => 'field_halo_ac_items',
                                'name'         => 'items',
                                'label'        => 'FAQ items',
                                'type'         => 'repeater',
                                'button_label' => 'Add question',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_ac_q', 'name'=>'question', 'label'=>'Question', 'type'=>'text',     'required'=>1 ],
                                    [ 'key'=>'field_halo_ac_a', 'name'=>'answer',   'label'=>'Answer',   'type'=>'textarea', 'required'=>1, 'rows'=>4 ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 10 · Timeline ────────────────────────────── */
                    [
                        'key'        => 'layout_halo_timeline',
                        'name'       => 'timeline',
                        'label'      => '10 · Timeline',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_tl_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_tl_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_tl_heading', 'name'=>'heading', 'label'=>'Heading',           'type'=>'text', 'required'=>1 ],
                            [
                                'key'          => 'field_halo_tl_steps',
                                'name'         => 'steps',
                                'label'        => 'Steps',
                                'type'         => 'repeater',
                                'button_label' => 'Add step',
                                'min'          => 2,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_tl_marker', 'name'=>'marker', 'label'=>'Marker', 'type'=>'text', 'placeholder'=>'01', 'instructions'=>'Shown in the orange circle.' ],
                                    [ 'key'=>'field_halo_tl_title',  'name'=>'title',  'label'=>'Title',  'type'=>'text', 'required'=>1 ],
                                    [ 'key'=>'field_halo_tl_body',   'name'=>'body',   'label'=>'Body',   'type'=>'textarea', 'rows'=>3 ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 11 · Logo Strip ──────────────────────────── */
                    [
                        'key'        => 'layout_halo_logo_strip',
                        'name'       => 'logo_strip',
                        'label'      => '11 · Logo Strip',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_ls_tone',     'name'=>'tone',     'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_ls_headline', 'name'=>'headline', 'label'=>'Headline (optional)', 'type'=>'text', 'placeholder'=>'Trusted by leading operators' ],
                            [
                                'key'          => 'field_halo_ls_logos',
                                'name'         => 'logos',
                                'label'        => 'Logos',
                                'type'         => 'repeater',
                                'button_label' => 'Add logo',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_ls_img', 'name'=>'image', 'label'=>'Logo image', 'type'=>'image', 'return_format'=>'array', 'preview_size'=>'thumbnail', 'required'=>1 ],
                                    [ 'key'=>'field_halo_ls_alt', 'name'=>'alt',   'label'=>'Alt text',   'type'=>'text',  'instructions'=>'Company name for screen readers.' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 12 · Big Headline ────────────────────────── */
                    [
                        'key'        => 'layout_halo_big_headline',
                        'name'       => 'big_headline',
                        'label'      => '12 · Big Headline',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_bh_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_bh_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text', 'placeholder'=>'Sectors we serve' ],
                            [
                                'key'          => 'field_halo_bh_items',
                                'name'         => 'items',
                                'label'        => 'Items',
                                'type'         => 'repeater',
                                'button_label' => 'Add item',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_bh_headline', 'name'=>'headline', 'label'=>'Headline', 'type'=>'text', 'required'=>1, 'placeholder'=>'Fleet depots' ],
                                    [ 'key'=>'field_halo_bh_url',      'name'=>'url',      'label'=>'URL',      'type'=>'text',  'required'=>1 ],
                                    [ 'key'=>'field_halo_bh_sub',      'name'=>'sub',      'label'=>'Sub text', 'type'=>'text', 'placeholder'=>'Overnight charging for commercial fleets' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 13 · Certifications ──────────────────────── */
                    [
                        'key'        => 'layout_halo_certifications',
                        'name'       => 'certifications',
                        'label'      => '13 · Certifications',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_ce_tone',    'name'=>'tone',    'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_ce_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [
                                'key'          => 'field_halo_ce_certs',
                                'name'         => 'certs',
                                'label'        => 'Certifications',
                                'type'         => 'repeater',
                                'button_label' => 'Add certification',
                                'min'          => 1,
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_ce_logo',  'name'=>'logo',  'label'=>'Logo',  'type'=>'image', 'return_format'=>'array', 'preview_size'=>'thumbnail' ],
                                    [ 'key'=>'field_halo_ce_title', 'name'=>'title', 'label'=>'Title', 'type'=>'text', 'required'=>1 ],
                                    [ 'key'=>'field_halo_ce_note',  'name'=>'note',  'label'=>'Note',  'type'=>'text' ],
                                ],
                            ],
                            [
                                'key'          => 'field_halo_ce_footnotes',
                                'name'         => 'footnotes',
                                'label'        => 'Footnotes (optional)',
                                'type'         => 'repeater',
                                'button_label' => 'Add footnote',
                                'sub_fields'   => [
                                    [ 'key'=>'field_halo_ce_fn', 'name'=>'text', 'label'=>'Footnote text', 'type'=>'text' ],
                                ],
                            ],
                        ],
                    ],

                    /* ── 14 · Case Study Grid ─────────────────────── */
                    [
                        'key'        => 'layout_halo_cs_grid',
                        'name'       => 'case_study_grid',
                        'label'      => '14 · Case Study Grid',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_csg_tone',         'name'=>'tone',         'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_csg_eyebrow',      'name'=>'eyebrow',      'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_csg_heading',      'name'=>'heading',      'label'=>'Heading (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_csg_show_filters', 'name'=>'show_filters', 'label'=>'Show sector filter pills', 'type'=>'true_false', 'ui'=>1, 'default_value'=>1 ],
                            [ 'key'=>'field_halo_csg_limit',        'name'=>'limit',        'label'=>'Posts to show', 'type'=>'number', 'default_value'=>6, 'min'=>3, 'max'=>12 ],
                        ],
                    ],

                    /* ── 15 · News Archive ────────────────────────── */
                    [
                        'key'        => 'layout_halo_news_archive',
                        'name'       => 'news_archive',
                        'label'      => '15 · News Archive',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_na_tone',         'name'=>'tone',         'label'=>'Background', 'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_na_show_filters', 'name'=>'show_filters', 'label'=>'Show category filter pills', 'type'=>'true_false', 'ui'=>1, 'default_value'=>1 ],
                            [ 'key'=>'field_halo_na_limit',        'name'=>'limit',        'label'=>'Posts to show', 'type'=>'number', 'default_value'=>9, 'min'=>3, 'max'=>24 ],
                        ],
                    ],

                    /* ── 16 · Related Case Studies ────────────────── */
                    [
                        'key'        => 'layout_halo_related',
                        'name'       => 'related_case_studies',
                        'label'      => '16 · Related Case Studies',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_rel_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow', 'type'=>'text', 'placeholder'=>'Case studies' ],
                            [ 'key'=>'field_halo_rel_heading', 'name'=>'heading', 'label'=>'Heading', 'type'=>'text', 'placeholder'=>'See it in action' ],
                            [ 'key'=>'field_halo_rel_items',   'name'=>'items',   'label'=>'Pick case studies (leave blank for latest 3)', 'type'=>'relationship', 'post_type'=>['iol_case_study'], 'max'=>3, 'return_format'=>'post_object' ],
                        ],
                    ],

                    /* ── 17 · Article Body ────────────────────────── */
                    [
                        'key'        => 'layout_halo_article_body',
                        'name'       => 'article_body',
                        'label'      => '17 · Article Body',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_ab_content', 'name'=>'content', 'label'=>'Content', 'type'=>'wysiwyg', 'required'=>1, 'toolbar'=>'basic', 'media_upload'=>0 ],
                        ],
                    ],

                    /* ── 18 · Enquiry Form ────────────────────────── */
                    [
                        'key'        => 'layout_halo_enquiry_form',
                        'name'       => 'enquiry_form',
                        'label'      => '18 · Enquiry Form',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_ef_tone',    'name'=>'tone',    'label'=>'Background',  'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_ef_heading', 'name'=>'heading', 'label'=>'Heading',     'type'=>'text', 'default_value'=>'Tell us about your site.' ],
                            [ 'key'=>'field_halo_ef_sub',     'name'=>'sub',     'label'=>'Sub text',    'type'=>'textarea', 'rows'=>2 ],
                        ],
                    ],

                    /* ── 19 · Location ────────────────────────────── */
                    [
                        'key'        => 'layout_halo_location',
                        'name'       => 'location',
                        'label'      => '19 · Location',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_loc_tone',       'name'=>'tone',       'label'=>'Background',   'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'light' ],
                            [ 'key'=>'field_halo_loc_address',    'name'=>'address',    'label'=>'Address',      'type'=>'textarea', 'rows'=>3 ],
                            [ 'key'=>'field_halo_loc_email',      'name'=>'email',      'label'=>'Email',        'type'=>'email' ],
                            [ 'key'=>'field_halo_loc_phone',      'name'=>'phone',      'label'=>'Phone',        'type'=>'text' ],
                            [ 'key'=>'field_halo_loc_map_embed',  'name'=>'map_embed',  'label'=>'Google Maps embed URL',  'type'=>'text', 'instructions'=>'The src="" value from Share → Embed a map in Google Maps.' ],
                            [ 'key'=>'field_halo_loc_map_static', 'name'=>'map_static', 'label'=>'Static map image', 'type'=>'image', 'return_format'=>'array', 'preview_size'=>'medium', 'instructions'=>'Shown before cookie consent. Screenshot your map area at 800×600px.' ],
                        ],
                    ],

                    /* ── 20 · ROI Calculator ──────────────────────── */
                    [
                        'key'        => 'layout_halo_roi',
                        'name'       => 'roi_calculator',
                        'label'      => '20 · ROI Calculator (Phase 2)',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_roi_note', 'name'=>'note', 'label'=>'Note', 'type'=>'message', 'message'=>'Interactive ROI calculator — Phase 2. A placeholder CTA panel is shown until this is built.' ],
                        ],
                    ],

                    /* ── 21 · Card Picker ─────────────────────────── */
                    [
                        'key'        => 'layout_halo_card_picker',
                        'name'       => 'card_picker',
                        'label'      => '21 · Card Picker',
                        'sub_fields' => [
                            [ 'key'=>'field_halo_cp_tone',    'name'=>'tone',    'label'=>'Background',  'type'=>'select', 'choices'=>$tone_choices, 'default_value'=>'offwhite' ],
                            [ 'key'=>'field_halo_cp_eyebrow', 'name'=>'eyebrow', 'label'=>'Eyebrow (optional)', 'type'=>'text' ],
                            [ 'key'=>'field_halo_cp_heading', 'name'=>'heading', 'label'=>'Heading',     'type'=>'text' ],
                            [
                                'key'         => 'field_halo_cp_source',
                                'name'        => 'source',
                                'label'       => 'Card type',
                                'type'        => 'select',
                                'choices'     => [ 'team'=>'Team members', 'case_study'=>'Case studies', 'news'=>'News / resources' ],
                                'instructions'=> 'Choose what kind of cards to show.',
                            ],
                            [ 'key'=>'field_halo_cp_team',       'name'=>'team_items',       'label'=>'Team members',  'type'=>'relationship', 'post_type'=>['iol_team'],       'max'=>6, 'return_format'=>'post_object', 'conditional_logic'=>[ [ [ 'field'=>'field_halo_cp_source','operator'=>'==','value'=>'team'       ] ] ] ],
                            [ 'key'=>'field_halo_cp_case_study', 'name'=>'case_study_items', 'label'=>'Case studies',  'type'=>'relationship', 'post_type'=>['iol_case_study'], 'max'=>6, 'return_format'=>'post_object', 'conditional_logic'=>[ [ [ 'field'=>'field_halo_cp_source','operator'=>'==','value'=>'case_study' ] ] ] ],
                            [ 'key'=>'field_halo_cp_news',       'name'=>'news_items',       'label'=>'News articles', 'type'=>'relationship', 'post_type'=>['iol_news'],       'max'=>6, 'return_format'=>'post_object', 'conditional_logic'=>[ [ [ 'field'=>'field_halo_cp_source','operator'=>'==','value'=>'news'       ] ] ] ],
                        ],
                    ],

                ] ), // end array_map — padding fields appended to all layouts
            ],
        ],
        'menu_order' => 0,
        'position'   => 'normal',
        'style'      => 'default',
    ] );
}

