<?php
/**
 * HALO ACF — one-shot data population.
 * Trigger: /wp-admin/?halo_populate=1 (logged in as admin)
 */
if ( ! defined( 'ABSPATH' ) ) exit;

function halo_populate_all(): void {
    halo_seed_taxonomy_terms();
    halo_seed_all_assets();
    $pages = halo_create_pages();
    $spec_table_id = halo_seed_spec_table();
    halo_seed_home(           $pages['home'] );
    halo_seed_product(        $pages['product'], $spec_table_id );
    halo_seed_technical(      $pages['technical-deep-dive'] );
    halo_seed_case_studies(   $pages['case-studies'] );
    halo_seed_about(          $pages['about'] );
    halo_seed_news(           $pages['news'] );
    halo_seed_contact(        $pages['contact'] );
    halo_seed_layout_test(    $pages['layout-test'], $spec_table_id );
    halo_seed_demo_case_studies();
    halo_seed_demo_news();
    halo_seed_team_members();
    halo_seed_nav_menu( $pages );
    flush_rewrite_rules();
}

/* ── Taxonomy terms ──────────────────────────────────────────────── */

function halo_seed_taxonomy_terms(): void {
    foreach ( [ 'Fleet', 'Workplace', 'Destination' ] as $term )
        if ( ! term_exists( $term, 'cs_sector' ) ) wp_insert_term( $term, 'cs_sector' );
    foreach ( [ 'Whitepaper', 'Article', 'Press', 'Webinar' ] as $term )
        if ( ! term_exists( $term, 'news_category' ) ) wp_insert_term( $term, 'news_category' );
}

/* ── Page scaffold ───────────────────────────────────────────────── */

function halo_create_pages(): array {
    $defs = [
        [ 'title' => 'Home',                'slug' => 'home',                'front' => true  ],
        [ 'title' => 'Product',             'slug' => 'product',             'front' => false ],
        [ 'title' => 'Technical deep dive', 'slug' => 'technical-deep-dive', 'front' => false ],
        [ 'title' => 'Case Studies',        'slug' => 'case-studies',        'front' => false ],
        [ 'title' => 'About',               'slug' => 'about',               'front' => false ],
        [ 'title' => 'News',                'slug' => 'news',                'front' => false ],
        [ 'title' => 'Contact',             'slug' => 'contact',             'front' => false ],
        [ 'title' => 'Layout test',         'slug' => 'layout-test',         'front' => false ],
    ];
    $ids = [];
    foreach ( $defs as $p ) {
        $existing = get_page_by_path( $p['slug'] );
        if ( $existing ) {
            $ids[ $p['slug'] ] = $existing->ID;
            continue;
        }
        $id = wp_insert_post( [
            'post_type'   => 'page',
            'post_status' => 'publish',
            'post_title'  => $p['title'],
            'post_name'   => $p['slug'],
        ] );
        if ( ! is_wp_error( $id ) ) {
            $ids[ $p['slug'] ] = $id;
            if ( $p['front'] ) {
                update_option( 'show_on_front', 'page' );
                update_option( 'page_on_front', $id );
            }
        }
    }
    return $ids;
}

/* ── HOME ────────────────────────────────────────────────────────── */

