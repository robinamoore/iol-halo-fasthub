<?php
/**
 * HALO ACF — section renderers.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/* ── Helpers ─────────────────────────────────────────────────── */

function halo_t( string $s ): string { return esc_html( $s ); }
function halo_title( string $s ): string { return nl2br( esc_html( $s ) ); }
function halo_u( string $s ): string { return esc_url( $s ); }

function halo_btn( string $label, string $url, string $mod = 'primary' ): string {
    if ( $label === '' || $url === '' ) return '';
    return '<a href="' . halo_u( $url ) . '" class="halo-btn halo-btn--' . esc_attr( $mod ) . '">' . halo_t( $label ) . ' <span aria-hidden="true">→</span></a>';
}

function halo_eyebrow( string $text ): string {
    if ( ! $text ) return '';
    return '<span class="halo-eyebrow">' . halo_t( $text ) . '</span>';
}

function halo_img( $img, string $cls, bool $lazy = true ): string {
    if ( ! is_array( $img ) || empty( $img['url'] ) ) {
        return '<div class="' . esc_attr( $cls ) . ' halo-img-placeholder"></div>';
    }
    $loading = $lazy ? ' loading="lazy"' : ' loading="eager"';
    return '<div class="' . esc_attr( $cls ) . '"><img src="' . halo_u( $img['url'] ) . '" alt="' . halo_t( $img['alt'] ?? '' ) . '"' . $loading . '></div>';
}

function halo_tone_class( string $tone ): string {
    $allowed = [ 'light', 'offwhite', 'warm', 'dark' ];
    return 'halo-tone-' . ( in_array( $tone, $allowed, true ) ? $tone : 'light' );
}

function halo_pad_classes( array $r ): string {
    $allowed = [ 'none', 'small', 'medium', 'large' ];
    $t = in_array( $r['padding_top']    ?? '', $allowed, true ) ? $r['padding_top']    : 'small';
    $b = in_array( $r['padding_bottom'] ?? '', $allowed, true ) ? $r['padding_bottom'] : 'large';
    return "halo-pad-t-{$t} halo-pad-b-{$b}";
}

/* ── Main dispatcher ─────────────────────────────────────────── */

function halo_render_sections( int $post_id ): void {
    if ( ! function_exists( 'get_field' ) ) return;
    $rows = get_field( 'page_sections', $post_id );
    if ( ! $rows ) return;

    foreach ( $rows as $row ) {
        switch ( $row['acf_fc_layout'] ) {
            case 'page_hero':            halo_s_hero( $row );            break;
            case 'cta_band':             halo_s_cta_band( $row );        break;
            case 'section_intro':        halo_s_section_intro( $row );   break;
            case 'column_layout':        halo_s_columns( $row );         break;
            case 'stat_grid':            halo_s_stats( $row );           break;
            case 'story_rows':           halo_s_story_rows( $row );      break;
            case 'pull_quote':           halo_s_pull_quote( $row );      break;
            case 'spec_table':           halo_s_spec_table( $row );      break;
            case 'accordion':            halo_s_accordion( $row );       break;
            case 'timeline':             halo_s_timeline( $row );        break;
            case 'logo_strip':           halo_s_logo_strip( $row );      break;
            case 'big_headline':         halo_s_big_headline( $row );    break;
            case 'certifications':       halo_s_certifications( $row );  break;
            case 'case_study_grid':      halo_s_cs_grid( $row );         break;
            case 'news_archive':         halo_s_news_archive( $row );    break;
            case 'related_case_studies': halo_s_related( $row );         break;
            case 'article_body':         halo_s_article_body( $row );    break;
            case 'enquiry_form':         halo_s_enquiry_form( $row );    break;
            case 'location':             halo_s_location( $row );        break;
            case 'roi_calculator':       halo_s_roi( $row );             break;
            case 'card_picker':          halo_s_card_picker( $row );     break;
        }
    }
}

/* ── 01 · Page Hero ──────────────────────────────────────────── */

function halo_s_hero( array $r ): void {
    // Resolve style — new 'style' field takes precedence, legacy 'compact' as fallback
    $style = $r['style'] ?? 'split';

    if ( $style === 'fullbleed' ) {
        halo_s_hero_fullbleed( $r );
    } elseif ( $style === 'compact' ) {
        halo_s_hero_split( $r, true );
    } else {
        halo_s_hero_split( $r, false );
    }
}

