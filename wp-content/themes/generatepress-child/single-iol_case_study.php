<?php
/**
 * HALO FastHub — single case study template.
 */
get_header();

while ( have_posts() ) : the_post();
    $id    = get_the_ID();
    $title = get_the_title();
    $sub   = get_field( 'cs_summary', $id );
    $hero  = get_field( 'cs_hero_image', $id );
    $logo  = get_field( 'cs_client_logo', $id );
    $s1v   = get_field( 'cs_stat1_value', $id );
    $s1l   = get_field( 'cs_stat1_label', $id );
    $s2v   = get_field( 'cs_stat2_value', $id );
    $s2l   = get_field( 'cs_stat2_label', $id );
    $s3v   = get_field( 'cs_stat3_value', $id );
    $s3l   = get_field( 'cs_stat3_label', $id );
    $has_stats = $s1v || $s2v || $s3v;
?>
<main id="main" class="site-main">

    <section class="halo-section halo-tone-dark halo-cs-hero">
        <?php if ( $hero ) : ?>
        <div class="halo-cs-hero__bg" style="background-image:url('<?php echo esc_url( $hero['url'] ); ?>')"></div>
        <?php endif; ?>
        <div class="halo-inner halo-cs-hero__content">
            <?php if ( $logo ) : ?>
            <img class="halo-cs-hero__logo" src="<?php echo esc_url( $logo['url'] ); ?>" alt="<?php echo esc_attr( $logo['alt'] ?: get_field( 'cs_client', $id ) ); ?>">
            <?php endif; ?>
            <h1><?php echo esc_html( $title ); ?></h1>
            <?php if ( $sub ) : ?><p class="halo-cs-hero__sub"><?php echo esc_html( $sub ); ?></p><?php endif; ?>
        </div>
        <?php if ( $has_stats ) : ?>
        <div class="halo-stat-bar halo-inner">
            <?php foreach ( [ [$s1v,$s1l], [$s2v,$s2l], [$s3v,$s3l] ] as [$v,$l] ) : if ( ! $v ) continue; ?>
            <div class="halo-stat-bar__item">
                <span class="halo-stat-bar__value"><?php echo esc_html( $v ); ?></span>
                <span class="halo-stat-bar__label"><?php echo esc_html( $l ); ?></span>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </section>

    <?php
    $sections = get_field( 'cs_sections', $id );
    if ( $sections ) :
        foreach ( $sections as $row ) :
            $layout = $row['acf_fc_layout'];
            if ( $layout === 'story_rows' && function_exists( 'halo_s_story_rows' ) ) {
                halo_s_story_rows( $row );
            } elseif ( $layout === 'pull_quote' && function_exists( 'halo_s_pull_quote' ) ) {
                halo_s_pull_quote( $row );
            }
        endforeach;
    endif;
    ?>

</main>
<?php endwhile; ?>
<?php get_footer();
