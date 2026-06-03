// Stage 1 — Brand Assets. All artboards 1400×990 (A4 landscape).

const ORANGE = "#F7A803";
const BLACK = "#1A1A1A";
const WHITE = "#FFFFFF";
const OFFWHITE = "#F5F5F5";
const MIDGREY = "#8A8A8A";
const LIGHTGREY = "#D8D8D8";
const CHARCOAL = "#2C2C2C";

const ARTBOARD_W = 1400;
const ARTBOARD_H = 990;
const ARTBOARD_PAD = 56;

// ========== Type primitives ==========

function Eyebrow({ children, mode = "light" }) {
  return (
    <span
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "11px",
        color: mode === "dark" ? "rgba(255,255,255,0.55)" : MIDGREY,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  );
}

function H1({ children, mode = "light", size = 96 }) {
  return (
    <h1
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: `${size}px`,
        fontWeight: 600,
        color: mode === "dark" ? WHITE : BLACK,
        margin: 0,
        lineHeight: 0.98,
        letterSpacing: "-0.018em",
      }}
    >
      {children}
    </h1>
  );
}

function H2({ children, mode = "light", size = 44 }) {
  return (
    <h2
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: `${size}px`,
        fontWeight: 500,
        color: mode === "dark" ? WHITE : BLACK,
        margin: 0,
        lineHeight: 1.05,
        letterSpacing: "-0.012em",
      }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children, size = 16, mode = "light" }) {
  return (
    <div
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: `${size}px`,
        fontWeight: 400,
        color: mode === "dark" ? "rgba(255,255,255,0.65)" : MIDGREY,
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  );
}

function Body({ children, mode = "light", size = 14, max = "58ch" }) {
  return (
    <p
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: `${size}px`,
        fontWeight: 400,
        color: mode === "dark" ? "rgba(255,255,255,0.82)" : BLACK,
        margin: 0,
        lineHeight: 1.6,
        maxWidth: max,
      }}
    >
      {children}
    </p>
  );
}

