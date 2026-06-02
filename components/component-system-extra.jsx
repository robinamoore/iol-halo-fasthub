// Stage 2 — Extended Polestar-blended layouts.
// Five additional slides covering:
//   12 · Specifications table
//   13 · Story rows (alternating image / text)
//   14 · Pull-quote testimonial
//   15 · Forms & configurator
//   16 · Comparison table & disclosure

// ---------- C12 · Specifications table ----------
function SpecTableColumn({ heading, rows }) {
  return (
    <div style={{ background: OFFWHITE }}>
      <div style={{ background: BLACK, color: WHITE, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Eyebrow mode="dark">{heading}</Eyebrow>
      </div>
      <div>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", padding: "12px 20px", borderTop: i === 0 ? "none" : `1px solid ${LIGHTGREY}`, alignItems: "baseline" }}>
            <span style={{ fontSize: "12px", color: MIDGREY, letterSpacing: "0.04em" }}>{k}</span>
            <span style={{ fontSize: "13px", color: BLACK, fontWeight: 500, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CMP_SpecTable() {
  return (
    <ArtboardFrame label="12 · Specifications table">
      <ArtboardTopRule number="06 / 14" kicker="Specifications table" page="Page 12" />
      <ArtboardTitle title="One full-width specifications grid." sub="Three columns of structured data — hardware, performance, comms" titleSize={40} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: LIGHTGREY, border: `1px solid ${LIGHTGREY}` }}>
        <SpecTableColumn
          heading="Hardware"
          rows={[
            ["Charge points", "12"],
            ["Solar capacity", "19.32 kWp"],
            ["Battery storage", "Integrated"],
            ["Connector mix", "Dual AC + DC"],
            ["Power per point", "7 kW typical"],
            ["Footprint", "~60 m²"],
          ]}
        />
        <SpecTableColumn
          heading="Performance"
          rows={[
            ["Install time", "1 day"],
            ["Grid upgrade", "Not required"],
            ["Solar mileage / yr", "Up to 64,000 EV miles"],
            ["Energy management", "On-site smart grid"],
            ["Lease from", "£2,500 / mo"],
            ["Net Zero ready", "Yes"],
          ]}
        />
        <SpecTableColumn
          heading="Software & support"
          rows={[
            ["Operating system", "HALO by 3ti"],
            ["Monitoring", "24/7 remote"],
            ["Driver support", "24/7 helpline"],
            ["Tariff control", "Client-set"],
            ["Revenue retention", "100%"],
            ["Maintenance", "Fully managed"],
          ]}
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: `1px solid ${LIGHTGREY}` }}>
        <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>Indicative spec. Confirmed at site survey.</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <SecondaryButton small arrow>Download the full spec</SecondaryButton>
          <PrimaryButton small>Make an enquiry</PrimaryButton>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C13 · Story rows (alternating) ----------
// Slide 13 uses stylised line drawings of an actual FastHub installation +
// the HALO OS dashboard — not a tiled pattern. The drawing sits on the warm
// grey backdrop the brand uses for image placeholders.

const STORY_BG = "#E8E6DF";
const STORY_INK = "#1A1A1A";
const STORY_GHOST = "rgba(26,26,26,0.32)";

function LineFrame({ caption, children }) {
  return (
    <div style={{ background: STORY_BG, height: "290px", position: "relative", overflow: "hidden" }}>
      {children}
      <div style={{ position: "absolute", inset: 0, padding: "14px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "10px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>Illustration · indicative</span>
          <span style={{ fontSize: "10px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>HALO ⌒</span>
        </div>
        <span style={{ fontSize: "12px", color: MIDGREY }}>{caption}</span>
      </div>
    </div>
  );
}

// External elevation — solar canopy + cars + chargers
function InstallationDrawing() {
  return (
    <svg viewBox="0 0 760 290" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {/* faint horizon */}
      <line x1="0" y1="226" x2="760" y2="226" stroke={STORY_GHOST} strokeWidth="1" strokeDasharray="3 5" />
      {/* sun + rays */}
      <g stroke={STORY_INK} strokeWidth="1.2" fill="none">
        <circle cx="640" cy="68" r="18" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r1 = 24, r2 = 32;
          const rad = (a * Math.PI) / 180;
          return (
            <line key={a}
              x1={640 + Math.cos(rad) * r1} y1={68 + Math.sin(rad) * r1}
              x2={640 + Math.cos(rad) * r2} y2={68 + Math.sin(rad) * r2}
            />
          );
        })}
      </g>

      {/* solar canopy — slight slope */}
      <g stroke={STORY_INK} strokeWidth="1.4" fill="none">
        {/* canopy slab: top edge slopes down left→right */}
        <polygon points="120,86 620,76 620,108 120,118" strokeLinejoin="round" />
        {/* PV cell grid on canopy face */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 120 + i * (500 / 12);
          const y1 = 86 + i * ((76 - 86) / 12);
          const x2 = 120 + i * (500 / 12);
          const y2 = 118 + i * ((108 - 118) / 12);
          return <line key={"v" + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STORY_GHOST} />;
        })}
        <line x1="120" y1="102" x2="620" y2="92" stroke={STORY_GHOST} />

        {/* underside shadow line */}
        <line x1="120" y1="118" x2="620" y2="108" />

        {/* support posts */}
        <line x1="150" y1="118" x2="150" y2="226" />
        <line x1="158" y1="118" x2="158" y2="226" />
        <line x1="370" y1="112" x2="370" y2="226" />
        <line x1="378" y1="112" x2="378" y2="226" />
        <line x1="590" y1="108" x2="590" y2="226" />
        <line x1="598" y1="108" x2="598" y2="226" />

        {/* post feet */}
        <line x1="146" y1="226" x2="162" y2="226" strokeWidth="1.6" />
        <line x1="366" y1="226" x2="382" y2="226" strokeWidth="1.6" />
        <line x1="586" y1="226" x2="602" y2="226" strokeWidth="1.6" />

        {/* charge unit pylons (between posts) */}
        <g>
          <rect x="252" y="184" width="14" height="42" />
          <rect x="254" y="188" width="10" height="10" />
          {/* small cable */}
          <path d="M 266 200 q 14 4 16 18" />
        </g>
        <g>
          <rect x="478" y="184" width="14" height="42" />
          <rect x="480" y="188" width="10" height="10" />
          <path d="M 478 200 q -14 4 -16 18" />
        </g>
      </g>

      {/* parked cars — minimal silhouettes */}
      <g stroke={STORY_INK} strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* car 1 */}
        <path d="M 188 226 L 196 206 L 224 200 L 244 200 L 252 220 L 252 226" />
        <path d="M 188 226 L 252 226" />
        <line x1="222" y1="200" x2="222" y2="220" />
        <circle cx="202" cy="226" r="6" />
        <circle cx="240" cy="226" r="6" />

        {/* car 2 */}
        <path d="M 410 226 L 420 204 L 452 198 L 478 198 L 488 220 L 488 226" />
        <path d="M 410 226 L 488 226" />
        <line x1="450" y1="198" x2="450" y2="220" />
        <circle cx="426" cy="226" r="6" />
        <circle cx="476" cy="226" r="6" />
      </g>

      {/* ground tick marks */}
      <g stroke={STORY_GHOST} strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={60 + i * 50} y1="232" x2={66 + i * 50} y2="238" />
        ))}
      </g>

      {/* dimension call-outs */}
      <g stroke={STORY_GHOST} strokeWidth="1" fill="none">
        <line x1="120" y1="56" x2="120" y2="80" />
        <line x1="620" y1="56" x2="620" y2="76" />
        <line x1="120" y1="60" x2="620" y2="60" markerEnd="" />
        <polygon points="120,60 128,57 128,63" fill={STORY_GHOST} stroke="none" />
        <polygon points="620,60 612,57 612,63" fill={STORY_GHOST} stroke="none" />
      </g>
      <text x="370" y="54" textAnchor="middle" fontFamily="Montserrat" fontSize="10" fill={MIDGREY} letterSpacing="0.06em">12-bay canopy · 19.32 kWp</text>
    </svg>
  );
}