function halo_seed_home( int $id ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => '3ti Energy Hubs',
            'title'         => 'Smart energy. Fully managed.',
            'sub'           => 'Solar canopy, battery storage, mains integration and twelve charge points — one leased unit, installed in a day.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'cta2_label'    => 'Explore the product',
            'cta2_url'      => '/product',
            'stat1_value'   => '12',
            'stat1_label'   => 'charge points per hub',
            'stat2_value'   => '1 day',
            'stat2_label'   => 'on site',
            'stat3_value'   => 'No',
            'stat3_label'   => 'grid upgrade required',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'logo_strip',
            'eyebrow'       => 'Trusted by',
            'heading'       => 'Leading operators across fleets, workplaces and destinations.',
            'logos'         => [],
            'tone'          => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'section_intro',
            'eyebrow'       => 'The product',
            'heading'       => 'One canopy. Four systems. Twelve chargers.',
            'sub'           => 'HALO FastHub bundles solar canopy, battery storage, mains integration and twelve charge points into a single leased unit — prefabricated, delivered whole and managed end-to-end by HALO OS.',
            'align'         => 'left',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'stat_grid',
            'stats'         => [
                [ 'value' => '12',        'label' => 'Type 2 charge points' ],
                [ 'value' => '1 day',     'label' => 'from delivery to live charging' ],
                [ 'value' => '19.32 kWp', 'label' => 'solar generation' ],
                [ 'value' => '65%',       'label' => 'solar + battery share of demand' ],
            ],
            'tone' => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'case_study_grid',
            'eyebrow'       => 'Case studies',
            'heading'       => 'Real hubs, really deployed.',
            'show_filters'  => 0,
            'limit'         => 6,
            'tone'          => 'warm',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'btn2_label'    => 'Explore the product',
            'btn2_url'      => '/product',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── PRODUCT ─────────────────────────────────────────────────────── */

function halo_seed_spec_table(): int {
    $existing = get_page_by_path( 'halo-fasthub-standard', OBJECT, 'halo_spec_table' );
    if ( $existing ) return (int) $existing->ID;

    $id = wp_insert_post( [
        'post_type'   => 'halo_spec_table',
        'post_status' => 'publish',
        'post_title'  => 'HALO FastHub — Standard Specification',
        'post_name'   => 'halo-fasthub-standard',
    ] );
    if ( is_wp_error( $id ) ) return 0;

    update_field( 'rows', [
        [ 'spec'=>'AC Power Output',        'value'=>'7.4kW / 22kW',               'note'=>'Per charge point' ],
        [ 'spec'=>'DC Power Output',        'value'=>'Up to 150kW',                'note'=>'Shared power model' ],
        [ 'spec'=>'Charge connectors',      'value'=>'Type 2 AC + CCS DC',         'note'=>'All vehicles covered' ],
        [ 'spec'=>'Simultaneous charging',  'value'=>'Up to 12 vehicles',          'note'=>'Hub dependent' ],
        [ 'spec'=>'Network connectivity',   'value'=>'4G / LAN',                   'note'=>'Real-time monitoring' ],
        [ 'spec'=>'Payment',                'value'=>'RFID + contactless',         'note'=>'Open access option available' ],
        [ 'spec'=>'IP rating',              'value'=>'IP54',                       'note'=>'Outdoor rated' ],
        [ 'spec'=>'Operating temperature',  'value'=>'-25°C to +50°C',             'note'=>'' ],
        [ 'spec'=>'Cable management',       'value'=>'Retractable tethered',       'note'=>'Or untethered option' ],
        [ 'spec'=>'Energy management',      'value'=>'Smart load balancing',       'note'=>'OCPP 1.6 / 2.0.1' ],
        [ 'spec'=>'Warranty',               'value'=>'3 years standard',           'note'=>'5 year extended available' ],
        [ 'spec'=>'Installation footprint', 'value'=>'From 1.2m × 0.6m per unit', 'note'=>'Hub layout dependent' ],
    ], $id );

    return (int) $id;
}

function halo_seed_product( int $id, int $spec_table_id = 0 ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Product · HALO FastHub',
            'title'         => 'The hub that lands in a day.',
            'sub'           => 'Solar canopy, battery storage, mains integration and twelve charge points — one leased unit, deployed in twenty-four hours.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'cta2_label'    => 'Technical deep dive',
            'cta2_url'      => '/technical-deep-dive',
            'stat1_value'   => '12',
            'stat1_label'   => 'charge points',
            'stat2_value'   => '1 day',
            'stat2_label'   => 'on site',
            'stat3_value'   => '65%',
            'stat3_label'   => 'solar + battery share',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'spec_table',
            'eyebrow'       => 'Specifications',
            'heading'       => 'Everything in one leased unit.',
            'table_post'    => $spec_table_id,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'story_rows',
            'eyebrow'       => 'How it works',
            'heading'       => 'From first visit to fully managed charging.',
            'rows'          => [
                [
                    'step'  => '01',
                    'title' => 'Share your site details.',
                    'body'  => 'A focused conversation about your operational profile, fleet mix and energy requirements. We come back with a sized, costed and scheduled hub proposal within seven working days.',
                    'image' => 0,
                ],
                [
                    'step'  => '02',
                    'title' => 'We deliver, install and commission.',
                    'body'  => 'A single HIAB crane lift lands the prefabricated canopy. Electrical tie-in to your existing distribution board takes a few hours. HALO OS arrives pre-configured — energise and handover the same day.',
                    'image' => 0,
                ],
                [
                    'step'  => '03',
                    'title' => 'Generate, store, redirect.',
                    'body'  => 'When not in use for charging, energy is redirected to your building — cutting costs and reducing grid reliance. HALO OS monitors and tunes the flow second-by-second, 24/7.',
                    'image' => 0,
                ],
            ],
            'tone' => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'column_layout',
            'eyebrow'       => 'Sectors',
            'heading'       => 'One hub. Three jobs.',
            'cols'          => '3',
            'items'         => [
                [
                    'title'      => 'Fleets',
                    'body'       => 'Reliable, scalable charging that keeps marked, unmarked and commercial vehicles moving around the clock.',
                    'link_label' => 'Fleet solutions',
                    'link_url'   => '/case-studies',
                ],
                [
                    'title'      => 'Workplaces',
                    'body'       => 'Fast deployment for staff and visitor parking, with the option to generate revenue from every bay.',
                    'link_label' => 'Workplace solutions',
                    'link_url'   => '/case-studies',
                ],
                [
                    'title'      => 'Destinations',
                    'body'       => 'Attract EV drivers, extend dwell time and unlock a new revenue line at retail and leisure sites.',
                    'link_label' => 'Destination solutions',
                    'link_url'   => '/case-studies',
                ],
            ],
            'tone' => 'warm',
        ],
        [
            'acf_fc_layout' => 'pull_quote',
            'quote'         => 'FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy.',
            'attribution'   => 'Keith Dickinson · Director of Resources · Merseyside Police',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Fifty-plus parking spaces? Let\'s size your hub.',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'btn2_label'    => 'Technical deep dive',
            'btn2_url'      => '/technical-deep-dive',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── TECHNICAL DEEP DIVE ─────────────────────────────────────────── */

function halo_seed_technical( int $id, int $spec_table_id = 0 ): void {
    if ( ! $spec_table_id ) {
        $spec_table_id = (int) ( get_posts( [ 'post_type' => 'halo_spec_table', 'posts_per_page' => 1, 'fields' => 'ids' ] )[0] ?? 0 );
    }
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Product · Technical deep dive',
            'title'         => 'The full specification.',
            'sub'           => 'For engineers and procurement — hardware, performance envelope, software and support, in detail.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'compact'       => 1,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'spec_table',
            'eyebrow'       => 'Full specification',
            'heading'       => 'Hardware, performance and software.',
            'table_post'    => $spec_table_id,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'story_rows',
            'eyebrow'       => 'Technical detail',
            'heading'       => 'How the energy actually flows.',
            'rows'          => [
                [
                    'step'  => '01',
                    'title' => 'Solar generation.',
                    'body'  => 'The 19.32 kWp monocrystalline canopy generates throughout the operational day. Output is tracked second-by-second by HALO OS and dispatched to chargers, battery or building in real time.',
                    'image' => 0,
                ],
                [
                    'step'  => '02',
                    'title' => 'Battery storage.',
                    'body'  => 'Integrated smart-grid balanced storage shifts solar generation into evening and overnight charging windows. Charge cycles are managed to maximise battery lifespan.',
                    'image' => 0,
                ],
                [
                    'step'  => '03',
                    'title' => 'HALO OS arbitration.',
                    'body'  => 'Second-by-second energy arbitration across solar, battery and mains. Client-set tariff rules govern when grid power is drawn — protecting against peak rates.',
                    'image' => 0,
                ],
            ],
            'tone' => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'certifications',
            'eyebrow'       => 'Certifications & compliance',
            'certs'         => [
                [ 'title' => 'CE — Conformité Européenne' ],
                [ 'title' => 'BS EN 61851 — EV charging system standard' ],
                [ 'title' => 'OZEV approved chargepoint' ],
                [ 'title' => 'IEC 62196 — Type 2 connector' ],
                [ 'title' => 'ISO 9001 — Quality management' ],
                [ 'title' => 'ISO 14001 — Environmental management' ],
            ],
            'tone' => 'light',
        ],
        [
            'acf_fc_layout' => 'accordion',
            'eyebrow'       => 'Common questions',
            'heading'       => 'What procurement always asks.',
            'items'         => [
                [
                    'question' => 'Do I need planning permission?',
                    'answer'   => 'Most car-park hub installations sit under permitted development. Where consent is required, we handle the application end-to-end at no additional cost.',
                ],
                [
                    'question' => 'Who owns the hardware?',
                    'answer'   => '3ti Energy Hubs owns the hardware throughout the lease term. At end of term you can renew, upgrade to the next generation hub, or we decommission and remove.',
                ],
                [
                    'question' => 'What happens at end of term?',
                    'answer'   => 'You choose: renew on updated terms, upgrade to the latest hub specification, or we remove the installation at no cost to you.',
                ],
                [
                    'question' => 'How is solar performance metered?',
                    'answer'   => 'HALO OS logs generation to the kilowatt-hour in real time. Monthly reports show generation, consumption, grid draw and carbon savings — all exportable to CSV.',
                ],
                [
                    'question' => 'Is a grid upgrade required?',
                    'answer'   => 'No. HALO FastHub connects behind your existing meter. No DNO notification is required and no reinforcement is scheduled — that is the core commercial advantage of the system.',
                ],
            ],
            'tone' => 'warm',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── CASE STUDIES ────────────────────────────────────────────────── */

function halo_seed_case_studies( int $id ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Case studies',
            'title'         => 'Real hubs, really deployed.',
            'sub'           => 'From a 24/7 police fleet to a destination forecourt — see how the same hub adapts to each job.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'compact'       => 1,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'case_study_grid',
            'eyebrow'       => 'All deployments',
            'heading'       => 'Every deployment, in one place.',
            'show_filters'  => 1,
            'limit'         => 12,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── ABOUT ───────────────────────────────────────────────────────── */

function halo_seed_about( int $id ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'About · 3ti Energy Hubs',
            'title'         => 'The people closing the charging gap.',
            'sub'           => 'A B Corp-certified team of energy engineers, fleet specialists and sustainability scientists.',
            'compact'       => 1,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'section_intro',
            'eyebrow'       => '01 · Our mission',
            'heading'       => 'Make clean, self-generated EV charging the obvious choice for every car park in Britain.',
            'align'         => 'left',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'big_headline',
            'eyebrow'       => 'Explore',
            'items'         => [
                [ 'headline' => 'How the hub works',   'url' => '/product',      'sub' => 'The product, in detail' ],
                [ 'headline' => 'See our deployments', 'url' => '/case-studies', 'sub' => 'Real sites, real results' ],
                [ 'headline' => 'Read the latest',     'url' => '/news',         'sub' => 'Thinking on fleet electrification' ],
            ],
            'tone' => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'story_rows',
            'eyebrow'       => '02 · Our story',
            'heading'       => 'From solar car parks to smart hubs.',
            'rows'          => [
                [
                    'step'  => '2014',
                    'title' => 'Founded on a single insight.',
                    'body'  => '3ti began with the observation that most car parks face south and waste their rooftops. Our first solar canopy installations proved the economics — generation pays for itself and surplus goes to EV charging.',
                    'image' => 0,
                ],
                [
                    'step'  => '2019',
                    'title' => 'HALO OS is developed.',
                    'body'  => 'As battery costs fell, we built HALO OS — the energy-arbitration engine that coordinates solar, storage and mains second-by-second. The hub concept became viable at scale.',
                    'image' => 0,
                ],
                [
                    'step'  => 'Today',
                    'title' => 'B Corp certified. Fleet-proven.',
                    'body'  => 'We hold B Corp certification and are deploying HALO FastHub across police fleets, corporate campuses and destination forecourts. The one-day install promise is our calling card.',
                    'image' => 0,
                ],
            ],
            'tone' => 'offwhite',
        ],
        [
            'acf_fc_layout' => 'stat_grid',
            'eyebrow'       => 'By the numbers',
            'heading'       => 'A decade of clean-energy infrastructure.',
            'stats'         => [
                [ 'value' => '2014',   'label' => 'founded' ],
                [ 'value' => '50+',    'label' => 'hubs deployed' ],
                [ 'value' => '600+',   'label' => 'charge points live' ],
                [ 'value' => 'B Corp', 'label' => 'certified' ],
            ],
            'tone' => 'warm',
        ],
        [
            'acf_fc_layout' => 'card_picker',
            'eyebrow'       => 'The team',
            'heading'       => 'The people behind the hub.',
            'source'        => 'team',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'pull_quote',
            'quote'         => 'FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy.',
            'attribution'   => 'Keith Dickinson · Director of Resources · Merseyside Police',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── NEWS ────────────────────────────────────────────────────────── */

function halo_seed_news( int $id ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'News & insights',
            'title'         => 'Thinking on fleet electrification.',
            'sub'           => 'Whitepapers, technical articles, press coverage and recorded sessions — written for the people who ask the hard questions.',
            'compact'       => 1,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'news_archive',
            'show_filters'  => 1,
            'limit'         => 9,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'tone'          => 'light',
        ],
    ], $id );
}

/* ── CONTACT ─────────────────────────────────────────────────────── */

function halo_seed_contact( int $id ): void {
    if ( get_field( 'page_sections', $id ) ) return;
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Contact',
            'title'         => 'Start a conversation.',
            'sub'           => 'Tell us about your site, or reach us directly — we reply within seven working days.',
            'compact'       => 1,
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'enquiry_form',
            'heading'       => 'Tell us about your site.',
            'sub'           => 'Fifty or more parking spaces is the usual starting point. Share a few details and we\'ll come back within seven working days with a sized, costed proposal.',
            'tone'          => 'light',
        ],
        [
            'acf_fc_layout' => 'location',
            'address'       => '3ti Energy Hubs Ltd' . "\n" . 'Surrey Technology Centre' . "\n" . '40 Occam Road' . "\n" . 'Guildford GU2 7YG',
            'phone'         => '+44 (0)3331 121 371',
            'email'         => 'info@3ti.co.uk',
            'map_embed'     => '',
            'tone'          => 'warm',
        ],
    ], $id );
}

