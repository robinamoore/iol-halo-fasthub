<?php
/**
 * HALO FastHub — single news/article template.
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

    <section class="halo-section halo-tone-dark halo-news-hero">
        <?php if ( $hero ) : ?>
        <div class="halo-news-hero__bg" style="background-image:url('<?php echo esc_url( $hero['url'] ); ?>')"></div>
        <?php endif; ?>
        <div class="halo-inner halo-news-hero__content">
            <?php if ( $cat_name ) : ?>
            <span class="halo-eyebrow"><?php echo esc_html( $cat_name ); ?></span>
            <?php endif; ?>
            <h1><?php echo esc_html( $title ); ?></h1>
            <?php if ( $excerpt ) : ?><p class="halo-news-hero__sub"><?php echo esc_html( $excerpt ); ?></p><?php endif; ?>
            <p class="halo-news-hero__meta">
                <?php echo esc_html( $date ); ?>
                <?php if ( $read_time ) : ?> &middot; <?php echo esc_html( $read_time ); ?> min read<?php endif; ?>
            </p>
        </div>
    </section>

    <section class="halo-section halo-tone-light halo-article-wrap">
        <div class="halo-inner halo-article-inner">
            <?php
            $sections = get_field( 'news_sections', $id );
            if ( $sections ) :
                foreach ( $sections as $row ) :
                    if ( $row['acf_fc_layout'] === 'article_body' && function_exists( 'halo_s_article_body' ) ) {
                        halo_s_article_body( $row );
                    }
                endforeach;
            else :
                the_content();
            endif;
            ?>
        </div>
    </section>

</main>
<?php endwhile; ?>
<?php get_footer();
