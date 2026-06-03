# HALO FastHub — working directory context

Auto-loaded by Claude when working in this repo.

## Stack

Built on the IOL House Kit pattern (same as Mudlark Studio).

- Theme: GeneratePress + `generatepress-child` (HALO brand tokens only)
- Data: ACF Flexible Content via `halo-acf` plugin
- CPTs: `iol_case_study`, `iol_news`, `iol_team` via `halo-cpt` plugin
- Shared IOL plugins: symlinked from `~/Sites/IOL_housekit_plugins/` (iol-seo, iol-cookies, iol-security, iol-redirect, iol-sitemap, iol-drawer, iol-forms)

## Where things live

- **Site repo (this dir):** `~/Sites/halo-fasthub/`
  - `wp-content/themes/generatepress-child/` — brand CSS + minimal functions.php + page.php
  - `wp-content/plugins/halo-acf/` — all 21 page sections as ACF Flexible Content layouts
  - `wp-content/plugins/halo-cpt/` — iol_case_study, iol_news, iol_team CPTs + taxonomies
- **Local WP site:** `~/Local Sites/halo-fasthub/app/public/`
  - Plugin + theme dirs are **symlinks** back to this repo — edit here, WP reloads instantly
- **Shared IOL plugins:** `~/Sites/IOL_housekit_plugins/` (symlinked in)
- **Design mockups:** `patterns/canonical/` and `patterns/components/` in this repo

## ACF sections (all 21)

Flexible Content layouts in `halo-acf/fields.php`, rendered in `halo-acf/render.php`.

| # | Layout name | Usage |
|---|---|---|
| 01 | `page_hero` | Full-width dark hero, optional image, stat bar |
| 02 | `cta_band` | Dark background, heading + CTAs |
| 03 | `section_intro` | Eyebrow + heading + sub, centred or left |
| 04 | `column_layout` | 2–4 column grid with image/title/body/link per item |
| 05 | `stat_grid` | 2–5 large statistics |
| 06 | `story_rows` | Alternating image + text rows |
| 07 | `pull_quote` | Large quote text with attribution |
| 08 | `spec_table` | 3-column tech spec table (defaults to HALO spec) |
| 09 | `accordion` | FAQ — uses native `<details>/<summary>` |
| 10 | `timeline` | Numbered process steps |
| 11 | `logo_strip` | Horizontal logo row |
| 12 | `big_headline` | Large linked sector headlines |
| 13 | `certifications` | Certification logos + titles |
| 14 | `case_study_grid` | WP_Query of iol_case_study with sector filter pills |
| 15 | `news_archive` | WP_Query of iol_news with category filter pills |
| 16 | `related_case_studies` | 3 hand-picked or auto-latest case study cards |
| 17 | `article_body` | WYSIWYG content block |
| 18 | `enquiry_form` | Delegates to iol_forms_render('enquiry') |
| 19 | `location` | Address + consent-gated Google Maps embed |
| 20 | `roi_calculator` | Phase 2 placeholder panel |
| 21 | `card_picker` | Team / case study / news cards from relationship fields |

## Brand tokens

```css
--orange:    #F7A803  /* primary — CTAs, accents, eyebrow text */
--black:     #1A1A1A  /* headings, dark backgrounds */
--offwhite:  #F7F5F2  /* light section bg */
--warm:      #F0EBE3  /* warm section bg */
--mid:       #666666  /* body text, labels */
--container: 1280px
```

Font: **Montserrat** 400/500/600/700 (Google Fonts).

## Tone system

Each section has a `tone` field: `light` (white) / `offwhite` / `warm` / `dark` (black).  
CSS class applied: `halo-tone-{tone}`.

## CPTs

- `iol_case_study` — archive at `/case-studies/`, taxonomy `cs_sector` (Fleet / Workplace / Destination)
- `iol_news` — archive at `/news/`, taxonomy `news_category` (Whitepaper / Article / Press / Webinar)
- `iol_team` — non-public, shows in admin only

## Build rules

1. No security/SEO/cookies/redirect code in child theme — those are shared iol-* plugins.
2. No WooCommerce.
3. Design mockups in `patterns/` are the visual spec.
4. All ACF field labels must be human-readable — a non-technical editor will use them.
5. All PHP uses `halo_` prefix to avoid collisions.

## Seed demo content

Visit `/wp-admin/?halo_populate=1` after activating plugins to seed demo content.