/* Split hero — headline left, optional image panel right */
function halo_s_hero_split( array $r, bool $compact ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'dark' );
    ?>
    <section class="halo-hero halo-section <?php echo esc_attr( $tone ); ?><?php echo $compact ? ' halo-hero--compact' : ''; ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner halo-hero__inner">
            <div class="halo-hero__content">
                <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                <h1 class="halo-hero__title"><?php echo halo_title( $r['title'] ?? '' ); ?></h1>
                <?php if ( ! empty( $r['sub'] ) ) : ?><p class="halo-hero__sub"><?php echo halo_t( $r['sub'] ); ?></p><?php endif; ?>
                <div class="halo-hero__ctas">
                    <?php echo halo_btn( $r['cta1_label'] ?? '', $r['cta1_url'] ?? '', 'primary' ); ?>
                    <?php echo halo_btn( $r['cta2_label'] ?? '', $r['cta2_url'] ?? '', 'outline' ); ?>
                </div>
                <?php
                $s1v = $r['stat1_value'] ?? ''; $s2v = $r['stat2_value'] ?? ''; $s3v = $r['stat3_value'] ?? '';
                if ( $s1v !== '' || $s2v !== '' || $s3v !== '' ) : ?>
                <div class="halo-hero__stats">
                    <?php foreach ( [ ['stat1_value','stat1_unit','stat1_label'], ['stat2_value','stat2_unit','stat2_label'], ['stat3_value','stat3_unit','stat3_label'] ] as [$vk,$uk,$lk] ) :
                        if ( ( $r[$vk] ?? '' ) === '' ) continue; ?>
                        <div class="halo-hero__stat">
                            <span class="halo-hero__stat-value"><?php echo halo_t( $r[$vk] ); ?><?php if ( ! empty( $r[$uk] ) ) : ?><span class="halo-hero__stat-unit"><?php echo halo_t( $r[$uk] ); ?></span><?php endif; ?></span>
                            <span class="halo-hero__stat-label"><?php echo halo_t( $r[$lk] ?? '' ); ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
            <?php if ( ! $compact ) : echo halo_img( $r['image'] ?? [], 'halo-hero__image', false ); endif; ?>
        </div>
    </section>
    <?php
}

/* Full-bleed hero — photo background + gradient + headline at bottom + support bar */
function halo_s_hero_fullbleed( array $r ): void {
    $img  = $r['image'] ?? [];
    $img_url = is_array( $img ) ? ( $img['url'] ?? '' ) : '';
    $tone = halo_tone_class( $r['tone'] ?? 'dark' );
    $s1v  = $r['stat1_value'] ?? ''; $s1u = $r['stat1_unit'] ?? ''; $s1l = $r['stat1_label'] ?? '';
    $s2v  = $r['stat2_value'] ?? ''; $s2u = $r['stat2_unit'] ?? ''; $s2l = $r['stat2_label'] ?? '';
    $s3v  = $r['stat3_value'] ?? ''; $s3u = $r['stat3_unit'] ?? ''; $s3l = $r['stat3_label'] ?? '';
    $has_bar = $s1v !== '' || $s2v !== '' || $s3v !== '' || ! empty( $r['sub'] );
    ?>
    <section class="halo-hero-fb <?php echo esc_attr( $tone ); ?>">
        <?php if ( $img_url ) : ?>
        <div class="halo-hero-fb__bg" style="background-image:url('<?php echo esc_url( $img_url ); ?>')"></div>
        <?php endif; ?>
        <div class="halo-hero-fb__overlay"></div>

        <div class="halo-hero-fb__content">
            <div class="halo-inner">
                <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                <h1 class="halo-hero-fb__title"><?php echo halo_title( $r['title'] ?? '' ); ?></h1>
                <div class="halo-hero-fb__ctas">
                    <?php echo halo_btn( $r['cta1_label'] ?? '', $r['cta1_url'] ?? '', 'primary' ); ?>
                    <?php echo halo_btn( $r['cta2_label'] ?? '', $r['cta2_url'] ?? '', 'outline' ); ?>
                </div>
            </div>
        </div>
    </section>

    <?php if ( $has_bar ) : ?>
    <div class="halo-hero-fb__bar <?php echo esc_attr( $tone ); ?>">
        <div class="halo-inner halo-hero-fb__bar-inner">
            <?php if ( ! empty( $r['sub'] ) ) : ?>
            <div class="halo-hero-fb__bar-sub"><?php echo halo_t( $r['sub'] ); ?></div>
            <?php endif; ?>
            <?php foreach ( [ [$s1v,$s1u,$s1l], [$s2v,$s2u,$s2l], [$s3v,$s3u,$s3l] ] as [$v,$u,$l] ) :
                if ( $v === '' ) continue; ?>
            <div class="halo-hero-fb__bar-stat">
                <span class="halo-hero-fb__bar-label"><?php echo halo_t( $l ); ?></span>
                <span class="halo-hero-fb__bar-value"><?php echo halo_t( $v ); ?><?php if ( $u ) : ?><span class="halo-hero-fb__bar-unit"><?php echo halo_t( $u ); ?></span><?php endif; ?></span>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>
    <?php
}

/* ── 02 · CTA Band ───────────────────────────────────────────── */

