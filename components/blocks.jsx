// HALO FastHub — CANONICAL 20-BLOCK LIBRARY + registry.
// Every page is composed from these and only these. Most are thin wrappers /
// references to existing components; a few are authored here so the canonical
// set is complete and data-driven. Load AFTER all other component scripts.
// Tokens + components come from window (cross-script scope).

const BK = {
  Section: window.Section, SectionIntro: window.SectionIntro,
  ColumnLayout: window.ColumnLayout, StatGrid: window.StatGrid,
  LandingH1: window.LandingH1, LandingH2: window.LandingH2,
  LandingSub: window.LandingSub, LandingBody: window.LandingBody,
  SectionEyebrow: window.SectionEyebrow,
  PrimaryButton: window.PrimaryButton, SecondaryButton: window.SecondaryButton,
};
const BK_MONO = "Montserrat, sans-serif";

function BkImg({ id, placeholder, height = "100%" }) {
  return (
    <div style={{ width: "100%", height }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="rect" placeholder="${placeholder}"
        style="width:100%;height:100%;display:block;"></image-slot>` }} />
  );
}
const toneMode = (t) => (t === "dark" || t === "charcoal" ? "dark" : "light");

// ---- 01 · SECTION INTRO (standalone) ----
function B_SectionIntro({ tone = "light", ...intro }) {
  return (
    <BK.Section tone={tone}>
      <BK.SectionIntro {...intro} mode={toneMode(tone)} />
    </BK.Section>
  );
}

// ---- 02 · COLUMN LAYOUT (optional intro + 1–5 cols) ----
function B_Columns({ tone = "light", intro, cols = 3, items = [], style = "card" }) {
  return (
    <BK.Section tone={tone}>
      {intro && <BK.SectionIntro {...intro} mode={toneMode(tone)} />}
      <BK.ColumnLayout cols={cols} items={items} style={style} mode={toneMode(tone)} />
    </BK.Section>
  );
}

// ---- 03 · STAT GRID (optional intro + 2–5 stats) ----
function B_Stats({ tone = "warm", intro, stats = [] }) {
  return (
    <BK.Section tone={tone}>
      {intro && <BK.SectionIntro {...intro} mode={toneMode(tone)} />}
      <BK.StatGrid stats={stats} mode={toneMode(tone)} />
    </BK.Section>
  );
}

// ---- 04 · PAGE HERO (dark; optional image + headline stat) ----
function B_Hero({ eyebrow, title, sub, primary, secondary, image, stat, tone = "dark", compact = false, size = 72 }) {
  const left = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <BK.SectionEyebrow mode="dark">{eyebrow}</BK.SectionEyebrow>
      <BK.LandingH1 mode="dark" size={size} max="16ch">{title}</BK.LandingH1>
      {sub && <div style={{ marginTop: "24px" }}><BK.LandingSub mode="dark" max="48ch">{sub}</BK.LandingSub></div>}
      {(primary || secondary) && (
        <div style={{ marginTop: "36px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          {primary && <a href="Contact.html" style={{ textDecoration: "none" }}><BK.PrimaryButton>Make an enquiry</BK.PrimaryButton></a>}
          {secondary && <a href={secondary[1]} style={{ textDecoration: "none" }}><BK.SecondaryButton mode="dark" arrow>{secondary[0]}</BK.SecondaryButton></a>}
        </div>
      )}
      {stat && (
        <div style={{ marginTop: "44px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "baseline", gap: "16px" }}>
          <span style={{ fontFamily: BK_MONO, fontSize: "60px", fontWeight: 600, color: WHITE, letterSpacing: "-0.026em", lineHeight: 1 }}>{stat[0]}</span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: BK_MONO, fontSize: "15px", color: WHITE, fontWeight: 500 }}>{stat[1]}</span>
            {stat[2] && <span style={{ fontFamily: BK_MONO, fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{stat[2]}</span>}
          </span>
        </div>
      )}
    </div>
  );
  return (
    <BK.Section tone={tone} padY={compact ? 72 : 96}>
      {image ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "64px", alignItems: "stretch" }}>
          {left}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", minHeight: "420px", overflow: "hidden" }}>
            <BkImg id={image} placeholder={`${eyebrow} — image`} />
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "62%" }}>{left}</div>
      )}
    </BK.Section>
  );
}

// ---- 07 · PULL-QUOTE ----
function B_Quote({ quote, attribution, link, tone = "light" }) {
  const dark = toneMode(tone) === "dark";
  return (
    <BK.Section tone={tone}>
      <div style={{ maxWidth: "62ch" }}>
        <div style={{ width: "40px", height: "3px", background: ORANGE, marginBottom: "28px" }} />
        <div style={{ fontFamily: BK_MONO, fontSize: "34px", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.012em", color: dark ? WHITE : BLACK, textWrap: "pretty" }}>{quote}</div>
        {attribution && <div style={{ fontFamily: BK_MONO, fontSize: "14px", color: dark ? "rgba(255,255,255,0.6)" : MIDGREY, marginTop: "24px", letterSpacing: "0.02em" }}>{attribution}</div>}
        {link && <div style={{ marginTop: "28px" }}><a href={link[1]} style={{ textDecoration: "none" }}><BK.SecondaryButton mode={dark ? "dark" : "light"} arrow>{link[0]}</BK.SecondaryButton></a></div>}
      </div>
    </BK.Section>
  );
}

// ---- 09 · ACCORDION (FAQ / hurdles) ----
function B_Accordion({ tone = "light", intro, items = [] }) {
  const [open, setOpen] = React.useState(0);
  return (
    <BK.Section tone={tone}>
      {intro && <BK.SectionIntro {...intro} mode={toneMode(tone)} />}
      <div style={{ borderTop: `1px solid ${LIGHTGREY}` }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${LIGHTGREY}` }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", textAlign: "left" }}>
                <span style={{ fontFamily: BK_MONO, fontSize: "21px", fontWeight: 600, color: BLACK, letterSpacing: "-0.01em" }}>{it.q}</span>
                <span style={{ fontFamily: BK_MONO, fontSize: "24px", color: BLACK, lineHeight: 1, flexShrink: 0 }}>{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && <div style={{ fontFamily: BK_MONO, fontSize: "16px", lineHeight: 1.6, color: BLACK, maxWidth: "70ch", padding: "0 0 28px" }}>{it.a}</div>}
            </div>
          );
        })}
      </div>
    </BK.Section>
  );
}