// HALO OS dashboard — energy flow + day chart
function DashboardDrawing() {
  return (
    <svg viewBox="0 0 760 290" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {/* dashboard window frame */}
      <rect x="44" y="50" width="672" height="210" stroke={STORY_INK} strokeWidth="1.4" fill="none" />
      {/* title bar */}
      <line x1="44" y1="74" x2="716" y2="74" stroke={STORY_INK} strokeWidth="1" />
      <g fill={STORY_GHOST}>
        <circle cx="58" cy="62" r="3" />
        <circle cx="70" cy="62" r="3" />
        <circle cx="82" cy="62" r="3" />
      </g>
      <text x="108" y="66" fontFamily="Montserrat" fontSize="10" fill={MIDGREY} letterSpacing="0.18em">HALO OS · LIVE</text>
      <text x="700" y="66" textAnchor="end" fontFamily="Montserrat" fontSize="10" fill={MIDGREY}>14:32 GMT</text>

      {/* left column — energy flow ring */}
      <g stroke={STORY_INK} strokeWidth="1.4" fill="none">
        {/* nodes */}
        <circle cx="120" cy="138" r="22" />
        <circle cx="232" cy="138" r="22" />
        <circle cx="176" cy="208" r="22" />
        {/* labels */}
      </g>
      <g fontFamily="Montserrat" fontSize="9" fill={STORY_INK} letterSpacing="0.04em" textAnchor="middle">
        <text x="120" y="141">SOLAR</text>
        <text x="232" y="141">BATTERY</text>
        <text x="176" y="211">CHARGERS</text>
      </g>
      {/* flow arrows between nodes */}
      <g stroke={STORY_INK} strokeWidth="1.2" fill="none">
        <path d="M 142 138 L 210 138" />
        <polygon points="210,138 204,135 204,141" fill={STORY_INK} stroke="none" />
        <path d="M 222 158 L 192 188" />
        <polygon points="192,188 199,184 195,180" fill={STORY_INK} stroke="none" />
        <path d="M 158 188 L 132 158" />
        <polygon points="132,158 138,162 134,166" fill={STORY_INK} stroke="none" />
      </g>
      <text x="176" y="98" textAnchor="middle" fontFamily="Montserrat" fontSize="9" fill={MIDGREY} letterSpacing="0.16em">ENERGY FLOW</text>

      {/* divider */}
      <line x1="324" y1="86" x2="324" y2="250" stroke={STORY_GHOST} strokeWidth="1" />

      {/* right column — day chart */}
      <text x="346" y="100" fontFamily="Montserrat" fontSize="9" fill={MIDGREY} letterSpacing="0.16em">GENERATION · TODAY</text>
      <text x="700" y="100" textAnchor="end" fontFamily="Montserrat" fontSize="14" fontWeight="500" fill={STORY_INK} letterSpacing="-0.01em">82.4 kWh</text>

      {/* chart axes */}
      <g stroke={STORY_GHOST} strokeWidth="1">
        <line x1="346" y1="220" x2="700" y2="220" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={i} x1={346 + i * 71} y1="220" x2={346 + i * 71} y2="224" />
        ))}
      </g>
      <g fontFamily="Montserrat" fontSize="9" fill={MIDGREY} textAnchor="middle">
        <text x="346" y="238">06</text>
        <text x="417" y="238">09</text>
        <text x="488" y="238">12</text>
        <text x="559" y="238">15</text>
        <text x="630" y="238">18</text>
        <text x="700" y="238">21</text>
      </g>
      {/* generation curve — area + line */}
      <path d="M 346 220 C 380 218 400 200 430 170 C 470 130 510 112 540 116 C 580 122 615 160 650 195 C 670 213 690 220 700 220 L 700 220 L 346 220 Z"
        fill={STORY_INK} fillOpacity="0.08" stroke="none" />
      <path d="M 346 220 C 380 218 400 200 430 170 C 470 130 510 112 540 116 C 580 122 615 160 650 195 C 670 213 690 220 700 220"
        fill="none" stroke={STORY_INK} strokeWidth="1.6" />
      {/* peak marker */}
      <circle cx="540" cy="116" r="3" fill={STORY_INK} />
      <line x1="540" y1="116" x2="540" y2="220" stroke={STORY_GHOST} strokeWidth="1" strokeDasharray="2 3" />
      <text x="544" y="112" fontFamily="Montserrat" fontSize="9" fill={STORY_INK}>peak · 14.1 kW</text>
    </svg>
  );
}

