#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# db-pull.sh — Pull the live Clook database down to your local install.
#
# What it does:
#   1. Generates a time-limited HMAC token from your deploy secret
#   2. Downloads a gzip'd SQL dump from the live site
#   3. Backs up your local DB first (never silently destroys local work)
#   4. Imports the live dump into your local MySQL
#   5. Search-replaces all live URLs → local URLs (handles serialised PHP)
#
# Usage:
#   ./bin/db-pull.sh
#
# First run: the script will ask for the deploy secret and save it to
#   bin/.halo-secret (gitignored). Find the secret at:
#   https://thatsbetter.co.uk/halo-webhook-setup.php  (must be logged in as admin)
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

# ── Config — edit these if your URLs change ──────────────────────────────────
LIVE_URL="https://thatsbetter.co.uk"
LOCAL_URL="https://halo-fasthub.local"
# ─────────────────────────────────────────────────────────────────────────────

# ── Load or prompt for secret ─────────────────────────────────────────────────
if [ ! -f "$SECRET_FILE" ]; then
    echo ""
    echo "First-time setup."
    echo "You need the deploy secret stored on the live site."
    echo "  1. Log in to: ${LIVE_URL}/wp-admin/"
    echo "  2. Visit:     ${LIVE_URL}/halo-webhook-setup.php"
    echo "  3. Copy the secret shown."
    echo ""
    read -rsp "Paste secret here: " _secret
    echo ""
    printf '%s' "$_secret" > "$SECRET_FILE"
    chmod 600 "$SECRET_FILE"
    echo "Saved to bin/.halo-secret"
fi
SECRET=$(<"$SECRET_FILE")

# ── Confirm before overwriting local ─────────────────────────────────────────
echo ""
echo "┌─────────────────────────────────────────────────────────────┐"
echo "│  ⚠  This will REPLACE your local database with the live one. │"
echo "│     Your current local DB will be backed up first.           │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""
read -rp "Type  yes  to continue: " _confirm
if [ "$_confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

# ── Generate HMAC token ───────────────────────────────────────────────────────
MINUTE=$(( $(date +%s) / 60 ))
TOKEN=$(python3 - <<EOF
import hmac, hashlib
secret = open("${SECRET_FILE}").read().strip()
token  = hmac.new(secret.encode(), b"${MINUTE}", hashlib.sha256).hexdigest()
print(token)
EOF
)

# ── Backup local DB ───────────────────────────────────────────────────────────
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/local-before-pull-${TIMESTAMP}.sql"

echo "→ Backing up local DB..."
wp --path="$SITE_DIR" db export "$BACKUP_FILE" --quiet
echo "  ✓ Saved: $BACKUP_FILE"

# ── Download live DB ──────────────────────────────────────────────────────────
LIVE_DUMP="$BACKUP_DIR/live-${TIMESTAMP}.sql.gz"
echo "→ Downloading live DB from ${LIVE_URL}..."

HTTP_STATUS=$(curl -s -o "$LIVE_DUMP" -w "%{http_code}" \
    "${LIVE_URL}/halo-db-export.php?token=${TOKEN}")

if [ "$HTTP_STATUS" != "200" ]; then
    echo "Error: server returned HTTP ${HTTP_STATUS}."
    cat "$LIVE_DUMP" 2>/dev/null && echo ""
    rm -f "$LIVE_DUMP"
    echo "Local DB is unchanged. Backup: $BACKUP_FILE"
    exit 1
fi

if [ ! -s "$LIVE_DUMP" ]; then
    echo "Error: downloaded file is empty."
    rm -f "$LIVE_DUMP"
    exit 1
fi

DUMP_SIZE=$(du -sh "$LIVE_DUMP" | cut -f1)
echo "  ✓ Downloaded (${DUMP_SIZE}): $LIVE_DUMP"

# ── Decompress to a temp file ─────────────────────────────────────────────────
TEMP_SQL=$(mktemp /tmp/halo-db-XXXXXX.sql)
trap 'rm -f "$TEMP_SQL"' EXIT

echo "→ Decompressing..."
gunzip -c "$LIVE_DUMP" > "$TEMP_SQL"

# ── Import ────────────────────────────────────────────────────────────────────
echo "→ Importing into local DB..."
wp --path="$SITE_DIR" db import "$TEMP_SQL" --quiet

# ── Search-replace URLs ───────────────────────────────────────────────────────
echo "→ Replacing ${LIVE_URL} → ${LOCAL_URL}..."
wp --path="$SITE_DIR" search-replace \
    "$LIVE_URL" "$LOCAL_URL" \
    --all-tables --precise --quiet

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "✓ Done. Live database is now running locally."
echo ""
echo "  Live dump:    $LIVE_DUMP"
echo "  Local backup: $BACKUP_FILE"
echo ""
echo "  If anything looks wrong:"
echo "    wp --path=\"$SITE_DIR\" db import \"$BACKUP_FILE\""