// Spec row — key / value with dotted leader between them.
function SpecRow({ label, value, mode = "light", emphasised = false }) {
  const muted = mode === "dark" ? "rgba(255,255,255,0.55)" : MIDGREY;
  const fg = mode === "dark" ? WHITE : BLACK;
  const dot = mode === "dark" ? "rgba(255,255,255,0.22)" : LIGHTGREY;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", padding: "9px 0", fontSize: "12px", borderTop: `1px solid ${dot}` }}>
      <span style={{ color: muted, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "10px", minWidth: "100px", flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, borderBottom: `1px dotted ${dot}`, transform: "translateY(-3px)", marginInline: "2px" }} />
      <span style={{ color: fg, fontWeight: emphasised ? 500 : 400, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function VerticalLabel({ children, mode = "light" }) {
  return (
    <div
      style={{
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "10px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: mode === "dark" ? "rgba(255,255,255,0.5)" : MIDGREY,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

// Top rule with chapter meta + page meta — used at the head of every artboard.
function ArtboardTopRule({ number, kicker, page, mode = "light" }) {
  const rule = mode === "dark" ? "rgba(255,255,255,0.20)" : LIGHTGREY;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: `1px solid ${rule}`, marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
        <span style={{ fontFamily: "Montserrat", fontSize: "11px", fontWeight: 500, color: mode === "dark" ? "rgba(255,255,255,0.6)" : MIDGREY, letterSpacing: "0.18em" }}>
          {number}
        </span>
        <Eyebrow mode={mode}>{kicker}</Eyebrow>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <HaloLogo height={18} mode={mode === "dark" ? "light" : "dark"} />
        <span style={{ fontSize: "11px", color: mode === "dark" ? "rgba(255,255,255,0.5)" : MIDGREY, letterSpacing: "0.12em" }}>{page}</span>
      </div>
    </div>
  );
}

// Title block — H2 + sub-heading paired the canonical way.
function ArtboardTitle({ title, sub, mode = "light", titleSize = 52 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "64px", alignItems: "end", marginBottom: "32px" }}>
      <H2 mode={mode} size={titleSize}>{title}</H2>
      {sub && <SubHeading size={16} mode={mode}>{sub}</SubHeading>}
    </div>
  );
}

function ArtboardFrame({ mode = "light", children, label }) {
  return (
    <div
      data-screen-label={label}
      style={{
        width: `${ARTBOARD_W}px`,
        height: `${ARTBOARD_H}px`,
        background: mode === "dark" ? BLACK : WHITE,
        color: mode === "dark" ? WHITE : BLACK,
        fontFamily: "Montserrat, sans-serif",
        padding: `${ARTBOARD_PAD}px`,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

// ========== A1 · Cover ==========
function BA_Cover() {
  return (
    <ArtboardFrame label="01 · Cover" mode="dark">
      <ArtboardTopRule number="01 / 06" kicker="Brand · assets · V1.0 · April 2026" page="Cover" mode="dark" />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: `${ARTBOARD_H - ARTBOARD_PAD * 2 - 60}px` }}>
        {/* Hero */}
        <div style={{ paddingTop: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <div style={{ width: "48px", height: "1px", background: ORANGE }} />
            <Eyebrow mode="dark">Stage 01 of 04 · Brand</Eyebrow>
          </div>

          <H1 mode="dark" size={124}>
            Visual<br />
            system.
          </H1>

          <div style={{ marginTop: "28px", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <SubHeading size={20} mode="dark">Logos · colour · typography · pattern · pills</SubHeading>
            <Body mode="dark" size={15} max="56ch">
              Distilled directly from the official HALO FastHub brand guidelines (Ben Horsley-Summer, The Null Co). The working reference for everything downstream — components, wireframes, designs.
            </Body>
          </div>
        </div>

        {/* Spec sheet footer */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderTop: "1px solid rgba(255,255,255,0.22)", paddingTop: "16px" }}>
            {[
              ["Stage", "01 of 04", null, null],
              ["Reference", "Official guidelines V1.0", null, null],
              ["Authored by", "Ben Horsley-Summer · The Null Co", "Adapted for web by", "Robin Moore"],
              ["Status", "In review · April 2026", null, null],
            ].map(([k, v, k2, v2], i) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingRight: "24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", paddingLeft: i > 0 ? "24px" : 0 }}>
                <Eyebrow mode="dark">{k}</Eyebrow>
                <span style={{ fontSize: "12px", color: WHITE, fontWeight: 400 }}>{v}</span>
                {k2 && (
                  <>
                    <Eyebrow mode="dark">{k2}</Eyebrow>
                    <span style={{ fontSize: "12px", color: WHITE, fontWeight: 400 }}>{v2}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <FastHubLogo height={13} mode="light" />
              <span style={{ textTransform: "uppercase" }}>by 3ti Energy Hubs Ltd.</span>
            </div>
            <span style={{ color: WHITE, fontWeight: 500, fontSize: "12px" }}>01 / 06</span>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ========== A2 · Logo system ==========
function LogoSpecCard({ bg, label, mode = "light", children, border = false, height = 220 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: bg,
          padding: "0 56px",
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          border: border ? `1px solid ${LIGHTGREY}` : "none",
          position: "relative",
        }}
      >
        {children}
        <span style={{ position: "absolute", top: "14px", right: "16px", fontSize: "10px", color: mode === "dark" ? "rgba(255,255,255,0.45)" : MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          {mode === "dark" ? "Light on dark" : "Dark on light"}
        </span>
      </div>
      <div style={{ paddingTop: "12px" }}>
        <SpecRow label="Variant" value={label} />
        <SpecRow label="Formats" value="JPG · PNG · PDF · SVG · EPS" />
      </div>
    </div>
  );
}

function BA_Logos() {
  return (
    <ArtboardFrame label="02 · Logo system">
      <ArtboardTopRule number="02 / 06" kicker="Logo system" page="Page 02" />
      <ArtboardTitle title="Two wordmarks. One brand." sub="HALO standalone · FastHub standalone · dual lockup" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        <LogoSpecCard bg={WHITE} border label="HALO · primary" mode="light" height={170}>
          <HaloLogo height={56} mode="dark" />
        </LogoSpecCard>
        <LogoSpecCard bg={BLACK} label="HALO · reversed" mode="dark" height={170}>
          <HaloLogo height={56} mode="light" />
        </LogoSpecCard>
        <LogoSpecCard bg={WHITE} border label="FastHub · primary" mode="light" height={170}>
          <FastHubLogo height={40} mode="dark" />
        </LogoSpecCard>
        <LogoSpecCard bg={BLACK} label="FastHub · reversed" mode="dark" height={170}>
          <FastHubLogo height={40} mode="light" />
        </LogoSpecCard>
      </div>

      {/* Dual lockup with clear-space markers */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        <div>
          <Eyebrow>Dual lockup · clear-space ≥ ×O</Eyebrow>
          <div style={{ marginTop: "10px", background: OFFWHITE, height: "150px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", left: "24px", top: "24px", bottom: "24px", display: "flex", alignItems: "center" }}>
              <div style={{ width: "1px", height: "100%", background: ORANGE, opacity: 0.5 }} />
            </div>
            <div style={{ position: "absolute", right: "24px", top: "24px", bottom: "24px", display: "flex", alignItems: "center" }}>
              <div style={{ width: "1px", height: "100%", background: ORANGE, opacity: 0.5 }} />
            </div>
            <HaloFastHubLogo height={46} mode="dark" />
          </div>
        </div>
        <div style={{ paddingTop: "26px" }}>
          <SpecRow label="Spacing" value="= cap-height of O" emphasised />
          <SpecRow label="Min height" value="32 px" emphasised />
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ========== A3 · Colour ==========
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

const COLOURS = [
  { name: "Brand orange", hex: ORANGE, role: "Reserved for primary CTAs", text: BLACK, bordered: false, cmyk: "0 / 33 / 100 / 4", primary: true },
  { name: "Black", hex: BLACK, role: "Type & dark sections", text: WHITE, bordered: false, cmyk: "0 / 0 / 0 / 90" },
  { name: "Charcoal", hex: CHARCOAL, role: "Dark section variant", text: WHITE, bordered: false, cmyk: "0 / 0 / 0 / 83" },
  { name: "Mid-grey", hex: MIDGREY, role: "Section labels", text: WHITE, bordered: false, cmyk: "0 / 0 / 0 / 46" },
  { name: "Light grey", hex: LIGHTGREY, role: "Dividers · borders", text: BLACK, bordered: false, cmyk: "0 / 0 / 0 / 15" },
  { name: "Off-white", hex: OFFWHITE, role: "Alternate sections", text: BLACK, bordered: true, cmyk: "0 / 0 / 0 / 4" },
  { name: "White", hex: WHITE, role: "Dominant canvas", text: BLACK, bordered: true, cmyk: "0 / 0 / 0 / 0" },
];

function ColourCard({ c }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: c.hex,
          height: "300px",
          border: c.bordered ? `1px solid ${LIGHTGREY}` : "none",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {c.primary ? (
          <span style={{ color: c.text, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Primary accent</span>
        ) : <span />}
        <div style={{ color: c.text, fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1 }}>{c.hex}</div>
      </div>
      <div style={{ paddingTop: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: BLACK, marginBottom: "4px" }}>{c.name}</div>
        <SpecRow label="RGB" value={hexToRgb(c.hex)} />
        <SpecRow label="CMYK" value={c.cmyk} />
        <SpecRow label="Role" value={c.role} />
      </div>
    </div>
  );
}

function BA_Colour() {
  return (
    <ArtboardFrame label="03 · Colour">
      <ArtboardTopRule number="03 / 06" kicker="Colour" page="Page 03" />
      <ArtboardTitle title="One accent. Three neutrals." sub="Orange used sparingly — black, white and grey carry the rest" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "16px" }}>
        {COLOURS.map((c) => (
          <ColourCard key={c.hex} c={c} />
        ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "12px" }}>
          <Eyebrow>Proportion · indicative ink coverage</Eyebrow>
          <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>Total = 100%</span>
        </div>
        <div style={{ display: "flex", height: "44px", overflow: "hidden", border: `1px solid ${LIGHTGREY}` }}>
          <div style={{ flex: 62, background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", color: MIDGREY, fontSize: "11px", letterSpacing: "0.04em" }}>White · 62%</div>
          <div style={{ flex: 18, background: OFFWHITE, display: "flex", alignItems: "center", justifyContent: "center", color: MIDGREY, fontSize: "11px", letterSpacing: "0.04em" }}>Off-white · 18%</div>
          <div style={{ flex: 12, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: "11px", letterSpacing: "0.04em" }}>Black · 12%</div>
          <div style={{ flex: 5, background: MIDGREY, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: "11px", letterSpacing: "0.04em" }}>Grey · 5%</div>
          <div style={{ flex: 3, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", color: BLACK, fontSize: "11px", fontWeight: 500, letterSpacing: "0.04em" }}>Orange · 3%</div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ========== A4 · Typography (Family) ==========
function BA_TypeFamily() {
  return (
    <ArtboardFrame label="04 · Typography">
      <ArtboardTopRule number="04 / 06" kicker="Typography" page="Page 04" />
      <ArtboardTitle title="Montserrat, single family." sub="Normal weight is the default voice" />

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "48px", alignItems: "stretch" }}>
        {/* Specimen */}
        <div style={{ background: OFFWHITE, padding: "32px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "560px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Eyebrow>Montserrat · variable</Eyebrow>
            <span style={{ fontSize: "10px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>By Julieta Ulanovsky</span>
          </div>
          <div style={{ fontFamily: "Montserrat", fontSize: "320px", fontWeight: 500, color: BLACK, lineHeight: 0.85, letterSpacing: "-0.025em", textAlign: "center" }}>
            Aa
          </div>
          <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.12em" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
          </div>
        </div>

        {/* Weights */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "560px" }}>
          <div>
            <Eyebrow>Weights in use</Eyebrow>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
              {[
                ["Light", 300, "Headlines (rare)"],
                ["Normal", 400, "Body · default"],
                ["Medium", 500, "H2 · pills · CTAs"],
                ["Semibold", 600, "H1 only"],
              ].map(([name, w, use], i) => (
                <div key={w} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", alignItems: "baseline", gap: "20px", padding: "16px 0", borderTop: i === 0 ? `1px solid ${BLACK}` : `1px solid ${OFFWHITE}` }}>
                  <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>{name}</span>
                  <span style={{ fontFamily: "Montserrat", fontWeight: w, fontSize: "32px", color: BLACK, letterSpacing: "-0.005em" }}>Aa Gg</span>
                  <span style={{ fontSize: "11px", color: MIDGREY, textAlign: "right" }}>{use}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: BLACK, padding: "24px 28px", color: WHITE }}>
            <Eyebrow mode="dark">Canonical heading block</Eyebrow>
            <div style={{ marginTop: "12px" }}>
              <H2 mode="dark" size={32}>Twelve charge points, installed in a single day.</H2>
            </div>
            <div style={{ marginTop: "8px" }}>
              <SubHeading size={15} mode="dark">Solar canopy · battery storage · mains · 12 charge points</SubHeading>
            </div>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ========== A5 · Type scale ==========
const TYPE_ROWS = [
  { token: "H1", spec: "600 · 96/100 · -0.018em", sample: "Charge anything.", size: 64, weight: 600, lh: 1.02, tracking: "-0.018em" },
  { token: "H2", spec: "500 · 56/64 · -0.012em", sample: "Twelve charge points.", size: 40, weight: 500, lh: 1.1, tracking: "-0.012em" },
  { token: "H3", spec: "500 · 32/40", sample: "A grid upgrade is no longer the gate.", size: 26, weight: 500, lh: 1.2 },
  { token: "Sub-heading", spec: "400 · 20/30 · mid-grey", sample: "Solar · battery · mains", size: 18, weight: 400, lh: 1.4, color: MIDGREY },
  { token: "Body L", spec: "400 · 18/30", sample: "HALO FastHub is a fully integrated smart EV charging system.", size: 16, weight: 400, lh: 1.6 },
  { token: "Body", spec: "400 · 15/24", sample: "Set your own charging tariffs and retain the revenue.", size: 14, weight: 400, lh: 1.6 },
  { token: "Section label", spec: "400 · 11/16 · 0.22em · UPPERCASE", sample: "01 — PRODUCT OVERVIEW", size: 11, weight: 400, lh: 1.4, color: MIDGREY, tracking: "0.22em", upper: true },
  { token: "Caption", spec: "400 · 12/18 · mid-grey", sample: "Figures based on 19.32 kWp installed capacity.", size: 12, weight: 400, lh: 1.5, color: MIDGREY },
];

function BA_TypeScale() {
  return (
    <ArtboardFrame label="05 · Type scale">
      <ArtboardTopRule number="05 / 06" kicker="Type scale" page="Page 05" />
      <ArtboardTitle title="Eight tokens, one rhythm." sub="Sentence case throughout · all caps reserved for HALO" titleSize={48} />

      <div style={{ borderTop: `1px solid ${BLACK}` }}>
        {TYPE_ROWS.map((t, i) => (
          <div
            key={t.token}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 200px 1fr",
              gap: "24px",
              padding: "16px 0",
              borderBottom: `1px solid ${OFFWHITE}`,
              alignItems: "baseline",
            }}
          >
            <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: BLACK }}>{t.token}</div>
              <div style={{ fontSize: "11px", color: MIDGREY, marginTop: "2px" }}>{t.spec}</div>
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: t.weight,
                fontSize: `${t.size}px`,
                lineHeight: t.lh,
                color: t.color || BLACK,
                letterSpacing: t.tracking || "normal",
                textTransform: t.upper ? "uppercase" : "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t.sample}
            </div>
          </div>
        ))}
      </div>
    </ArtboardFrame>
  );
}

// ========== A6 · Pattern & pills ==========
function BA_PatternPills() {
  return (
    <ArtboardFrame label="06 · Pattern & pills">
      <ArtboardTopRule number="06 / 06" kicker="Pattern & accents" page="Page 06" />
      <ArtboardTitle title="The halo motif & pills." sub="Use in marketing collateral — not as a UI background" titleSize={48} />

      {/* Pattern tiles row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        <div>
          <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, height: "200px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
            <img src="assets/pattern-dark.png" alt="Brand pattern, dark on light" style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }} />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <SpecRow label="Variant" value="Dark on light" />
            <SpecRow label="Accent" value="One focal orange halo" />
          </div>
        </div>
        <div>
          <div style={{ background: BLACK, height: "200px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
            <img src="assets/pattern-light.png" alt="Brand pattern, light on dark" style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }} />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <SpecRow label="Variant" value="Light on dark" />
            <SpecRow label="Accent" value="One focal orange halo" />
          </div>
        </div>
      </div>

      {/* Pills + Do/Don't */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr", gap: "20px" }}>
        <div style={{ background: OFFWHITE, padding: "32px", display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-between" }}>
          <Eyebrow>Signposting pills</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Pill>New</Pill>
            <Pill>Fleet ready</Pill>
            <Pill>1 day install</Pill>
            <Pill>19.32 kWp</Pill>
            <Pill>From £2,500 / mo</Pill>
          </div>
          <div>
            <SpecRow label="Background" value="Transparent" />
            <SpecRow label="Border" value="1 px light-grey keyline" />
            <SpecRow label="Type" value="Black · Montserrat 500 · 13/16" />
            <SpecRow label="Radius" value="Full · pill" />
          </div>
        </div>

        <div style={{ border: `1px solid ${LIGHTGREY}`, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: "11px" }}>✓</div>
            <Eyebrow>Do</Eyebrow>
          </div>
          <Body size={13}>Use the pattern in print and marketing collateral, signage, social cards. Preserve the focal orange halo at brand scale.</Body>
        </div>

        <div style={{ border: `1px solid ${LIGHTGREY}`, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: "11px", fontWeight: 600 }}>✕</div>
            <Eyebrow>Don't</Eyebrow>
          </div>
          <Body size={13}>Don't use the pattern as a website or UI background. Don't recolour entirely orange. Don't crop the focal halo out.</Body>
        </div>
      </div>

      {/* Right-aligned navigation CTA — demonstrates the orange-keyline pill */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{
          background: WHITE,
          color: BLACK,
          border: `1px solid ${ORANGE}`,
          padding: "10px 22px",
          borderRadius: "999px",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "13px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
        }}>
          See more
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </ArtboardFrame>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        background: "transparent",
        color: BLACK,
        padding: "6px 14px",
        borderRadius: "999px",
        border: `1px solid ${LIGHTGREY}`,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        fontSize: "13px",
        letterSpacing: "0.01em",
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

Object.assign(window, {
  BA_Cover,
  BA_Logos,
  BA_Colour,
  BA_TypeFamily,
  BA_TypeScale,
  BA_PatternPills,
  Pill,
  Eyebrow,
  H1,
  H2,
  SubHeading,
  Body,
  SpecRow,
  VerticalLabel,
  ArtboardFrame,
  ArtboardTopRule,
  ArtboardTitle,
  ORANGE,
  BLACK,
  WHITE,
  OFFWHITE,
  MIDGREY,
  LIGHTGREY,
  CHARCOAL,
  ARTBOARD_W,
  ARTBOARD_H,
});