function CMP_Story() {
  return (
    <ArtboardFrame label="13 · Story rows">
      <ArtboardTopRule number="07 / 14" kicker="Story rows" page="Page 13" />
      <ArtboardTitle title="Alternating image and copy." sub="Carries the FastHub narrative across multiple sections" titleSize={40} />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Row 1: text left, image right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px", alignItems: "center" }}>
          <div>
            <Eyebrow>01 — Site assessment</Eyebrow>
            <div style={{ marginTop: "16px" }}>
              <H2 size={36}>Share your site details.</H2>
            </div>
            <div style={{ marginTop: "10px" }}>
              <SubHeading size={15}>We review grid connection, car-park layout and demand</SubHeading>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Body size={14} max="46ch">
                A focused conversation about your operational profile, fleet mix and energy requirements. We come back with a sized, costed and scheduled hub proposal within seven working days.
              </Body>
            </div>
            <div style={{ marginTop: "20px" }}>
              <SecondaryButton small arrow>Read the process</SecondaryButton>
            </div>
          </div>
          <LineFrame caption="HALO FastHub installation · external elevation">
            <InstallationDrawing />
          </LineFrame>
        </div>

        {/* Row 2: image left, text right (flipped) */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "32px", alignItems: "center" }}>
          <LineFrame caption="Smart-grid energy dashboard · HALO OS">
            <DashboardDrawing />
          </LineFrame>
          <div>
            <Eyebrow>02 — Managing your energy</Eyebrow>
            <div style={{ marginTop: "16px" }}>
              <H2 size={36}>Generate, store, redirect.</H2>
            </div>
            <div style={{ marginTop: "10px" }}>
              <SubHeading size={15}>Make full use of every unit of energy</SubHeading>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Body size={14} max="46ch">
                When not in use for charging, energy is redirected to your building — helping cut costs and reduce reliance on the grid. HALO OS monitors and tunes the flow 24/7.
              </Body>
            </div>
            <div style={{ marginTop: "20px" }}>
              <SecondaryButton small arrow>Inside HALO OS</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C14 · Pull-quote testimonial ----------
function CMP_Quote() {
  return (
    <ArtboardFrame label="14 · Pull-quote">
      <ArtboardTopRule number="08 / 14" kicker="Pull-quote testimonial" page="Page 14" />
      <ArtboardTitle title="Bigger than a card." sub="A hero quote anchors a long-form case-study or about page" titleSize={40} />

      {/* Light variant */}
      <div style={{ background: OFFWHITE, padding: "56px 64px", marginBottom: "16px", position: "relative", display: "grid", gridTemplateColumns: "1fr 240px", gap: "48px", alignItems: "end" }}>
        <div>
          <div style={{ width: "48px", height: "1px", background: ORANGE, marginBottom: "32px" }} />
          <div style={{ fontFamily: "Montserrat", fontSize: "42px", fontWeight: 500, color: BLACK, lineHeight: 1.15, letterSpacing: "-0.01em", maxWidth: "26ch" }}>
            FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy.
          </div>
          <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "13px", color: BLACK, fontWeight: 500 }}>Keith Dickinson</div>
              <div style={{ fontSize: "12px", color: MIDGREY }}>Director of Resources · Merseyside Police</div>
            </div>
          </div>
        </div>
        <div style={{ borderLeft: `1px solid ${LIGHTGREY}`, paddingLeft: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Eyebrow>Case study</Eyebrow>
          <div style={{ fontSize: "13px", color: BLACK, lineHeight: 1.5 }}>First UK police force to deploy HALO FastHub.</div>
          <div style={{ marginTop: "12px" }}>
            <SecondaryButton small arrow>Read the case study</SecondaryButton>
          </div>
        </div>
      </div>

      {/* Dark variant */}
      <div style={{ background: BLACK, color: WHITE, padding: "40px 64px", display: "grid", gridTemplateColumns: "1fr 240px", gap: "48px", alignItems: "end" }}>
        <div>
          <div style={{ width: "48px", height: "1px", background: ORANGE, marginBottom: "20px" }} />
          <div style={{ fontFamily: "Montserrat", fontSize: "26px", fontWeight: 400, color: WHITE, lineHeight: 1.35, letterSpacing: "-0.005em", maxWidth: "38ch" }}>
            As a renewables leader, we're committed to reducing our carbon footprint. Onsite EV charging delivers a convenient, sustainable experience for everyone at the Academy.
          </div>
          <div style={{ marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
            James Galloway · Global Product Director · Segen
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <Eyebrow mode="dark">Case study</Eyebrow>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>12 charge points installed in under 6 hours.</div>
          <div style={{ marginTop: "8px" }}>
            <SecondaryButton mode="dark" small arrow>Read the case study</SecondaryButton>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C15 · Forms & configurator ----------
function FormField({ label, value, type = "text", note }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: "8px" }}>
      <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</span>
      <div style={{ borderBottom: `1px solid ${BLACK}`, paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "18px", color: BLACK, fontWeight: 400 }}>{value}</span>
        {type === "select" && <span style={{ fontSize: "12px", color: MIDGREY }}>▾</span>}
      </div>
      {note && <span style={{ fontSize: "11px", color: MIDGREY, marginTop: "6px" }}>{note}</span>}
    </div>
  );
}

function FormSlider({ label, value, pct, range }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
        <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: "13px", color: BLACK, fontWeight: 500 }}>{value}</span>
      </div>
      <div style={{ position: "relative", height: "2px", background: LIGHTGREY, marginBottom: "8px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "2px", width: `${pct}%`, background: ORANGE }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, top: "-7px", width: "16px", height: "16px", borderRadius: "50%", background: ORANGE }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: MIDGREY }}>
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
    </div>
  );
}

function CMP_Forms() {
  return (
    <ArtboardFrame label="15 · Forms & configurator">
      <ArtboardTopRule number="09 / 14" kicker="Forms & configurator" page="Page 15" />
      <ArtboardTitle title="Inputs and the build flow." sub="Minimal chrome · thin baseline · orange accents on active state" titleSize={40} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "20px" }}>
        {/* Form fields */}
        <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "32px" }}>
          <Eyebrow>Enquiry form</Eyebrow>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <FormField label="Full name" value="Sarah Whitcombe" />
            <FormField label="Organisation" value="Avalon Logistics Ltd." />
            <FormField label="Sector" value="Fleet operator" type="select" note="Choose one to focus the response" />
            <FormField label="Parking spaces" value="180" />
            <FormField label="Notes" value="Hybrid van + car fleet, ~120 EVs by 2027." />
          </div>
          <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: MIDGREY }}>Step 02 / 03 · contact</span>
            <PrimaryButton small>Make an enquiry</PrimaryButton>
          </div>
        </div>

        {/* Configurator */}
        <div style={{ background: OFFWHITE, padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Eyebrow>Build your hub · configurator</Eyebrow>
            <div style={{ display: "flex", gap: "6px" }}>
              {["01", "02", "03"].map((s, i) => (
                <span key={s} style={{ fontSize: "10px", letterSpacing: "0.18em", color: i === 1 ? BLACK : MIDGREY, fontWeight: i === 1 ? 500 : 400 }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "28px" }}>
            <FormSlider label="Charging tariff" value="45 p / kWh" pct={42} range={["20p", "85p"]} />
            <FormSlider label="Estimated daily usage" value="7 hours" pct={42} range={["2 hrs", "14 hrs"]} />

            <div style={{ display: "flex", flexDirection: "column", paddingBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>Sites</span>
                <span style={{ fontSize: "13px", color: BLACK, fontWeight: 500 }}>3</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, color: BLACK }}>3</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ width: "32px", height: "32px", borderRadius: "999px", border: `1px solid ${LIGHTGREY}`, background: WHITE, color: BLACK, fontFamily: "Montserrat", fontSize: "16px", cursor: "pointer" }}>−</button>
                  <button style={{ width: "32px", height: "32px", borderRadius: "999px", border: `1px solid ${LIGHTGREY}`, background: WHITE, color: BLACK, fontFamily: "Montserrat", fontSize: "16px", cursor: "pointer" }}>+</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "24px", padding: "20px", background: BLACK, color: WHITE, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Net monthly benefit</div>
              <div style={{ fontSize: "32px", fontWeight: 600, color: WHITE, letterSpacing: "-0.015em", marginTop: "4px" }}>£12,420</div>
            </div>
            <PrimaryButton small>See the breakdown</PrimaryButton>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C16 · Comparison & disclosure ----------
function CMP_Compare() {
  return (
    <ArtboardFrame label="16 · Comparison & disclosure">
      <ArtboardTopRule number="10 / 14" kicker="Comparison & disclosure" page="Page 16" />
      <ArtboardTitle title="Side by side, fold by fold." sub="Lease comparison table · accordion disclosure list" titleSize={40} />

      {/* Comparison table */}
      <div style={{ marginBottom: "24px" }}>
        <Eyebrow>Lease comparison · monthly cost over term</Eyebrow>
        <div style={{ marginTop: "12px", border: `1px solid ${LIGHTGREY}` }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", borderBottom: `1px solid ${BLACK}` }}>
            <div style={{ padding: "20px 24px", fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>Term</div>
            <div style={{ padding: "20px 24px", borderLeft: `1px solid ${LIGHTGREY}` }}>
              <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>Short</div>
              <div style={{ fontSize: "20px", color: BLACK, fontWeight: 500, marginTop: "4px" }}>36 months</div>
            </div>
            <div style={{ padding: "20px 24px", borderLeft: `1px solid ${LIGHTGREY}`, background: OFFWHITE, position: "relative" }}>
              <div style={{ position: "absolute", top: "10px", right: "12px" }}>
                <span style={{ fontSize: "9px", color: BLACK, letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${ORANGE}`, borderRadius: "999px" }}>Popular</span>
              </div>
              <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>Standard</div>
              <div style={{ fontSize: "20px", color: BLACK, fontWeight: 500, marginTop: "4px" }}>60 months</div>
            </div>
            <div style={{ padding: "20px 24px", borderLeft: `1px solid ${LIGHTGREY}` }}>
              <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>Long</div>
              <div style={{ fontSize: "20px", color: BLACK, fontWeight: 500, marginTop: "4px" }}>84 months</div>
            </div>
          </div>

          {[
            ["Monthly lease", "£3,200", "£2,500", "£2,150"],
            ["Annual saving", "—", "£8,400", "£12,600"],
            ["Hardware refresh", "Year 3", "Year 4", "Year 5"],
            ["24/7 driver support", "Included", "Included", "Included"],
            ["Solar generation share", "100% retained", "100% retained", "100% retained"],
          ].map(([k, a, b, c], i) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", borderTop: i === 0 ? "none" : `1px solid ${LIGHTGREY}` }}>
              <div style={{ padding: "16px 24px", fontSize: "13px", color: BLACK }}>{k}</div>
              <div style={{ padding: "16px 24px", borderLeft: `1px solid ${LIGHTGREY}`, fontSize: "13px", color: BLACK, fontWeight: 500 }}>{a}</div>
              <div style={{ padding: "16px 24px", borderLeft: `1px solid ${LIGHTGREY}`, background: OFFWHITE, fontSize: "13px", color: BLACK, fontWeight: 500 }}>{b}</div>
              <div style={{ padding: "16px 24px", borderLeft: `1px solid ${LIGHTGREY}`, fontSize: "13px", color: BLACK, fontWeight: 500 }}>{c}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclosure */}
      <div>
        <Eyebrow>Disclosure · accordion</Eyebrow>
        <div style={{ marginTop: "12px", borderTop: `1px solid ${LIGHTGREY}` }}>
          {[
            ["Do I need planning permission?", true, "Most car-park hub installations sit under permitted development. Where consent is required we handle the application end-to-end."],
            ["Who owns the hardware?", false, null],
            ["What happens at end of term?", false, null],
            ["How is solar performance metered?", false, null],
          ].map(([q, open, a], i) => (
            <div key={q} style={{ borderBottom: `1px solid ${LIGHTGREY}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 4px", cursor: "pointer" }}>
                <span style={{ fontSize: "16px", color: BLACK, fontWeight: 500 }}>{q}</span>
                <span style={{ fontSize: "18px", color: open ? ORANGE : MIDGREY, fontWeight: 400 }}>{open ? "−" : "+"}</span>
              </div>
              {open && a && (
                <div style={{ paddingBottom: "20px", paddingLeft: "4px" }}>
                  <Body size={13} max="80ch">{a}</Body>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ArtboardFrame>
  );
}

Object.assign(window, {
  CMP_SpecTable,
  CMP_Story,
  CMP_Quote,
  CMP_Forms,
  CMP_Compare,
  InstallationDrawing,
  DashboardDrawing,
  FormField,
  FormSlider,
});
