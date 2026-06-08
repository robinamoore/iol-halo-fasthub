<?php
/**
 * HALO — one-time cleanup: remove DB-registered ACF field groups for
 * iol_news and iol_case_study. These are replaced by code-registered
 * groups in halo-acf/fields.php (group_halo_news_details and
 * group_halo_cs_details) which do NOT include the rogue flexible content
 * that was causing a duplicate sections builder in the admin.
 *
 * Run once via: https://thatsbetter.co.uk/halo-cleanup-acf-groups.php
 * DELETE this file afterwards.
 */

define( 'ABSPATH', __DIR__ . '/' );
require_once __DIR__ . '/wp-load.php';

if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( 'Not allowed.' );
}

global $wpdb;

// ── Find all DB-registered ACF field groups ──────────────────────────

$groups = $wpdb->get_results(
    "SELECT ID, post_title, post_content
     FROM {$wpdb->posts}
     WHERE post_type = 'acf-field-group'
     AND post_status IN ('publish', 'acf-disabled')"
);

$targeted = [];

foreach ( $groups as $group ) {
    $data = maybe_unserialize( $group->post_content );
    if ( ! is_array( $data ) ) continue;

    // Check location rules for iol_news or iol_case_study
    $loc_str = maybe_serialize( $data['location'] ?? [] );
    if ( strpos( $loc_str, 'iol_news' ) !== false
      || strpos( $loc_str, 'iol_case_study' ) !== false ) {
        $targeted[] = $group;
    }
}

if ( empty( $targeted ) ) {
    echo '<p><strong>No DB-registered ACF field groups found for iol_news or iol_case_study.</strong><br>
          They may already have been cleaned up, or the code-registered groups are already in place.</p>';
    exit;
}

// ── List what was found ─────────────────────────────────────────────

echo '<h2>Found ' . count( $targeted ) . ' DB-registered field group(s) to remove:</h2><ul>';
foreach ( $targeted as $g ) {
    echo '<li>ID ' . esc_html( $g->ID ) . ': <strong>' . esc_html( $g->post_title ) . '</strong></li>';
}
echo '</ul>';

// ── Delete recursively (group → fields → sub-fields → sub-sub-fields) ──

function halo_delete_acf_post_recursive( int $post_id ): int {
    global $wpdb;
    $count    = 0;
    $children = $wpdb->get_col( $wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_parent = %d",
        $post_id
    ) );
    foreach ( $children as $child_id ) {
        $count += halo_delete_acf_post_recursive( (int) $child_id );
    }
    wp_delete_post( $post_id, true );
    return $count + 1;
}

$total = 0;
foreach ( $targeted as $group ) {
    $n      = halo_delete_acf_post_recursive( (int) $group->ID );
    $total += $n;
    echo '<p>✅ Deleted <strong>' . esc_html( $group->post_title ) . '</strong> (ID '
       . esc_html( $group->ID ) . ') and ' . ( $n - 1 ) . ' child field(s).</p>';
}

echo '<p><strong>Done. ' . $total . ' posts deleted in total.</strong></p>';
echo '<p style="color:red">⚠️ Delete this file from the server now.</p>';
