# HALO FastHub — WordPress site repo

Site for HALO FastHub by 3ti Energy Hubs Ltd. B2B marketing site for EV charging infrastructure.

**Live URL (future):** https://fasthub.halo.energy  
**Local dev:** Local by Flywheel — site `halo` → `http://halo.local`

## Stack

Built on the **IOL House Kit** standard:

| Layer | Choice |
|---|---|
| Theme | GeneratePress (stock, free) + `generatepress-child` (HALO tokens only) |
| Builder | ACF Pro — Flexible Content (21 layouts) |
| CPTs | `iol_case_study`, `iol_news`, `iol_team` via `halo-cpt` plugin |
| Forms | `iol-forms` plugin — `enquiry` form |
| House Kit | Symlinked from `~/Sites/IOL_housekit_plugins/` |
| Font | Montserrat 400/500/600/700 (Google Fonts) |

## Repo layout

```
~/Sites/halo-fasthub/
├── wp-content/
│   ├── plugins/
│   │   ├── halo-acf/          ← all 21 page sections + render + filter JS
│   │   └── halo-cpt/          ← iol_case_study, iol_news, iol_team CPTs
│   └── themes/
│       └── generatepress-child/ ← HALO brand tokens only
├── patterns/
│   ├── canonical/             ← client-facing HTML mockups (do not delete)
│   └── components/            ← component design files
├── knowledge/
│   └── CLAUDE.md              ← auto-loaded by Claude in this dir
├── scripts/
│   └── setup-halo.sh          ← one-command local site setup
├── HOWTO.md                   ← full developer reference
└── README.md                  ← this file
```

Local site plugin and theme dirs are **symlinks** to this repo — edit here, WP reloads instantly.

## Fresh setup

```bash
cd ~/Sites/halo-fasthub
git pull
bash scripts/setup-halo.sh
```

Then visit `http://halo.local/wp-admin/?halo_populate=1` to seed pages and taxonomy terms.

## Brand tokens

```css
--orange:    #F7A803   /* primary — CTAs, accents, eyebrow text */
--black:     #1A1A1A   /* headings, dark backgrounds */
--offwhite:  #F7F5F2   /* light section bg */
--warm:      #F0EBE3   /* warm section bg */
--mid:       #666666   /* body text, labels */
--container: 1280px
```

## Key decisions

- **ACF Flexible Content only** — no Gutenberg blocks, no GenerateBlocks.
- **No WooCommerce.**
- **No security/SEO/cookies/redirect code in child theme** — those are shared iol-* plugins.
- **Child theme is brand-only** — Montserrat, HALO colour tokens, GP shell resets. Nothing else.
- **All PHP uses `halo_` prefix** to avoid collisions.
- **Design mockups** in `patterns/canonical/` are the visual spec — match these.
