---
name: project-halo-fasthub-status
description: "HALO FastHub WP site — full build status, gaps, and steps to completion. READ THIS at the start of every Halo session."
metadata: 
  node_type: memory
  type: project
  originSessionId: 7fd757b1-08f3-4c20-bd6c-2a02256750c8
---

# HALO FastHub — Build Status

**Last updated:** 2026-06-05  
**Local:** `http://halo.local` | **Repo:** `~/Sites/halo-fasthub/` | **GitHub:** `github.com/robinamoore/iol-halo-fasthub` (private)  
**Live URL (future):** `https://fasthub.halo.energy`  
**Client:** 3ti Energy Hubs Ltd

---

## Stack

| Layer | Detail |
|---|---|
| Theme | GeneratePress (untouched parent) + `generatepress-child` (brand tokens + layout CSS only) |
| Builder | ACF Pro — Flexible Content, 21 layouts |
| CPTs | `iol_case_study`, `iol_news`, `iol_team` via `halo-cpt` plugin |
| Forms | Contact Form 7 via `iol-forms` / CF7 wired into ACF section |
| House Kit | IOL plugins (iol-base, iol-404, iol-cookies, iol-security, iol-seo, iol-redirect, iol-sitemap, iol-drawer, iol-tags) |
| Font | Montserrat 400–700 (Google Fonts, loaded in functions.php) |

---

## CSS Architecture — 3-Phase Waterfall

1. **GP Customizer** (`generate_settings`) → brand tokens as `:root` CSS vars:
   - `--contrast #000000` · `--charcoal #3D4647` · `--contrast-2 #8A8A8A`
   - `--contrast-3 #D8D8D8` · `--base #D8D8D8` · `--base-2 #F5F5F5`
   - `--base-3 #FFFFFF` · `--warm #E8E6DF` · `--accent #F7A803`
   - `--footer-bg #000000`
   - Also owns: typography, font sizes, spacing, nav item height, container width

2. **Component CSS** (`style.css` via IOL CSS Editor at `/wp-admin/admin.php?page=iol-css-editor`) → layout tokens + all 21 section styles. Uses GP vars throughout. **Never hardcode hex values here.**

3. **Additional CSS tab** → Customizer overrides for ad-hoc tweaks only.

**Rule:** No `<style>` tags in PHP. No CSS anywhere except in the waterfall above.

---

## 21 ACF Block Types

All registered in `fields.php`, rendered in `render.php`, styled in `style.css`.

| # | Layout key | Renderer | Status |
|---|---|---|---|
| 01 | `page_hero` | `halo_s_hero()` | ✅ 3 variants: split / compact / fullbleed |
| 02 | `cta_band` | `halo_s_cta_band()` | ✅ Working |
| 03 | `section_intro` | `halo_s_section_intro()` | ✅ Working |
| 04 | `column_layout` | `halo_s_columns()` | ✅ Working |
| 05 | `stat_grid` | `halo_s_stats()` | ✅ Working |
| 06 | `story_rows` | `halo_s_story_rows()` | ✅ Working |
| 07 | `pull_quote` | `halo_s_pull_quote()` | ✅ Working |
| 08 | `spec_table` | `halo_s_spec_table()` | ✅ Working (defaults to HALO spec) |
| 09 | `accordion` | `halo_s_accordion()` | ✅ Working |
| 10 | `timeline` | `halo_s_timeline()` | ✅ Working |
| 11 | `logo_strip` | `halo_s_logo_strip()` | ⚠️ Needs review vs canonical |
| 12 | `big_headline` | `halo_s_big_headline()` | ⚠️ Needs review |
| 13 | `certifications` | `halo_s_certifications()` | ⚠️ Needs review |
| 14 | `case_study_grid` | `halo_s_cs_grid()` | ⚠️ Needs review + real data |
| 15 | `news_archive` | `halo_s_news_archive()` | ⚠️ Needs review + real data |
| 16 | `related_case_studies` | `halo_s_related()` | ⚠️ Needs review |
| 17 | `article_body` | `halo_s_article_body()` | ⚠️ Needs review |
| 18 | `enquiry_form` | `halo_s_enquiry_form()` | ⚠️ CF7 form needs configuring |
| 19 | `location` | `halo_s_location()` | ⚠️ Needs Google Maps embed URL |
| 20 | `roi_calculator` | `halo_s_roi()` | 🔴 Phase 2 placeholder only |
| 21 | `card_picker` | `halo_s_card_picker()` | ⚠️ Needs review + team CPT data |

