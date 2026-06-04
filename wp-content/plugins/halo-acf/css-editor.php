<?php
/**
 * IOL CSS Editor — admin page with two tabs:
 *   Component CSS  → reads/writes the child theme's style.css
 *   Additional CSS → reads/writes the WP custom_css post (Customizer extra CSS)
 *
 * Both tabs use WP's built-in CodeMirror (wp_enqueue_code_editor).
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'admin_menu', function () {
    add_menu_page(
        'IOL CSS Editor',
        'IOL CSS',
        'manage_options',
        'iol-css-editor',
        'iol_css_editor_page',
        'dashicons-editor-code',
        81
    );
} );

add_action( 'admin_enqueue_scripts', function ( $hook ) {
    if ( $hook !== 'toplevel_page_iol-css-editor' ) return;

    $settings = wp_enqueue_code_editor( [ 'type' => 'text/css' ] );

    // CodeMirror init — target whichever textarea is visible
    if ( $settings ) {
        wp_add_inline_script( 'code-editor', '
            jQuery( function( $ ) {
                $( ".iol-css-textarea" ).each( function() {
                    var cm = wp.codeEditor.initialize( this, ' . wp_json_encode( $settings ) . ' );
                    $( this ).closest( "form" ).on( "submit", function() {
                        cm.codemirror.save();
                    } );
                } );
            } );
        ' );
    }
} );

function iol_css_editor_page(): void {
    if ( ! current_user_can( 'manage_options' ) ) return;

    $active_tab  = isset( $_GET['tab'] ) && $_GET['tab'] === 'additional' ? 'additional' : 'component';
    $style_path  = get_stylesheet_directory() . '/style.css';
    $notice      = '';

    /* ── Save: Component CSS ─────────────────────────────────── */
    if ( $active_tab === 'component'
         && isset( $_POST['iol_component_css_nonce'] )
         && wp_verify_nonce( $_POST['iol_component_css_nonce'], 'iol_save_component_css' )
         && isset( $_POST['component_css'] )
    ) {
        $result = file_put_contents( $style_path, wp_unslash( $_POST['component_css'] ) );
        $notice = $result !== false
            ? '<div class="notice notice-success is-dismissible"><p>Component CSS saved.</p></div>'
            : '<div class="notice notice-error"><p>Could not write style.css — check file permissions.</p></div>';
    }

    /* ── Save: Additional CSS ────────────────────────────────── */
    if ( $active_tab === 'additional'
         && isset( $_POST['iol_additional_css_nonce'] )
         && wp_verify_nonce( $_POST['iol_additional_css_nonce'], 'iol_save_additional_css' )
         && isset( $_POST['additional_css'] )
    ) {
        wp_update_custom_css_post( wp_unslash( $_POST['additional_css'] ) );
        $notice = '<div class="notice notice-success is-dismissible"><p>Additional CSS saved.</p></div>';
    }

    /* ── Read current values ─────────────────────────────────── */
    $component_css  = file_exists( $style_path ) ? file_get_contents( $style_path ) : '';
    $additional_css = wp_get_custom_css();

    $tab_url = function ( string $tab ) {
        return admin_url( 'admin.php?page=iol-css-editor&tab=' . $tab );
    };

    ?>
    <div class="wrap">
        <h1>IOL CSS Editor</h1>
        <?php echo $notice; ?>

        <nav class="nav-tab-wrapper" style="margin-bottom:0">
            <a href="<?php echo esc_url( $tab_url( 'component' ) ); ?>"
               class="nav-tab <?php echo $active_tab === 'component' ? 'nav-tab-active' : ''; ?>">
                Component CSS <small style="opacity:.6">(style.css)</small>
            </a>
            <a href="<?php echo esc_url( $tab_url( 'additional' ) ); ?>"
               class="nav-tab <?php echo $active_tab === 'additional' ? 'nav-tab-active' : ''; ?>">
                Additional CSS <small style="opacity:.6">(Customizer overrides)</small>
            </a>
        </nav>

        <div style="background:#fff;border:1px solid #c3c4c7;border-top:none;padding:1.5rem 1.5rem 1rem">

        <?php if ( $active_tab === 'component' ) : ?>

            <p style="margin-top:0;color:#666;">
                The main component stylesheet. Defines the 21 ACF section layouts.
                Brand tokens, fonts and colours are managed in
                <a href="<?php echo esc_url( admin_url( 'themes.php?page=generate-options' ) ); ?>">GP Settings</a>.
            </p>

            <form method="post">
                <?php wp_nonce_field( 'iol_save_component_css', 'iol_component_css_nonce' ); ?>
                <textarea name="component_css" class="iol-css-textarea"
                    style="width:100%;height:70vh;font-family:monospace;font-size:13px"
                ><?php echo esc_textarea( $component_css ); ?></textarea>
                <p>
                    <button type="submit" class="button button-primary button-large">Save Component CSS</button>
                    <span style="color:#999;font-size:12px;margin-left:1rem">
                        File: <?php echo esc_html( $style_path ); ?>
                    </span>
                </p>
            </form>

        <?php else : ?>

            <p style="margin-top:0;color:#666;">
                Post-launch tweaks and one-off overrides. These are output after all other CSS
                and override anything in Component CSS. Also editable in
                <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=custom_css' ) ); ?>">
                    Customizer → Additional CSS</a>.
            </p>

            <form method="post">
                <?php wp_nonce_field( 'iol_save_additional_css', 'iol_additional_css_nonce' ); ?>
                <textarea name="additional_css" class="iol-css-textarea"
                    style="width:100%;height:70vh;font-family:monospace;font-size:13px"
                ><?php echo esc_textarea( $additional_css ); ?></textarea>
                <p>
                    <button type="submit" class="button button-primary button-large">Save Additional CSS</button>
                </p>
            </form>

        <?php endif; ?>

        </div>
    </div>
    <?php
}