/* ── LAYOUT TEST — one of every section ──────────────────────────── */

function halo_seed_layout_test( int $id, int $spec_table_id = 0 ): void {
    update_field( 'page_sections', [

        /* 01 */ [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => '01 · Page Hero',
            'title'         => 'Smart energy. Fully managed.',
            'sub'           => 'Solar canopy, battery storage, mains integration and twelve charge points — one leased unit, installed in a day.',
            'cta1_label'    => 'Primary CTA',
            'cta1_url'      => '#',
            'cta2_label'    => 'Secondary CTA',
            'cta2_url'      => '#',
            'stat1_value'   => '12',
            'stat1_label'   => 'charge points per hub',
            'stat2_value'   => '1 day',
            'stat2_label'   => 'on site',
            'stat3_value'   => 'No',
            'stat3_label'   => 'grid upgrade required',
            'tone'          => 'light',
        ],

        /* 02 */ [
            'acf_fc_layout' => 'cta_band',
            'title'         => '02 · CTA Band — Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '#',
            'btn2_label'    => 'Explore the product',
            'btn2_url'      => '#',
            'tone'          => 'light',
        ],

        /* 03 */ [
            'acf_fc_layout' => 'section_intro',
            'eyebrow'       => '03 · Section Intro',
            'heading'       => 'One canopy. Four systems. Twelve chargers.',
            'sub'           => 'HALO FastHub bundles solar canopy, battery storage, mains integration and twelve charge points into a single leased unit.',
            'align'         => 'center',
            'tone'          => 'light',
        ],

        /* 04 */ [
            'acf_fc_layout' => 'column_layout',
            'eyebrow'       => '04 · Column Layout',
            'heading'       => 'One hub. Three jobs.',
            'cols'          => '3',
            'items'         => [
                [ 'title' => 'Fleets',       'body' => 'Reliable, scalable charging that keeps marked, unmarked and commercial vehicles moving around the clock.',   'link_label' => 'Fleet solutions',       'link_url' => '#' ],
                [ 'title' => 'Workplaces',   'body' => 'Fast deployment for staff and visitor parking, with the option to generate revenue from every bay.',          'link_label' => 'Workplace solutions',   'link_url' => '#' ],
                [ 'title' => 'Destinations', 'body' => 'Attract EV drivers, extend dwell time and unlock a new revenue line at retail and leisure sites.',            'link_label' => 'Destination solutions', 'link_url' => '#' ],
            ],
            'tone' => 'warm',
        ],

        /* 05 */ [
            'acf_fc_layout' => 'stat_grid',
            'eyebrow'       => '05 · Stat Grid',
            'heading'       => 'By the numbers.',
            'stats'         => [
                [ 'value' => '12',        'label' => 'Type 2 charge points' ],
                [ 'value' => '1 day',     'label' => 'from delivery to live charging' ],
                [ 'value' => '19.32 kWp', 'label' => 'solar generation' ],
                [ 'value' => '65%',       'label' => 'solar + battery share of demand' ],
            ],
            'tone' => 'offwhite',
        ],

        /* 06 */ [
            'acf_fc_layout' => 'story_rows',
            'eyebrow'       => '06 · Story Rows',
            'heading'       => 'How the energy flows.',
            'rows'          => [
                [ 'step' => '01', 'title' => 'Solar generation.',   'body' => 'The 19.32 kWp monocrystalline canopy generates throughout the operational day.', 'image' => 0 ],
                [ 'step' => '02', 'title' => 'Battery storage.',    'body' => 'Integrated smart-grid balanced storage shifts solar generation into evening windows.', 'image' => 0 ],
            ],
            'tone' => 'offwhite',
        ],

        /* 07 */ [
            'acf_fc_layout' => 'pull_quote',
            'eyebrow'       => 'Case study',
            'quote'         => '07 · Pull Quote — FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy.',
            'attribution'   => 'Keith Dickinson · Director of Resources · Merseyside Police',
            'tone'          => 'light',
        ],

        /* 08 */ [
            'acf_fc_layout' => 'spec_table',
            'eyebrow'       => '08 · Spec Table',
            'heading'       => 'Hardware, performance and software.',
            'table_post'    => $spec_table_id,
            'tone'          => 'light',
        ],

        /* 09 */ [
            'acf_fc_layout' => 'accordion',
            'eyebrow'       => '09 · Accordion',
            'heading'       => 'Common questions.',
            'items'         => [
                [ 'question' => 'Do I need planning permission?',     'answer' => 'Most car-park hub installations sit under permitted development.' ],
                [ 'question' => 'Who owns the hardware?',             'answer' => '3ti Energy Hubs owns the hardware throughout the lease term.' ],
                [ 'question' => 'Is a grid upgrade required?',        'answer' => 'No. HALO FastHub connects behind your existing meter.' ],
            ],
            'tone' => 'warm',
        ],

        /* 10 */ [
            'acf_fc_layout' => 'timeline',
            'eyebrow'       => '10 · Timeline',
            'heading'       => 'From enquiry to charging in four steps.',
            'steps'         => [
                [ 'marker' => '01', 'title' => 'Site assessment',    'body' => 'We visit, survey and size the hub to your operational profile.' ],
                [ 'marker' => '02', 'title' => 'Proposal',           'body' => 'Sized, costed and scheduled within seven working days.' ],
                [ 'marker' => '03', 'title' => 'Installation',       'body' => 'Single-day HIAB crane lift and electrical tie-in.' ],
                [ 'marker' => '04', 'title' => 'Go live',            'body' => 'HALO OS is pre-configured — energise and handover the same day.' ],
            ],
            'tone' => 'light',
        ],

        /* 11 */ [
            'acf_fc_layout' => 'logo_strip',
            'eyebrow'       => 'Trusted by',
            'heading'       => 'Leading operators across fleets, workplaces and destinations.',
            'logos'         => array_map( fn($id) => [ 'image' => (int) $id, 'alt' => 'Client logo' ],
                              get_posts(['post_type'=>'attachment','posts_per_page'=>5,'post_status'=>'inherit','fields'=>'ids']) ),
            'tone'          => 'offwhite',
        ],

        /* 12 */ [
            'acf_fc_layout' => 'big_headline',
            'eyebrow'       => '12 · Big Headline',
            'items'         => [
                [ 'headline' => 'Fleet depots & police fleets',       'url' => '#', 'sub' => 'Overnight charging for marked and unmarked vehicles' ],
                [ 'headline' => 'Corporate workplaces',               'url' => '#', 'sub' => 'Staff, visitor and revenue-generating bays' ],
                [ 'headline' => 'Destination forecourts',             'url' => '#', 'sub' => 'Retail and leisure dwell-time charging' ],
            ],
            'tone' => 'light',
        ],

        /* 13 */ [
            'acf_fc_layout' => 'certifications',
            'eyebrow'       => '13 · Certifications',
            'certs'         => [
                [ 'title' => 'CE — Conformité Européenne' ],
                [ 'title' => 'BS EN 61851 — EV charging standard' ],
                [ 'title' => 'OZEV approved chargepoint' ],
                [ 'title' => 'IEC 62196 — Type 2 connector' ],
            ],
            'tone' => 'offwhite',
        ],

        /* 14 */ [
            'acf_fc_layout' => 'case_study_grid',
            'eyebrow'       => '14 · Case Study Grid',
            'heading'       => 'Real hubs, really deployed.',
            'show_filters'  => 1,
            'limit'         => 6,
            'tone'          => 'light',
        ],

        /* 15 */ [
            'acf_fc_layout' => 'news_archive',
            'eyebrow'       => '15 · News Archive',
            'show_filters'  => 1,
            'limit'         => 6,
            'tone'          => 'offwhite',
        ],

        /* 16 */ [
            'acf_fc_layout' => 'related_case_studies',
            'eyebrow'       => '16 · Related Case Studies',
            'heading'       => 'See it in action.',
        ],

        /* 17 */ [
            'acf_fc_layout' => 'article_body',
            'content'       => '<h2>17 · Article Body</h2><p>This is the WYSIWYG content block used for news articles and case study sections. It supports headings, paragraphs, lists and blockquotes.</p><ul><li>Bullet point one</li><li>Bullet point two</li></ul><blockquote>A pull-quote styled within the article body.</blockquote>',
        ],

        /* 18 */ [
            'acf_fc_layout' => 'enquiry_form',
            'heading'       => '18 · Enquiry Form — Tell us about your site.',
            'sub'           => 'Fifty or more parking spaces is the usual starting point.',
            'tone'          => 'light',
        ],

        /* 19 */ [
            'acf_fc_layout' => 'location',
            'address'       => '3ti Energy Hubs Ltd' . "\n" . 'Surrey Technology Centre' . "\n" . '40 Occam Road' . "\n" . 'Guildford GU2 7YG',
            'phone'         => '+44 (0)3331 121 371',
            'email'         => 'info@3ti.co.uk',
            'map_embed'     => '',
            'tone'          => 'warm',
        ],

        /* 20 */ [
            'acf_fc_layout' => 'roi_calculator',
            'note'          => '20 · ROI Calculator placeholder',
        ],

        /* 21 */ [
            'acf_fc_layout' => 'card_picker',
            'eyebrow'       => '21 · Card Picker — case studies',
            'heading'       => 'Real deployments.',
            'source'        => 'case_study',
            'tone'          => 'offwhite',
        ],

    ], $id );
}

