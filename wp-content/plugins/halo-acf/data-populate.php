<?php
/**
 * HALO ACF — one-shot data population.
 * Trigger: /wp-admin/?halo_populate=1 (logged in as admin)
 */
if ( ! defined( 'ABSPATH' ) ) exit;

function halo_populate_all(): void {
    halo_seed_taxonomy_terms();
    $pages = halo_create_pages();
    halo_seed_home(           $pages['home'] );
    halo_seed_product(        $pages['product'] );
    halo_seed_technical(      $pages['technical-deep-dive'] );
    halo_seed_case_studies(   $pages['case-studies'] );
    halo_seed_about(          $pages['about'] );
    halo_seed_news(           $pages['news'] );
    halo_seed_contact(        $pages['contact'] );
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
            'tone'          => 'dark',
        ],
        [
            'acf_fc_layout' => 'logo_strip',
            'headline'      => 'Trusted across fleets · workplaces · destinations',
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
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── PRODUCT ─────────────────────────────────────────────────────── */

function halo_seed_product( int $id ): void {
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
            'tone'          => 'dark',
        ],
        [
            'acf_fc_layout' => 'spec_table',
            'eyebrow'       => 'Specifications',
            'heading'       => 'Everything in one leased unit.',
            'use_defaults'  => 1,
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
            'tone'          => 'dark',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Fifty-plus parking spaces? Let\'s size your hub.',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'btn2_label'    => 'Technical deep dive',
            'btn2_url'      => '/technical-deep-dive',
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── TECHNICAL DEEP DIVE ─────────────────────────────────────────── */

function halo_seed_technical( int $id ): void {
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Product · Technical deep dive',
            'title'         => 'The full specification.',
            'sub'           => 'For engineers and procurement — hardware, performance envelope, software and support, in detail.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'compact'       => 1,
            'tone'          => 'dark',
        ],
        [
            'acf_fc_layout' => 'spec_table',
            'eyebrow'       => 'Full specification',
            'heading'       => 'Hardware, performance and software.',
            'use_defaults'  => 1,
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
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── CASE STUDIES ────────────────────────────────────────────────── */

function halo_seed_case_studies( int $id ): void {
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Case studies',
            'title'         => 'Real hubs, really deployed.',
            'sub'           => 'From a 24/7 police fleet to a destination forecourt — see how the same hub adapts to each job.',
            'cta1_label'    => 'Make an enquiry',
            'cta1_url'      => '/contact',
            'compact'       => 1,
            'tone'          => 'dark',
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
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── ABOUT ───────────────────────────────────────────────────────── */

function halo_seed_about( int $id ): void {
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'About · 3ti Energy Hubs',
            'title'         => 'The people closing the charging gap.',
            'sub'           => 'A B Corp-certified team of energy engineers, fleet specialists and sustainability scientists.',
            'compact'       => 1,
            'tone'          => 'dark',
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
            'tone'          => 'dark',
        ],
        [
            'acf_fc_layout' => 'cta_band',
            'title'         => 'Ready to power your fleet?',
            'sub'           => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
            'btn1_label'    => 'Make an enquiry',
            'btn1_url'      => '/contact',
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── NEWS ────────────────────────────────────────────────────────── */

function halo_seed_news( int $id ): void {
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'News & insights',
            'title'         => 'Thinking on fleet electrification.',
            'sub'           => 'Whitepapers, technical articles, press coverage and recorded sessions — written for the people who ask the hard questions.',
            'compact'       => 1,
            'tone'          => 'dark',
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
            'tone'          => 'dark',
        ],
    ], $id );
}

/* ── CONTACT ─────────────────────────────────────────────────────── */

function halo_seed_contact( int $id ): void {
    update_field( 'page_sections', [
        [
            'acf_fc_layout' => 'page_hero',
            'eyebrow'       => 'Contact',
            'title'         => 'Start a conversation.',
            'sub'           => 'Tell us about your site, or reach us directly — we reply within seven working days.',
            'compact'       => 1,
            'tone'          => 'dark',
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