function halo_s_cta_band( array $r ): void {
    $size = in_array( $r['heading_size'] ?? '', ['large','medium','small'], true ) ? $r['heading_size'] : 'large';
    $tone = halo_tone_class( $r['tone'] ?? 'dark' );
    ?>
    <section class="halo-cta-band halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
            <h2 class="halo-cta-band__title halo-cta-band__title--<?php echo esc_attr( $size ); ?>"><?php echo halo_title( $r['title'] ?? '' ); ?></h2>
            <?php if ( ! empty( $r['sub'] ) ) : ?><p class="halo-cta-band__sub"><?php echo halo_t( $r['sub'] ); ?></p><?php endif; ?>
            <div class="halo-cta-band__ctas">
                <?php echo halo_btn( $r['btn1_label'] ?? '', $r['btn1_url'] ?? '', 'primary' ); ?>
                <?php echo halo_btn( $r['btn2_label'] ?? '', $r['btn2_url'] ?? '', 'outline' ); ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 03 · Section Intro ──────────────────────────────────────── */

function halo_s_section_intro( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'light' );
    $align = ( $r['align'] ?? 'center' ) === 'left' ? ' halo-section-intro--left' : '';
    $size  = in_array( $r['heading_size'] ?? '', ['large','medium','small'], true ) ? $r['heading_size'] : 'medium';
    ?>
    <section class="halo-section-intro halo-section <?php echo esc_attr( $tone . $align ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
            <h2 class="halo-section-intro__heading halo-section-intro__heading--<?php echo esc_attr( $size ); ?>"><?php echo halo_title( $r['heading'] ?? '' ); ?></h2>
            <?php if ( ! empty( $r['sub'] ) ) : ?><p class="halo-section-intro__sub"><?php echo halo_t( $r['sub'] ); ?></p><?php endif; ?>
        </div>
    </section>
    <?php
}

/* ── 04 · Column Layout ──────────────────────────────────────── */

function halo_s_columns( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'light' );
    $cols  = (int) ( $r['cols'] ?? 3 );
    $items = $r['items'] ?? [];
    if ( ! $items ) return;
    ?>
    <section class="halo-columns halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div style="margin-bottom:2.5rem">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <div class="halo-columns__grid" data-cols="<?php echo esc_attr( $cols ); ?>">
                <?php foreach ( $items as $item ) : ?>
                    <div class="halo-col-item">
                        <?php if ( ! empty( $item['image']['url'] ) ) : echo halo_img( $item['image'], 'halo-col-item__image' ); endif; ?>
                        <?php echo halo_eyebrow( $item['eyebrow'] ?? '' ); ?>
                        <h3 class="halo-col-item__title"><?php echo halo_t( $item['title'] ?? '' ); ?></h3>
                        <?php if ( ! empty( $item['body'] ) ) : ?><p class="halo-col-item__body"><?php echo halo_t( $item['body'] ); ?></p><?php endif; ?>
                        <?php echo halo_btn( $item['link_label'] ?? '', $item['link_url'] ?? '', 'outline-dark' ); ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 05 · Stat Grid ──────────────────────────────────────────── */

function halo_s_stats( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'warm' );
    $stats = $r['stats'] ?? [];
    if ( ! $stats ) return;
    $count = count( $stats );
    ?>
    <section class="halo-stats halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div style="margin-bottom:2rem;text-align:center">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <div class="halo-stats__grid" data-count="<?php echo esc_attr( $count ); ?>">
                <?php foreach ( $stats as $stat ) : ?>
                    <div class="halo-stat-item">
                        <span class="halo-stat-value"><?php echo halo_t( $stat['value'] ?? '' ); ?></span>
                        <span class="halo-stat-label"><?php echo halo_t( $stat['label'] ?? '' ); ?></span>
                        <?php if ( ! empty( $stat['note'] ) ) : ?><p class="halo-stat-note"><?php echo halo_t( $stat['note'] ); ?></p><?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 06 · Story Rows ─────────────────────────────────────────── */

function halo_s_story_rows( array $r ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'light' );
    $rows = $r['rows'] ?? [];
    if ( ! $rows ) return;
    ?>
    <section class="halo-story-rows halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div class="halo-story-rows__header">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <?php foreach ( $rows as $row ) : ?>
                <div class="halo-story-row">
                    <div class="halo-story-row__content">
                        <?php if ( ! empty( $row['step'] ) ) : ?><p class="halo-story-row__step"><?php echo halo_t( $row['step'] ); ?></p><?php endif; ?>
                        <h3 class="halo-story-row__title"><?php echo halo_t( $row['title'] ?? '' ); ?></h3>
                        <?php if ( ! empty( $row['body'] ) ) : ?><p class="halo-story-row__body"><?php echo halo_t( $row['body'] ); ?></p><?php endif; ?>
                    </div>
                    <?php echo halo_img( $row['image'] ?? [], 'halo-story-row__image' ); ?>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
}

/* ── 07 · Pull Quote ─────────────────────────────────────────── */

function halo_s_pull_quote( array $r ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'offwhite' );
    ?>
    <section class="halo-pull-quote halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-pull-quote__rule" aria-hidden="true"></div>
            <p class="halo-pull-quote__text"><?php echo halo_t( $r['quote'] ?? '' ); ?></p>
            <?php if ( ! empty( $r['attribution'] ) ) : ?>
                <p class="halo-pull-quote__attribution"><?php echo halo_t( $r['attribution'] ); ?></p>
            <?php endif; ?>
        </div>
    </section>
    <?php
}

/* ── 08 · Spec Table ─────────────────────────────────────────── */