/* ── Demo case studies ───────────────────────────────────────────── */

function halo_seed_demo_case_studies(): void {
    $cases = [
        [
            'title'    => 'Merseyside Police — Fleet depot charging',
            'slug'     => 'merseyside-police',
            'sector'   => 'Fleet',
            'summary'  => 'Twelve 24/7 charge points for marked and unmarked vehicles across two depots. Installed in a single operational day with zero service disruption.',
            'card_sum' => 'Twelve charge points. One day on site. No grid upgrade. How HALO FastHub solved Merseyside Police\'s fleet electrification problem.',
            'stat1v'   => '6 hrs',  'stat1l' => 'crane lift to first charge',
            'stat2v'   => '12',     'stat2l' => 'vehicles charging simultaneously',
            'stat3v'   => '0',      'stat3l' => 'grid upgrade required',
            'quote'    => 'FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy. The installation team were on site for one day and the hub has been running flawlessly ever since.',
            'author'   => 'Keith Dickinson · Director of Resources · Merseyside Police',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'A growing EV fleet and no grid headroom.', 'body'=>'Merseyside Police operates a mixed fleet of marked and unmarked vehicles on a 24/7 rotation. The depot\'s existing supply had no headroom for a standard charge point installation — a DNO application would have taken twelve to eighteen months and cost a capital sum the force could not commit to.' ],
                [ 'step'=>'Solution',  'title'=>'HALO FastHub installed behind the existing meter.', 'body'=>'A single hub was specified: 19.32 kWp solar canopy, integrated battery storage and twelve Type 2 AC charge points. It connects behind the existing distribution board — no DNO notification, no grid reinforcement. Crane lift, electrical tie-in and commissioning completed in a single operational day with the depot fully running throughout.' ],
                [ 'step'=>'Outcome',   'title'=>'Live charging in six hours, no disruption.', 'body'=>'First charge began six hours after the crane arrived. HALO OS was configured to prioritise morning departure windows with overnight battery fill. Solar and battery now cover the majority of daily charging demand, with off-peak mains handling the remainder.' ],
            ],
        ],
        [
            'title'    => 'Segen Academy — Staff & visitor workplace',
            'slug'     => 'segen-academy',
            'sector'   => 'Workplace',
            'summary'  => 'Solar-topped staff car park with twelve charge points. Revenue from visitor sessions offset the lease cost before the end of month one.',
            'card_sum' => 'A workplace hub that pays for itself from visitor charge revenue — and became the flagship of the academy\'s sustainability report.',
            'stat1v'   => '100%',      'stat1l' => 'visitor demand met from solar',
            'stat2v'   => '£0',        'stat2l' => 'net lease cost after charge revenue',
            'stat3v'   => '19.32 kWp', 'stat3l' => 'solar generation capacity',
            'quote'    => 'The hub paid for itself before month two was out. Every visitor session is income and every staff session is a benefit we used to struggle to quantify on a benefits statement.',
            'author'   => 'Operations Director · Segen Academy',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'Staff demand for EV charging, no budget for capital infrastructure.', 'body'=>'Segen Academy had a growing number of staff arriving by EV and nowhere to charge. Procurement had approved a project, but capital expenditure approval was held pending a revised estates strategy. The project needed to proceed without capex.' ],
                [ 'step'=>'Solution',  'title'=>'Zero capex lease with visitor revenue from day one.', 'body'=>'HALO FastHub was leased on 3ti\'s fully managed model — zero capital cost. The hub was configured with priority charging for staff RFID cards during core hours, and open-access contactless payment for visitor sessions outside those windows. Visitor revenue was modelled to offset the monthly lease cost.' ],
                [ 'step'=>'Outcome',   'title'=>'Net zero lease cost and a new sustainability credential.', 'body'=>'Visitor charge revenue covered the monthly lease in the first full month of operation. Staff satisfaction scores for facilities improved measurably. The solar canopy was featured in the academy\'s annual sustainability report as a flagship initiative.' ],
            ],
        ],
        [
            'title'    => 'Harbourside Retail — Destination forecourt',
            'slug'     => 'harbourside-retail',
            'sector'   => 'Destination',
            'summary'  => 'Forty-minute dwell-time charging at a regional retail park. Average 6.8 kWh dispensed per visit — measurably extending time on site.',
            'card_sum' => 'EV charging as a destination differentiator: more dwell time, more spend, and a measurable rise in repeat visits.',
            'stat1v'   => '+18%',   'stat1l' => 'dwell time for charging visitors',
            'stat2v'   => '6.8 kWh','stat2l' => 'dispensed per visit on average',
            'stat3v'   => '40 min', 'stat3l' => 'average charge session',
            'quote'    => 'Customers who charge stay longer, spend more and come back more often. HALO FastHub is the most measurable marketing spend we\'ve made in five years.',
            'author'   => 'Centre Manager · Harbourside Retail Park',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'Competitors were installing charge points. Dwell time was drifting.', 'body'=>'Harbourside Retail had seen footfall from EV owners declining as nearby destinations installed charge points. The centre needed a solution that was differentiated — not just functional, but a reason to choose Harbourside.' ],
                [ 'step'=>'Solution',  'title'=>'A HALO FastHub as a visible feature at the main entrance.', 'body'=>'The solar canopy was positioned at the main entrance approach, visible from the access road. Twelve bays were priced to deliver forty minutes of partial charge — enough to top up during a typical retail visit. The canopy became a visual statement of the centre\'s sustainability positioning.' ],
                [ 'step'=>'Outcome',   'title'=>'Eighteen percent more dwell time from charging visitors.', 'body'=>'Post-installation analysis showed charging visitors spending an average of 40 minutes on site versus 34 minutes for non-charging visitors. Average transaction values were higher across all retail categories. Return visit frequency for registered users increased by 22% in the first quarter.' ],
            ],
        ],
        [
            'title'    => 'Avalon Logistics — Overnight fleet charging',
            'slug'     => 'avalon-logistics',
            'sector'   => 'Fleet',
            'summary'  => 'High-utilisation overnight charging for a 38-strong LCV fleet. Battery storage shifts daytime solar generation into the overnight departure window.',
            'card_sum' => 'A 38-vehicle LCV fleet fully charged every night from solar, battery and off-peak grid — at a cost well below equivalent diesel.',
            'stat1v'   => '2.4 yr', 'stat1l' => 'payback period on charging revenue',
            'stat2v'   => '38',     'stat2l' => 'vehicles charged every night',
            'stat3v'   => '64k',    'stat3l' => 'EV miles per year from solar',
            'quote'    => 'We\'ve gone from filling up at the forecourt every morning to plugging in every night. The energy cost is lower, the range anxiety is gone, and HALO OS handles everything automatically.',
            'author'   => 'Fleet Manager · Avalon Logistics',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'A 38-vehicle LCV fleet transitioning to electric with one overnight charge window.', 'body'=>'With 38 vehicles needing a full overnight charge before a 6am departure, the load profile was demanding — all demand concentrated in an 8-hour window, before solar generation could contribute meaningfully.' ],
                [ 'step'=>'Solution',  'title'=>'Battery storage shifts solar into the overnight window.', 'body'=>'HALO OS was configured to capture all solar generation during daylight hours into the battery, holding it for the overnight charging window. Off-peak mains provided the remaining top-up. The result: a blended charging cost per kWh significantly below Avalon\'s previous forecourt fuel cost per equivalent mile.' ],
                [ 'step'=>'Outcome',   'title'=>'64,000 EV miles annually from solar generation alone.', 'body'=>'In the first full year, the hub generated 64,000 EV miles\' worth of solar energy — eliminating fuel costs for roughly a third of the fleet\'s annual mileage. HALO OS exports a monthly fleet charging report directly into Avalon\'s fleet management system.' ],
            ],
        ],
        [
            'title'    => 'Northgate Business Park — Tenant amenity',
            'slug'     => 'northgate-business-park',
            'sector'   => 'Workplace',
            'summary'  => 'Multi-tenant business park installs HALO FastHub as a billable amenity, generating new income while attracting and retaining EV-driving tenants.',
            'card_sum' => 'A new amenity that covers its own lease costs and helped retain three tenants — and win two more.',
            'stat1v'   => '38',    'stat1l' => 'tenant vehicles charged daily',
            'stat2v'   => '£28k',  'stat2l' => 'annual charge revenue',
            'stat3v'   => '1 day', 'stat3l' => 'installation time on site',
            'quote'    => 'The hub went in during a quiet Tuesday. By Wednesday three different tenants had asked about expanding to a second phase.',
            'author'   => 'Estate Manager · Northgate Business Park',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'Tenant retention at risk as EV ownership grows.', 'body'=>'Northgate had lost two tenants in the previous year, both citing EV charging availability as a factor in their relocation decision. The estates team needed a solution that was deployable quickly, generated income, and could be presented as a premium amenity in renewal negotiations.' ],
                [ 'step'=>'Solution',  'title'=>'HALO FastHub as a revenue-generating estate amenity.', 'body'=>'The hub was positioned in the central car park, accessible to all tenants. 3ti structured a tariff model with discounted tenant-rate cards for regular users and a standard rate for occasional visitors. Revenue was projected to cover the lease cost and generate a surplus within twelve months.' ],
                [ 'step'=>'Outcome',   'title'=>'£28,000 annual revenue, three tenants renewed.', 'body'=>'Annual charge revenue reached £28,000 in the first full year, above the projected lease cost. Three tenants cited the charging amenity in their renewal negotiations. Two new tenants specifically referenced charging availability in their decision to choose Northgate.' ],
            ],
        ],
        [
            'title'    => 'Bevan Group — Retail destination',
            'slug'     => 'bevan-group',
            'sector'   => 'Destination',
            'summary'  => 'Garden centre adds EV charging as a visitor incentive. Solar canopy doubles as a feature entrance structure, reinforcing the brand\'s sustainability credentials.',
            'card_sum' => 'An entrance canopy that generates solar energy, charges EV visitors and tells a sustainability story before customers walk through the door.',
            'stat1v'   => '+22%', 'stat1l' => 'repeat visitor rate since install',
            'stat2v'   => '£0',   'stat2l' => 'capital cost — fully leased',
            'stat3v'   => '91%',  'stat3l' => 'solar share of charging energy',
            'quote'    => 'Our customers come to us because they care about how things are grown. The solar canopy tells that story before they\'ve even walked through the door.',
            'author'   => 'Managing Director · Bevan Group Garden Centres',
            'rows'     => [
                [ 'step'=>'Challenge', 'title'=>'A sustainability-led brand with no visible sustainability infrastructure.', 'body'=>'Bevan Group had a strong sustainability positioning — organic growing, minimal packaging, a commitment to carbon-neutral operations by 2028. But the car park told a different story. The management team wanted an installation that aligned the car park with the brand.' ],
                [ 'step'=>'Solution',  'title'=>'A solar canopy at the main entrance — architecture and energy system.', 'body'=>'The HALO FastHub was designed into the entrance approach rather than positioned at the back of the car park. The solar canopy — specified in a natural timber finish — generates 19.32 kWp and shades twelve charge point bays. 3ti worked with the centre\'s architect to integrate it into the site\'s planning application.' ],
                [ 'step'=>'Outcome',   'title'=>'A 22% increase in repeat visits and a flagship sustainability story.', 'body'=>'Repeat visitor frequency increased 22% in the twelve months following installation. The canopy has been featured in three national gardening publications and cited by Bevan Group\'s sustainability director as the single most impactful initiative in their 2026 report.' ],
            ],
        ],
    ];

    $fleet_term = get_term_by( 'name', 'Fleet',       'cs_sector' );
    $work_term  = get_term_by( 'name', 'Workplace',   'cs_sector' );
    $dest_term  = get_term_by( 'name', 'Destination', 'cs_sector' );
    $term_map   = [ 'Fleet' => $fleet_term, 'Workplace' => $work_term, 'Destination' => $dest_term ];

    foreach ( $cases as $c ) {
        $existing = get_page_by_path( $c['slug'], OBJECT, 'iol_case_study' );
        if ( $existing ) {
            $id = (int) $existing->ID;
        } else {
            $id = wp_insert_post( [
                'post_type'    => 'iol_case_study',
                'post_status'  => 'publish',
                'post_title'   => $c['title'],
                'post_name'    => $c['slug'],
                'post_excerpt' => $c['summary'],
            ] );
            if ( is_wp_error( $id ) ) continue;
            $term = $term_map[ $c['sector'] ] ?? false;
            if ( $term && ! is_wp_error( $term ) ) wp_set_object_terms( $id, $term->term_id, 'cs_sector' );
        }

        update_field( 'cs_client',       explode( ' — ', $c['title'] )[0], $id );
        update_field( 'cs_summary',      $c['summary'],   $id );
        update_field( 'cs_card_summary', $c['card_sum'],  $id );
        if ( ! empty( $c['stat1v'] ) ) { update_field( 'cs_stat1_value', $c['stat1v'], $id ); update_field( 'cs_stat1_label', $c['stat1l'], $id ); }
        if ( ! empty( $c['stat2v'] ) ) { update_field( 'cs_stat2_value', $c['stat2v'], $id ); update_field( 'cs_stat2_label', $c['stat2l'], $id ); }
        if ( ! empty( $c['stat3v'] ) ) { update_field( 'cs_stat3_value', $c['stat3v'], $id ); update_field( 'cs_stat3_label', $c['stat3l'], $id ); }

        if ( ! get_field( 'page_sections', $id ) ) {
            $rows = array_map( fn( $r ) => [
                'step'  => $r['step'],
                'title' => $r['title'],
                'body'  => $r['body'],
                'image' => 0,
            ], $c['rows'] );

            update_field( 'page_sections', [
                [
                    'acf_fc_layout' => 'section_intro',
                    'eyebrow'       => $c['sector'] . ' deployment · ' . explode( ' — ', $c['title'] )[0],
                    'heading'       => $c['summary'],
                    'align'         => 'left',
                    'tone'          => 'light',
                ],
                [
                    'acf_fc_layout' => 'story_rows',
                    'eyebrow'       => 'The deployment',
                    'heading'       => 'Challenge. Solution. Outcome.',
                    'rows'          => $rows,
                    'tone'          => 'offwhite',
                ],
                [
                    'acf_fc_layout' => 'pull_quote',
                    'quote'         => $c['quote'],
                    'attribution'   => $c['author'],
                    'tone'          => 'offwhite',
                ],
                [
                    'acf_fc_layout' => 'stat_grid',
                    'eyebrow'       => 'Key results',
                    'stats'         => [
                        [ 'value' => $c['stat1v'], 'label' => $c['stat1l'] ],
                        [ 'value' => $c['stat2v'], 'label' => $c['stat2l'] ],
                        [ 'value' => $c['stat3v'], 'label' => $c['stat3l'] ],
                        [ 'value' => '1 day',      'label' => 'on-site installation time' ],
                    ],
                    'tone'          => 'warm',
                ],
                [
                    'acf_fc_layout' => 'related_case_studies',
                    'eyebrow'       => 'More deployments',
                    'heading'       => 'See HALO FastHub in other settings.',
                ],
                [
                    'acf_fc_layout' => 'cta_band',
                    'title'         => 'Ready to power your site?',
                    'sub'           => 'A free site survey is the first step. We size, cost and schedule your hub within seven working days.',
                    'btn1_label'    => 'Make an enquiry',
                    'btn1_url'      => '/contact',
                    'tone'          => 'light',
                ],
            ], $id );
        }
    }
}

