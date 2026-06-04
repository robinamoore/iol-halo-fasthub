// HALO FastHub — landing page sections (lower).

// ============================================================
// 7 · HURDLES → SOLVED
// ============================================================
function LP_Hurdles() {
  const items = [
    {
      concern: "Will my grid handle it?",
      headline: "It doesn't have to.",
      body: "FastHub runs behind your existing connection. Solar generation, battery storage and HALO smart-grid balancing mean we never request additional capacity from the DNO. Your supply stays exactly as it is.",
      spec: ["Behind-the-meter only", "No DNO application", "No HV reinforcement"],
    },
    {
      concern: "Will I need planning permission?",
      headline: "Probably not.",
      body: "Most car-park installations fall under Class E permitted development. We make the determination during the site assessment and, if a full application is needed, we draft and lodge it on your behalf inside week one.",
      spec: ["Class E in 80% of cases", "We draft + lodge", "No risk to programme"],
    },
    {
      concern: "What if my fleet grows?",
      headline: "Plug in another hub.",
      body: "Each FastHub is a modular, self-contained unit. When you outgrow twelve points, we deliver a second canopy alongside the first — same one-day install, same lease structure. No re-engineering of what's already there.",
      spec: ["Modular by design", "Stand-alone units", "Same lease, same day"],
    },
  ];
  return (
    <Section tone="offwhite" id="hurdles">
      <SectionEyebrow number="07">Common concerns · addressed</SectionEyebrow>
      <div style={{ marginBottom: "56px" }}>
        <LandingH2 max="22ch">The hurdles people expect. Most of them aren't there.</LandingH2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "36px 32px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "440px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "13px", color: MIDGREY, letterSpacing: "0.04em", lineHeight: 1.4 }}>
              <span style={{ display: "inline-block", marginRight: "8px", color: BLACK, fontWeight: 500 }}>Q.</span>
              {it.concern}
            </div>
            <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, color: BLACK, letterSpacing: "-0.014em", lineHeight: 1.1 }}>{it.headline}</div>
            <div style={{ fontSize: "14px", color: BLACK, lineHeight: 1.55, flex: 1 }}>{it.body}</div>
            <div style={{ borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {it.spec.map((s, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: BLACK }}>
                  <span style={{ width: "16px", height: "1px", background: BLACK }} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// 8 · COST BENEFITS
// ============================================================
function LP_Costs() {
  const benefits = [
    { value: "100%", label: "Charging revenue retained", body: "You set the tariff. Every penny of utilisation goes to you, not a third-party operator." },
    { value: "70%", label: "Cut in mains supply costs", body: "Typical reduction once solar + battery + smart-grid balancing are doing their job." },
    { value: "£0", label: "Up-front capital outlay", body: "Lease everything — hub, install, maintenance, software — as a single operational line." },
  ];
  return (
    <Section tone="dark" id="costs">
      <SectionEyebrow mode="dark" number="08">Cost benefits</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "80px", alignItems: "end", marginBottom: "64px" }}>
        <LandingH1 mode="dark" size={72} max="22ch">Operational. Revenue-positive from month one.</LandingH1>
        <LandingBody mode="dark" max="46ch">
          You pay a single monthly lease. We deliver the hub, the install, the warranty, the monitoring and the software. You keep the charging revenue and the tax treatment of an operating cost.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ background: CHARCOAL, padding: "36px 32px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "260px", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>{b.label}</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "88px", fontWeight: 500, color: WHITE, letterSpacing: "-0.024em", lineHeight: 1 }}>{b.value}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>{b.body}</div>
          </div>
        ))}
      </div>

      {/* Lease summary strip */}
      <div style={{ marginTop: "32px", padding: "32px 40px", border: "1px solid rgba(255,255,255,0.18)", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "32px", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Starting lease</div>
          <div style={{ fontFamily: "Montserrat", fontSize: "44px", fontWeight: 500, color: WHITE, letterSpacing: "-0.018em", lineHeight: 1, marginTop: "8px" }}>£2,500<span style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", marginLeft: "8px" }}>/ month</span></div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Term</div>
          <div style={{ fontFamily: "Montserrat", fontSize: "15px", color: WHITE, marginTop: "8px" }}>60 / 84 / 120 months</div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Included</div>
          <div style={{ fontFamily: "Montserrat", fontSize: "15px", color: WHITE, marginTop: "8px" }}>Hardware · install · maintenance · HALO OS</div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>You set</div>
          <div style={{ fontFamily: "Montserrat", fontSize: "15px", color: WHITE, marginTop: "8px" }}>Tariff · access rules · branding</div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// 9 · CASE STUDIES
// ============================================================
function CaseCard({ client, sector, stat, statLabel, quote, attrib }) {
  return (
    <a href="#" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ background: BLACK, color: WHITE, padding: "36px 32px 28px", display: "flex", flexDirection: "column", gap: "24px", minHeight: "420px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Case study · {sector}</div>
            <div style={{ marginTop: "12px", fontFamily: "Montserrat", fontSize: "26px", fontWeight: 500, color: WHITE, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{client}</div>
          </div>
          <span style={{ fontSize: "14px", color: ORANGE }}>→</span>
        </div>

        <div>
          <div style={{ fontFamily: "Montserrat", fontSize: "72px", fontWeight: 500, color: WHITE, letterSpacing: "-0.024em", lineHeight: 1 }}>{stat}</div>
          <div style={{ marginTop: "8px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{statLabel}</div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "20px", fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
          "{quote}"
          <div style={{ marginTop: "12px", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{attrib}</div>
        </div>
      </div>
    </a>
  );
}

function LP_CaseStudies() {
  return (
    <Section tone="light" id="case-studies">
      <SectionEyebrow number="09">In the field</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "56px" }}>
        <LandingH2 max="22ch">Three deployments. Same hub. Different jobs.</LandingH2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
          <LandingBody max="44ch">
            From a police fleet operating round the clock to a renewables academy hosting visitor charging — the underlying installation is the same. The configuration is what changes.
          </LandingBody>
          <SecondaryButton arrow>See all case studies</SecondaryButton>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <CaseCard
          client="Merseyside Police"
          sector="Fleet"
          stat="6 hrs"
          statLabel="From crane lift to first charge"
          quote="Flexible charging for our diverse fleet — integral to our sustainability strategy."
          attrib="Keith Dickinson · Director of Resources"
        />
        <CaseCard
          client="Segen Academy"
          sector="Workplace"
          stat="100%"
          statLabel="Visitor-charging demand met from solar"
          quote="A convenient, sustainable experience for everyone at the Academy."
          attrib="James Galloway · Global Product Director"
        />
        <CaseCard
          client="Bevan Group"
          sector="Destination"
          stat="64k"
          statLabel="EV miles generated annually from solar"
          quote="The hub paid for itself in under three years on charging revenue alone."
          attrib="Operations lead · commercial vehicles"
        />
      </div>
    </Section>
  );
}

// ============================================================
// 10 · FURTHER READING
// ============================================================
function ReadingCard({ kind, title, meta, slotId, placeholder }) {
  return (
    <a href="#" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "0", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* visual block — user-droppable image slot, distinct per card */}
        <div style={{ height: "180px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${LIGHTGREY}`, background: "#E8E6DF" }}>
          <div dangerouslySetInnerHTML={{ __html: `
            <image-slot
              id="${slotId}"
              shape="rect"
              placeholder="${placeholder}"
              style="width:100%;height:180px;display:block;"
            ></image-slot>
          ` }} />
          {/* kind chip floats above the image */}
          <div style={{ position: "absolute", left: 0, bottom: 0, padding: "16px 20px", pointerEvents: "none" }}>
            <span style={{ fontFamily: "Montserrat", fontSize: "11px", color: BLACK, letterSpacing: "0.22em", textTransform: "uppercase", background: WHITE, padding: "4px 10px" }}>{kind}</span>
          </div>
        </div>
        <div style={{ padding: "24px 24px 22px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, justifyContent: "space-between" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 500, color: BLACK, letterSpacing: "-0.005em", lineHeight: 1.25 }}>{title}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "12px" }}>
            <span style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>{meta}</span>
            <span style={{ fontSize: "14px", color: ORANGE }}>→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function LP_FurtherReading() {
  return (
    <Section tone="offwhite" id="reading">
      <SectionEyebrow number="10">Further reading</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "end", marginBottom: "48px" }}>
        <LandingH2 max="22ch">Background for the people who'll ask.</LandingH2>
        <LandingBody max="46ch">
          Whitepapers, technical articles and press coverage to share with the finance director, the facilities lead, the sustainability committee. Everything stays on this site — no gated downloads.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        <ReadingCard slotId="reading-1" kind="Whitepaper" title="The 2026 fleet electrification gap" meta="14 min read · PDF" placeholder="Whitepaper cover" />
        <ReadingCard slotId="reading-2" kind="Article" title="Inside HALO smart-grid balancing" meta="6 min read" placeholder="Article hero image" />
        <ReadingCard slotId="reading-3" kind="Webinar" title="ROI deep-dive for fleet managers" meta="42 min · on demand" placeholder="Webinar thumbnail" />
        <ReadingCard slotId="reading-4" kind="Press" title="Merseyside Police installation, in pictures" meta="Fleet News · 2025" placeholder="Press photograph" />
      </div>
    </Section>
  );
}

// ============================================================
// 11 · FINAL CTA
// ============================================================
function LP_FinalCTA() {
  return (
    <Section tone="dark" padY={120} id="enquire">
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "80px", alignItems: "end" }}>
        <div>
          <SectionEyebrow mode="dark" number="11">Enquire</SectionEyebrow>
          <LandingH1 mode="dark" size={96} max="14ch">Ready to power your fleet?</LandingH1>
          <div style={{ marginTop: "32px" }}>
            <LandingSub mode="dark" size={20} max="44ch">
              A free site assessment is the only thing standing between you and a working hub. We'll come to you, walk the car park, and have a costed, sized proposal in your inbox inside seven working days.
            </LandingSub>
          </div>
          <div style={{ marginTop: "44px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <PrimaryButton>Make an enquiry</PrimaryButton>
            <SecondaryButton mode="dark" arrow>Talk to a fleet specialist</SecondaryButton>
          </div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Direct lines</div>
          <div>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", marginBottom: "4px" }}>Sales · fleet &amp; commercial</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "20px", color: WHITE, letterSpacing: "-0.005em" }}>+44 (0) 3331 121 371</div>
          </div>
          <div>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", marginBottom: "4px" }}>Email</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "20px", color: WHITE, letterSpacing: "-0.005em" }}>info@3ti.co.uk</div>
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginTop: "8px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            All assessments are free and obligation-free. We sign a mutual NDA on request before reviewing site drawings.
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { LP_Hurdles, LP_Costs, LP_CaseStudies, LP_FurtherReading, LP_FinalCTA });
