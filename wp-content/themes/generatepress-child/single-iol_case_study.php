<?php
/**
 * HALO FastHub — single case study template.
 * Design ref: NB_CaseHero — two-column dark hero, stat panel right, story rows below.
 */
get_header();

while ( have_posts() ) : the_post();
    $id      = get_the_ID();
    $title   = get_the_title();
    $client  = get_field( 'cs_client', $id ) ?: $title;
    $sub     = get_field( 'cs_summary', $id );
    $hero    = get_field( 'cs_hero_image', $id );
    $logo    = get_field( 'cs_client_logo', $id );
    $s1v     = get_field( 'cs_stat1_value', $id );
    $s1l     = get_field( 'cs_stat1_label', $id );
    $s2v     = get_field( 'cs_stat2_value', $id );
    $s2l     = get_field( 'cs_stat2_label', $id );
    $s3v     = get_field( 'cs_stat3_value', $id );
    $s3l     = get_field( 'cs_stat3_label', $id );
    $sectors = get_the_terms( $id, 'cs_sector' );
    $sector  = ( $sectors && ! is_wp_error( $sectors ) ) ? $sectors[0]->name : '';
?>
<main id="main" class="site-main">

    <!-- Dark hero — two column: content left, headline stat + logo right -->
    <section class="halo-cs-hero halo-section halo-tone-dark">
        <?php if ( $hero ) : ?>
        <div class="halo-cs-hero__bg" style="background-image:url('<?php echo esc_url( $hero['url'] ); ?>')"></div>
        <?php endif; ?>
        <div class="halo-inner halo-cs-hero__inner">

            <!-- Left: eyebrow / title / sub / CTAs -->
            <div class="halo-cs-hero__content">
                <?php if ( $sector || $client ) : ?>
                <span class="halo-eyebrow halo-cs-hero__eyebrow">
                    <?php if ( $sector ) : ?><?php echo esc_html( $sector ); ?> · <?php endif; ?><?php echo esc_html( $client ); ?>
                </span>
                <?php endif; ?>
                <h1 class="halo-cs-hero__title"><?php echo esc_html( $title ); ?></h1>
                <?php if ( $sub ) : ?><p class="halo-cs-hero__sub"><?php echo esc_html( $sub ); ?></p><?php endif; ?>
                <div class="halo-cs-hero__ctas">
                    <a href="/contact/" class="halo-btn halo-btn--primary">Make an enquiry →</a>
                    <a href="/case-studies/" class="halo-btn halo-btn--outline">All case studies →</a>
                </div>
            </div>

            <!-- Right: headline stat + client logo -->
            <div class="halo-cs-hero__panel">
                <?php if ( $s1v ) : ?>
                <div class="halo-cs-hero__stat">
                    <span class="halo-cs-hero__stat-label"><?php echo esc_html( $s1l ?: 'Result' ); ?></span>
                    <span class="halo-cs-hero__stat-value"><?php echo esc_html( $s1v ); ?></span>
                    <?php if ( $s1l ) : ?><span class="halo-cs-hero__stat-desc"><?php echo esc_html( $s1l ); ?></span><?php endif; ?>
                </div>
                <?php endif; ?>
                <?php if ( $logo ) : ?>
                <div class="halo-cs-hero__logo-wrap">
                    <img class="halo-cs-hero__logo" src="<?php echo esc_url( $logo['url'] ); ?>"
                         alt="<?php echo esc_attr( $logo['alt'] ?: $client ); ?>">
                </div>
                <?php endif; ?>
            </div>

        </div>

        <!-- Bottom stat bar: stats 2 + 3 -->
        <?php if ( $s2v || $s3v ) : ?>
        <div class="halo-cs-stat-bar">
            <div class="halo-inner halo-cs-stat-bar__inner">
                <?php foreach ( [ [$s2v,$s2l], [$s3v,$s3l] ] as [$v,$l] ) : if ( ! $v ) continue; ?>
                <div class="halo-cs-stat-bar__item">
                    <span class="halo-cs-stat-bar__value"><?php echo esc_html( $v ); ?></span>
                    <span class="halo-cs-stat-bar__label"><?php echo esc_html( $l ); ?></span>
                </div>
                <?php endforeach; ?>
                <?php if ( $sector ) : ?>
                <div class="halo-cs-stat-bar__item halo-cs-stat-bar__item--sector">
                    <span class="halo-cs-stat-bar__label">Sector</span>
                    <span class="halo-cs-stat-bar__value" style="font-size:1.5rem"><?php echo esc_html( $sector ); ?></span>
                </div>
                <?php endif; ?>
            </div>
        </div>
        <?php endif; ?>
    </section>

    <!-- Content sections (all 21 blocks) -->
    <?php if ( function_exists( 'halo_render_sections' ) ) halo_render_sections( $id ); ?>

</main>
<?php endwhile; ?>
<?php get_footer();