/* ── Demo news articles ──────────────────────────────────────────── */

function halo_seed_demo_news(): void {
    $articles = [
        [
            'title'     => 'The 2026 fleet electrification gap — and how to close it',
            'slug'      => '2026-fleet-electrification-gap',
            'category'  => 'Whitepaper',
            'read_time' => 8,
            'excerpt'   => 'Fleet managers face a window of two to three years before ZEV mandate targets become binding. This paper maps the gap and the infrastructure options available today.',
            'content'   => '<h2>The scale of the problem</h2><p>Britain\'s commercial fleet sector operates roughly 4.5 million vehicles. The Zero Emission Vehicle mandate requires 80% of new car sales and 70% of new van sales to be electric by 2030. For most fleet operators, that means replacing the majority of their vehicle base within six years — and the charging infrastructure question is the one most organisations are currently unable to answer.</p><p>The charging gap is structural, not technical. The technology to charge a hundred commercial vehicles overnight already exists. The problem is that most fleet depots were designed around the assumption that energy is delivered and stored in fuel. Closing the gap requires a different infrastructure model, not just more charge points.</p><h2>Why the grid won\'t save you</h2><p>The standard response to fleet electrification is to apply for an increased electricity supply, install a bank of charge points and connect them to upgraded mains. This works — eventually. DNO connections for large commercial users typically take eighteen months to three years. For fleet operators under ZEV mandate pressure in 2026, that wait is not an option.</p><h2>The self-generation alternative</h2><p>A solar canopy over an existing car park generates 19 to 22 kWp per unit. Combined with a battery storage system sized to the overnight charging load, a single HALO FastHub can handle the full charging demand for twelve vehicles without drawing from the grid during charging cycles — and it installs behind the existing meter. No DNO notification. No grid reinforcement. One operational day from delivery to live charging.</p><h2>The numbers that matter to procurement</h2><p>The business case rests on five figures every procurement team needs to compare:</p><ul><li><strong>Lease cost per month</strong> — hardware, software, maintenance and monitoring included.</li><li><strong>Revenue per bay per month</strong> — from staff, visitors or public users.</li><li><strong>Building offset per month</strong> — value of solar generation redirected to the building when not charging.</li><li><strong>Grid cost avoidance per month</strong> — saving from not drawing peak-rate grid power during charging windows.</li><li><strong>Carbon credit value</strong> — increasingly relevant as corporate reporting obligations tighten.</li></ul><p>For most fleet sites with more than fifty vehicles, the net monthly cost of a HALO FastHub is below the monthly fuel saving on the first twelve EVs converted.</p><h2>Closing the gap</h2><p>The two-to-three year window before ZEV mandate targets become binding is the lead time required to survey, specify, plan and install the infrastructure needed before the first wave of replacement vehicles arrives. Fleet operators who act in 2026 will have operational hubs by 2027. Those who wait will be competing for installation capacity in a market that cannot absorb the demand. A site survey takes less than a day and carries no obligation.</p>',
        ],
        [
            'title'     => 'Inside HALO smart-grid balancing',
            'slug'      => 'inside-halo-smart-grid-balancing',
            'category'  => 'Article',
            'read_time' => 5,
            'excerpt'   => 'How HALO OS arbitrates second-by-second between solar generation, battery state-of-charge and mains draw — and why that arbitration matters to your energy bill.',
            'content'   => '<h2>The energy arbitration problem</h2><p>A HALO FastHub generates power from three sources at once: a 19.32 kWp solar canopy, a battery storage system, and a mains connection. At any given second, each source may be available at a different cost and in a different quantity. The job of HALO OS is to decide, second by second, which source charges which vehicle — and when surplus energy goes to the building instead.</p><p>That decision engine is the commercially important part of the system. A hub that defaults to grid power when solar is available wastes money. A hub that draws from peak-rate mains when battery has capacity is more expensive than it needs to be. Getting the arbitration right is the difference between a hub that pays for itself and one that doesn\'t.</p><h2>The dispatch hierarchy</h2><p>HALO OS operates a four-level dispatch hierarchy:</p><ol><li><strong>Solar-first</strong> — available solar generation is dispatched directly to active charge sessions before any other source.</li><li><strong>Battery second</strong> — if solar output is insufficient, battery state-of-charge is assessed and discharge authorised down to the configured reserve level.</li><li><strong>Mains last</strong> — grid power is drawn only when solar and battery cannot meet demand, and only within the tariff windows set by the operator.</li><li><strong>Building offset</strong> — at any point where charge sessions are inactive or at low demand, surplus solar is redirected to the building load.</li></ol><h2>Tariff-aware dispatch</h2><p>Most commercial operators are on time-of-use tariffs. HALO OS respects client-defined tariff windows when deciding whether to draw from the grid. During peak hours, the system preferentially runs down battery reserve rather than paying peak rates. Overnight, if the battery is not full, it charges from cheap-rate grid power ready for the following day.</p><h2>What this means for your energy bill</h2><p>In a typical HALO FastHub deployment, solar and battery together account for 60–70% of the total energy dispensed to vehicles. The remaining 30–40% is drawn from mains at off-peak rates. HALO OS reports the split monthly, to the kilowatt-hour. Every client knows exactly how much energy came from the roof and how much came from the grid.</p>',
        ],
        [
            'title'     => 'HALO FastHub deployed at Merseyside Police',
            'slug'      => 'merseyside-police-deployment',
            'category'  => 'Press',
            'read_time' => 2,
            'excerpt'   => '3ti Energy Hubs has completed installation of a HALO FastHub at Merseyside Police\'s main vehicle depot, providing 24/7 charging for the force\'s growing electric fleet.',
            'content'   => '<p><strong>Guildford, June 2026</strong> — 3ti Energy Hubs has completed the installation of a HALO FastHub at Merseyside Police\'s primary vehicle maintenance and fleet depot, providing twelve simultaneous charge points for the force\'s electric vehicle fleet.</p><p>The installation — comprising a 19.32 kWp solar canopy, integrated battery storage and twelve Type 2 AC charge points — was delivered and commissioned in a single operational day, with no disruption to the force\'s 24/7 vehicle operations.</p><p>Keith Dickinson, Director of Resources at Merseyside Police, said: "FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy. The installation team were on site for one day and the hub has been running flawlessly since energisation."</p><p>The HALO FastHub\'s zero-grid-upgrade requirement made it particularly well suited to the depot, where an additional DNO supply application would have introduced significant delay.</p><p>Emma Crawford, Managing Director at 3ti Energy Hubs, said: "Merseyside Police represents exactly the kind of operational profile HALO FastHub was designed for — mixed fleet, 24/7 rotation, and an estate that can\'t absorb months of infrastructure disruption."</p>',
        ],
        [
            'title'     => 'What does a ZEV mandate actually mean for fleet operators?',
            'slug'      => 'zev-mandate-fleet-operators',
            'category'  => 'Article',
            'read_time' => 6,
            'excerpt'   => 'The Zero Emission Vehicle mandate requires 80% of new car sales to be electric by 2030. For fleet operators with large depots, the infrastructure question is the one that matters most.',
            'content'   => '<h2>What the mandate says</h2><p>The UK\'s Zero Emission Vehicle mandate requires vehicle manufacturers to ensure an increasing percentage of their new car and van sales are zero-emission each year. By 2030, 80% of new cars and 70% of new vans sold in the UK must be electric. The mandate falls on manufacturers, not fleet operators. So why does it matter so much to fleets?</p><h2>The supply constraint</h2><p>To meet their targets, manufacturers will increasingly prioritise EV production over ICE. By 2027–2028, the range of affordable ICE vehicles available to fleet buyers will begin to shrink — not because the government has banned them, but because manufacturers are redirecting capacity. Fleets that have not begun their EV transition will find vehicle availability, lead times and residuals moving against them.</p><h2>The duty-of-care implication</h2><p>Fleet operators have a legal duty to provide reasonable infrastructure for employees who drive for work. As EVs become the standard company vehicle, the question of where and how drivers charge — particularly overnight and at the workplace — becomes a duty-of-care question. HMRC guidance on employer-provided charging is already in place; the question of on-site infrastructure is moving up the corporate governance agenda fast.</p><h2>The window of opportunity</h2><p>Fleet operators who install charging infrastructure in 2026 benefit from full capital allowances on infrastructure, OZEV Workplace Charging Scheme grants where applicable, and availability of installers before demand peaks. The time to plan is now.</p><h2>The practical starting point</h2><p>For most fleet operators, the right starting point is a depot audit: how many vehicles, what dwell pattern, what does the existing grid supply support? That audit takes half a day and costs nothing. HALO FastHub\'s one-day install time means even fleets who move late in the window can have infrastructure in place before the crunch.</p>',
        ],
        [
            'title'     => 'Solar canopy vs roof solar: why the car park wins',
            'slug'      => 'solar-canopy-vs-roof-solar',
            'category'  => 'Article',
            'read_time' => 4,
            'excerpt'   => 'Roof space is finite, planning-constrained and often already allocated. Car park canopy solar is uncontested ground — and it comes with twelve charge points built in.',
            'content'   => '<h2>The case for roof solar is well understood</h2><p>Most organisations considering renewable generation start with the roof. It is uncontested space, typically south-facing, and the economics of commercial-scale solar have been attractive for a decade. If your building has a good-sized roof and no planning constraints, roof solar is usually the right first step.</p><p>But many fleet operators have already installed roof solar, or cannot install it — because the roof is north-facing, structurally unsuitable, or already allocated to plant. In these cases, the car park is the obvious next candidate.</p><h2>Why the car park is often better</h2><p>A commercial car park canopy has three advantages roof solar cannot match:</p><ul><li><strong>Uncontested space</strong> — car parks are typically unused airspace. Unlike a roof, there is rarely a competing use.</li><li><strong>Permitted development</strong> — most car park canopy installations sit within permitted development rights, particularly for fleet depots and commercial sites.</li><li><strong>The charge points are already there</strong> — a HALO FastHub is not solar with charge points added. It is a co-designed energy and charging system. The canopy optimises its tilt for both generation and shading, the battery sits in the structural base, and the charge points use the generation directly.</li></ul><h2>The right question</h2><p>The question is not "roof or car park?" — both can be right. The question is: "what does our car park do between 8am and 6pm that is more valuable than generating 19 kWp of clean electricity and charging twelve vehicles?" For most fleet operators and commercial property owners, the answer is nothing.</p>',
        ],
        [
            'title'     => 'HALO FastHub wins Smart Energy Innovation Award 2026',
            'slug'      => 'smart-energy-innovation-award-2026',
            'category'  => 'Press',
            'read_time' => 2,
            'excerpt'   => '3ti Energy Hubs has been recognised at the Smart Energy Innovation Awards for its HALO FastHub platform, which combines solar generation, battery storage and EV charging in a single deployed unit.',
            'content'   => '<p><strong>Guildford, April 2026</strong> — 3ti Energy Hubs has been recognised at the annual Smart Energy Innovation Awards, taking the Innovation in Commercial EV Infrastructure category for its HALO FastHub platform.</p><p>The judging panel cited HALO FastHub\'s integration of solar generation, battery storage, and managed EV charging in a single prefabricated unit as a "step change in deployment speed and commercial accessibility".</p><p>Emma Crawford, Managing Director at 3ti Energy Hubs, said: "This recognition reflects the work of the entire team — the engineers who built HALO OS, the installation crews who deliver a working hub in a single day, and the fleet and property clients who trusted us with their first deployment. The award validates the model: zero capital, zero grid upgrade, zero disruption."</p><p>HALO FastHub is currently deployed across fleet depots, corporate workplaces and destination sites throughout the UK. The company expects to reach 100 operational hubs by the end of 2026.</p>',
        ],
        [
            'title'     => 'Five questions to ask before committing to an EV charging contract',
            'slug'      => 'five-questions-ev-charging-contract',
            'category'  => 'Whitepaper',
            'read_time' => 7,
            'excerpt'   => 'Not all EV charging contracts are equal. Before you sign, here are the five questions every site owner and fleet manager should be asking their prospective supplier.',
            'content'   => '<h2>Introduction</h2><p>The EV charging market has grown fast. Three years ago, there were a handful of credible commercial charging suppliers in the UK. Today there are dozens — and the differences between their offerings are significant, poorly disclosed, and often impossible to spot from a standard tender document. Before you commit to a long-term contract, there are five questions you should ask every supplier.</p><h2>1. Who owns the hardware throughout the contract?</h2><p>There are two models: sold hardware and leased hardware. In a sold model, you buy the charge points and maintain them yourself after the warranty period. In a leased model, the hardware belongs to the supplier throughout the term, and maintenance and replacement are included. Charge points have a meaningful failure rate. If you own them and a unit fails outside warranty, the replacement cost is yours.</p><h2>2. What happens to my data?</h2><p>Every charge session generates data: start time, end time, energy dispensed, vehicle ID, payment transaction and location. Some suppliers treat this data as theirs. Before you sign, confirm that your session data is yours, exportable in a standard format, and accessible even if you choose not to renew.</p><h2>3. What is the grid upgrade liability?</h2><p>Many charge point installations require an increased electricity supply from your DNO. DNO connections take twelve to thirty-six months and cost tens of thousands of pounds. Ask your supplier: does this installation exceed my current supply headroom? If so, who pays the reinforcement charge?</p><h2>4. How is energy management handled?</h2><p>Basic charge points are passive — they draw power whenever a vehicle is plugged in. Smart systems integrate solar generation, battery storage and smart load balancing into a single managed energy flow. Ask your supplier to describe their energy management architecture. If the answer is "we have an app that lets you schedule sessions", that is passive load management — not the same thing.</p><h2>5. What is the exit position?</h2><p>Ask: what happens to the hardware at end of term? What is the break clause, if any? Can the contract be assigned to a new owner if you sell the property? The best contracts include clear end-of-term options, assignability provisions, and a step-in right if the supplier cannot continue. Suppliers who struggle to answer these questions are the ones worth walking away from.</p>',
        ],
        [
            'title'     => 'Webinar: designing a future-proof fleet depot',
            'slug'      => 'webinar-future-proof-fleet-depot',
            'category'  => 'Webinar',
            'read_time' => 45,
            'excerpt'   => 'Join our Head of Fleet Solutions for a live walkthrough of how to spec a HALO FastHub installation for a mixed-fleet depot — covering load management, grid capacity and phased rollout planning.',
            'content'   => '<h2>About this session</h2><p>In this session, Priya Nair — Head of Fleet Solutions at 3ti Energy Hubs — walks through the full process of specifying, sizing and phasing a HALO FastHub installation for a mixed-fleet depot. This is a technical walkthrough, not a sales presentation: we cover load profiles, grid capacity, battery sizing, phased rollout planning and the questions every procurement team should be asking.</p><h2>What we cover</h2><ul><li>How to audit your fleet\'s overnight charging load — vehicle count, departure windows, average daily mileage and kWh requirement per vehicle.</li><li>Sizing the hub to your operational profile — solar array, battery storage and charge point count.</li><li>Grid capacity assessment — understanding your existing supply headroom and whether HALO FastHub fits within it.</li><li>Phased rollout planning — starting with one hub and scaling to multiple without stranded infrastructure investment.</li><li>HALO OS configuration — tariff window setting, load balancing parameters and monitoring dashboard walkthrough.</li><li>Live Q&amp;A with the fleet solutions team.</li></ul><h2>Who should watch</h2><p>This session is designed for fleet managers responsible for depot electrification planning, facilities and estates managers at organisations with fleet depots, procurement leads evaluating EV charging infrastructure, and finance directors assessing the lease vs capex decision.</p><h2>Register your place</h2><p>The next session runs on the third Thursday of each month. Use the enquiry form below — indicate "webinar" in the message field and we will send you a calendar invitation and joining link.</p>',
        ],
    ];

    $cat_map = [];
    foreach ( [ 'Whitepaper', 'Article', 'Press', 'Webinar' ] as $cat ) {
        $t = get_term_by( 'name', $cat, 'news_category' );
        if ( $t && ! is_wp_error( $t ) ) $cat_map[ $cat ] = $t;
    }

    foreach ( $articles as $a ) {
        $existing = get_page_by_path( $a['slug'], OBJECT, 'iol_news' );
        if ( $existing ) {
            $id = (int) $existing->ID;
        } else {
            $id = wp_insert_post( [
                'post_type'    => 'iol_news',
                'post_status'  => 'publish',
                'post_title'   => $a['title'],
                'post_name'    => $a['slug'],
                'post_excerpt' => $a['excerpt'],
            ] );
            if ( is_wp_error( $id ) ) continue;
            $term = $cat_map[ $a['category'] ] ?? false;
            if ( $term ) wp_set_object_terms( $id, $term->term_id, 'news_category' );
        }

        update_field( 'news_excerpt',   $a['excerpt'],              $id );
        update_field( 'news_read_time', $a['read_time'] ?? 4,       $id );

        if ( ! get_field( 'page_sections', $id ) ) {
            update_field( 'page_sections', [
                [
                    'acf_fc_layout' => 'article_body',
                    'content'       => $a['content'],
                ],
            ], $id );
        }
    }
}

