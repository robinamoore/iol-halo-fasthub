<?php
/**
 * HALO FastHub — 404 template.
 * Renders the WP page with slug 'error-404' using HALO ACF sections.
 */
get_header();

$error_page = get_page_by_path( 'error-404' );
?>
<main id="main" class="site-main">
<?php if ( $error_page && function_exists( 'halo_render_sections' ) ) :
    halo_render_sections( $error_page->ID );
else : ?>
    <div style="text-align:center;padding:6rem 2rem">
        <h1>404 — Page not found</h1>
        <p><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to home</a></p>
    </div>
<?php endif; ?>
</main>
<?php get_footer();
