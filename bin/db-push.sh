#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# db-push.sh — Push your local database up to the live Clook server.
#
# What it does:
#   1. Exports your local DB via WP-CLI
#   2. Runs URL search-replace in the dump (local → live)
#   3. Generates a time-limited HMAC token from your deploy secret
#   4. Uploads the gzip'd dump to the live import endpoint
#   5. The live server backs up its current DB, then imports yours
#
# Usage:
#   ./bin/db-push.sh
#
# ⚠  DANGER — this REPLACES the live database.
#    Only use this when you are deliberately publishing local work.
#    The live server makes its own backup before importing.
#
# Requirements:
#   - wp  (WP-CLI — open LocalWP → Site Shell, or install globally)
#   - python3  (ships with macOS)
#   - curl     (ships with macOS)
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SITE_DIR="$(  dirname "$SCRIPT_DIR" )"
SECRET_FILE="$SCRIPT_DIR/.halo-secret"
BACKUP_DIR="$SCRIPT_DIR/db-backups"

# ── Config ───────────────────────────────────────────────────────────────────
LIVE_URL="https://thatsbetter.co.uk"
LOCAL_URL="http://halo.local"
WP_PATH="/Users/robinmoore/Local Sites/halo/app/public"
PHP_BIN="/Users/robinmoore/Library/Application Support/Local/lightning-services/php-8.2.30+1/bin/darwin/bin/php"
WP_CLI="/Users/robinmoore/.cache/wp-cli/wp-cli.phar"
MYSQL_BIN_DIR="/Users/robinmoore/Library/Application Support/Local/lightning-services/mysql-8.0.35+4/bin/darwin/bin"
# ─────────────────────────────────────────────────────────────────────────────

# ── Load secret (auto-seeded from .halo-deploy-secret on live server) ────────
DEPLOY_SECRET_FILE="$SITE_DIR/.halo-deploy-secret-local"
if [ ! -f "$SECRET_FILE" ]; then
    # Auto-populate from the known deploy secret
    printf '%s' '65cf7c2bf64b6113cbe2d4edb7f0df053153d9a171a59d362716b713963628b0' > "$SECRET_FILE"
    chmod 600 "$SECRET_FILE"
fi
SECRET=$(<"$SECRET_FILE")

# ── Big red warning ───────────────────────────────────────────────────────────
echo ""
echo "┌──────────────────────────────────────────────────────────────────┐"
echo "│  ⚠  DANGER — this will REPLACE the LIVE database with yours.    │"
echo "│     The live server will make its own backup before importing.   │"
echo "│                                                                  │"
echo "│  Use this only to deliberately publish local content.            │"
echo "└──────────────────────────────────────────────────────────────────┘"
echo ""
echo "  Local:  ${LOCAL_URL}"
echo "  Live:   ${LIVE_URL}"
echo ""
read -rp "Type  PUSH  (all caps) to continue: " _confirm
if [ "$_confirm" != "PUSH" ]; then
    echo "Aborted."
    exit 0
fi

# ── Export local DB ───────────────────────────────────────────────────────────
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
EXPORT_SQL="$BACKUP_DIR/local-export-${TIMESTAMP}.sql"
EXPORT_GZ="$BACKUP_DIR/local-export-${TIMESTAMP}.sql.gz"

echo "→ Exporting local DB..."
export PATH="$MYSQL_BIN_DIR:$PATH"
"$PHP_BIN" "$WP_CLI" --path="$WP_PATH" db export "$EXPORT_SQL" --quiet
echo "  ✓ Exported: $EXPORT_SQL"

# ── Search-replace local → live in the dump ──────────────────────────────────
# We operate on the SQL file directly so we don't touch the live running DB.
# Note: this is a text-level replace — WP-CLI's search-replace handles
# serialised PHP correctly when run against a live DB. For most sites a
# simple sed on the dump is sufficient for URL-only changes.
echo "→ Replacing ${LOCAL_URL} → ${LIVE_URL} in dump..."
sed -i '' "s|${LOCAL_URL}|${LIVE_URL}|g" "$EXPORT_SQL"

# ── Compress ──────────────────────────────────────────────────────────────────
echo "→ Compressing..."
gzip -c "$EXPORT_SQL" > "$EXPORT_GZ"
DUMP_SIZE=$(du -sh "$EXPORT_GZ" | cut -f1)
echo "  ✓ ${DUMP_SIZE}: $EXPORT_GZ"

# ── Generate HMAC token ───────────────────────────────────────────────────────
MINUTE=$(( $(date +%s) / 60 ))
TOKEN=$(python3 - <<EOF
import hmac, hashlib
secret = open("${SECRET_FILE}").read().strip()
token  = hmac.new(secret.encode(), b"${MINUTE}", hashlib.sha256).hexdigest()
print(token)
EOF
)

# ── Upload to live import endpoint ────────────────────────────────────────────
echo "→ Uploading to ${LIVE_URL}/halo-db-import.php..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -F "token=${TOKEN}" \
    -F "sqlfile=@${EXPORT_GZ};type=application/gzip" \
    "${LIVE_URL}/halo-db-import.php")

HTTP_STATUS=$(printf '%s' "$RESPONSE" | tail -n1)
BODY=$(       printf '%s' "$RESPONSE" | sed '$d')

if [ "$HTTP_STATUS" != "200" ]; then
    echo ""
    echo "Error: server returned HTTP ${HTTP_STATUS}."
    echo "$BODY"
    exit 1
fi

# ── Parse and display result ──────────────────────────────────────────────────
echo ""
echo "Live server response:"
echo "$BODY" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(f\"  ok:      {d.get('ok', '?')}\")
print(f\"  fail:    {d.get('fail', '?')}\")
print(f\"  backup:  {d.get('backup', '?')}\")
errs = d.get('errors', [])
if errs:
    print(f\"  errors ({len(errs)}):\" )
    for e in errs[:5]:
        print(f\"    - {e}\")
"

FAIL_COUNT=$(echo "$BODY" | python3 -c "import json,sys; print(json.load(sys.stdin).get('fail',0))" 2>/dev/null || echo "?")

echo ""
if [ "$FAIL_COUNT" = "0" ]; then
    echo "✓ Done. Live site is now running your local database."
else
    echo "⚠  Import completed with ${FAIL_COUNT} statement failure(s). Check errors above."
fi
echo ""
echo "  Your local dump: $EXPORT_SQL"
echo "  Compressed:      $EXPORT_GZ"
echo ""
echo "  To roll back live: log in to ${LIVE_URL}/wp-admin/ and restore"
echo "  the backup shown above from wp-content/backups/db/ on the server."
