// Stage 2 — Components. Site building blocks we'd compose into the brand
// website. All artboards 1400×990 to match Stage 1.
//
// Coverage:
//   07 · Cover  — Stage 2 intro
//   08 · Navigation & footer
//   09 · Buttons & links
//   10 · Cards · sector / stat / case study
//   11 · Section patterns · hero / split / band

// ---------- C7 · Cover ----------
function CMP_Cover() {
  return (
    <ArtboardFrame label="07 · Stage 2 cover" mode="dark">
      <ArtboardTopRule number="01 / 14" kicker="Stage 02 · Components · V1.0" page="Cover" mode="dark" />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: `${ARTBOARD_H - ARTBOARD_PAD * 2 - 60}px` }}>
        <div style={{ paddingTop: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <div style={{ width: "48px", height: "1px", background: ORANGE }} />
            <Eyebrow mode="dark">Stage 02 of 04 · Components</Eyebrow>
          </div>

          <H1 mode="dark" size={124}>
            Site<br />
            components.
          </H1>

          <div style={{ marginTop: "28px", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <SubHeading size={20} mode="dark">Navigation · buttons · cards · spec tables · stories · forms · quotes</SubHeading>
            <Body mode="dark" size={15} max="56ch">
              Reusable building blocks for the marketing site, grown from the Stage 1 brand assets. Every component composes from the same tokens — type, colour, spacing, pill geometry.
            </Body>
          </div>
        </div>

        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderTop: "1px solid rgba(255,255,255,0.22)", paddingTop: "16px" }}>
            {[
              ["Stage", "02 of 04"],
              ["Inputs", "Stage 01 brand assets"],
              ["Coverage", "Nav · buttons · cards · sections · spec table · stories · quotes · forms · compare"],
              ["Status", "Up next · awaiting Stage 01 sign-off"],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingRight: "24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", paddingLeft: i > 0 ? "24px" : 0 }}>
                <Eyebrow mode="dark">{k}</Eyebrow>
                <span style={{ fontSize: "12px", color: WHITE, fontWeight: 400 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <FastHubLogo height={13} mode="light" />
              <span style={{ textTransform: "uppercase" }}>by 3ti Energy Hubs Ltd.</span>
            </div>
            <span style={{ color: WHITE, fontWeight: 500, fontSize: "12px" }}>07 / 20</span>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- shared site components ----------

function PrimaryButton({ children, dark = false, small = false }) {
  return (
    <button
      style={{
        background: ORANGE,
        color: BLACK,
        border: `1px solid ${ORANGE}`,
        padding: small ? "10px 22px" : "14px 28px",
        borderRadius: "999px",
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: small ? "13px" : "15px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}

function SecondaryButton({ children, mode = "light", small = false, arrow = false }) {
  const fg = mode === "dark" ? WHITE : BLACK;
  return (
    <button
      style={{
        background: mode === "dark" ? "transparent" : WHITE,
        color: fg,
        border: `1px solid ${ORANGE}`,
        padding: small ? "10px 22px" : "14px 28px",
        borderRadius: "999px",
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: small ? "13px" : "15px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {children}
      {arrow && <span aria-hidden="true" style={{ color: ORANGE }}>→</span>}
    </button>
  );
}

function StickyNav({ darkLogo = false }) {
  return (
    <div
      style={{
        background: WHITE,
        borderBottom: `1px solid ${LIGHTGREY}`,
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <HaloFastHubLogo height={24} mode="dark" gap={16} />
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "12px" }}>
          {["Product", "Sectors", "Commercial", "Case studies", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontSize: "13px", color: BLACK, textDecoration: "none", fontFamily: "Montserrat", fontWeight: 400 }}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <SecondaryButton small arrow>See more</SecondaryButton>
        <PrimaryButton small>Make an enquiry</PrimaryButton>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: BLACK, color: WHITE, padding: "40px 32px", fontFamily: "Montserrat" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "32px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
        <div>
          <HaloFastHubLogo height={26} mode="light" gap={16} />
          <Body mode="dark" size={13} max="40ch" >
            <span style={{ display: "block", marginTop: "16px", opacity: 0.7 }}>Smart solar EV charging using your existing grid capacity. By 3ti Energy Hubs Ltd.</span>
          </Body>
        </div>
        {[
          ["Product", ["Overview", "FastHub specs", "HALO operating system", "Installation"]],
          ["Sectors", ["Fleets", "Workplaces", "Destinations"]],
          ["Company", ["Case studies", "About 3ti", "Contact", "Press"]],
        ].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>{title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((i) => <a key={i} href="#" style={{ fontSize: "13px", color: WHITE, textDecoration: "none" }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span>© 2026 3ti Energy Hubs Ltd.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "3px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>B Corp Certified</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href="https://www.linkedin.com/company/3tienergyhubs/" target="_blank" rel="noopener" aria-label="3ti Energy Hubs on LinkedIn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50%", color: WHITE, textDecoration: "none" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"></path>
            </svg>
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Cookies</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>info@3ti.co.uk</a>
        </div>
      </div>
    </div>
  );
}

// ---------- C8 · Navigation & Footer ----------
function CMP_NavFooter() {
  return (
    <ArtboardFrame label="08 · Navigation & footer">
      <ArtboardTopRule number="02 / 14" kicker="Navigation & footer" page="Page 08" />
      <ArtboardTitle title="Top of page, bottom of page." sub="Sticky white nav · structured dark footer" titleSize={44} />

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Eyebrow>Sticky nav · default</Eyebrow>
        <div style={{ border: `1px solid ${LIGHTGREY}` }}>
          <StickyNav />
        </div>

        <div style={{ height: "8px" }} />

        <Eyebrow>Footer · structured dark</Eyebrow>
        <div>
          <Footer />
        </div>
      </div>

      <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        <SpecRow label="Nav height" value="64 px · sticky · white" />
        <SpecRow label="Footer columns" value="4 · 1.4fr / 1fr / 1fr / 1fr" />
        <SpecRow label="B Corp badge" value="Outlined · uppercase tracking" />
      </div>
    </ArtboardFrame>
  );
}

// ---------- C9 · Buttons & links ----------
// Static state renderer. We don't rely on :hover here — every state is drawn
// explicitly so the slide reads as a spec sheet, not an interactive demo.
// Only one orange (#F7A803). State changes are conveyed by inversion + motion,
// never by a different shade of orange.
function StateBtn({ kind, state }) {
  // shared chrome
  const base = {
    padding: "14px 28px",
    borderRadius: "999px",
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    border: `1px solid ${ORANGE}`,
    cursor: "default",
    letterSpacing: "-0.005em",
    transition: "none",
  };

  // arrow nudges right on rollover, sits flush on click
  const arrowShift = state === "rollover" ? 4 : 0;

  let style = { ...base };
  let arrowColor = BLACK;
  let label = "Make an enquiry";

  if (kind === "primary") {
    if (state === "visible") {
      style = { ...style, background: ORANGE, color: BLACK };
      arrowColor = BLACK;
    } else if (state === "rollover") {
      // same orange, but a 1px black inner ring lifts the surface
      style = {
        ...style,
        background: ORANGE,
        color: BLACK,
        boxShadow: `inset 0 0 0 1px ${BLACK}`,
      };
      arrowColor = BLACK;
    } else if (state === "clicked") {
      // full invert — black fill, orange text + arrow, orange keyline kept
      style = { ...style, background: BLACK, color: ORANGE, transform: "translateY(1px)" };
      arrowColor = ORANGE;
    }
  } else if (kind === "outlined") {
    label = "See more";
    if (state === "visible") {
      style = { ...style, background: WHITE, color: BLACK };
      arrowColor = ORANGE;
    } else if (state === "rollover") {
      // subtle tonal fill — off-white, never orange-tinted
      style = { ...style, background: OFFWHITE, color: BLACK };
      arrowColor = ORANGE;
    } else if (state === "clicked") {
      // invert to black fill — orange keyline + arrow stay
      style = { ...style, background: BLACK, color: WHITE, transform: "translateY(1px)" };
      arrowColor = ORANGE;
    }
  }

  return (
    <span style={style}>
      {label}
      <span aria-hidden="true" style={{ color: arrowColor, transform: `translateX(${arrowShift}px)`, display: "inline-block" }}>→</span>
    </span>
  );
}

function StateCaption({ children }) {
  return (
    <div style={{ marginTop: "14px", fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em", lineHeight: 1.5, maxWidth: "26ch" }}>
      {children}
    </div>
  );
}

function CMP_Buttons() {
  const headerCellStyle = {
    padding: "14px 24px 12px",
    borderBottom: `1px solid ${LIGHTGREY}`,
    fontSize: "11px",
    color: MIDGREY,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 500,
  };
  const rowLabelStyle = {
    padding: "28px 24px",
    borderRight: `1px solid ${LIGHTGREY}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
  };
  const cellStyle = {
    padding: "28px 24px",
    borderRight: `1px solid ${LIGHTGREY}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: "150px",
  };
  const lastCellStyle = { ...cellStyle, borderRight: "none" };

  return (
    <ArtboardFrame label="09 · Buttons & links">
      <ArtboardTopRule number="03 / 14" kicker="Buttons & links" page="Page 09" />
      <ArtboardTitle title="Two buttons. Three states each." sub="Single orange (#F7A803). State changes via inversion and motion — never a second shade." titleSize={40} />

      {/* States matrix */}
      <div style={{ border: `1px solid ${LIGHTGREY}`, background: WHITE, marginBottom: "20px" }}>
        {/* column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr 1fr" }}>
          <div style={{ ...headerCellStyle, borderRight: `1px solid ${LIGHTGREY}` }}>Button</div>
          <div style={{ ...headerCellStyle, borderRight: `1px solid ${LIGHTGREY}` }}>Visible</div>
          <div style={{ ...headerCellStyle, borderRight: `1px solid ${LIGHTGREY}` }}>Rollover</div>
          <div style={{ ...headerCellStyle }}>Clicked</div>
        </div>

        {/* row 1 — primary */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr 1fr", borderTop: `1px solid ${LIGHTGREY}` }}>
          <div style={rowLabelStyle}>
            <Eyebrow>Primary · filled</Eyebrow>
            <div style={{ fontSize: "15px", fontWeight: 500, color: BLACK, letterSpacing: "-0.005em" }}>Make an enquiry</div>
            <div style={{ fontSize: "12px", color: MIDGREY, lineHeight: 1.45 }}>One per view. Direct path to contact.</div>
          </div>
          <div style={cellStyle}>
            <StateBtn kind="primary" state="visible" />
            <StateCaption>Orange fill, black label, orange keyline.</StateCaption>
          </div>
          <div style={cellStyle}>
            <StateBtn kind="primary" state="rollover" />
            <StateCaption>Same orange. 1 px inner black ring + arrow nudges right.</StateCaption>
          </div>
          <div style={lastCellStyle}>
            <StateBtn kind="primary" state="clicked" />
            <StateCaption>Full invert: black fill, orange label and arrow.</StateCaption>
          </div>
        </div>

        {/* row 2 — outlined */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr 1fr", borderTop: `1px solid ${LIGHTGREY}` }}>
          <div style={rowLabelStyle}>
            <Eyebrow>Outlined · navigation</Eyebrow>
            <div style={{ fontSize: "15px", fontWeight: 500, color: BLACK, letterSpacing: "-0.005em" }}>See more</div>
            <div style={{ fontSize: "12px", color: MIDGREY, lineHeight: 1.45 }}>Click-through to another page.</div>
          </div>
          <div style={cellStyle}>
            <StateBtn kind="outlined" state="visible" />
            <StateCaption>White fill, orange keyline, black label, orange arrow.</StateCaption>
          </div>
          <div style={cellStyle}>
            <StateBtn kind="outlined" state="rollover" />
            <StateCaption>Off-white tonal fill (#F5F5F5). Arrow nudges right.</StateCaption>
          </div>
          <div style={lastCellStyle}>
            <StateBtn kind="outlined" state="clicked" />
            <StateCaption>Invert: black fill, white label, orange keyline + arrow.</StateCaption>
          </div>
        </div>
      </div>

      {/* Text-link styles */}
      <div style={{ border: `1px solid ${LIGHTGREY}`, background: WHITE, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Inline link · orange keyline */}
        <div style={{ padding: "24px 28px", borderRight: `1px solid ${LIGHTGREY}` }}>
          <Eyebrow>Inline link · orange keyline</Eyebrow>
          <div style={{ marginTop: "14px", fontSize: "15px", color: BLACK, lineHeight: 1.55, maxWidth: "44ch" }}>
            Lease terms start from £2,500 a month —{" "}
            <span style={{ color: BLACK, borderBottom: `1px solid ${ORANGE}`, paddingBottom: "1px" }}>see the full breakdown</span>{" "}
            or talk to the team.
          </div>
          <div style={{ marginTop: "12px", fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>
            Body-weight text · 1 px solid orange underline · used inside running prose, never alone as a CTA.
          </div>
        </div>

        {/* Tooltip / more-info link · soft-grey dotted */}
        <div style={{ padding: "24px 28px" }}>
          <Eyebrow>Tooltip / more-info · dotted</Eyebrow>
          <div style={{ marginTop: "14px", fontSize: "15px", color: BLACK, lineHeight: 1.55, maxWidth: "44ch" }}>
            Solar generation up to 19.32 kWp —{" "}
            <span style={{ color: MIDGREY, borderBottom: `1px dotted ${MIDGREY}`, paddingBottom: "1px" }}>what's a kWp?</span>
          </div>
          <div style={{ marginTop: "12px", fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>
            Mid-grey label · 1 px dotted mid-grey underline · for glossary, footnotes, soft definitions.
          </div>
        </div>
      </div>

      {/* footer rule */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: `1px solid ${LIGHTGREY}` }}>
        <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          One orange · {ORANGE} · no off-shades, no soft-orange hovers
        </div>
        <div style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.04em" }}>
          Compact (small) variants share the same state logic — only padding and type size change.
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C10 · Cards ----------
function StatCard({ value, unit, label }) {
  // Stat values are BLACK (not orange) per the locked Stage 1 rule:
  // orange is reserved for CTAs / focal halo / thin accent rules only.
  return (
    <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "32px 28px", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "space-between", height: "100%" }}>
      <Eyebrow>{label}</Eyebrow>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span style={{ fontFamily: "Montserrat", fontSize: "64px", fontWeight: 600, color: BLACK, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: "14px", color: MIDGREY }}>{unit}</span>
      </div>
    </div>
  );
}

function SectorCard({ name, copy }) {
  return (
    <div style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "space-between", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Eyebrow>Sector</Eyebrow>
        <span style={{ fontSize: "11px", color: ORANGE, letterSpacing: "0.16em" }}>→</span>
      </div>
      <H2 size={28}>{name}</H2>
      <Body size={13}>{copy}</Body>
    </div>
  );
}

function CaseStudyCard({ client, quote, attrib }) {
  return (
    <div style={{ background: BLACK, color: WHITE, padding: "28px", display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-between", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Eyebrow mode="dark">Case study</Eyebrow>
        <span style={{ fontSize: "11px", color: ORANGE, letterSpacing: "0.16em" }}>→</span>
      </div>
      <div>
        <div style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.45, color: WHITE }}>
          "{quote}"
        </div>
        <div style={{ marginTop: "12px", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>{attrib}</div>
      </div>
      <div style={{ fontSize: "13px", color: WHITE, fontWeight: 500 }}>{client}</div>
    </div>
  );
}

function CMP_Cards() {
  return (
    <ArtboardFrame label="10 · Cards">
      <ArtboardTopRule number="04 / 14" kicker="Cards" page="Page 10" />
      <ArtboardTitle title="Stats, sectors, case studies." sub="Three card archetypes built from the same grid" titleSize={44} />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <Eyebrow>Stat card · headline metric</Eyebrow>
          <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", height: "200px" }}>
            <StatCard value="12" unit="charge points" label="Capacity" />
            <StatCard value="1" unit="day install" label="Speed" />
            <StatCard value="19.32" unit="kWp solar" label="Generation" />
            <StatCard value="64k" unit="EV miles / yr" label="Solar mileage" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>
          <div>
            <Eyebrow>Sector card · three across</Eyebrow>
            <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", height: "210px" }}>
              <SectorCard name="Fleets" copy="Reliable, scalable charging to keep vehicles moving." />
              <SectorCard name="Workplaces" copy="Fast deployment with potential to generate revenue." />
              <SectorCard name="Destinations" copy="Attract EV drivers and unlock new revenue." />
            </div>
          </div>
          <div>
            <Eyebrow>Case study card · pull-quote</Eyebrow>
            <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr", gap: "16px", height: "210px" }}>
              <CaseStudyCard
                client="Merseyside Police"
                quote="FastHub allows us to provide flexible charging for our diverse fleet."
                attrib="Keith Dickinson · Director of Resources"
              />
            </div>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

// ---------- C11 · Section patterns ----------
function CMP_Sections() {
  return (
    <ArtboardFrame label="11 · Section patterns">
      <ArtboardTopRule number="05 / 14" kicker="Section patterns" page="Page 11" />
      <ArtboardTitle title="How sections are built." sub="Repeatable hero, split-content and CTA-band blocks" titleSize={44} />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Hero band */}
        <div>
          <Eyebrow>Dark hero · full-bleed</Eyebrow>
          <div style={{ marginTop: "10px", background: BLACK, color: WHITE, padding: "40px 48px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "32px", alignItems: "center", height: "200px" }}>
            <div>
              <Eyebrow mode="dark">01 — Product</Eyebrow>
              <div style={{ marginTop: "10px" }}>
                <H1 mode="dark" size={48}>Smart energy. Fully managed.</H1>
              </div>
              <div style={{ marginTop: "10px" }}>
                <SubHeading size={15} mode="dark">Solar + battery + mains + 12 charge points</SubHeading>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <PrimaryButton small>Make an enquiry</PrimaryButton>
              <SecondaryButton mode="dark" small arrow>See sectors</SecondaryButton>
            </div>
          </div>
        </div>

        {/* Split content */}
        <div>
          <Eyebrow>Split · numbered step</Eyebrow>
          <div style={{ marginTop: "10px", background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "32px 40px", display: "grid", gridTemplateColumns: "80px 1.2fr 1fr", gap: "40px", alignItems: "center", height: "150px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "56px", fontWeight: 500, color: BLACK, letterSpacing: "-0.02em", lineHeight: 1 }}>02</div>
            <div>
              <H2 size={28}>Rapid deployment</H2>
              <div style={{ marginTop: "8px" }}>
                <SubHeading size={14}>Installed in one day</SubHeading>
              </div>
              <Body size={13}>
                <span style={{ display: "inline-block", marginTop: "10px" }}>We deliver, install and commission with minimal disruption.</span>
              </Body>
            </div>
            <div style={{ borderLeft: `1px solid ${LIGHTGREY}`, paddingLeft: "32px" }}>
              <SpecRow label="Duration" value="1 day on-site" />
              <SpecRow label="Grid upgrade" value="Not required" />
              <SpecRow label="Disruption" value="Minimal" />
            </div>
          </div>
        </div>

        {/* CTA band */}
        <div>
          <Eyebrow>CTA band · dark</Eyebrow>
          <div style={{ marginTop: "10px", background: BLACK, color: WHITE, padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "120px" }}>
            <div>
              <H2 mode="dark" size={28}>Ready to deploy your EV charging?</H2>
              <div style={{ marginTop: "6px" }}>
                <SubHeading size={14} mode="dark">Book a free site assessment today</SubHeading>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <PrimaryButton>Make an enquiry</PrimaryButton>
              <SecondaryButton mode="dark" arrow>Watch the demo</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </ArtboardFrame>
  );
}

Object.assign(window, {
  CMP_Cover,
  CMP_NavFooter,
  CMP_Buttons,
  CMP_Cards,
  CMP_Sections,
  StickyNav,
  Footer,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  SectorCard,
  CaseStudyCard,
});