/* ── Team members ────────────────────────────────────────────────── */

function halo_seed_team_members(): void {
    $members = [
        [
            'title' => 'Emma Crawford',
            'slug'  => 'emma-crawford',
            'role'  => 'Managing Director',
            'bio'   => 'Emma leads 3ti Energy Hubs with a background in infrastructure finance and clean energy deployment. She has overseen the rollout of HALO FastHub across fleet, workplace and destination clients since 2021.',
        ],
        [
            'title' => 'James Hartley',
            'slug'  => 'james-hartley',
            'role'  => 'Technical Director',
            'bio'   => 'James oversees the engineering and integration of every HALO FastHub deployment. He holds a masters in power electronics and has designed grid-connected solar+storage systems since 2014.',
        ],
        [
            'title' => 'Sarah Okafor',
            'slug'  => 'sarah-okafor',
            'role'  => 'Head of Customer Success',
            'bio'   => 'Sarah manages client relationships from site assessment through to live operation. Her team runs the HALO OS monitoring platform and handles ongoing hub performance reporting.',
        ],
        [
            'title' => 'Tom Bridges',
            'slug'  => 'tom-bridges',
            'role'  => 'Commercial Director',
            'bio'   => 'Tom structures the lease and partnership agreements that make HALO FastHub accessible with zero capital outlay. He previously led infrastructure sales at a leading EV network operator.',
        ],
        [
            'title' => 'Priya Nair',
            'slug'  => 'priya-nair',
            'role'  => 'Head of Fleet Solutions',
            'bio'   => 'Priya specialises in fleet depot design and ZEV mandate planning. She works directly with fleet managers to model utilisation, load profiles and phased rollout strategies.',
        ],
        [
            'title' => 'Dan Fielding',
            'slug'  => 'dan-fielding',
            'role'  => 'Installation Manager',
            'bio'   => 'Dan coordinates all on-site delivery — from crane lift scheduling to DNO liaison. His record stands at six operational HALO FastHubs in a single working week.',
        ],
    ];

    foreach ( $members as $m ) {
        $existing = get_page_by_path( $m['slug'], OBJECT, 'iol_team' );
        if ( $existing ) continue;

        $id = wp_insert_post( [
            'post_type'   => 'iol_team',
            'post_status' => 'publish',
            'post_title'  => $m['title'],
            'post_name'   => $m['slug'],
        ] );
        if ( is_wp_error( $id ) ) continue;

        update_post_meta( $id, 'team_role', $m['role'] );
        update_post_meta( $id, 'team_bio',  $m['bio'] );
    }
}

