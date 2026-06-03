// HALO FastHub — NEW blocks (the "gaps" in the system).
// Desktop-first drafts. Each block composes from the existing landing
// primitives (Section, SectionEyebrow, LandingH1/H2/Sub/Body, Primary/Secondary
// buttons) and the same image-slot pattern. Tokens (ORANGE, BLACK, …) come from
// brand-assets cross-script scope.

const {
  Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody,
  PrimaryButton, SecondaryButton,
} = window;

// Small helper — a client-droppable image slot sized by its wrapper.
function ImgSlot({ id, placeholder, shape = "rect", height = "100%" }) {
  return (
    <div style={{ width: "100%", height }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="${shape}" placeholder="${placeholder}"
        style="width:100%;height:100%;display:block;"></image-slot>
    ` }} />
  );
}

const MONO = "Montserrat, sans-serif";

// Shared filter-pill (outlined → black when active). Never orange.
function FilterPill({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 20px", borderRadius: "999px", cursor: "pointer",
      fontFamily: MONO, fontSize: "13px", fontWeight: 500, letterSpacing: "0.01em",
      background: active ? BLACK : WHITE,
      color: active ? WHITE : BLACK,
      border: `1px solid ${active ? BLACK : LIGHTGREY}`,
      transition: "background .15s, color .15s, border-color .15s",
    }}>{children}</button>
  );
}

// ============================================================
// A · TEAM GRID
// ============================================================
const TEAM = [
  { name: "Tim Evans", role: "Chief Executive Officer", bio: "Twenty years scaling clean-energy infrastructure across the UK and EU.", slot: "team-1" },
  { name: "Dr. Helen Carr", role: "Chief Technology Officer", bio: "Leads HALO OS — the energy-arbitration brain behind every hub.", slot: "team-2" },
  { name: "Marcus Boateng", role: "Head of Fleet Solutions", bio: "Former logistics director; translates duty cycles into hub specs.", slot: "team-3" },
  { name: "Priya Nair", role: "Sustainability Lead", bio: "Carbon accounting, B Corp reporting and the science behind the numbers.", slot: "team-4" },
  { name: "James Whitfield", role: "Installation Director", bio: "Owns the one-day install promise — civils, crane and commissioning.", slot: "team-5" },
  { name: "Sofia Marchetti", role: "Client Partnerships", bio: "First point of contact from enquiry through to the seven-day proposal.", slot: "team-6" },
];

function NB_Team() {
  return (
    <Section tone="light" id="team">
      <SectionEyebrow>The team</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "56px" }}>
        <LandingH2 max="20ch">The people behind the hub.</LandingH2>
        <LandingBody max="46ch">
          A compact team of energy engineers, fleet specialists and sustainability scientists. The same people who scope your site stay with you through install and beyond.
        </LandingBody>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {TEAM.map((m) => (
          <div key={m.slot} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ aspectRatio: "1 / 1", width: "100%", background: "#E8E6DF", overflow: "hidden", border: `1px solid ${LIGHTGREY}` }}>
              <ImgSlot id={m.slot} placeholder={`Portrait · ${m.name}`} />
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div style={{ fontFamily: MONO, fontSize: "20px", fontWeight: 600, color: BLACK, letterSpacing: "-0.01em" }}>{m.name}</div>
              <div style={{ fontFamily: MONO, fontSize: "13px", color: MIDGREY, marginTop: "4px", letterSpacing: "0.02em" }}>{m.role}</div>
              <div style={{ fontFamily: MONO, fontSize: "14px", color: BLACK, lineHeight: 1.55, marginTop: "12px", maxWidth: "34ch" }}>{m.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// B · CASE-STUDY ARCHIVE (filterable listing)
// ============================================================
const CASES = [
  { sector: "Fleet", client: "Merseyside Police", stat: "6 hrs", label: "Crane lift to first charge", slot: "case-1" },
  { sector: "Workplace", client: "Segen Academy", stat: "100%", label: "Visitor demand met from solar", slot: "case-2" },
  { sector: "Destination", client: "Bevan Group", stat: "64k", label: "EV miles / year from solar", slot: "case-3" },
  { sector: "Fleet", client: "Avalon Logistics", stat: "2.4 yr", label: "Payback on charging revenue", slot: "case-4" },
  { sector: "Workplace", client: "Northgate Business Park", stat: "38", label: "Tenant vehicles charged daily", slot: "case-5" },
  { sector: "Destination", client: "Harbourside Retail", stat: "+18%", label: "Dwell time at the centre", slot: "case-6" },
];
const CASE_FILTERS = ["All", "Fleet", "Workplace", "Destination"];

function NB_CaseArchive() {
  const [f, setF] = React.useState("All");
  const list = f === "All" ? CASES : CASES.filter((c) => c.sector === f);
  return (
    <Section tone="offwhite" id="case-archive">
      <SectionEyebrow>Case studies</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "40px" }}>
        <LandingH2 max="20ch">Every deployment, in one place.</LandingH2>
        <LandingBody max="46ch">
          Filter by sector to see how the same hub adapts to a police fleet, a workplace car park or a destination forecourt.
        </LandingBody>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
        {CASE_FILTERS.map((x) => (
          <FilterPill key={x} active={f === x} onClick={() => setF(x)}>{x}</FilterPill>
        ))}
      </div>

      {/* Card grid — neutral cards, distinct from the black showcase grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {list.map((c) => (
          <a key={c.slot} href="Case study.html" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ height: "190px", background: "#E8E6DF", borderBottom: `1px solid ${LIGHTGREY}`, overflow: "hidden" }}>
                <ImgSlot id={c.slot} placeholder={`${c.client} · site photo`} />
              </div>
              <div style={{ padding: "24px 24px 22px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>{c.sector}</div>
                    <div style={{ fontFamily: MONO, fontSize: "22px", fontWeight: 600, color: BLACK, letterSpacing: "-0.01em", marginTop: "8px" }}>{c.client}</div>
                  </div>
                  <span style={{ fontSize: "15px", color: ORANGE }}>→</span>
                </div>
                <div style={{ marginTop: "auto", borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "16px", display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span style={{ fontFamily: MONO, fontSize: "40px", fontWeight: 600, color: BLACK, letterSpacing: "-0.022em", lineHeight: 1 }}>{c.stat}</span>
                  <span style={{ fontFamily: MONO, fontSize: "13px", color: MIDGREY, lineHeight: 1.3 }}>{c.label}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
        <SecondaryButton arrow>Load more case studies</SecondaryButton>
      </div>
    </Section>
  );
}

// ============================================================
// C · CASE-STUDY DETAIL HERO (dark)
// ============================================================
function NB_CaseHero() {
  return (
    <Section tone="dark" id="case-hero" padY={104}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "72px", alignItems: "end" }}>
        <div>
          <SectionEyebrow mode="dark">Fleet · Merseyside Police</SectionEyebrow>
          <LandingH1 mode="dark" size={76} max="18ch">
            A 24/7 emergency fleet, charging on solar.
          </LandingH1>
          <div style={{ marginTop: "28px" }}>
            <LandingSub mode="dark" max="46ch">
              The first UK police force to deploy HALO FastHub — twelve points, marked and unmarked vehicles, live the same afternoon as the crane lift.
            </LandingSub>
          </div>
          <div style={{ marginTop: "40px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <PrimaryButton>Make an enquiry</PrimaryButton>
            <SecondaryButton mode="dark" arrow>All case studies</SecondaryButton>
          </div>
        </div>

        {/* Headline stat + client logo slot */}
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "32px" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Headline result</div>
            <div style={{ fontFamily: MONO, fontSize: "96px", fontWeight: 600, color: WHITE, letterSpacing: "-0.026em", lineHeight: 0.95, marginTop: "12px" }}>6 hrs</div>
            <div style={{ fontFamily: MONO, fontSize: "14px", color: "rgba(255,255,255,0.7)", marginTop: "10px" }}>From crane lift to first charge.</div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "24px" }}>
            <div style={{ fontFamily: MONO, fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "14px" }}>Client</div>
            <div style={{ height: "64px", width: "180px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", overflow: "hidden" }}>
              <ImgSlot id="case-logo" placeholder="Client logo" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// D · NEWS ARCHIVE (filterable, paginated)
// ============================================================
const POSTS = [
  { kind: "Whitepaper", title: "The 2026 fleet electrification gap", date: "May 2026", read: "14 min", slot: "news-1" },
  { kind: "Article", title: "Inside HALO smart-grid balancing", date: "Apr 2026", read: "6 min", slot: "news-2" },
  { kind: "Webinar", title: "ROI deep-dive for fleet managers", date: "Apr 2026", read: "42 min", slot: "news-3" },
  { kind: "Press", title: "Merseyside Police installation, in pictures", date: "Mar 2026", read: "Fleet News", slot: "news-4" },
  { kind: "Article", title: "Why behind-the-meter beats a DNO upgrade", date: "Mar 2026", read: "8 min", slot: "news-5" },
  { kind: "Whitepaper", title: "Solar canopy yield in UK conditions", date: "Feb 2026", read: "11 min", slot: "news-6" },
];
const POST_FILTERS = ["All", "Whitepaper", "Article", "Press", "Webinar"];

function NB_NewsArchive() {
  const [f, setF] = React.useState("All");
  const list = f === "All" ? POSTS : POSTS.filter((p) => p.kind === f);
  return (
    <Section tone="light" id="news-archive">
      <SectionEyebrow>News &amp; insights</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "40px" }}>
        <LandingH2 max="20ch">Sector thinking, kept current.</LandingH2>
        <LandingBody max="46ch">
          Whitepapers, technical articles, press and recorded sessions — written for the people who'll ask the hard questions.
        </LandingBody>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
        {POST_FILTERS.map((x) => (
          <FilterPill key={x} active={f === x} onClick={() => setF(x)}>{x}</FilterPill>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {list.map((p) => (
          <a key={p.slot} href="#" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ height: "180px", background: "#E8E6DF", borderBottom: `1px solid ${LIGHTGREY}`, position: "relative", overflow: "hidden" }}>
                <ImgSlot id={p.slot} placeholder={`${p.kind} image`} />
                <div style={{ position: "absolute", left: "16px", bottom: "16px" }}>
                  <span style={{ fontFamily: MONO, fontSize: "11px", color: BLACK, letterSpacing: "0.22em", textTransform: "uppercase", background: WHITE, padding: "4px 10px" }}>{p.kind}</span>
                </div>
              </div>
              <div style={{ padding: "24px 24px 22px", display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "space-between" }}>
                <div style={{ fontFamily: MONO, fontSize: "19px", fontWeight: 600, color: BLACK, letterSpacing: "-0.008em", lineHeight: 1.25 }}>{p.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "12px" }}>
                  <span style={{ fontFamily: MONO, fontSize: "12px", color: MIDGREY }}>{p.date} · {p.read}</span>
                  <span style={{ fontSize: "14px", color: ORANGE }}>→</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "36px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
        {["1", "2", "3"].map((n, i) => (
          <button key={n} style={{
            width: "40px", height: "40px", fontFamily: MONO, fontSize: "13px", cursor: "pointer",
            background: i === 0 ? BLACK : WHITE, color: i === 0 ? WHITE : BLACK,
            border: `1px solid ${i === 0 ? BLACK : LIGHTGREY}`,
          }}>{n}</button>
        ))}
        <button style={{ width: "40px", height: "40px", background: WHITE, color: BLACK, border: `1px solid ${LIGHTGREY}`, cursor: "pointer", fontSize: "15px" }}>→</button>
      </div>
    </Section>
  );
}

// ============================================================
// E · ARTICLE TEMPLATE (single post)
// ============================================================
function NB_Article() {
  return (
    <Section tone="light" id="article" padY={88}>
      {/* Header */}
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <SectionEyebrow>Article · Whitepaper</SectionEyebrow>
        <h1 style={{ fontFamily: MONO, fontSize: "56px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.06, color: BLACK, margin: 0, textWrap: "balance" }}>
          The 2026 fleet electrification gap — and how to close it without the grid.
        </h1>
        <div style={{ marginTop: "24px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", fontFamily: MONO, fontSize: "13px", color: MIDGREY }}>
          <span>14 May 2026</span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: LIGHTGREY }} />
          <span>14 min read</span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: LIGHTGREY }} />
          <span>By Dr. Helen Carr</span>
        </div>
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: "1080px", margin: "40px auto 0", height: "440px", background: "#E8E6DF", overflow: "hidden", border: `1px solid ${LIGHTGREY}` }}>
        <ImgSlot id="article-hero" placeholder="Article hero image" />
      </div>

      {/* Body — reading-width column */}
      <div style={{ maxWidth: "680px", margin: "48px auto 0", fontFamily: MONO, color: BLACK }}>
        <p style={ap()}>
          By 2030, light-commercial EV uptake is projected to rise five-fold against 2024. The vehicles are arriving faster than the infrastructure to charge them — and the bottleneck is rarely the chargers themselves.
        </p>
        <h2 style={ah2()}>The connection queue is the real constraint</h2>
        <p style={ap()}>
          Distribution network operators are quoting multi-year waits and six-figure capital costs for the high-voltage upgrades a serious charging operation appears to need. For most fleet managers, that timeline is simply incompatible with their electrification mandate.
        </p>
        <blockquote style={aq()}>
          “The grid upgrade was quoted at eight years. Our vehicles were arriving in eight months.”
        </blockquote>
        <h3 style={ah3()}>What behind-the-meter actually means</h3>
        <p style={ap()}>
          A behind-the-meter system generates, stores and dispatches its own energy inside your existing supply. No new connection is requested, so no DNO application is filed and no reinforcement is scheduled.
        </p>
        <ul style={aul()}>
          <li style={ali()}>Solar canopy covers the bulk of daytime demand.</li>
          <li style={ali()}>Battery storage shifts generation into evening charging windows.</li>
          <li style={ali()}>HALO OS arbitrates between solar, battery and mains second-by-second.</li>
        </ul>

        {/* Captioned figure */}
        <figure style={{ margin: "36px 0" }}>
          <div style={{ height: "320px", background: "#E8E6DF", overflow: "hidden", border: `1px solid ${LIGHTGREY}` }}>
            <ImgSlot id="article-fig-1" placeholder="Figure · energy-flow diagram" />
          </div>
          <figcaption style={{ fontFamily: MONO, fontSize: "12px", color: MIDGREY, marginTop: "12px", textAlign: "center" }}>
            Fig 1. Second-by-second energy arbitration across solar, battery and mains.
          </figcaption>
        </figure>

        <p style={ap()}>
          The result is a charging operation that is revenue-positive from month one, with none of the capital exposure or programme risk of a grid reinforcement. For a fuller treatment of the economics, see our{" "}
          <a href="#" style={{ color: ORANGE, textDecoration: "none", borderBottom: `1px solid ${ORANGE}` }}>ROI deep-dive</a>.
        </p>
      </div>
    </Section>
  );
}
// article prose style helpers
function ap()  { return { fontFamily: MONO, fontSize: "18px", lineHeight: 1.7, color: BLACK, margin: "0 0 24px" }; }
function ah2() { return { fontFamily: MONO, fontSize: "30px", fontWeight: 600, letterSpacing: "-0.012em", lineHeight: 1.15, color: BLACK, margin: "40px 0 16px" }; }
function ah3() { return { fontFamily: MONO, fontSize: "22px", fontWeight: 600, letterSpacing: "-0.008em", lineHeight: 1.2, color: BLACK, margin: "32px 0 14px" }; }
function aq()  { return { fontFamily: MONO, fontSize: "26px", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.01em", color: BLACK, margin: "36px 0", padding: "4px 0 4px 28px", borderLeft: `2px solid ${ORANGE}` }; }
function aul() { return { margin: "0 0 24px", paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "10px" }; }
function ali() { return { fontFamily: MONO, fontSize: "18px", lineHeight: 1.6, color: BLACK }; }

// ============================================================
// F · LOCATION & CONTACT
// ============================================================
function NB_Location() {
  const lines = [
    ["Visit", "3ti Energy Hubs Ltd\nSurrey Technology Centre\n40 Occam Road, Guildford GU2 7YG"],
    ["Sales", "+44 (0)3331 121 371"],
    ["Office", "+44 (0)3332 343 703"],
    ["Email", "info@3ti.co.uk"],
    ["Hours", "Monday–Friday · 09:00–17:00 GMT"],
  ];
  return (
    <Section tone="light" id="location">
      <SectionEyebrow>Find us</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "48px", alignItems: "stretch" }}>
        {/* Left — details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <LandingH2 size={40} max="16ch">Talk to a person, not a portal.</LandingH2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {lines.map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "20px", padding: "18px 0", borderTop: `1px solid ${LIGHTGREY}` }}>
                <span style={{ fontFamily: MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.2em", textTransform: "uppercase", paddingTop: "3px" }}>{k}</span>
                <span style={{ fontFamily: MONO, fontSize: "16px", color: BLACK, lineHeight: 1.5, whiteSpace: "pre-line" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: MONO, fontSize: "12px", color: MIDGREY, lineHeight: 1.55, borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "16px" }}>
            All site assessments are free and obligation-free. We sign a mutual NDA on request before reviewing site drawings.
          </div>
          <div>
            <PrimaryButton>Make an enquiry</PrimaryButton>
          </div>
        </div>

        {/* Right — map (droppable static map, swap for an embed later) */}
        <div style={{ background: "#E8E6DF", border: `1px solid ${LIGHTGREY}`, minHeight: "440px", overflow: "hidden" }}>
          <ImgSlot id="contact-map" placeholder="Map — drop a static map image or swap for an embed" />
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  NB_Team, NB_CaseArchive, NB_CaseHero, NB_NewsArchive, NB_Article, NB_Location,
});
