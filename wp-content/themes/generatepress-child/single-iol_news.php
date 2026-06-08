<?php
/**
 * HALO FastHub — single news/article template.
 * Design ref: NB_Article — centered narrow-column article layout.
 */
get_header();

while ( have_posts() ) : the_post();
    $id        = get_the_ID();
    $title     = get_the_title();
    $excerpt   = get_field( 'news_excerpt', $id );
    $hero      = get_field( 'news_hero_image', $id );
    $read_time = get_field( 'news_read_time', $id );
    $date      = get_the_date( 'j F Y' );
    $cats      = get_the_terms( $id, 'news_category' );
    $cat_name  = ( $cats && ! is_wp_error( $cats ) ) ? $cats[0]->name : '';
?>
<main id="main" class="site-main">

    <section class="halo-section halo-tone-light halo-article-header">
        <div class="halo-inner halo-article-header__inner">
            <?php if ( $cat_name ) : ?>
            <span class="halo-eyebrow"><?php echo esc_html( $cat_name ); ?></span>
            <?php endif; ?>
            <h1 class="halo-article-header__title"><?php echo esc_html( $title ); ?></h1>
            <div class="halo-article-header__meta">
                <span><?php echo esc_html( $date ); ?></span>
                <?php if ( $read_time ) : ?>
                <span class="halo-article-header__dot"></span>
                <span><?php echo esc_html( $read_time ); ?> min read</span>
                <?php endif; ?>
            </div>
        </div>

        <?php if ( $hero ) : ?>
        <div class="halo-article-header__image">
            <img src="<?php echo esc_url( $hero['url'] ); ?>"
                 alt="<?php echo esc_attr( $hero['alt'] ?: $title ); ?>"
                 loading="eager">
        </div>
        <?php endif; ?>
    </section>

    <?php
    $sections = get_field( 'news_sections', $id );
    if ( $sections ) :
        foreach ( $sections as $row ) :
            switch ( $row['acf_fc_layout'] ) {
                case 'article_body':  if ( function_exists( 'halo_s_article_body' ) )   halo_s_article_body( $row );   break;
                case 'pull_quote':    if ( function_exists( 'halo_s_pull_quote' ) )     halo_s_pull_quote( $row );     break;
                case 'cta_band':      if ( function_exists( 'halo_s_cta_band' ) )       halo_s_cta_band( $row );       break;
                case 'section_intro': if ( function_exists( 'halo_s_section_intro' ) )  halo_s_section_intro( $row );  break;
            }
        endforeach;
    else :
    ?>
    <section class="halo-section halo-tone-light halo-article-body">
        <div class="halo-inner halo-article-body__inner"><?php the_content(); ?></div>
    </section>
    <?php endif; ?>

</main>
<?php endwhile; ?>
<?php get_footer();
