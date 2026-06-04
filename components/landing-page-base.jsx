// HALO FastHub — example landing page
// Single React tree assembled from the Stage 1 + Stage 2 components.
// Loaded by "Landing page.html" after all component scripts.

// Constants and primitives come from cross-script scope (brand-assets.jsx).
// Shared components come from window (registered by each component script).
const {
  HaloFastHubLogo,
  BrandPattern,
  HaloMark,
  HaloGlyph,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  SectorCard,
  CaseStudyCard,
  StickyNav,
  Footer,
  InstallationDrawing,
  DashboardDrawing,
  FeatureCardDark,
} = window;

// ---- Local typography helpers (slightly different scale from artboards) ----
const CONTENT_MAX = 1280;
const SECTION_PAD_X = 80;
const SECTION_PAD_Y = 96;

function Section({ tone = "light", children, id, padY = SECTION_PAD_Y, style = {} }) {
  const bg = tone === "dark" ? BLACK : tone === "charcoal" ? CHARCOAL : tone === "warm" ? "#E8E6DF" : tone === "offwhite" ? OFFWHITE : WHITE;
  return (
    <section id={id} style={{ background: bg, padding: `${padY}px ${SECTION_PAD_X}px`, position: "relative", overflow: "hidden", ...style }}>
      <div style={{ maxWidth: `${CONTENT_MAX}px`, margin: "0 auto", position: "relative" }}>{children}</div>
    </section>
  );
}

function SectionEyebrow({ children, mode = "light", number }) {
  const fg = mode === "dark" ? "rgba(255,255,255,0.6)" : MIDGREY;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "Montserrat", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: fg, marginBottom: "32px" }}>
      {number && <span style={{ color: mode === "dark" ? WHITE : BLACK, fontWeight: 500 }}>{number}</span>}
      {number && <span style={{ width: "24px", height: "1px", background: fg }} />}
      <span>{children}</span>
    </div>
  );
}

function LandingH1({ children, mode = "light", size = 88, max = "20ch" }) {
  return (
    <h1 style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: `${size}px`,
      fontWeight: 500,
      letterSpacing: "-0.022em",
      lineHeight: 1.02,
      color: mode === "dark" ? WHITE : BLACK,
      maxWidth: max,
      margin: 0,
      textWrap: "balance",
    }}>{children}</h1>
  );
}

function LandingH2({ children, mode = "light", size = 56, max = "22ch" }) {
  return (
    <h2 style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: `${size}px`,
      fontWeight: 500,
      letterSpacing: "-0.018em",
      lineHeight: 1.06,
      color: mode === "dark" ? WHITE : BLACK,
      maxWidth: max,
      margin: 0,
      textWrap: "balance",
    }}>{children}</h2>
  );
}

function LandingSub({ children, mode = "light", size = 20, max = "52ch" }) {
  return (
    <p style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: `${size}px`,
      fontWeight: 400,
      lineHeight: 1.4,
      color: mode === "dark" ? "rgba(255,255,255,0.7)" : MIDGREY,
      maxWidth: max,
      margin: 0,
      textWrap: "pretty",
    }}>{children}</p>
  );
}

function LandingBody({ children, mode = "light", size = 16, max = "60ch" }) {
  return (
    <p style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: `${size}px`,
      fontWeight: 400,
      lineHeight: 1.6,
      color: mode === "dark" ? "rgba(255,255,255,0.78)" : BLACK,
      maxWidth: max,
      margin: 0,
    }}>{children}</p>
  );
}

Object.assign(window, { Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody });
