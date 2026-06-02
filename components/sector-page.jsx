// HALO FastHub — recyclable SECTOR page template.
// One <SectorTemplate> renders Fleets / Workplaces / Destinations from a single
// data object, selected by ?sector= in the URL (default: fleets). Composes from
// existing primitives + page blocks. Tokens from brand-assets cross-script scope.

const {
  Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody,
  PrimaryButton, SecondaryButton, SiteNav, CTABand, SpecTableSection,
} = window;

const SECT_MONO = "Montserrat, sans-serif";

function SectImgSlot({ id, placeholder, height = "100%" }) {
  return (
    <div style={{ width: "100%", height }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="rect" placeholder="${placeholder}"
        style="width:100%;height:100%;display:block;"></image-slot>
    ` }} />
  );
}

// ---- DATA: the only thing that changes per sector ----
const SECTOR_DATA = {
  fleets: {
    key: "fleets",
    tag: "Sectors · Fleets",
    title: "Charging built around the duty cycle.",
    sub: "Reliable, scalable charging that keeps marked, unmarked and commercial vehicles moving around the clock — without waiting years for a grid upgrade.",
    heroSlot: "sector-hero-fleet",
    heroStat: ["24/7", "vehicle availability", "Shift-pattern charging, day and night"],
    cases: [
      { title: "Emergency & blue-light", body: "Twelve points across marked and unmarked vehicles, live the same afternoon as the crane lift.", slot: "fleet-case-1" },
      { title: "Last-mile & logistics", body: "Overnight depot charging on shifted solar, sized to the morning dispatch window.", slot: "fleet-case-2" },
      { title: "Pool & grey fleet", body: "Self-service access with per-driver reporting and a tariff you set and keep.", slot: "fleet-case-3" },
    ],
    numbers: [
      ["6 hrs", "to first charge", "From crane lift"],
      ["12", "charge points", "Per hub"],
      ["0", "grid upgrade", "Behind the meter"],
      ["100%", "revenue retained", "You set the tariff"],
    ],
    proofQuote: "“Live within six hours of the crane lift — and now charging on solar by day, shifted battery by night.”",
    proofAttr: "Fleet Manager · Merseyside Police",
  },
  workplaces: {
    key: "workplaces",
    tag: "Sectors · Workplaces",
    title: "Turn the staff car park into an asset.",
    sub: "Fast deployment for staff and visitor parking, with the option to generate revenue from every bay — and a visible commitment to your net-zero targets.",
    heroSlot: "sector-hero-work",
    heroStat: ["65%", "demand from solar", "Generated on-site, daytime peak"],
    cases: [
      { title: "Staff parking", body: "Daytime charging covered largely by the canopy above the bays employees already use.", slot: "work-case-1" },
      { title: "Visitor & client", body: "A premium amenity for visitors, with access rules and tariffs you control.", slot: "work-case-2" },
      { title: "ESG & reporting", body: "Carbon and utilisation reporting that drops straight into your sustainability disclosures.", slot: "work-case-3" },
    ],
    numbers: [
      ["1", "day install", "Minimal disruption"],
      ["65%", "from solar", "Daytime demand"],
      ["12", "charge points", "Per hub"],
      ["B Corp", "delivered", "Certified partner"],
    ],
    proofQuote: "“The hub met our visitor demand entirely from solar — and gave us a credible net-zero story for the board.”",
    proofAttr: "Estates Director · Segen Academy",
  },
  destinations: {
    key: "destinations",
    tag: "Sectors · Destinations",
    title: "Give EV drivers a reason to stay.",
    sub: "Attract EV drivers, extend dwell time and unlock a new revenue line at retail and leisure sites — with charging that pays for itself.",
    heroSlot: "sector-hero-dest",
    heroStat: ["+18%", "dwell time", "Measured at retail sites"],
    cases: [
      { title: "Retail & leisure", body: "Longer dwell times and a new reason to choose your site over the one down the road.", slot: "dest-case-1" },
      { title: "Hospitality", body: "An amenity guests increasingly expect, delivered without a capital grid project.", slot: "dest-case-2" },
      { title: "Revenue line", body: "Set your own tariff and keep the charging revenue — a margin, not a cost centre.", slot: "dest-case-3" },
    ],
    numbers: [
      ["+18%", "dwell time", "At retail sites"],
      ["64k", "EV miles / yr", "From solar"],
      ["12", "charge points", "Per hub"],
      ["100%", "revenue retained", "You set the tariff"],
    ],
    proofQuote: "“Charging gave drivers a reason to stop — and turned the car park into a revenue line, not an overhead.”",
    proofAttr: "Operations Director · Bevan Group",
  },
};

const SECTOR_ORDER = ["fleets", "workplaces", "destinations"];

// ---- Sector hero (dark, with image + headline stat) ----
function SectorHero({ d }) {
  return (
    <Section tone="dark" padY={96}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "64px", alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SectionEyebrow mode="dark">{d.tag}</SectionEyebrow>
          <LandingH1 mode="dark" size={72} max="16ch">{d.title}</LandingH1>
          <div style={{ marginTop: "24px" }}>
            <LandingSub mode="dark" max="48ch">{d.sub}</LandingSub>
          </div>
          <div style={{ marginTop: "36px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="Contact.html" style={{ textDecoration: "none" }}><PrimaryButton>Make an enquiry</PrimaryButton></a>
            <a href="Product.html" style={{ textDecoration: "none" }}><SecondaryButton mode="dark" arrow>Explore the product</SecondaryButton></a>
          </div>
          {/* headline stat */}
          <div style={{ marginTop: "44px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span style={{ fontFamily: SECT_MONO, fontSize: "64px", fontWeight: 600, color: WHITE, letterSpacing: "-0.026em", lineHeight: 1 }}>{d.heroStat[0]}</span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: SECT_MONO, fontSize: "15px", color: WHITE, fontWeight: 500 }}>{d.heroStat[1]}</span>
              <span style={{ fontFamily: SECT_MONO, fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{d.heroStat[2]}</span>
            </span>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", minHeight: "440px", overflow: "hidden" }}>
          <SectImgSlot id={d.heroSlot} placeholder={`${d.tag} — site photo`} />
        </div>
      </div>
    </Section>
  );
}

// ---- Use-case cards (3, sector-specific) ----
function SectorUseCases({ d }) {
  return (
    <Section tone="light" id="use-cases">
      <SectionEyebrow>Where it fits</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "48px" }}>
        <LandingH2 max="20ch">Three ways the hub earns its place.</LandingH2>
        <LandingBody max="46ch">
          The installation is identical to every other HALO FastHub — what changes is how it's configured, who gets access and where the value lands.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {d.cases.map((c) => (
          <div key={c.slot} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ height: "200px", background: "#E8E6DF", borderBottom: `1px solid ${LIGHTGREY}`, overflow: "hidden" }}>
              <SectImgSlot id={c.slot} placeholder={`${c.title} photo`} />
            </div>
            <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              <LandingH2 size={24}>{c.title}</LandingH2>
              <LandingBody size={14} max="34ch">{c.body}</LandingBody>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---- Sector numbers (warm grey) ----
function SectorNumbers({ d }) {
  return (
    <Section tone="warm" id="sector-numbers">
      <div style={{ marginBottom: "40px" }}>
        <SectionEyebrow>In numbers</SectionEyebrow>
        <LandingH2 max="20ch">What it delivers for {d.key === "fleets" ? "fleets" : d.key === "workplaces" ? "workplaces" : "destinations"}.</LandingH2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {d.numbers.map(([n, u, lbl], i) => (
          <div key={i} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "28px 24px" }}>
            <div style={{ fontFamily: SECT_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>{lbl}</div>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontFamily: SECT_MONO, fontSize: "44px", fontWeight: 600, color: BLACK, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</span>
              <span style={{ fontFamily: SECT_MONO, fontSize: "13px", color: MIDGREY }}>{u}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---- Sector proof (single pull-quote) ----
function SectorProof({ d }) {
  return (
    <Section tone="light" id="sector-proof">
      <div style={{ maxWidth: "60ch" }}>
        <div style={{ width: "40px", height: "3px", background: ORANGE, marginBottom: "28px" }} />
        <div style={{ fontFamily: SECT_MONO, fontSize: "34px", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.012em", color: BLACK, textWrap: "pretty" }}>{d.proofQuote}</div>
        <div style={{ fontFamily: SECT_MONO, fontSize: "14px", color: MIDGREY, marginTop: "24px", letterSpacing: "0.02em" }}>{d.proofAttr}</div>
        <div style={{ marginTop: "28px" }}>
          <a href="Case study.html" style={{ textDecoration: "none" }}><SecondaryButton arrow>Read the case study</SecondaryButton></a>
        </div>
      </div>
    </Section>
  );
}

// ---- Switch between sectors (also serves as the cross-link row) ----
function SectorSwitch({ current }) {
  return (
    <Section tone="offwhite" padY={56} id="sector-switch">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ fontFamily: SECT_MONO, fontSize: "13px", color: MIDGREY, letterSpacing: "0.2em", textTransform: "uppercase" }}>Other sectors</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {SECTOR_ORDER.filter((s) => s !== current).map((s) => (
            <a key={s} href={`Sector.html?sector=${s}`} style={{
              textDecoration: "none", fontFamily: SECT_MONO, fontSize: "15px", color: BLACK,
              border: `1px solid ${LIGHTGREY}`, background: WHITE, padding: "12px 22px",
              display: "inline-flex", alignItems: "center", gap: "10px",
            }}>
              {SECTOR_DATA[s].tag.replace("Sectors · ", "")} <span style={{ color: ORANGE }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---- The recyclable template ----
function SectorTemplate() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("sector");
  const d = SECTOR_DATA[key] || SECTOR_DATA.fleets;
  return (
    <div style={{ background: WHITE, fontFamily: "Montserrat, sans-serif", color: BLACK }}>
      <SiteNav active="Product" />
      <SectorHero d={d} />
      <SectorUseCases d={d} />
      <SpecTableSection tone="offwhite" />
      <SectorNumbers d={d} />
      <SectorProof d={d} />
      <SectorSwitch current={d.key} />
      <CTABand secondary={["Explore the product", "Product.html"]} />
      <Footer />
    </div>
  );
}

Object.assign(window, { SectorTemplate, SECTOR_DATA, SECTOR_ORDER });
