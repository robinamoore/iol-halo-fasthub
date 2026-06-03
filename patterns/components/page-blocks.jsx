// HALO FastHub — reusable PAGE-level sections.
// These promote the artboard-only Stage-2 components (page hero, spec table,
// story rows, sector cards, CTA band, big-headline, enquiry form, warm-grey
// numbers) into landing-style Section blocks so the seven pages compose from
// one system. Desktop-first. Tokens come from brand-assets cross-script scope.

const {
  Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody,
  PrimaryButton, SecondaryButton, HaloFastHubLogo,
} = window;

const PB_MONO = "Montserrat, sans-serif";

function PBImgSlot({ id, placeholder, shape = "rect", height = "100%" }) {
  return (
    <div style={{ width: "100%", height }} dangerouslySetInnerHTML={{ __html: `
      <image-slot id="${id}" shape="${shape}" placeholder="${placeholder}"
        style="width:100%;height:100%;display:block;"></image-slot>
    ` }} />
  );
}

// ============================================================
// SITE NAV — 7-page IA, persistent enquiry CTA, active state
// ============================================================
const NAV_ITEMS = [
  ["Product", "Product.html"],
  ["Case studies", "Case studies.html"],
  ["About", "About.html"],
  ["News", "News.html"],
  ["Contact", "Contact.html"],
];

function SiteNav({ active }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: WHITE, borderBottom: `1px solid ${LIGHTGREY}`, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <a href="Home.html" style={{ display: "inline-flex", textDecoration: "none" }} aria-label="HALO FastHub — home">
          <HaloFastHubLogo height={24} mode="dark" gap={16} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {NAV_ITEMS.map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: PB_MONO, fontSize: "14px", textDecoration: "none",
              color: active === label ? BLACK : "#555",
              fontWeight: active === label ? 600 : 400,
              borderBottom: active === label ? `2px solid ${ORANGE}` : "2px solid transparent",
              paddingBottom: "4px",
            }}>{label}</a>
          ))}
        </div>
      </div>
      <a href="Contact.html" style={{ textDecoration: "none" }}>
        <PrimaryButton small>Make an enquiry</PrimaryButton>
      </a>
    </div>
  );
}