/* ── Navigation menu ─────────────────────────────────────────────── */

function halo_seed_nav_menu( array $pages ): void {
    $menu_name = 'Primary Navigation';

    $existing = wp_get_nav_menu_object( $menu_name );
    if ( $existing ) {
        wp_delete_nav_menu( $existing->term_id );
    }

    $menu_id = wp_create_nav_menu( $menu_name );
    if ( is_wp_error( $menu_id ) ) return;

    $items = [
        [ 'title' => 'Product',      'slug' => 'product' ],
        [ 'title' => 'Case Studies', 'slug' => 'case-studies' ],
        [ 'title' => 'About',        'slug' => 'about' ],
        [ 'title' => 'News',         'slug' => 'news' ],
    ];

    foreach ( $items as $item ) {
        $page_id = $pages[ $item['slug'] ] ?? 0;
        if ( ! $page_id ) continue;
        wp_update_nav_menu_item( $menu_id, 0, [
            'menu-item-title'     => $item['title'],
            'menu-item-object'    => 'page',
            'menu-item-object-id' => $page_id,
            'menu-item-type'      => 'post_type',
            'menu-item-status'    => 'publish',
        ] );
    }

    /* Contact as CTA pill */
    $contact_id = $pages['contact'] ?? 0;
    if ( $contact_id ) {
        $item_id = wp_update_nav_menu_item( $menu_id, 0, [
            'menu-item-title'     => 'Make an enquiry',
            'menu-item-object'    => 'page',
            'menu-item-object-id' => $contact_id,
            'menu-item-type'      => 'post_type',
            'menu-item-status'    => 'publish',
        ] );
        if ( $item_id && ! is_wp_error( $item_id ) ) {
            update_post_meta( $item_id, '_menu_item_classes', [ 'menu-item-cta' ] );
        }
    }

    /* Assign to theme location */
    $locations = get_theme_mod( 'nav_menu_locations', [] );
    $locations['primary'] = $menu_id;
    set_theme_mod( 'nav_menu_locations', $locations );
}