function halo_s_spec_table( array $r ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'offwhite' );

    $default_rows = [
        [ 'AC Power Output',         '7.4kW / 22kW',              'Per charge point' ],
        [ 'DC Power Output',         'Up to 150kW',               'Shared power model' ],
        [ 'Charge connectors',       'Type 2 AC + CCS DC',        'All vehicles covered' ],
        [ 'Simultaneous charging',   'Up to 12 vehicles',         'Hub dependent' ],
        [ 'Network connectivity',    '4G / LAN',                  'Real-time monitoring' ],
        [ 'Payment',                 'RFID + contactless',        'Open access option available' ],
        [ 'IP rating',               'IP54',                      'Outdoor rated' ],
        [ 'Operating temperature',   '-25°C to +50°C',            '' ],
        [ 'Cable management',        'Retractable tethered',      'Or untethered option' ],
        [ 'Energy management',       'Smart load balancing',      'OCPP 1.6 / 2.0.1' ],
        [ 'Warranty',                '3 years standard',          '5 year extended available' ],
        [ 'Installation footprint',  'From 1.2m × 0.6m per unit','Hub layout dependent' ],
    ];

    $use_defaults = ! isset( $r['use_defaults'] ) || ! empty( $r['use_defaults'] );
    if ( $use_defaults ) {
        $rows = $default_rows;
    } else {
        $rows = array_map( fn($row) => [ $row['spec'] ?? '', $row['value'] ?? '', $row['note'] ?? '' ], $r['custom_rows'] ?? [] );
    }
    if ( ! $rows ) return;
    ?>
    <section class="halo-spec-table halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div class="halo-spec-table__intro">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.5rem,2.5vw,2.25rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <div class="halo-spec-table__grid">
                <div class="halo-spec-row halo-spec-row--header">
                    <div>Specification</div><div>Value</div><div>Notes</div>
                </div>
                <?php foreach ( $rows as $row ) : ?>
                    <div class="halo-spec-row">
                        <div><?php echo halo_t( $row[0] ); ?></div>
                        <div><?php echo halo_t( $row[1] ); ?></div>
                        <div><?php echo halo_t( $row[2] ); ?></div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 09 · Accordion ──────────────────────────────────────────── */

function halo_s_accordion( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'light' );
    $items = $r['items'] ?? [];
    if ( ! $items ) return;
    ?>
    <section class="halo-accordion halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div class="halo-accordion__intro">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.5rem,2.5vw,2.25rem);margin-bottom:1.5rem"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <?php foreach ( $items as $i => $item ) : ?>
                <details class="halo-accordion__item"<?php echo $i === 0 ? ' open' : ''; ?>>
                    <summary><?php echo halo_t( $item['question'] ?? '' ); ?></summary>
                    <p class="halo-accordion__body"><?php echo halo_t( $item['answer'] ?? '' ); ?></p>
                </details>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
}

/* ── 10 · Timeline ───────────────────────────────────────────── */

function halo_s_timeline( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'light' );
    $steps = $r['steps'] ?? [];
    if ( ! $steps ) return;
    ?>
    <section class="halo-timeline halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-timeline__intro">
                <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                <h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ?? '' ); ?></h2>
            </div>
            <div class="halo-timeline__steps" style="--step-count:<?php echo count( $steps ); ?>">
                <?php foreach ( $steps as $step ) : ?>
                    <div class="halo-timeline__step">
                        <div class="halo-timeline__marker"><?php echo halo_t( $step['marker'] ?? '' ); ?></div>
                        <div>
                            <h3 class="halo-timeline__step-title"><?php echo halo_t( $step['title'] ?? '' ); ?></h3>
                            <?php if ( ! empty( $step['body'] ) ) : ?><p class="halo-timeline__step-body"><?php echo halo_t( $step['body'] ); ?></p><?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 11 · Logo Strip ─────────────────────────────────────────── */

function halo_s_logo_strip( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'offwhite' );
    $logos = $r['logos'] ?? [];
    if ( ! $logos ) return;
    ?>
    <section class="halo-logo-strip halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['headline'] ) ) : ?><p class="halo-logo-strip__headline"><?php echo halo_t( $r['headline'] ); ?></p><?php endif; ?>
            <div class="halo-logo-strip__logos">
                <?php foreach ( $logos as $logo ) :
                    $img = $logo['image'] ?? [];
                    if ( empty( $img['url'] ) ) continue;
                ?>
                    <div class="halo-logo-strip__logo">
                        <img src="<?php echo halo_u( $img['url'] ); ?>" alt="<?php echo halo_t( $logo['alt'] ?? ( $img['alt'] ?? '' ) ); ?>" loading="lazy">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 12 · Big Headline ───────────────────────────────────────── */

function halo_s_big_headline( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'light' );
    $items = $r['items'] ?? [];
    if ( ! $items ) return;
    ?>
    <section class="halo-big-headline halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) ) : ?>
                <div class="halo-big-headline__eyebrow"><?php echo halo_eyebrow( $r['eyebrow'] ); ?></div>
            <?php endif; ?>
            <div class="halo-big-headline__items">
                <?php foreach ( $items as $item ) : ?>
                    <a href="<?php echo halo_u( $item['url'] ?? '' ); ?>" class="halo-big-headline__item">
                        <div>
                            <div class="halo-big-headline__item-text"><?php echo halo_t( $item['headline'] ?? '' ); ?></div>
                            <?php if ( ! empty( $item['sub'] ) ) : ?><div class="halo-big-headline__item-sub"><?php echo halo_t( $item['sub'] ); ?></div><?php endif; ?>
                        </div>
                        <span class="halo-big-headline__arrow" aria-hidden="true">→</span>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 13 · Certifications ─────────────────────────────────────── */

