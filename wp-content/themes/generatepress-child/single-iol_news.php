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

    <section class="halo-section halo-tone-light halo-article-body">
        <div class="halo-inner halo-article-body__inner">
            <?php
            $sections = get_field( 'news_sections', $id );
            if ( $sections ) :
                foreach ( $sections as $row ) :
                    if ( $row['acf_fc_layout'] === 'article_body' && function_exists( 'halo_s_article_body' ) )
                        halo_s_article_body( $row );
                endforeach;
            else :
                the_content();
            endif;
            ?>
        </div>
    </section>

    <!-- CTA band -->
    <?php
    halo_s_cta_band( [
        'title'      => 'Ready to power your fleet?',
        'sub'        => 'A free, obligation-free site assessment is the only thing standing between you and a working hub.',
        'btn1_label' => 'Make an enquiry',
        'btn1_url'   => '/contact/',
        'btn2_label' => 'All articles',
        'btn2_url'   => '/news/',
    ] );
    ?>

</main>
<?php endwhile; ?>
<?php get_footer();
