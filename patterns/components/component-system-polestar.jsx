// Stage 2 — Polestar-blended layout patterns (slides 17-19).
//   17 · Headline navigation list   — massive type as wayfinding links
//   18 · Dark feature cards + promo band
//   19 · Big-headline section + inline arrow links + footer link row

// ---------- C17 · Headline navigation list ----------
function MegaLink({ children }) {
  return (
    <a href="#" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "24px 0",
      borderTop: `1px solid ${BLACK}`,
      textDecoration: "none",
      color: BLACK,
      fontFamily: "Montserrat",
      fontSize: "76px",
      fontWeight: 500,
      letterSpacing: "-0.018em",
      lineHeight: 1,
    }}>
      <span>{children}</span>
      <span style={{ fontSize: "56px", color: BLACK, fontWeight: 300 }}>›</span>
    </a>
  );
}

function CMP_MegaNav() {
  return (
    <ArtboardFrame label="17 · Headline navigation list">
      <ArtboardTopRule number="11 / 14" kicker="Headline navigation list" page="Page 17" />
      <ArtboardTitle title="Wayfinding at scale." sub="Massive type as the next-step menu — used at the foot of long pages" titleSize={40} />

      <div style={{ marginBottom: "12px" }}>
        <MegaLink>Book a site survey</MegaLink>
        <MegaLink>Read the case studies</MegaLink>
        <MegaLink>Watch the demo</MegaLink>
        <div style={{ borderBottom: `1px solid ${BLACK}` }} />
      </div>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Body size={13} max="80ch">
          Each row routes to a page. Treat them like a hero — never more than four. Pair with a quieter CTA cluster below for the primary enquiry path.
        </Body>
        <div style={{ display: "flex", gap: "12px" }}>
          <SecondaryButton small arrow>See all sectors</SecondaryButton>
          <PrimaryButton small>Make an enquiry</PrimaryButton>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C18 · Dark feature cards + promo band ----------
function PromoBandCTA({ children }) {
  return (
    <button style={{
      background: "transparent",
      color: WHITE,
      border: `1px solid ${WHITE}`,
      padding: "12px 22px",
      borderRadius: "999px",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: "13px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
    }}>
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}

function FeatureCardDark({ title, link }) {
  return (
    <div style={{ background: CHARCOAL, color: WHITE, padding: "32px 32px 28px", height: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <H2 mode="dark" size={28}>{title}</H2>
      <a href="#" style={{
        textDecoration: "none",
        color: WHITE,
        fontSize: "13px",
        fontFamily: "Montserrat",
        fontWeight: 400,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}>
        {link} <span style={{ color: ORANGE }}>→</span>
      </a>
    </div>
  );
}

function CMP_DarkFeatures() {
  return (
    <ArtboardFrame label="18 · Dark feature cards & promo band">
      <ArtboardTopRule number="12 / 14" kicker="Dark feature cards & promo band" page="Page 18" />
      <ArtboardTitle title="Featured offers, anchored together." sub="Black promo band over three dark feature cards with orange link accents" titleSize={40} />

      {/* Promo band */}
      <div style={{ background: BLACK, color: WHITE, padding: "40px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", marginBottom: "20px" }}>
        <div style={{ fontFamily: "Montserrat", fontSize: "34px", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.012em", maxWidth: "60ch" }}>
          From £2,500 / month — installed in one day, no grid upgrade required<sup style={{ fontSize: "16px", verticalAlign: "super", marginLeft: "2px" }}>1</sup>.
        </div>
        <PromoBandCTA>Make an enquiry</PromoBandCTA>
      </div>

      {/* Feature cards */}
      <div>
        <H2 size={28}>Learn more about HALO FastHub</H2>
        <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <FeatureCardDark title="Performance" link="Explore features" />
          <FeatureCardDark title="Charging" link="Discover the hub" />
          <FeatureCardDark title="Lease & ROI" link="See the model" />
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Body size={12} max="80ch">
          <span style={{ color: MIDGREY }}>1. Indicative starting lease. Final price subject to site survey and term. See full disclosure on the lease page.</span>
        </Body>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C19 · Big-headline section + footer link row ----------
function ArrowInlineLink({ children }) {
  return (
    <a href="#" style={{
      textDecoration: "none",
      color: BLACK,
      fontSize: "15px",
      fontFamily: "Montserrat",
      fontWeight: 400,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    }}>
      {children} <span style={{ color: BLACK }}>→</span>
    </a>
  );
}

function FooterLinkRow({ label }) {
  return (
    <a href="#" style={{
      textDecoration: "none",
      color: BLACK,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: `1px solid ${BLACK}`,
      fontFamily: "Montserrat",
      fontSize: "22px",
      fontWeight: 500,
      letterSpacing: "-0.005em",
    }}>
      <span>{label}</span>
      <span style={{ fontSize: "18px", fontWeight: 300 }}>→</span>
    </a>
  );
}

function CMP_BigSection() {
  return (
    <ArtboardFrame label="19 · Big-headline section & footer links">
      <ArtboardTopRule number="13 / 14" kicker="Big-headline section & footer link row" page="Page 19" />
      <ArtboardTitle title="One word, two sub-links." sub="A single huge headline becomes a section, with inline arrow links beneath" titleSize={40} />

      {/* Big-headline sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <div style={{ borderTop: `1px solid ${LIGHTGREY}`, padding: "32px 0", display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "baseline" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "88px", fontWeight: 500, color: BLACK, letterSpacing: "-0.022em", lineHeight: 1 }}>Charging</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "560px", paddingBottom: "12px" }}>
            <Body size={14} max="60ch">
              Reduce site supply costs by up to 70% with on-site solar and HALO smart-grid. Set your own tariff and retain 100% of charging revenue.
            </Body>
            <div style={{ display: "flex", gap: "32px" }}>
              <ArrowInlineLink>Public charging</ArrowInlineLink>
              <ArrowInlineLink>HALO smart-grid</ArrowInlineLink>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${LIGHTGREY}`, padding: "32px 0", display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "baseline" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "88px", fontWeight: 500, color: BLACK, letterSpacing: "-0.022em", lineHeight: 1 }}>Sectors</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "560px", paddingBottom: "12px" }}>
            <Body size={14} max="60ch">
              Designed for any organisation with 50+ parking spaces undergoing EV transition. Three deployment patterns, one platform.
            </Body>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <ArrowInlineLink>Fleets</ArrowInlineLink>
              <ArrowInlineLink>Workplaces</ArrowInlineLink>
              <ArrowInlineLink>Destinations</ArrowInlineLink>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${LIGHTGREY}` }} />
      </div>

      {/* Footer link row */}
      <div style={{ marginTop: "32px" }}>
        <Eyebrow>Footer link row · cross-page wayfinding</Eyebrow>
        <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <FooterLinkRow label="Fleet & business" />
          <FooterLinkRow label="View case studies" />
          <FooterLinkRow label="Newsletter sign-up" />
        </div>
      </div>
    </ArtboardFrame>
  );
}

Object.assign(window, {
  CMP_MegaNav,
  CMP_DarkFeatures,
  CMP_BigSection,
  CMP_PatternBackdrop,
  FeatureCardDark,
});

// ---------- C20 · Soft-keyline pattern as backdrop ----------
// Warm-grey backdrop (#E8E6DF) with the white-keyline pattern overlay.
// White info cards float on top with a 1px light-grey keyline.
const WARMGREY_BG = "#E8E6DF";
function CMP_PatternBackdrop() {
  return (
    <ArtboardFrame label="20 · Warm-grey backdrop">
      <ArtboardTopRule number="14 / 14" kicker="Warm-grey backdrop" page="Page 20" />
      <ArtboardTitle title="Warm grey as soft surface." sub="Warm-grey #E8E6DF stands in for the brand pattern when a quiet, calm surface is wanted · white cards float in the foreground" titleSize={40} />

      {/* Sample 1 — stat cards floating on warm grey */}
      <div style={{ position: "relative", padding: "56px 48px", marginBottom: "20px", background: WARMGREY_BG, overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
            <div>
              <Eyebrow>The hub, in numbers</Eyebrow>
              <div style={{ marginTop: "10px" }}>
                <H2 size={36}>One day on site. Decades of charging.</H2>
              </div>
            </div>
            <SecondaryButton small arrow>See full specs</SecondaryButton>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              ["12", "charge points", "Capacity"],
              ["1", "day install", "Speed"],
              ["19.32", "kWp solar", "Generation"],
              ["64k", "EV miles / yr", "Solar mileage"],
            ].map(([n, u, lbl], i) => (
              <div key={i} style={{ background: WHITE, padding: "24px 24px 20px", boxShadow: "0 1px 0 rgba(0,0,0,0.04)", border: `1px solid ${LIGHTGREY}` }}>
                <Eyebrow>{lbl}</Eyebrow>
                <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontFamily: "Montserrat", fontSize: "44px", fontWeight: 500, color: BLACK, letterSpacing: "-0.018em", lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: "13px", color: MIDGREY }}>{u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample 2 — quote card + small action card on warm grey */}
      <div style={{ position: "relative", padding: "48px 48px", background: WARMGREY_BG, overflow: "hidden", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
        <div style={{ position: "relative", background: WHITE, padding: "32px", border: `1px solid ${LIGHTGREY}` }}>
          <div style={{ width: "32px", height: "1px", background: ORANGE, marginBottom: "16px" }} />
          <div style={{ fontFamily: "Montserrat", fontSize: "22px", fontWeight: 400, color: BLACK, lineHeight: 1.35, letterSpacing: "-0.005em", maxWidth: "44ch" }}>
            FastHub allows us to provide flexible charging for our diverse fleet — integral to our sustainability strategy.
          </div>
          <div style={{ marginTop: "20px", fontSize: "12px", color: MIDGREY }}>
            Keith Dickinson · Merseyside Police
          </div>
        </div>

        <div style={{ position: "relative", background: WHITE, padding: "28px 28px 24px", border: `1px solid ${LIGHTGREY}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Eyebrow>Next step</Eyebrow>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 500, color: BLACK, lineHeight: 1.25, letterSpacing: "-0.005em", marginBottom: "16px" }}>
              Book a free site assessment today.
            </div>
            <PrimaryButton small>Make an enquiry</PrimaryButton>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}