function halo_s_certifications( array $r ): void {
    $tone  = halo_tone_class( $r['tone'] ?? 'offwhite' );
    $certs = $r['certs'] ?? [];
    if ( ! $certs ) return;
    ?>
    <section class="halo-certs halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-certs__intro"><?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?></div>
            <div class="halo-certs__grid">
                <?php foreach ( $certs as $cert ) : ?>
                    <div class="halo-cert-item">
                        <?php if ( ! empty( $cert['logo']['url'] ) ) : ?>
                            <div class="halo-cert-item__logo"><img src="<?php echo halo_u( $cert['logo']['url'] ); ?>" alt="<?php echo halo_t( $cert['title'] ?? '' ); ?>" loading="lazy"></div>
                        <?php endif; ?>
                        <p class="halo-cert-item__title"><?php echo halo_t( $cert['title'] ?? '' ); ?></p>
                        <?php if ( ! empty( $cert['note'] ) ) : ?><p class="halo-cert-item__note"><?php echo halo_t( $cert['note'] ); ?></p><?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php $footnotes = $r['footnotes'] ?? []; if ( $footnotes ) : ?>
                <div class="halo-certs__notes">
                    <?php foreach ( $footnotes as $fn ) : ?><p><?php echo halo_t( $fn['text'] ?? '' ); ?></p><?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
}

/* ── 14 · Case Study Grid ────────────────────────────────────── */

