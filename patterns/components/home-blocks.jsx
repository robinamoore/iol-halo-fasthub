// HALO FastHub — homepage-only blocks: a social-proof strip and a concise
// product highlight. Everything else on the homepage is reused from the
// existing landing + page systems. Tokens from brand-assets cross-script scope.

const {
  Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody,
  PrimaryButton, SecondaryButton,
} = window;

const HB_MONO = "Montserrat, sans-serif";

function HBLogoSlot({ id }) {
  return (
    <div style={{ height: "44px", width: "100%" }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="rect" placeholder="Client logo"
        style="width:100%;height:100%;display:block;"></image-slot>
    ` }} />
  );
}

// ============================================================
// SOCIAL PROOF STRIP — client logos + one headline proof stat
// ============================================================
function SocialProofStrip() {
  const logos = ["proof-logo-1", "proof-logo-2", "proof-logo-3", "proof-logo-4", "proof-logo-5"];
  return (
    <Section tone="offwhite" padY={56} id="proof-strip">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <div style={{ fontFamily: HB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>Trusted across</div>
          <div style={{ fontFamily: HB_MONO, fontSize: "18px", color: BLACK, fontWeight: 500, marginTop: "6px", letterSpacing: "-0.005em" }}>Fleets · Workplaces · Destinations</div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "28px", alignItems: "center", minWidth: "520px", opacity: 0.85 }}>
          {logos.map((id) => (
            <div key={id} style={{ height: "44px", background: "#E8E6DF", border: `1px solid ${LIGHTGREY}`, overflow: "hidden" }}>
              <HBLogoSlot id={id} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PRODUCT HIGHLIGHT — concise intro that drives to the Product page
// ============================================================
function ProductHighlight() {
  const tiles = [
    ["12", "charge points", "Type 2, fleet-sized"],
    ["1", "day on site", "Crane in, charging by evening"],
    ["0", "grid upgrade", "Behind your existing meter"],
  ];
  return (
    <Section tone="light" id="product-highlight">
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "72px", alignItems: "center" }}>
        <div>
          <SectionEyebrow>The product</SectionEyebrow>
          <LandingH2 max="18ch">One canopy. Four systems. Twelve chargers.</LandingH2>
          <div style={{ marginTop: "20px" }}>
            <LandingBody max="48ch">
              HALO FastHub bundles solar canopy, battery storage, mains integration and twelve charge points into a single leased unit — prefabricated, delivered whole and managed end-to-end by HALO OS.
            </LandingBody>
          </div>
          <div style={{ marginTop: "32px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="Product.html" style={{ textDecoration: "none" }}><SecondaryButton arrow>Explore the product</SecondaryButton></a>
            <a href="Technical deep dive.html" style={{ fontFamily: HB_MONO, fontSize: "15px", color: BLACK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${ORANGE}`, paddingBottom: "3px" }}>
              Technical deep dive <span style={{ color: ORANGE }}>→</span>
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {tiles.map(([n, u, note], i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "28px 22px", display: "flex", flexDirection: "column", gap: "14px", minHeight: "210px", justifyContent: "space-between" }}>
              <div style={{ fontFamily: HB_MONO, fontSize: "56px", fontWeight: 600, color: BLACK, letterSpacing: "-0.024em", lineHeight: 1 }}>{n}</div>
              <div>
                <div style={{ fontFamily: HB_MONO, fontSize: "13px", color: BLACK, fontWeight: 500 }}>{u}</div>
                <div style={{ fontFamily: HB_MONO, fontSize: "12px", color: MIDGREY, lineHeight: 1.45, marginTop: "6px" }}>{note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { SocialProofStrip, ProductHighlight });