// ============================================================
// PAGE HERO — dark, generic (compact option)
// ============================================================
function PageHero({ eyebrow, number, title, sub, compact = false, primary = false, secondary }) {
  return (
    <Section tone="dark" padY={compact ? 72 : 112}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "72px", alignItems: "end" }}>
        <div>
          <SectionEyebrow mode="dark" number={number}>{eyebrow}</SectionEyebrow>
          <LandingH1 mode="dark" size={compact ? 64 : 84} max="16ch">{title}</LandingH1>
          {sub && (
            <div style={{ marginTop: "26px" }}>
              <LandingSub mode="dark" max="48ch">{sub}</LandingSub>
            </div>
          )}
          {(primary || secondary) && (
            <div style={{ marginTop: "38px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              {primary && <a href="Contact.html" style={{ textDecoration: "none" }}><PrimaryButton>Make an enquiry</PrimaryButton></a>}
              {secondary && <a href={secondary[1]} style={{ textDecoration: "none" }}><SecondaryButton mode="dark" arrow>{secondary[0]}</SecondaryButton></a>}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// CTA BAND — slim dark band, drives to enquiry
// ============================================================
function CTABand({ title = "Ready to power your fleet?", sub = "A free, obligation-free site assessment is the only thing standing between you and a working hub.", secondary }) {
  return (
    <Section tone="dark" padY={72}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" }}>
        <div>
          <LandingH2 mode="dark" size={40} max="22ch">{title}</LandingH2>
          <div style={{ marginTop: "14px" }}>
            <LandingSub mode="dark" size={17} max="52ch">{sub}</LandingSub>
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="Contact.html" style={{ textDecoration: "none" }}><PrimaryButton>Make an enquiry</PrimaryButton></a>
          {secondary && <a href={secondary[1]} style={{ textDecoration: "none" }}><SecondaryButton mode="dark" arrow>{secondary[0]}</SecondaryButton></a>}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// SPEC TABLE — three columns (Hardware / Performance / Software)
// ============================================================
const SPEC_COLUMNS = [
  { head: "Hardware", rows: [["Charge points", "12 × Type 2"], ["AC output", "7–22 kW per point"], ["DC option", "Up to 60 kW mix"], ["Solar canopy", "19.32 kWp monocrystalline"], ["Battery", "Smart-grid balanced storage"], ["Footprint", "12 standard parking bays"]] },
  { head: "Performance", rows: [["Install time", "1 day on site"], ["Grid upgrade", "Not required"], ["Solar + battery share", "Up to 65%"], ["Connection", "Behind the meter"], ["Uptime", "99.5% monitored"], ["Expansion", "Modular — add a hub"]] },
  { head: "Software & support", rows: [["Platform", "HALO OS"], ["Energy arbitration", "Second-by-second"], ["Tariff control", "Client-set"], ["Monitoring", "24/7 remote"], ["Maintenance", "Included in lease"], ["Reporting", "Carbon + utilisation"]] },
];

function SpecTableSection({ tone = "light" }) {
  return (
    <Section tone={tone} id="specs">
      <SectionEyebrow>Specifications</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "48px" }}>
        <LandingH2 max="20ch">Everything in one leased unit.</LandingH2>
        <LandingBody max="46ch">
          One prefabricated canopy carrying generation, storage, mains integration and twelve charge points — sized for fleet duty cycles and managed end-to-end.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {SPEC_COLUMNS.map((col) => (
          <div key={col.head} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "32px 28px" }}>
            <div style={{ fontFamily: PB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px" }}>{col.head}</div>
            {col.rows.map(([k, v], i) => (
              <div key={k} style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "13px 0", borderTop: `1px solid ${LIGHTGREY}` }}>
                <span style={{ fontFamily: PB_MONO, fontSize: "13px", color: MIDGREY, flex: 1 }}>{k}</span>
                <span style={{ fontFamily: PB_MONO, fontSize: "13px", color: BLACK, fontWeight: 500, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// STORY ROWS — alternating image + text split rows
// ============================================================
function StoryRows({ eyebrow = "How it works", number = "How", title, rows, tone = "offwhite" }) {
  return (
    <Section tone={tone} id="story">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      {title && <div style={{ marginBottom: "48px" }}><LandingH2 max="22ch">{title}</LandingH2></div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {rows.map((r, i) => {
          const flip = i % 2 === 1;
          const img = (
            <div key="img" style={{ height: "360px", background: "#E8E6DF", border: `1px solid ${LIGHTGREY}`, overflow: "hidden" }}>
              <PBImgSlot id={r.slot} placeholder={r.placeholder || `${r.title} image`} />
            </div>
          );
          const txt = (
            <div key="txt" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: flip ? "0 0 0 24px" : "0 24px 0 0" }}>
              <div style={{ fontFamily: PB_MONO, fontSize: "52px", fontWeight: 600, color: BLACK, letterSpacing: "-0.022em", lineHeight: 1, marginBottom: "20px" }}>{r.step}</div>
              <LandingH2 size={34} max="18ch">{r.title}</LandingH2>
              <div style={{ marginTop: "16px" }}>
                <LandingBody max="48ch">{r.body}</LandingBody>
              </div>
            </div>
          );
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "28px" }}>
              {flip ? [txt, img] : [img, txt]}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// SECTOR CARDS — Fleets / Workplaces / Destinations
// ============================================================
const SECTORS = [
  { name: "Fleets", copy: "Reliable, scalable charging that keeps marked, unmarked and commercial vehicles moving around the clock.", slot: "sector-fleet", href: "Sector.html?sector=fleets" },
  { name: "Workplaces", copy: "Fast deployment for staff and visitor parking, with the option to generate revenue from every bay.", slot: "sector-work", href: "Sector.html?sector=workplaces" },
  { name: "Destinations", copy: "Attract EV drivers, extend dwell time and unlock a new revenue line at retail and leisure sites.", slot: "sector-dest", href: "Sector.html?sector=destinations" },
];

function SectorCardsSection({ tone = "light" }) {
  return (
    <Section tone={tone} id="sectors">
      <SectionEyebrow>Sectors</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "48px" }}>
        <LandingH2 max="20ch">One hub. Three jobs.</LandingH2>
        <LandingBody max="46ch">
          The underlying installation is identical — the configuration, access rules and tariff are what change by sector.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {SECTORS.map((s) => (
          <a key={s.slot} href={s.href || "#"} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ height: "200px", background: "#E8E6DF", borderBottom: `1px solid ${LIGHTGREY}`, overflow: "hidden" }}>
                <PBImgSlot id={s.slot} placeholder={`${s.name} site photo`} />
              </div>
              <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <LandingH2 size={28}>{s.name}</LandingH2>
                  <span style={{ fontSize: "15px", color: ORANGE }}>→</span>
                </div>
                <LandingBody size={14} max="34ch">{s.copy}</LandingBody>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// WARM-GREY NUMBERS — company / results in numbers
// ============================================================
function WarmGreyNumbers({ eyebrow = "In numbers", number = "By", title = "The hub, in numbers.", stats }) {
  const data = stats || [
    ["12", "charge points", "Per hub"],
    ["1", "day install", "Site time"],
    ["19.32", "kWp solar", "Generation"],
    ["64k", "EV miles / yr", "From solar"],
  ];
  return (
    <Section tone="warm" id="numbers">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", gap: "32px", flexWrap: "wrap" }}>
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <LandingH2 max="20ch">{title}</LandingH2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {data.map(([n, u, lbl], i) => (
          <div key={i} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "28px 24px" }}>
            <div style={{ fontFamily: PB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>{lbl}</div>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontFamily: PB_MONO, fontSize: "48px", fontWeight: 600, color: BLACK, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</span>
              <span style={{ fontFamily: PB_MONO, fontSize: "13px", color: MIDGREY }}>{u}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// BIG HEADLINE + SUBLINKS — mission / positioning
// ============================================================
function BigHeadlineLinks() {
  return (
    <Section tone="light" id="mission">
      <SectionEyebrow number="01">Our mission</SectionEyebrow>
      <h2 style={{ fontFamily: PB_MONO, fontSize: "64px", fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.04, color: BLACK, margin: 0, maxWidth: "20ch", textWrap: "balance" }}>
        Make clean, self-generated EV charging the obvious choice for every car park in Britain.
      </h2>
      <div style={{ marginTop: "40px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {[["How the hub works", "Product.html"], ["See our deployments", "Case studies.html"], ["Read the latest", "News.html"]].map(([t, href]) => (
          <a key={t} href={href} style={{ fontFamily: PB_MONO, fontSize: "16px", color: BLACK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", borderBottom: `1px solid ${ORANGE}`, paddingBottom: "4px" }}>
            {t} <span style={{ color: ORANGE }}>→</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// ENQUIRY FORM — page version
// ============================================================
function FormLine({ label, placeholder, type = "text", value, onChange, error, valid }) {
  const showErr = !!error;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ fontFamily: PB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ borderBottom: `${showErr ? 2 : 1}px solid ${BLACK}`, paddingBottom: showErr ? "9px" : "10px", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
        <input
          type={type === "select" ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          style={{ border: "none", outline: "none", background: "transparent", fontFamily: PB_MONO, fontSize: "17px", color: BLACK, width: "100%" }}
        />
        {valid && !showErr && (
          <span aria-hidden="true" style={{ flexShrink: 0, color: BLACK, fontSize: "13px" }}>✓</span>
        )}
        {showErr && (
          <span aria-hidden="true" style={{ flexShrink: 0, width: "16px", height: "16px", borderRadius: "50%", background: BLACK, color: WHITE, fontSize: "11px", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>!</span>
        )}
        {type === "select" && !valid && !showErr && <span style={{ fontSize: "12px", color: MIDGREY }}>▾</span>}
      </div>
      {showErr && (
        <span style={{ fontFamily: PB_MONO, fontSize: "11px", color: BLACK, fontWeight: 500, letterSpacing: "0.01em" }}>{error}</span>
      )}
    </div>
  );
}

function EnquiryForm({ tone = "light" }) {
  const [f, setF] = React.useState({ name: "", org: "", email: "", phone: "", sector: "", spaces: "", notes: "" });
  const [attempted, setAttempted] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const emailOk = /\S+@\S+\.\S+/.test(f.email);
  const errors = {
    name: !f.name.trim() ? "Please enter your name" : "",
    email: !f.email.trim() ? "Please enter your email" : (!emailOk ? "Enter a valid email address" : ""),
    sector: !f.sector.trim() ? "Tell us your sector" : "",
    spaces: !f.spaces.trim() ? "Approximate number of spaces" : "",
  };
  const hasErr = Object.values(errors).some(Boolean);
  const err = (k) => (attempted ? errors[k] : "");
  const ok = (k) => (attempted && !errors[k] && f[k].trim() !== "");
  const submit = () => { setAttempted(true); if (!hasErr) setSubmitted(true); };

  return (
    <Section tone={tone} id="enquiry-form">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start" }}>
        <div>
          <SectionEyebrow number="01">Enquiry</SectionEyebrow>
          <LandingH2 size={44} max="16ch">Tell us about your site.</LandingH2>
          <div style={{ marginTop: "20px" }}>
            <LandingBody max="40ch">
              Fifty or more parking spaces is the usual starting point. Share a few details and we'll come back within seven working days with a sized, costed proposal.
            </LandingBody>
          </div>
          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "6px", fontFamily: PB_MONO, fontSize: "15px", color: BLACK }}>
            <span style={{ fontFamily: PB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Or reach us directly</span>
            <span>Sales · +44 (0)3331 121 371</span>
            <span>Office · +44 (0)3332 343 703</span>
            <span>info@3ti.co.uk</span>
          </div>
        </div>

        {submitted ? (
          // Confirmation state — mocks the on-submit confirmation + email
          <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "56px 48px", minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: `2px solid ${BLACK}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: BLACK }}>✓</div>
            <div style={{ fontFamily: PB_MONO, fontSize: "32px", fontWeight: 600, letterSpacing: "-0.014em", color: BLACK, lineHeight: 1.1 }}>Enquiry received.</div>
            <div style={{ fontFamily: PB_MONO, fontSize: "16px", color: BLACK, lineHeight: 1.6, maxWidth: "46ch" }}>
              Thanks{f.name ? `, ${f.name.split(" ")[0]}` : ""} — we'll be in touch within seven working days with next steps. A confirmation has been sent to <span style={{ fontWeight: 600 }}>{f.email}</span>.
            </div>
            <div style={{ marginTop: "8px" }}>
              <span onClick={() => { setSubmitted(false); setAttempted(false); setF({ name: "", org: "", email: "", phone: "", sector: "", spaces: "", notes: "" }); }} style={{ cursor: "pointer", fontFamily: PB_MONO, fontSize: "14px", color: BLACK, borderBottom: `1px solid ${ORANGE}`, paddingBottom: "3px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Send another enquiry <span style={{ color: ORANGE }}>→</span>
              </span>
            </div>
          </div>
        ) : (
          <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 24px" }}>
              <FormLine label="Full name" placeholder="Your name" value={f.name} onChange={set("name")} error={err("name")} valid={ok("name")} />
              <FormLine label="Organisation" placeholder="Company" value={f.org} onChange={set("org")} />
              <FormLine label="Email" placeholder="you@company.co.uk" type="email" value={f.email} onChange={set("email")} error={err("email")} valid={ok("email")} />
              <FormLine label="Phone" placeholder="Optional" type="tel" value={f.phone} onChange={set("phone")} />
              <FormLine label="Sector" placeholder="Fleet operator" type="select" value={f.sector} onChange={set("sector")} error={err("sector")} valid={ok("sector")} />
              <FormLine label="Parking spaces" placeholder="e.g. 180" value={f.spaces} onChange={set("spaces")} error={err("spaces")} valid={ok("spaces")} />
            </div>
            <div style={{ marginTop: "28px" }}>
              <FormLine label="Notes" placeholder="Tell us about your fleet and timelines" value={f.notes} onChange={set("notes")} />
            </div>
            {attempted && hasErr && (
              <div style={{ marginTop: "20px", fontFamily: PB_MONO, fontSize: "12px", color: BLACK, fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                <span aria-hidden="true" style={{ width: "16px", height: "16px", borderRadius: "50%", background: BLACK, color: WHITE, fontSize: "11px", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>!</span>
                Please complete the highlighted fields.
              </div>
            )}
            <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: PB_MONO, fontSize: "12px", color: MIDGREY }}>We sign a mutual NDA on request.</span>
              <span onClick={submit} style={{ cursor: "pointer", display: "inline-flex" }}>
                <PrimaryButton>Make an enquiry</PrimaryButton>
              </span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

// ============================================================
// INLINE CTA — slim mid-page enquiry prompt (light tone)
// ============================================================
function InlineCTA({ title = "Fifty-plus parking spaces? Let's size your hub.", button = "Make an enquiry", href = "Contact.html" }) {
  return (
    <Section tone="offwhite" padY={48}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
        <div style={{ fontFamily: PB_MONO, fontSize: "30px", fontWeight: 600, letterSpacing: "-0.014em", color: BLACK, maxWidth: "26ch", lineHeight: 1.1 }}>{title}</div>
        <a href={href} style={{ textDecoration: "none" }}><PrimaryButton>{button}</PrimaryButton></a>
      </div>
    </Section>
  );
}

// ============================================================
// CERTIFICATIONS & INSTALL NOTES — for the technical deep dive
// ============================================================
const CERTS = [
  ["CE", "Conformité Européenne"],
  ["BS EN 61851", "EV charging system standard"],
  ["OZEV", "Approved chargepoint"],
  ["IEC 62196", "Type 2 connector"],
  ["ISO 9001", "Quality management"],
  ["ISO 14001", "Environmental management"],
];
const INSTALL_NOTES = [
  "Foundations — ground screws or pre-cast pads on standard car-park sub-base; no deep excavation.",
  "Crane access — a single HIAB lift; roughly 6 m of clear approach required on install day.",
  "Electrical — behind-the-meter tie-in to your existing distribution board; no DNO notification.",
  "Commissioning — HALO OS arrives pre-configured to your tariff; energise and handover the same day.",
];

function CertificationsBlock({ tone = "light" }) {
  return (
    <Section tone={tone} id="certs">
      <SectionEyebrow>Certifications &amp; install notes</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start", marginTop: "8px" }}>
        {/* Certifications */}
        <div>
          <LandingH2 size={34} max="16ch">Certified to the standards procurement asks for.</LandingH2>
          <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {CERTS.map(([code, desc]) => (
              <div key={code} style={{ border: `1px solid ${LIGHTGREY}`, background: WHITE, padding: "18px 20px" }}>
                <div style={{ fontFamily: PB_MONO, fontSize: "16px", fontWeight: 600, color: BLACK, letterSpacing: "-0.005em" }}>{code}</div>
                <div style={{ fontFamily: PB_MONO, fontSize: "12px", color: MIDGREY, marginTop: "6px", lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Install notes */}
        <div>
          <div style={{ fontFamily: PB_MONO, fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "20px" }}>Install notes</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {INSTALL_NOTES.map((n, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "16px", padding: "18px 0", borderTop: `1px solid ${LIGHTGREY}` }}>
                <span style={{ fontFamily: PB_MONO, fontSize: "20px", fontWeight: 600, color: BLACK, letterSpacing: "-0.01em" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: PB_MONO, fontSize: "15px", color: BLACK, lineHeight: 1.55 }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  SiteNav, PageHero, CTABand, SpecTableSection, StoryRows,
  SectorCardsSection, WarmGreyNumbers, BigHeadlineLinks, EnquiryForm,
  InlineCTA, CertificationsBlock,
});
