# Mudlark Studio — WordPress site repo

Site for Mudlark Studio, a shared creative arts space in Wivenhoe, Essex (Katie, Caroline, Hannah, Sara).

**Live URL (future):** https://mudlark.studio
**Local dev:** Local by Flywheel — site `mudlark-studio` → `mudlark-studio.local`

## Stack

Built on the **IOL House Kit** standard (matches `christmassweater.store`):

| Layer | Choice |
|---|---|
| Theme | GeneratePress (stock, free) + this `generatepress-child` |
| Builder | GenerateBlocks + GenerateBlocks Pro |
| Data | Native WP CPT via `mudlark-cpt` plugin (no WooCommerce) |
| Payments | PayPal Buy Now buttons, per product (no cart) |
| Workshops | Ticket Tailor embed |
| Forms | WPForms Lite |
| House Kit | Symlinked from `~/Sites/IOL_housekit_plugins/` — iol-base, iol-security, iol-seo, iol-cookies, iol-drawer, iol-redirect, iol-tags, iol-404 |

See `~/Sites/IOL_housekit_playbook.md` for the per-site build sequence.

## Repo layout

```
~/Sites/mudlark-studio/
├── wp-content/
│   ├── plugins/
│   │   └── mudlark-cpt/              ← site-specific: mudlark_product CPT
│   └── themes/
│       └── generatepress-child/      ← Mudlark brand tokens only
├── migration/                        ← deploy checklist, redirect map, snapshots
├── knowledge/
│   ├── CLAUDE.md                     ← auto-loaded by Claude in this dir
│   └── decisions/YYYY-MM-DD-topic.md
└── scripts/                          ← pull-live, push-code, snapshot-prod
```

Local site plugin/theme dirs are symlinks to this repo — edit here, WP sees changes instantly.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Platform rebuild on IOL House Kit | 🟡 in progress (Apr 2026) |
| 1 | Single scrolling homepage + policy pages + Ticket Tailor | pending |
| 2 | Artist pages (4) + What's On + artist CMS roles | pending |
| 3 | `mudlark_product` CPT populated + PayPal buttons per product | scaffolded |

## Key decisions

- **No WooCommerce.** Products are pages with a `[mudlark_buy]` shortcode that renders the PayPal button. Low volume is intentional.
- **No inline security in child theme.** All hardening lives in `iol-security`.
- **Child theme is brand-only** — palette tokens, Amatic SC + Quicksand, Mudlark header/nav overrides. Nothing else.
- **PayPal button HTML** is stored verbatim on each product (admin paste-in). Hidden from REST for safety.
- **Ticket Tailor** is the only booking layer — no calendar plugin, no WC Bookings.
