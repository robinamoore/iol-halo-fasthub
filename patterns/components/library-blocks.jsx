// HALO FastHub — rationalised UTILITY blocks (the ACF-style engines).
// These three absorb ~15 of the old one-off blocks. Admin picks the block,
// then fills a repeater (columns / stats) and toggles count + style.
// Tokens from brand-assets cross-script scope.

const { Section, SecondaryButton } = window;
const LIB_MONO = "Montserrat, sans-serif";

function LibImgSlot({ id, placeholder, height = "100%" }) {
  return (
    <div style={{ width: "100%", height }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="rect" placeholder="${placeholder}"
        style="width:100%;height:100%;display:block;"></image-slot>
    ` }} />
  );
}

// ============================================================
// UTILITY 1 · SECTION INTRO  (overline + title + intro para)
// ACF: overline, heading, intro, align (left|split|centre), tone
// Sits above any Column Layout / Stat Grid. Replaces every bespoke
// section header across the site.
// ============================================================
function SectionIntro({ overline, heading, intro, align = "split", mode = "light" }) {
  const fgMute = mode === "dark" ? "rgba(255,255,255,0.6)" : MIDGREY;
  const fg = mode === "dark" ? WHITE : BLACK;
  const Over = overline ? (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
      <span style={{ width: "24px", height: "1px", background: fgMute }} />
      <span style={{ fontFamily: LIB_MONO, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: fgMute }}>{overline}</span>
    </div>
  ) : null;
  const Title = <h2 style={{ fontFamily: LIB_MONO, fontSize: "44px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, color: fg, margin: 0, maxWidth: "20ch", textWrap: "balance" }}>{heading}</h2>;
  const Intro = intro ? <p style={{ fontFamily: LIB_MONO, fontSize: "16px", lineHeight: 1.6, color: fgMute, margin: 0, maxWidth: "46ch" }}>{intro}</p> : null;

  if (align === "centre") {
    return (
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", marginBottom: "44px" }}>
        {Over}{Title}{Intro}
      </div>
    );
  }
  if (align === "split" && intro) {
    return (
      <div style={{ marginBottom: "44px" }}>
        {Over}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end" }}>
          {Title}{Intro}
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: "40px", display: "flex", flexDirection: "column", gap: "18px" }}>
      {Over}{Title}{Intro}
    </div>
  );
}

// ============================================================
// UTILITY 2 · COLUMN LAYOUT  (1–5 columns via repeater)
// ACF: cols (1–5), style (plain|card|bordered), tone, + repeater of
// { image, eyebrow, title, body, link }. Replaces feature cards, sector
// cards, use-cases, team grid, product-highlight tiles, further-reading,
// dark feature cards — all of it.
// ============================================================
function ColumnLayout({ cols = 3, items = [], style = "card", mode = "light" }) {
  const n = Math.max(1, Math.min(5, cols));
  const carded = style !== "plain";
  const border = mode === "dark" ? "1px solid rgba(255,255,255,0.16)" : `1px solid ${LIGHTGREY}`;
  const cardBg = mode === "dark" ? "rgba(255,255,255,0.04)" : WHITE;
  const fg = mode === "dark" ? WHITE : BLACK;
  const fgMute = mode === "dark" ? "rgba(255,255,255,0.6)" : MIDGREY;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: "20px" }}>
      {items.slice(0, n).map((it, i) => {
        const inner = (
          <React.Fragment>
            {it.image && (
              <div style={{ height: n >= 4 ? "150px" : "190px", background: "#E8E6DF", borderBottom: carded ? border : "none", overflow: "hidden" }}>
                <LibImgSlot id={it.image} placeholder={it.title || "Image"} />
              </div>
            )}
            <div style={{ padding: carded ? "26px" : "0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              {it.eyebrow && <span style={{ fontFamily: LIB_MONO, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: fgMute }}>{it.eyebrow}</span>}
              {it.title && <div style={{ fontFamily: LIB_MONO, fontSize: n >= 4 ? "19px" : "22px", fontWeight: 600, letterSpacing: "-0.01em", color: fg }}>{it.title}</div>}
              {it.body && <div style={{ fontFamily: LIB_MONO, fontSize: "14px", lineHeight: 1.55, color: mode === "dark" ? "rgba(255,255,255,0.75)" : BLACK, maxWidth: "34ch" }}>{it.body}</div>}
              {it.link && (
                <a href={it.link} style={{ marginTop: "6px", fontFamily: LIB_MONO, fontSize: "14px", color: fg, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  {it.linkLabel || "Read more"} <span style={{ color: ORANGE }}>→</span>
                </a>
              )}
            </div>
          </React.Fragment>
        );
        return carded ? (
          <div key={i} style={{ background: cardBg, border, display: "flex", flexDirection: "column", height: "100%" }}>{inner}</div>
        ) : (
          <div key={i} style={{ display: "flex", flexDirection: "column", height: "100%" }}>{inner}</div>
        );
      })}
    </div>
  );
}

// ============================================================
// UTILITY 3 · STAT GRID  (2–5 stats via repeater)
// ACF: tone (light|warm|dark), + repeater of { value, unit, label }.
// Replaces challenge stats, cost-benefits, warm-grey numbers, sector
// numbers, hero headline stats.
// ============================================================
function StatGrid({ stats = [], mode = "light" }) {
  const n = stats.length || 4;
  const border = mode === "dark" ? "1px solid rgba(255,255,255,0.16)" : `1px solid ${LIGHTGREY}`;
  const cardBg = mode === "dark" ? "rgba(255,255,255,0.04)" : WHITE;
  const fg = mode === "dark" ? WHITE : BLACK;
  const fgMute = mode === "dark" ? "rgba(255,255,255,0.55)" : MIDGREY;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: "16px" }}>
      {stats.map(([v, u, lbl], i) => (
        <div key={i} style={{ background: cardBg, border, padding: "28px 24px" }}>
          <div style={{ fontFamily: LIB_MONO, fontSize: "11px", color: fgMute, letterSpacing: "0.22em", textTransform: "uppercase" }}>{lbl}</div>
          <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: LIB_MONO, fontSize: "46px", fontWeight: 600, color: fg, letterSpacing: "-0.022em", lineHeight: 1 }}>{v}</span>
            {u && <span style={{ fontFamily: LIB_MONO, fontSize: "13px", color: fgMute }}>{u}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SectionIntro, ColumnLayout, StatGrid });
