<?php
/**
 * HALO FastHub — page template.
 */
get_header();
?>
<main id="main" class="site-main">
<?php while ( have_posts() ) : the_post();
    if ( function_exists( 'halo_render_sections' ) ) {
        halo_render_sections( get_the_ID() );
    } else {
        the_content();
    }
endwhile; ?>
</main>
<?php get_footer();