function halo_s_cs_grid( array $r ): void {
    $tone         = halo_tone_class( $r['tone'] ?? 'light' );
    $show_filters = ! empty( $r['show_filters'] );
    $limit        = (int) ( $r['limit'] ?? 6 );

    $query   = new WP_Query( [ 'post_type'=>'iol_case_study', 'posts_per_page'=>$limit, 'post_status'=>'publish' ] );
    $sectors = $show_filters ? get_terms( [ 'taxonomy'=>'cs_sector', 'hide_empty'=>true ] ) : [];
    ?>
    <section class="halo-cs-grid halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div style="margin-bottom:2rem">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <?php if ( $sectors && ! is_wp_error( $sectors ) ) : ?>
                <div class="halo-cs-grid__filters">
                    <button class="halo-filter-pill active" data-term="">All</button>
                    <?php foreach ( $sectors as $term ) : ?>
                        <button class="halo-filter-pill" data-term="<?php echo esc_attr( $term->slug ); ?>"><?php echo halo_t( $term->name ); ?></button>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="halo-cs-grid__grid">
                <?php while ( $query->have_posts() ) : $query->the_post();
                    $id           = get_the_ID();
                    $sector_terms = get_the_terms( $id, 'cs_sector' );
                    $sector_name  = $sector_terms && ! is_wp_error( $sector_terms ) ? $sector_terms[0]->name : '';
                    $sector_slug  = $sector_terms && ! is_wp_error( $sector_terms ) ? $sector_terms[0]->slug : '';
                    $client       = get_post_meta( $id, 'cs_client', true ) ?: get_the_title();
                    $stat_val     = get_post_meta( $id, 'cs_stat1_value', true );
                    $stat_lbl     = get_post_meta( $id, 'cs_stat1_label', true );
                ?>
                    <a href="<?php the_permalink(); ?>" class="halo-cs-card" data-term="<?php echo esc_attr( $sector_slug ); ?>">
                        <div class="halo-cs-card__image">
                            <?php the_post_thumbnail( 'medium_large', ['loading'=>'lazy'] ); ?>
                        </div>
                        <div class="halo-cs-card__body">
                            <div class="halo-cs-card__header">
                                <?php if ( $sector_name ) : ?><span class="halo-cs-card__sector"><?php echo halo_t( $sector_name ); ?></span><?php endif; ?>
                                <span class="halo-cs-card__arrow">→</span>
                            </div>
                            <h3 class="halo-cs-card__title"><?php echo halo_t( $client ); ?></h3>
                            <?php if ( $stat_val ) : ?>
                                <div class="halo-cs-card__stat">
                                    <span class="halo-cs-card__stat-value"><?php echo halo_t( $stat_val ); ?></span>
                                    <?php if ( $stat_lbl ) : ?><span class="halo-cs-card__stat-label"><?php echo halo_t( $stat_lbl ); ?></span><?php endif; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </a>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 15 · News Archive ───────────────────────────────────────── */

function halo_s_news_archive( array $r ): void {
    $tone         = halo_tone_class( $r['tone'] ?? 'light' );
    $show_filters = ! empty( $r['show_filters'] );
    $limit        = (int) ( $r['limit'] ?? 9 );

    $query = new WP_Query( [ 'post_type'=>'iol_news', 'posts_per_page'=>$limit, 'post_status'=>'publish' ] );
    $cats  = $show_filters ? get_terms( [ 'taxonomy'=>'news_category', 'hide_empty'=>true ] ) : [];
    ?>
    <section class="halo-news-archive halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( $cats && ! is_wp_error( $cats ) ) : ?>
                <div class="halo-news-archive__filters">
                    <button class="halo-filter-pill active" data-term="">All</button>
                    <?php foreach ( $cats as $term ) : ?>
                        <button class="halo-filter-pill" data-term="<?php echo esc_attr( $term->slug ); ?>"><?php echo halo_t( $term->name ); ?></button>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="halo-news-grid">
                <?php while ( $query->have_posts() ) : $query->the_post();
                    $cat  = get_the_terms( get_the_ID(), 'news_category' );
                    $cn   = $cat && ! is_wp_error( $cat ) ? $cat[0]->name : '';
                    $cs   = $cat && ! is_wp_error( $cat ) ? $cat[0]->slug : '';
                ?>
                    <a href="<?php the_permalink(); ?>" class="halo-news-card" data-term="<?php echo esc_attr( $cs ); ?>">
                        <div class="halo-news-card__image">
                            <?php the_post_thumbnail( 'medium_large', ['loading'=>'lazy'] ); ?>
                            <?php if ( $cn ) : ?><span class="halo-news-card__badge"><?php echo halo_t( $cn ); ?></span><?php endif; ?>
                        </div>
                        <div class="halo-news-card__body">
                            <h3 class="halo-news-card__title"><?php the_title(); ?></h3>
                            <div class="halo-news-card__meta">
                                <span><?php echo get_the_date( 'M Y' );
                                    $rt = get_post_meta( get_the_ID(), 'news_read_time', true );
                                    if ( $rt ) echo ' · ' . esc_html( $rt ) . ' min read';
                                ?></span>
                                <span class="halo-news-card__arrow">→</span>
                            </div>
                        </div>
                    </a>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 16 · Related Case Studies ───────────────────────────────── */

function halo_s_related( array $r ): void {
    $items = $r['items'] ?? [];
    if ( ! $items ) {
        $q     = new WP_Query( [ 'post_type'=>'iol_case_study', 'posts_per_page'=>3, 'post_status'=>'publish' ] );
        $items = $q->posts;
        wp_reset_postdata();
    }
    if ( ! $items ) return;
    ?>
    <section class="halo-related halo-section halo-tone-offwhite <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-related__intro">
                <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
            </div>
            <div class="halo-related__grid">
                <?php foreach ( $items as $item ) :
                    $pid    = is_object( $item ) ? $item->ID : $item;
                    $sector = get_the_terms( $pid, 'cs_sector' );
                    $sname  = $sector && ! is_wp_error( $sector ) ? $sector[0]->name : '';
                ?>
                    <a href="<?php echo halo_u( get_permalink( $pid ) ); ?>" class="halo-cs-card">
                        <?php if ( has_post_thumbnail( $pid ) ) : echo '<div class="halo-cs-card__image">' . get_the_post_thumbnail( $pid, 'medium_large', ['loading'=>'lazy'] ) . '</div>'; endif; ?>
                        <?php if ( $sname ) : ?><p class="halo-cs-card__sector"><?php echo halo_t( $sname ); ?></p><?php endif; ?>
                        <h3 class="halo-cs-card__title"><?php echo halo_t( get_the_title( $pid ) ); ?></h3>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── 17 · Article Body ───────────────────────────────────────── */

function halo_s_article_body( array $r ): void {
    $content = $r['content'] ?? '';
    if ( ! $content ) return;
    ?>
    <section class="halo-article-body halo-section halo-tone-light <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-article-body__inner">
                <div class="halo-article-body__content">
                    <?php echo wp_kses_post( apply_filters( 'the_content', $content ) ); ?>
                </div>
            </div>
        </div>
    </section>
    <?php
}

/* ── 18 · Enquiry Form ───────────────────────────────────────── */

function halo_s_enquiry_form( array $r ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'offwhite' );
    ?>
    <section class="halo-enquiry-form halo-section <?php echo esc_attr( $tone ); ?>" id="enquiry <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-enquiry-form__inner">
                <div class="halo-enquiry-form__intro">
                    <h2><?php echo halo_t( $r['heading'] ?? 'Tell us about your site.' ); ?></h2>
                    <?php if ( ! empty( $r['sub'] ) ) : ?><p class="halo-enquiry-form__sub"><?php echo halo_t( $r['sub'] ); ?></p><?php endif; ?>
                </div>
                <div class="halo-enquiry-form__cf7">
                    <?php
                    $cf7 = function_exists( 'wpcf7_contact_form_by_title' )
                        ? wpcf7_contact_form_by_title( 'HALO Enquiry' )
                        : null;
                    if ( $cf7 ) {
                        echo do_shortcode( $cf7->shortcode() );
                    } elseif ( function_exists( 'do_shortcode' ) ) {
                        echo do_shortcode( '[contact-form-7 id="42" title="HALO Enquiry"]' );
                    }
                    ?>
                </div>
            </div>
        </div>
    </section>
    <?php
}

/* ── 19 · Location ───────────────────────────────────────────── */

function halo_s_location( array $r ): void {
    $tone        = halo_tone_class( $r['tone'] ?? 'light' );
    $map_embed   = $r['map_embed']  ?? '';
    $map_static  = $r['map_static'] ?? [];
    $has_consent = isset( $_COOKIE['iol_consent_maps'] ) && $_COOKIE['iol_consent_maps'] === '1';
    ?>
    <section class="halo-location halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <div class="halo-location__inner">
                <div class="halo-location__details">
                    <?php foreach ( [
                        [ 'address', 'Address', true ],
                        [ 'email',   'Email',   false ],
                        [ 'phone',   'Phone',   false ],
                    ] as [ $key, $label, $multiline ] ) :
                        if ( empty( $r[$key] ) ) continue;
                        $val = halo_t( $r[$key] );
                        if ( $multiline ) $val = nl2br( $val );
                    ?>
                        <div class="halo-location__item">
                            <div>
                                <p class="halo-location__label"><?php echo $label; ?></p>
                                <p class="halo-location__value"><?php
                                    if ( $key === 'email' ) echo '<a href="mailto:' . esc_attr( $r[$key] ) . '">' . $val . '</a>';
                                    elseif ( $key === 'phone' ) echo '<a href="tel:' . esc_attr( preg_replace('/\s/', '', $r[$key]) ) . '">' . $val . '</a>';
                                    else echo $val;
                                ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="halo-location__map">
                    <?php if ( $map_embed && $has_consent ) : ?>
                        <iframe src="<?php echo halo_u( $map_embed ); ?>" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <?php elseif ( ! empty( $map_static['url'] ) ) : ?>
                        <img src="<?php echo halo_u( $map_static['url'] ); ?>" alt="Map"<?php if ( $map_embed ) echo ' data-consent-src="' . halo_u( $map_embed ) . '"'; ?> loading="lazy">
                    <?php elseif ( $map_embed ) : ?>
                        <p style="padding:2rem;text-align:center;color:var(--mid);font-size:.875rem">Accept cookies to view the interactive map.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
    <?php
}

/* ── 20 · ROI Calculator (Phase 2 placeholder) ───────────────── */

function halo_s_roi( array $r ): void {
    ?>
    <section class="halo-roi halo-section <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <p class="halo-roi__label">Coming soon</p>
            <h2 class="halo-roi__title">Calculate your ROI</h2>
            <p class="halo-roi__sub">Our interactive ROI calculator is in development. In the meantime, speak to our team for a tailored financial model for your site.</p>
            <?php echo halo_btn( 'Make an enquiry', '/contact/', 'primary' ); ?>
        </div>
    </section>
    <?php
}

/* ── 21 · Card Picker ────────────────────────────────────────── */

function halo_s_card_picker( array $r ): void {
    $tone   = halo_tone_class( $r['tone'] ?? 'offwhite' );
    $source = $r['source'] ?? 'team';

    $items = match( $source ) {
        'team'       => $r['team_items']       ?? [],
        'case_study' => $r['case_study_items'] ?? [],
        'news'       => $r['news_items']       ?? [],
        default      => [],
    };
    if ( ! $items ) return;
    ?>
    <section class="halo-card-picker halo-section <?php echo esc_attr( $tone ); ?> <?php echo halo_pad_classes( $r ); ?>">
        <div class="halo-inner">
            <?php if ( ! empty( $r['eyebrow'] ) || ! empty( $r['heading'] ) ) : ?>
                <div class="halo-card-picker__intro">
                    <?php echo halo_eyebrow( $r['eyebrow'] ?? '' ); ?>
                    <?php if ( ! empty( $r['heading'] ) ) : ?><h2 style="font-size:clamp(1.75rem,3vw,2.5rem)"><?php echo halo_t( $r['heading'] ); ?></h2><?php endif; ?>
                </div>
            <?php endif; ?>
            <div class="halo-card-picker__grid">
                <?php foreach ( $items as $item ) :
                    $pid = is_object( $item ) ? $item->ID : $item;
                    if ( $source === 'team' ) :
                        $role  = get_post_meta( $pid, 'team_role', true );
                        $bio   = get_post_meta( $pid, 'team_bio', true );
                ?>
                        <div class="halo-team-card">
                            <div class="halo-team-card__photo">
                                <?php if ( has_post_thumbnail( $pid ) ) echo get_the_post_thumbnail( $pid, 'medium', ['loading'=>'lazy'] ); ?>
                            </div>
                            <div class="halo-team-card__info">
                                <h3 class="halo-team-card__name"><?php echo halo_t( get_the_title( $pid ) ); ?></h3>
                                <?php if ( $role ) : ?><p class="halo-team-card__role"><?php echo halo_t( $role ); ?></p><?php endif; ?>
                                <?php if ( $bio )  : ?><p class="halo-team-card__bio"><?php echo halo_t( $bio ); ?></p><?php endif; ?>
                            </div>
                        </div>
                    <?php elseif ( $source === 'case_study' ) :
                        $st  = get_the_terms( $pid, 'cs_sector' );
                        $sn  = $st && ! is_wp_error( $st ) ? $st[0]->name : '';
                        $cl  = get_post_meta( $pid, 'cs_client', true ) ?: get_the_title( $pid );
                        $sv  = get_post_meta( $pid, 'cs_stat1_value', true );
                        $sl  = get_post_meta( $pid, 'cs_stat1_label', true );
                    ?>
                        <a href="<?php echo halo_u( get_permalink( $pid ) ); ?>" class="halo-cs-card">
                            <div class="halo-cs-card__image"><?php echo get_the_post_thumbnail( $pid, 'medium_large', ['loading'=>'lazy'] ); ?></div>
                            <div class="halo-cs-card__body">
                                <div class="halo-cs-card__header">
                                    <?php if ( $sn ) : ?><span class="halo-cs-card__sector"><?php echo halo_t( $sn ); ?></span><?php endif; ?>
                                    <span class="halo-cs-card__arrow">→</span>
                                </div>
                                <h3 class="halo-cs-card__title"><?php echo halo_t( $cl ); ?></h3>
                                <?php if ( $sv ) : ?>
                                    <div class="halo-cs-card__stat">
                                        <span class="halo-cs-card__stat-value"><?php echo halo_t( $sv ); ?></span>
                                        <?php if ( $sl ) : ?><span class="halo-cs-card__stat-label"><?php echo halo_t( $sl ); ?></span><?php endif; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </a>
                    <?php else :
                        $ct = get_the_terms( $pid, 'news_category' );
                        $cn = $ct && ! is_wp_error( $ct ) ? $ct[0]->name : '';
                    ?>
                        <a href="<?php echo halo_u( get_permalink( $pid ) ); ?>" class="halo-news-card">
                            <?php if ( has_post_thumbnail( $pid ) ) : echo '<div class="halo-news-card__image">' . get_the_post_thumbnail( $pid, 'medium_large', ['loading'=>'lazy'] ) . '</div>'; endif; ?>
                            <?php if ( $cn ) : ?><p class="halo-news-card__cat"><?php echo halo_t( $cn ); ?></p><?php endif; ?>
                            <h3 class="halo-news-card__title"><?php echo halo_t( get_the_title( $pid ) ); ?></h3>
                            <p class="halo-news-card__date"><?php echo halo_t( get_the_date( '', $pid ) ); ?></p>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
}

/* ── Footer ──────────────────────────────────────────────────── */

function halo_render_footer(): void {
    ?>
    <footer class="halo-footer">
        <div class="halo-footer__inner">

            <!-- Brand column -->
            <div class="halo-footer__brand">
                <div class="halo-footer__brand-name">HALO FastHub</div>
                <div class="halo-footer__brand-sub">Smart solar EV charging using your existing grid capacity. By 3ti Energy Hubs Ltd.</div>
                <div class="halo-footer__social">
                    <a href="https://www.linkedin.com/company/3tienergyhubs/" target="_blank" rel="noopener">LinkedIn →</a>
                    <a href="https://www.youtube.com/@3tienergyhubs" target="_blank" rel="noopener">YouTube →</a>
                </div>
            </div>

            <!-- Product column -->
            <div class="halo-footer__col">
                <div class="halo-footer__col-title">Product</div>
                <a href="<?php echo halo_u( home_url('/product/') ); ?>">Overview</a>
                <a href="<?php echo halo_u( home_url('/technical-deep-dive/') ); ?>">Technical deep dive</a>
                <a href="<?php echo halo_u( home_url('/case-studies/') ); ?>">Case studies</a>
                <a href="<?php echo halo_u( home_url('/contact/') ); ?>">Get a quote</a>
            </div>

            <!-- Sectors column -->
            <div class="halo-footer__col">
                <div class="halo-footer__col-title">Sectors</div>
                <a href="<?php echo halo_u( home_url('/case-studies/') ); ?>">Fleets</a>
                <a href="<?php echo halo_u( home_url('/case-studies/') ); ?>">Workplaces</a>
                <a href="<?php echo halo_u( home_url('/case-studies/') ); ?>">Destinations</a>
            </div>

            <!-- Company column -->
            <div class="halo-footer__col">
                <div class="halo-footer__col-title">Company</div>
                <a href="<?php echo halo_u( home_url('/about/') ); ?>">About 3ti</a>
                <a href="<?php echo halo_u( home_url('/news/') ); ?>">News &amp; insights</a>
                <a href="<?php echo halo_u( home_url('/contact/') ); ?>">Contact</a>
                <a href="<?php echo halo_u( home_url('/privacy-policy/') ); ?>">Privacy policy</a>
            </div>

        </div>

        <div class="halo-footer__copy">
            <div class="halo-footer__copy-left">
                <span>© <?php echo date( 'Y' ); ?> 3ti Energy Hubs Ltd · Company no. 11868514</span>
                <span class="halo-footer__bcorp">B Corp Certified</span>
            </div>
            <div class="halo-footer__copy-right">
                <a href="<?php echo halo_u( home_url('/privacy-policy/') ); ?>">Privacy</a>
                <a href="#">Cookies</a>
                <a href="mailto:info@3ti.co.uk">info@3ti.co.uk</a>
                <a href="https://infinityonline.co.uk" target="_blank" rel="noopener">Site by IOL</a>
            </div>
        </div>
    </footer>
    <?php
}
