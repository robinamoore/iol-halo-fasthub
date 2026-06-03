#!/usr/bin/env bash
# =============================================================================
# HALO FastHub — Local site setup
# =============================================================================
# Run once after cloning the repo on a Mac with Local by Flywheel installed.
#
# USAGE
# ─────
#   cd ~/Sites/halo-fasthub
#   bash scripts/setup-halo.sh
#
# WHAT IT DOES
# ────────────
#   1. Symlinks child theme + site plugins into ~/Local Sites/halo/
#   2. Symlinks all IOL shared plugins from ~/Sites/IOL_housekit_plugins/
#   3. Finds Local's bundled PHP + WP-CLI automatically
#   4. Activates GeneratePress, child theme, and all plugins
#   5. Seeds pages and taxonomy terms via halo_populate_all()
#   6. Flushes permalink rewrites
#
# REQUIREMENTS
# ────────────
#   - Local by Flywheel site named "halo" must exist and be running
#   - ~/Sites/IOL_housekit_plugins/ must exist with the IOL plugins
#   - ACF Pro must already be installed in wp-content/plugins/
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✓${NC}  $*"; }
info() { echo -e "${CYAN}→${NC}  $*"; }
warn() { echo -e "${YELLOW}!${NC}  $*"; }
fail() { echo -e "${RED}✗${NC}  $*" >&2; exit 1; }

echo ""
echo "══════════════════════════════════════════════"
echo "  HALO FastHub — Local Site Setup"
echo "══════════════════════════════════════════════"
echo ""

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WP_ROOT="$HOME/Local Sites/halo/app/public"
PLUGINS_DIR="$WP_ROOT/wp-content/plugins"
THEMES_DIR="$WP_ROOT/wp-content/themes"
IOL_PLUGINS="$HOME/Sites/IOL_housekit_plugins"

info "Repo:    $REPO_DIR"
info "WP root: $WP_ROOT"
echo ""

[[ -d "$WP_ROOT" ]] || fail "Local site not found at: $WP_ROOT — create the 'halo' site in Local first."
[[ -d "$IOL_PLUGINS" ]] || fail "IOL plugins not found at: $IOL_PLUGINS"

# ── 1. Symlink child theme ────────────────────────────────────────────────────

info "Symlinking child theme…"
THEME_SRC="$REPO_DIR/wp-content/themes/generatepress-child"
THEME_DEST="$THEMES_DIR/generatepress-child"
if [[ -L "$THEME_DEST" ]]; then
    warn "generatepress-child already symlinked — skipping."
else
    ln -s "$THEME_SRC" "$THEME_DEST" && ok "generatepress-child symlinked."
fi

# ── 2. Symlink site-specific plugins ─────────────────────────────────────────

info "Symlinking site-specific plugins…"
for plugin in halo-acf halo-cpt; do
    src="$REPO_DIR/wp-content/plugins/$plugin"
    dest="$PLUGINS_DIR/$plugin"
    if [[ -L "$dest" ]]; then
        warn "  $plugin already symlinked — skipping."
    else
        ln -s "$src" "$dest" && ok "  $plugin"
    fi
done

# ── 3. Symlink IOL shared plugins ─────────────────────────────────────────────

info "Symlinking IOL shared plugins…"
IOL_LIST=(
    iol-base
    iol-404
    iol-cookies
    iol-security
    iol-seo
    iol-redirect
    iol-sitemap
    iol-drawer
    iol-forms
    iol-hookmount
    iol-duplicate-page
    iol-page-order
    iol-tags
    iol-css-editor
)

for plugin in "${IOL_LIST[@]}"; do
    src="$IOL_PLUGINS/$plugin"
    dest="$PLUGINS_DIR/$plugin"
    if [[ ! -d "$src" ]]; then
        warn "  $plugin — not found in IOL_housekit_plugins, skipping."
        continue
    fi
    if [[ -L "$dest" ]]; then
        warn "  $plugin already symlinked — skipping."
    else
        ln -s "$src" "$dest" && ok "  $plugin"
    fi
done

# ── 4. Find Local's PHP and WP-CLI ───────────────────────────────────────────

