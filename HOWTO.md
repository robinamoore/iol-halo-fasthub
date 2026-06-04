# HALO FastHub — Developer How-To

A complete reference for building and maintaining the HALO FastHub WordPress site.

---

## Contents

1. [Architecture overview](#1-architecture-overview)
2. [Local dev setup](#2-local-dev-setup)
3. [Git workflow](#3-git-workflow)
4. [How sections work](#4-how-sections-work)
5. [Adding & editing content](#5-adding--editing-content)
6. [Brand tokens & CSS architecture](#6-brand-tokens--css-architecture)
7. [Adding a new section type](#7-adding-a-new-section-type)
8. [Case studies & news CPTs](#8-case-studies--news-cpts)
9. [Data-populate — seeding content](#9-data-populate)
10. [ACF meta key conventions](#10-acf-meta-key-conventions)
11. [Header & navigation](#11-header--navigation)
12. [Footer](#12-footer)
13. [Plugins in use](#13-plugins-in-use)
14. [Known patterns & gotchas](#14-known-patterns--gotchas)

---

## 1. Architecture overview

```
GeneratePress (parent)          — unmodified shell, never touch
  └─ generatepress-child/       — HALO brand tokens only
       style.css                — all custom CSS + brand tokens
       functions.php            — enqueues style.css + Montserrat font
       page.php                 — calls halo_render_sections() for every page
       single-iol_case_study.php — case study single template
       single-iol_news.php      — news article single template

wp-content/plugins/
  halo-acf/                     — owns ALL layout logic for pages
    halo-acf.php                — bootstrapper; loads fields + render, wires hooks
    fields.php                  — registers ACF flexible-content field group (PHP)
    render.php                  — one function per section layout; outputs HTML
    filter-pills.js             — JS for case study / news filter pills
    data-populate.php           — one-shot seeder; trigger via ?halo_populate=1
  halo-cpt/                     — iol_case_study, iol_news, iol_team CPTs + taxonomies

IOL shared plugins (symlinked from ~/Sites/IOL_housekit_plugins/):
  iol-base, iol-404, iol-cookies, iol-security, iol-seo,
  iol-redirect, iol-sitemap, iol-drawer, iol-forms, iol-tags,
  iol-duplicate-page, iol-hookmount
```

**Rules that must never be broken:**
- No `<style>` tags in PHP. No Customizer Additional CSS. All CSS lives in `style.css`.
- GP is untouched — no GP Customizer changes except mobile menu breakpoint filter.
- ACF Flexible Content only — no Gutenberg blocks, no GenerateBlocks.
- All PHP uses `halo_` prefix.

---

## 2. Local dev setup

**Stack:** Local by Flywheel (`halo.local`)

| Item | Value |
|---|---|
| Site URL | `http://halo.local` |
| WP Admin | `http://halo.local/wp-admin/` |
| Local site path | `~/Local Sites/halo/app/public/` |
| Repo path | `~/Sites/halo-fasthub/` |
| MySQL socket | `~/Library/Application Support/Local/run/m-5Xj088x/mysql/mysqld.sock` |
| MySQL binary | `/Applications/Local.app/Contents/Resources/extraResources/lightning-services/mysql-8.0.35+4/bin/darwin/bin/mysql` |

**Theme and plugins are symlinked** from the repo into Local — edit files in `~/Sites/halo-fasthub/`, WP reloads instantly.

**Fresh setup from repo:**
```bash
cd ~/Sites/halo-fasthub
git pull
bash scripts/setup-halo.sh
```

---

## 3. Git workflow

The repo at `~/Sites/halo-fasthub/` tracks the child theme and site plugins only. WP core and third-party plugins are not tracked.

**Remote:** `github.com/robinamoore/iol-halo-fasthub` (private)

Because the theme and plugins are **symlinked**, changes are live immediately. Commit directly from the repo:

```bash
cd ~/Sites/halo-fasthub
git add wp-content/plugins/halo-acf/render.php   # or whichever files changed
git commit -m "describe what changed and why"
git push
```

**Design mockups** (for client reference) live in `patterns/canonical/` — do not delete these.

---

## 4. How sections work

Every page uses `page.php` as its template:

```php
halo_render_sections( get_the_ID() );
```

This reads the `page_sections` ACF flexible content field and calls the matching renderer for each row.

### All 21 section layouts

| # | ACF layout name | Renderer | Description |
|---|---|---|---|
| 01 | `page_hero` | `halo_s_hero()` | Full-width dark hero, optional image, stat bar |
| 02 | `cta_band` | `halo_s_cta_band()` | Dark background, heading + CTAs |
| 03 | `section_intro` | `halo_s_section_intro()` | Eyebrow + heading + sub, centred or left |
| 04 | `column_layout` | `halo_s_columns()` | 2–4 column grid |
| 05 | `stat_grid` | `halo_s_stats()` | 2–5 large statistics |
| 06 | `story_rows` | `halo_s_story_rows()` | Alternating image + text rows |
| 07 | `pull_quote` | `halo_s_pull_quote()` | Large quote with attribution |
| 08 | `spec_table` | `halo_s_spec_table()` | 3-column tech spec table |
| 09 | `accordion` | `halo_s_accordion()` | FAQ — native `<details>/<summary>` |
| 10 | `timeline` | `halo_s_timeline()` | Numbered process steps |
| 11 | `logo_strip` | `halo_s_logo_strip()` | Horizontal logo row |
| 12 | `big_headline` | `halo_s_big_headline()` | Large linked sector headlines |
| 13 | `certifications` | `halo_s_certifications()` | Certification logos + titles |
| 14 | `case_study_grid` | `halo_s_cs_grid()` | WP_Query of iol_case_study + sector filter pills |
| 15 | `news_archive` | `halo_s_news_archive()` | WP_Query of iol_news + category filter pills |
| 16 | `related_case_studies` | `halo_s_related()` | 3 hand-picked or auto-latest case study cards |
| 17 | `article_body` | `halo_s_article_body()` | WYSIWYG content block |
| 18 | `enquiry_form` | `halo_s_enquiry_form()` | Delegates to iol_forms_render('enquiry') |
| 19 | `location` | `halo_s_location()` | Address + consent-gated Google Maps embed |
| 20 | `roi_calculator` | `halo_s_roi()` | Phase 2 placeholder panel |
| 21 | `card_picker` | `halo_s_card_picker()` | Team / case study / news cards |

### Section HTML pattern

Every section follows the same structure:

```html
<section class="halo-section halo-[name] halo-tone-{light|offwhite|warm|dark}">
    <div class="halo-inner">
        <!-- content here -->
    </div>
</section>
```

- **`.halo-section`** — base section wrapper
- **`.halo-inner`** — `max-width: var(--container); margin: 0 auto` — constrains content width
- **`.halo-tone-*`** — background colour; one of `light`, `offwhite`, `warm`, `dark`

---

## 5. Adding & editing content

In WP Admin → Pages → Edit, each page shows the **Page Sections** ACF panel. Click **Add section** to choose a layout and fill in the fields.

Each layout has a **Tone** field: `light` (white), `offwhite`, `warm`, or `dark` (black).

### Tone reference

| Tone | Background | Text |
|---|---|---|
| `light` | `#FFFFFF` | `--black` |
| `offwhite` | `#F7F5F2` | `--black` |
| `warm` | `#F0EBE3` | `--black` |
| `dark` | `#1A1A1A` | white |

---

## 6. Brand tokens & CSS architecture

All tokens are CSS custom properties in `:root` in `style.css`:

```css
--orange:    #F7A803   /* primary — CTAs, accents, eyebrow text */
--black:     #1A1A1A   /* headings, dark backgrounds */
--offwhite:  #F7F5F2   /* light section bg */
--warm:      #F0EBE3   /* warm section bg */
--mid:       #666666   /* body text, labels */
--container: 1280px
```

**Font:** Montserrat 400/500/600/700 — loaded from Google Fonts in `functions.php`.

**Never hardcode hex values in PHP templates.** Use `var(--orange)` etc. in CSS only.

---

## 7. Adding a new section type

**Step 1 — `fields.php`:** Add a new layout array inside the flexible content `layouts` array. Use `field_halo_` prefixed keys.

```php
[
    'key'        => 'layout_halo_myblock',
    'name'       => 'my_block',
    'label'      => 'My Block',
    'sub_fields' => [
        [ 'key' => 'field_halo_mb_heading', 'name' => 'heading', 'label' => 'Heading', 'type' => 'text' ],
        [ 'key' => 'field_halo_mb_tone',    'name' => 'tone',    'label' => 'Tone',    'type' => 'select',
          'choices' => [ 'light'=>'Light', 'offwhite'=>'Off-white', 'warm'=>'Warm', 'dark'=>'Dark' ],
          'default_value' => 'light' ],
    ],
],
```

**Step 2 — `render.php`:** Add a case in the `switch` in `halo_render_sections()`:

```php
case 'my_block': halo_s_myblock( $row ); break;
```

Then write the renderer:

```php
function halo_s_myblock( array $r ): void {
    $tone = halo_tone_class( $r['tone'] ?? 'light' );
    ?>
    <section class="halo-section halo-myblock <?php echo $tone; ?>">
        <div class="halo-inner">
            <h2><?php echo halo_t( $r['heading'] ?? '' ); ?></h2>
        </div>
    </section>
    <?php
}
```

**Step 3 — `style.css`:** Add section styles under the appropriate section comment:

```css
/* ── My Block ─────────────────────────────────────────── */
.halo-myblock { padding: 6rem 0; }
```

---

## 8. Case studies & news CPTs

### iol_case_study

- Archive: `/case-studies/`
- Taxonomy: `cs_sector` (Fleet / Workplace / Destination)
- ACF fields: `cs_client`, `cs_summary`, `cs_card_summary`, `cs_hero_image`, `cs_client_logo`, stats (3×value+label), flexible content `cs_sections` (story_rows + pull_quote layouts)
- Single template: `single-iol_case_study.php` in child theme

### iol_news

- Archive: `/news/`
- Taxonomy: `news_category` (Whitepaper / Article / Press / Webinar)
- ACF fields: `news_excerpt`, `news_read_time`, `news_hero_image`, flexible content `news_sections` (article_body layout)
- Single template: `single-iol_news.php` in child theme

### iol_team

- Non-public — admin only
- ACF fields: `team_role`, `team_photo`, `team_bio`

---

## 9. Data-populate

`data-populate.php` seeds all pages and taxonomy terms from scratch. Trigger by visiting:

```
http://halo.local/wp-admin/?halo_populate=1
```

(Requires `manage_options` capability — must be logged in as admin.)

**What it does:**
- Creates pages: Home, Product, Technical deep dive, Case Studies, About, News, Contact
- Sets Home as the static front page
- Seeds taxonomy terms: Fleet, Workplace, Destination (cs_sector) + Whitepaper, Article, Press, Webinar (news_category)

---

## 10. ACF meta key conventions

ACF stores flexible content in `wp_postmeta` with this naming pattern:

```
page_sections                           → serialised layout names array
page_sections_0_acf_fc_layout          → layout name of section 0
page_sections_0_{field_name}           → value for that field in section 0
_page_sections_0_{field_name}          → ACF field key reference (e.g. field_halo_hero_heading)
```

Field key references (underscore-prefixed rows) must match keys in `fields.php`. If mismatched, ACF shows empty values in admin even though data exists in the DB.

---

## 11. Header & navigation

The sticky header is on a white background. Logo is an image (`<img>`) — set via GP Customizer → Site Identity.

**CTA nav item:** Add class `menu-item-cta` to any nav item in WP Admin → Appearance → Menus to give it the orange pill button style.

**Mobile breakpoint** is set via PHP filter in `functions.php`:
```php
add_filter( 'generate_mobile_menu_media_query', function () {
    return '(max-width: 1100px)';
} );
```

Never override GP nav display with CSS `display` rules — use the `generate_mobile_menu_media_query` filter only.

---

## 12. Footer

The footer is output by `halo_render_footer()` in `render.php`, hooked to `generate_before_footer`. It is entirely custom PHP — not a GP widget area.

The GP native footer is hidden via CSS in `style.css`.

To update footer links or content, edit `halo_render_footer()` in `wp-content/plugins/halo-acf/render.php`.

---

## 13. Plugins in use

| Plugin | Source | Purpose |
|---|---|---|
| Advanced Custom Fields PRO | Commercial | Powers all page sections |
| halo-acf | This repo | ACF field registration + section rendering |
| halo-cpt | This repo | iol_case_study, iol_news, iol_team CPTs |
| GeneratePress | WP.org | Parent theme — unmodified shell |
| iol-base | IOL House Kit | Admin toolset dashboard |
| iol-404 | IOL House Kit | Custom 404 page |
| iol-cookies | IOL House Kit | GDPR consent + Google Consent Mode v2 |
| iol-security | IOL House Kit | WP fingerprint hiding, xmlrpc blocking |
| iol-seo | IOL House Kit | Meta + OG tags |
| iol-redirect | IOL House Kit | URL redirects |
| iol-sitemap | IOL House Kit | XML sitemap |
| iol-drawer | IOL House Kit | Off-canvas mobile nav |
| iol-forms | IOL House Kit | Enquiry form |
| iol-tags | IOL House Kit | Tag management |
| iol-duplicate-page | IOL House Kit | Duplicate page in admin |

**IOL plugins location:** `~/Sites/IOL_housekit_plugins/` — symlinked into Local.

---

## 14. Known patterns & gotchas

### GP full-width reset
GP's `.grid-container` and `.site-content` have `max-width` set. These are reset in `style.css`:
```css
.site.grid-container { max-width: none !important; padding: 0 !important; }
.site-content        { max-width: none !important; padding: 0 !important; display: block !important; }
```
If sections appear narrow, check these rules are loading.

### ACF `get_field()` vs raw postmeta
Always use `get_field()` in render functions — it processes image fields into arrays (`url`, `alt`, `width`, `height`). `get_post_meta()` returns the raw attachment ID.

### Consent-gated Maps embed
The `location` section checks `$_COOKIE['iol_consent_maps']` before loading the Google Maps iframe. If the cookie is not set, it shows a static image with a consent button. This is handled by the `iol-cookies` plugin.

### Filter pills JS
`filter-pills.js` (in halo-acf plugin) handles the data-term filtering for case study grid and news archive sections. It reads `data-term` on pill buttons and `data-terms` on cards.

### Spec table defaults
The `spec_table` section has hardcoded HALO FastHub defaults in `render.php` (12 spec rows). These can be overridden per-page via ACF fields, or the defaults can be edited directly in `halo_s_spec_table()`.

### data-populate.php in production
The `halo_populate` URL trigger is gated by `current_user_can('manage_options')` — safe to leave active. Do not re-run on a production site with real content as it will overwrite pages.

### WP_DEBUG
Ensure `WP_DEBUG = false` before deploying to production. Check `wp-config.php` in Local.