// ---- 10 · TIMELINE ----
function B_Timeline({ tone = "offwhite", intro, steps = [] }) {
  return (
    <BK.Section tone={tone}>
      {intro && <BK.SectionIntro {...intro} mode={toneMode(tone)} />}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "20px" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ borderTop: `2px solid ${s.emphasis ? ORANGE : BLACK}`, paddingTop: "20px" }}>
            <div style={{ fontFamily: BK_MONO, fontSize: "12px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>{s.marker}</div>
            <div style={{ fontFamily: BK_MONO, fontSize: "20px", fontWeight: 600, color: BLACK, letterSpacing: "-0.01em", margin: "12px 0 10px" }}>{s.title}</div>
            <div style={{ fontFamily: BK_MONO, fontSize: "14px", lineHeight: 1.55, color: MIDGREY }}>{s.body}</div>
          </div>
        ))}
      </div>
    </BK.Section>
  );
}

// ---- 16 · RELATED / SHOWCASE (dark card grid) ----
function B_Showcase({ tone = "dark", intro, items = [] }) {
  return (
    <BK.Section tone={tone}>
      {intro && <BK.SectionIntro {...intro} mode="dark" />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {items.map((c, i) => (
          <a key={i} href="Case study.html" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ height: "180px", background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.16)", overflow: "hidden" }}>
                <BkImg id={c.slot} placeholder={`${c.client} photo`} />
              </div>
              <div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <div style={{ fontFamily: BK_MONO, fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{c.sector}</div>
                <div style={{ fontFamily: BK_MONO, fontSize: "22px", fontWeight: 600, color: WHITE, letterSpacing: "-0.01em" }}>{c.client}</div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: "14px" }}>
                  <span style={{ fontFamily: BK_MONO, fontSize: "34px", fontWeight: 600, color: WHITE, letterSpacing: "-0.02em", lineHeight: 1 }}>{c.stat}</span>
                  <span style={{ fontFamily: BK_MONO, fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{c.label}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </BK.Section>
  );
}

// ============================================================
// REGISTRY — id → { name, C }.  The single source of truth.
// ============================================================
const BLOCKS = {
  "01": { name: "Section Intro",        C: B_SectionIntro },
  "02": { name: "Column Layout",        C: B_Columns },
  "03": { name: "Stat Grid",            C: B_Stats },
  "04": { name: "Page Hero",            C: B_Hero },
  "05": { name: "CTA Band",             C: window.CTABand },
  "06": { name: "Story Rows",           C: window.StoryRows },
  "07": { name: "Pull-quote",           C: B_Quote },
  "08": { name: "Spec Table",           C: window.SpecTableSection },
  "09": { name: "Accordion",            C: B_Accordion },
  "10": { name: "Timeline",             C: B_Timeline },
  "11": { name: "Logo / Social Proof",  C: window.SocialProofStrip },
  "12": { name: "Big Headline + Links", C: window.BigHeadlineLinks },
  "13": { name: "Certifications & Notes", C: window.CertificationsBlock },
  "14": { name: "Case Study Archive",   C: window.NB_CaseArchive },
  "15": { name: "News Archive",         C: window.NB_NewsArchive },
  "16": { name: "Related / Showcase",   C: B_Showcase },
  "17": { name: "Article Body",         C: window.NB_Article },
  "18": { name: "Enquiry Form",         C: window.EnquiryForm },
  "19": { name: "Location & Contact",   C: window.NB_Location },
  "20": { name: "ROI Calculator",       C: window.LP_Calculator },
};

Object.assign(window, {
  BLOCKS, B_SectionIntro, B_Columns, B_Stats, B_Hero, B_Quote,
  B_Accordion, B_Timeline, B_Showcase,
});