echo ""
info "Locating Local's PHP and WP-CLI…"
PHP_BIN=$(find /Applications/Local.app -name "php" 2>/dev/null | grep "bin/darwin/bin/php$" | head -1 || true)
WPCLI_BIN=$(find /Applications/Local.app -name "wp-cli.phar" 2>/dev/null | head -1 || true)
MYSQL_BIN=$(find /Applications/Local.app -name "mysql" 2>/dev/null | grep "bin/darwin/bin/mysql$" | head -1 || true)

[[ -n "$PHP_BIN" ]]   || fail "Could not find Local's PHP binary in /Applications/Local.app"
[[ -n "$WPCLI_BIN" ]] || fail "Could not find wp-cli.phar in /Applications/Local.app"
[[ -n "$MYSQL_BIN" ]] || fail "Could not find Local's mysql binary"

ok "PHP:    $PHP_BIN"
ok "WP-CLI: $WPCLI_BIN"

# ── 5. Find MySQL socket ──────────────────────────────────────────────────────

info "Finding Local MySQL socket for halo site…"
SOCKET=""
LOCAL_RUN="$HOME/Library/Application Support/Local/run"

for run_dir in "$LOCAL_RUN"/*/; do
    candidate="$run_dir/mysql/mysqld.sock"
    if [[ -S "$candidate" ]]; then
        TABLE_CHECK=$("$MYSQL_BIN" -u root -proot --socket="$candidate" -sN local \
            -e "SHOW TABLES LIKE 'wp_options';" 2>/dev/null || true)
        if [[ -n "$TABLE_CHECK" ]]; then
            SOCKET="$candidate"
            ok "Socket: $SOCKET"
            break
        fi
    fi
done

[[ -n "$SOCKET" ]] || fail "No active MySQL socket found — make sure the halo site is running in Local."

# ── 6. WP-CLI wrapper (handles spaces in path, passes socket directly) ────────

# Use a function — avoids word-splitting on spaces in $WP_ROOT
wpcli() {
    "$PHP_BIN" "$WPCLI_BIN" \
        "--path=$WP_ROOT" \
        "--dbhost=localhost:$SOCKET" \
        "--dbuser=root" \
        "--dbpass=root" \
        "$@"
}

# ── 7. Install GeneratePress parent theme if missing ──────────────────────────

echo ""
info "Checking GeneratePress parent theme…"
if [[ -d "$THEMES_DIR/generatepress" ]]; then
    warn "generatepress already installed — skipping."
else
    info "Downloading GeneratePress from WordPress.org…"
    wpcli theme install generatepress 2>/dev/null && ok "generatepress installed." \
        || warn "Could not download generatepress — install manually in WP Admin."
fi

# ── 8. Activate themes ────────────────────────────────────────────────────────

echo ""
info "Activating themes…"
wpcli theme activate generatepress       2>/dev/null && ok "generatepress" \
    || warn "generatepress — activation failed, check it's installed."
wpcli theme activate generatepress-child 2>/dev/null && ok "generatepress-child" \
    || warn "generatepress-child — activation failed, check symlink."

# ── 9. Activate plugins ───────────────────────────────────────────────────────

echo ""
info "Activating plugins…"
PLUGINS_TO_ACTIVATE=(
    advanced-custom-fields-pro
    halo-acf
    halo-cpt
    iol-base
    iol-404
    iol-cookies
    iol-security
    iol-seo
    iol-redirect
    iol-sitemap
    iol-drawer
    iol-forms
    iol-hookmount
    iol-tags
)

for plugin in "${PLUGINS_TO_ACTIVATE[@]}"; do
    wpcli plugin activate "$plugin" 2>/dev/null && ok "  $plugin" \
        || warn "  $plugin — not found or already active."
done

# ── 10. Seed pages and flush ───────────────────────────────────────────────────

echo ""
info "Seeding pages and taxonomy terms…"
wpcli eval 'if(function_exists("halo_populate_all")) halo_populate_all(); else echo "halo_populate_all not found";' \
    && ok "Data seeded."

info "Flushing rewrites…"
wpcli rewrite flush --hard 2>/dev/null && ok "Permalinks flushed."

# cleanup() restores wp-config via trap

echo ""
echo "══════════════════════════════════════════════"
echo -e "  ${GREEN}Setup complete.${NC}"
echo "══════════════════════════════════════════════"
echo ""
echo "  → Open http://halo.local/ in your browser"
echo "  → WP Admin: http://halo.local/wp-admin/"
echo "  → If ACF Pro needs a licence: Appearance → ACF → Updates"
echo ""