/* ── Assets: upload everything from theme/images to media library ──── */

/**
 * Upload every image in the child theme's images/ folder to the WP media
 * library (skipping any that have already been uploaded by filename).
 * Sets the site logo, site icon, and GP title-hide options.
 * Returns [ 'filename.ext' => attachment_id, ... ] for use by the seeder.
 */
function halo_seed_all_assets(): array {
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $theme_dir = get_stylesheet_directory();
    $images_dir = $theme_dir . '/images';
    $ids = [];

    if ( ! is_dir( $images_dir ) ) return $ids;

    $extensions = [ 'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp' ];

    foreach ( new DirectoryIterator( $images_dir ) as $file ) {
        if ( $file->isDot() || ! $file->isFile() ) continue;
        $ext = strtolower( $file->getExtension() );
        if ( ! in_array( $ext, $extensions, true ) ) continue;

        $filename = $file->getFilename();
        $title    = ucwords( str_replace( [ '-', '_', '.' ], ' ', $file->getBasename( '.' . $ext ) ) );

        /* Skip if already uploaded (match by original filename stored in _wp_attached_file) */
        $existing = get_posts( [
            'post_type'      => 'attachment',
            'posts_per_page' => 1,
            'meta_key'       => '_halo_source_file',
            'meta_value'     => $filename,
            'fields'         => 'ids',
        ] );
        if ( $existing ) {
            $ids[ $filename ] = $existing[0];
            continue;
        }

        $id = halo_attach_image( $file->getPathname(), $title );
        if ( $id ) {
            update_post_meta( $id, '_halo_source_file', $filename );
            $ids[ $filename ] = $id;
        }
    }

    /* Set site logo */
    if ( ! get_theme_mod( 'custom_logo' ) && isset( $ids['logo-fasthub-dark.png'] ) ) {
        set_theme_mod( 'custom_logo', $ids['logo-fasthub-dark.png'] );
    }

    /* Set site icon (favicon) */
    if ( ! get_option( 'site_icon' ) && isset( $ids['favicon.png'] ) ) {
        update_option( 'site_icon', $ids['favicon.png'] );
    }

    /* GP: hide text title/tagline when logo image is present */
    set_theme_mod( 'generate_settings', array_merge(
        (array) get_theme_mod( 'generate_settings', [] ),
        [ 'hide_title' => true, 'hide_tagline' => true ]
    ) );

    return $ids;
}

/* Keep old name as alias so existing callers don't break */
function halo_seed_logo_and_favicon(): void {
    halo_seed_all_assets();
}

function halo_attach_image( string $path, string $title ): int|false {
    $upload_dir = wp_upload_dir();
    $filename   = basename( $path );
    $dest       = $upload_dir['path'] . '/' . wp_unique_filename( $upload_dir['path'], $filename );

    if ( ! copy( $path, $dest ) ) return false;

    $attachment = [
        'post_title'     => $title,
        'post_mime_type' => mime_content_type( $dest ),
        'post_status'    => 'inherit',
    ];
    $id = wp_insert_attachment( $attachment, $dest );
    if ( is_wp_error( $id ) ) return false;

    $metadata = wp_generate_attachment_metadata( $id, $dest );
    wp_update_attachment_metadata( $id, $metadata );

    return $id;
}