**Layout test page:** `/layout-test/` — has 22 rows (21 block types + 2nd hero instance for fullbleed variant demo).

---

## Canonical Designs

Static HTML mockups live at `~/Sites/halo-fasthub/patterns/canonical/` — **these are the visual spec, match these**.

Served locally via: `python3 -m http.server 8877 --bind 127.0.0.1` from `~/Sites/halo-fasthub/patterns/`  
Then view at `http://127.0.0.1:8877/canonical/Home.html` etc.

| File | Maps to WP page | Key blocks |
|---|---|---|
| Home.html | Home | LP_Hero (fullbleed), SocialProofStrip (logo strip), ProductHighlight (columns+stats), LP_CaseStudies (cs grid), CTABand |
| Product.html | Product | Fullbleed hero, Section intro, Story rows, Spec table, Accordion, Timeline |
| Technical deep dive.html | Technical deep dive | Deep spec content |
| Case studies.html | Case Studies | NB_CaseArchive (filterable cs grid) |
| Case study.html | iol_case_study single | NB_CaseHero, story rows, pull quote, related |
| About.html | About | NB_Team (card picker — team), timeline, certifications |
| News.html | News | NB_NewsArchive (filterable news grid) |
| Article.html | iol_news single | Article header + article body |
| Contact.html | Contact | Enquiry form, location |
| Sector.html | (sector landing pages) | Big headline variant |

---

## Seeded Pages & Content

**Pages** (7, all published): Home, Product, Technical deep dive, Case Studies, About, News, Contact  
**Case studies** (3 seeded): Harbourside Retail Park, Segen Ltd, Merseyside Police  
**News articles** (3 seeded): HALO FastHub deployed at Merseyside Police, Inside HALO smart-grid balancing, The 2026 fleet electrification gap  
**Team members**: CPT exists (`iol_team`), not yet populated with data

---

## Plugins

**Active (13):** ACF Pro, Contact Form 7, HALO ACF, HALO CPT, IOL Base, IOL 404, IOL Cookie Consent, IOL Mobile Menu Drawer, IOL Redirect, IOL Security, IOL SEO, IOL Sitemap, IOL Tags

**Inactive:** HubSpot All-In-One (installed, not yet wired up), IOL GP Hook Mount (installed, not needed for ACF build)

---

## Media Library

- 12 placeholder images imported (IDs 28–39) — Jun 4 terminal session
- Logo (ID 29) and favicon (ID 28) set in GP Customizer
- **Incomplete:** Placeholder images not yet assigned to ACF fields on seeded pages (hero images, case study images, news images, etc.)

---

## Git State

- **42 commits** total on `main`
- **20 commits ahead of origin** — nothing pushed to GitHub since the CSS architecture rebuild
- **Untracked:** `wp-content/themes/generatepress-child/images/logo-placeholder.png`
- GitHub remote: `https://github.com/robinamoore/iol-halo-fasthub.git`

---

## Gaps & Steps to Completion

### Phase 1 — Block refinement (CURRENT WORK)
Work through all 21 blocks on the layout test page, comparing against the canonical HTML designs. For each block:
1. View canonical reference (`http://127.0.0.1:8877/canonical/`)
2. View WP render (`http://halo.local/layout-test/`)
3. Edit `render.php` and/or `style.css` (via IOL CSS Editor or direct file edit in `~/Sites/halo-fasthub/`)
4. Verify in browser
5. Commit

**Priority order (top to bottom on layout test):**
- 01 Hero — 3 variants working; check sizing, spacing, fullbleed gradient against Home.html spec
- 02 CTA Band — check against canonical
- 03 Section Intro — check against canonical
- 04 Column Layout — ProductHighlight design uses a custom 2-col layout with stat tiles; check if block 04 covers it
- 05 Stat Grid — check card style against canonical
- 06 Story Rows — check image ratio, alternating order
- 07 Pull Quote — check max-width, typography
- 08 Spec Table — defaults look right; check header style
- 09 Accordion — check open/close animation, typography
- 10 Timeline — check step marker (canonical uses orange marker)
- 11 Logo Strip — compare with SocialProofStrip canonical (inline label + 5-col logo grid)
- 12 Big Headline — compare with Sector page canonical
- 13 Certifications — compare with About.html canonical
- 14 Case Study Grid — check card design, filter pills, data output with real seeded posts
- 15 News Archive — check card design, filter pills, data output
- 16 Related Case Studies — check 3-card layout
- 17 Article Body — check typography scale, blockquote style
- 18 Enquiry Form — CF7 form needs correct field configuration; check 2-col layout + contact details
- 19 Location — needs Google Maps embed URL from client; static map placeholder in meantime
- 20 ROI Calculator — Phase 2, leave as placeholder
- 21 Card Picker — check team card design against NB_Team canonical

### Phase 2 — Page assembly
Once blocks are refined, build actual page content for each seeded page using WP Admin ACF editor:
- Home (priority — this is the showcase page)
- Product
- Case Studies
- About
- News
- Contact
- Technical deep dive

### Phase 3 — Content population
- Add team members to `iol_team` CPT
- Assign real/placeholder images to all ACF image fields
- Add real copy to all page sections
- Populate full case study and news content

### Phase 4 — Pre-launch
- Configure CF7 enquiry form (fields, mail routing, thank-you message)
- Wire up HubSpot if required (plugin is installed but inactive)
- Set up Google Analytics / GTM via IOL Tags plugin
- Configure IOL SEO meta for all pages
- Set up Google Consent Mode v2 via IOL Cookie Consent
- Set up IOL Redirect for any old URLs
- Configure IOL Sitemap exclusions
- Test mobile responsiveness across all breakpoints
- Push all commits to GitHub
- Deploy to Clook (or agreed host) and point `fasthub.halo.energy`

### Phase 5 — Post-launch
- Build ROI calculator (Phase 2 feature — placeholder in block 20)
- Add sector landing pages (Sector.html canonical exists)
- Populate with real photography when available

---

## Key File Locations

| What | Where |
|---|---|
| ACF fields | `~/Sites/halo-fasthub/wp-content/plugins/halo-acf/fields.php` |
| Section renderers | `~/Sites/halo-fasthub/wp-content/plugins/halo-acf/render.php` |
| Component CSS | `~/Sites/halo-fasthub/wp-content/themes/generatepress-child/style.css` |
| CSS Editor (admin) | `http://halo.local/wp-admin/admin.php?page=iol-css-editor` |
| Layout test page | `http://halo.local/layout-test/` |
| Canonical designs | `~/Sites/halo-fasthub/patterns/canonical/` (serve via python http.server 8877) |
| Data seeder | `http://halo.local/wp-admin/?halo_populate=1` |
| WP Admin | `http://halo.local/wp-admin/` |
| DB socket | `~/Library/Application Support/Local/run/m-5Xj088x/mysql/mysqld.sock` (DB name: `local`) |
| HOWTO | `~/Sites/halo-fasthub/HOWTO.md` |

---

**Why:** Robin is building the HALO FastHub marketing site for 3ti Energy Hubs Ltd. ACF Flexible Content is the page builder. The canonical HTML mockups are the design spec. We're closing the gap between canonical and WP block by block.
