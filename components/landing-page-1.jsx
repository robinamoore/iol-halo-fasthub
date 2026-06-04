// HALO FastHub — landing page sections.

const { Section, SectionEyebrow, LandingH1, LandingH2, LandingSub, LandingBody } = window;

// ============================================================
// 1 · HERO — full-bleed black block with user-droppable photo
//     as background, then a black support bar immediately below.
// ============================================================
function LP_Hero() {
  return (
    <React.Fragment>
      {/* Top block — photo background, white headline */}
      <section style={{ position: "relative", background: BLACK, color: WHITE, height: "720px", overflow: "hidden" }}>
        {/* user-droppable image slot, full-bleed.
            Uses the same `hero-pool-1` id as the hero canvas variants A / D / F
            so a photo dropped into any of them flows here too. */}
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "720px" }}>
          <div dangerouslySetInnerHTML={{ __html: `
            <image-slot
              id="hero-pool-1"
              shape="rect"
              placeholder="Drop a HALO FastHub installation photo here"
              style="width:100%;height:720px;display:block;"
            ></image-slot>
          ` }} />
        </div>
        {/* darkening gradient overlay so headline is legible whatever the photo */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.78) 100%)",
          pointerEvents: "none",
        }} />
{/* headline — floated up a touch from the bottom edge */}
        <div style={{ position: "absolute", inset: 0, padding: `0 ${SECTION_PAD_X}px 132px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
          <div style={{ maxWidth: `${CONTENT_MAX}px`, margin: "0 auto", width: "100%" }}>
            <SectionEyebrow mode="dark" number="01">Smart EV charging</SectionEyebrow>
            <h1 style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "112px",
              fontWeight: 500,
              letterSpacing: "-0.026em",
              lineHeight: 0.98,
              color: WHITE,
              margin: 0,
              maxWidth: "16ch",
              textWrap: "balance",
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}>
              Twelve charge points.<br/>One day on site.<br/>No grid upgrade.
            </h1>
            <div style={{ marginTop: "40px", display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
              <PrimaryButton>Make an enquiry</PrimaryButton>
              <SecondaryButton mode="dark" arrow>See how it works</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Black support bar — sub-copy, CTAs and stats */}
      <section style={{ background: BLACK, color: WHITE, padding: `40px ${SECTION_PAD_X}px 48px`, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: `${CONTENT_MAX}px`, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "48px", alignItems: "center" }}>
          {/* Left — sub-copy */}
          <div>
            <div style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 400, color: "rgba(255,255,255,0.78)", lineHeight: 1.45, maxWidth: "44ch" }}>
              HALO FastHub bundles solar canopy, battery storage, mains integration and twelve EV charge points into a single leased installation — deployed in twenty-four hours.
            </div>
          </div>
          {/* Stats column 1 */}
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Starting lease</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "36px", fontWeight: 500, color: WHITE, letterSpacing: "-0.018em", lineHeight: 1, marginTop: "10px" }}>£2,500<span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginLeft: "6px", letterSpacing: 0 }}>/ mo</span></div>
          </div>
          {/* Stats column 2 */}
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Install time</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "36px", fontWeight: 500, color: WHITE, letterSpacing: "-0.018em", lineHeight: 1, marginTop: "10px" }}>1<span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginLeft: "6px", letterSpacing: 0 }}>day</span></div>
          </div>
          {/* Stats column 3 */}
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.18)", paddingLeft: "32px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Grid upgrade</div>
            <div style={{ fontFamily: "Montserrat", fontSize: "36px", fontWeight: 500, color: WHITE, letterSpacing: "-0.018em", lineHeight: 1, marginTop: "10px" }}>0<span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginLeft: "6px", letterSpacing: 0 }}>required</span></div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// ============================================================
// 2 · CHALLENGE
// ============================================================
function LP_Challenge() {
  const stats = [
    { value: "8", unit: "years", label: "Typical grid upgrade lead time", note: "DNO connection queue, UK average for HV upgrades." },
    { value: "£170k", unit: "+", label: "Connection capex avoided", note: "Avoided cost when HV reinforcement is skipped." },
    { value: "5×", unit: "demand", label: "Fleet electrification by 2030", note: "Projected light-commercial EV uptake vs. 2024." },
  ];
  return (
    <Section tone="light" id="challenge">
      <SectionEyebrow number="02">The challenge</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "80px", alignItems: "end", marginBottom: "72px" }}>
        <LandingH2>Your fleet is electrifying. Your grid isn't.</LandingH2>
        <LandingBody max="46ch">
          Distribution network operators are quoting eight-year waits and six-figure capex for the HV upgrades a real EV charging operation needs. Most fleet managers can't wait, and shouldn't have to.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: WHITE, border: `1px solid ${LIGHTGREY}`, padding: "36px 32px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "220px", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontFamily: "Montserrat", fontSize: "76px", fontWeight: 500, color: BLACK, letterSpacing: "-0.022em", lineHeight: 1 }}>{s.value}</span>
              <span style={{ fontSize: "16px", color: MIDGREY }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: "12px", color: MIDGREY, lineHeight: 1.5, borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "12px" }}>{s.note}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// 3 · SOLUTION
// ============================================================
function LP_Solution() {
  const features = [
    { title: "Solar canopy", spec: "19.32 kWp · monocrystalline · 12-bay", body: "Generates the bulk of charging demand on-site. Roof-mounted, integrated with the canopy frame." },
    { title: "Battery storage", spec: "Smart-grid balanced", body: "Shifts solar generation into evening charging windows and shaves your peak mains draw." },
    { title: "Mains integration", spec: "Behind the meter · no new connection", body: "Sits inside your existing supply. HALO OS arbitrates between solar, battery and mains second-by-second." },
    { title: "12 charge points", spec: "7–22 kW AC · up to 60 kW DC mix", body: "Type 2 sockets sized for fleet duty cycles. Configure to slow overnight or fast turn-around." },
  ];
  return (
    <Section tone="dark" id="solution">
      <SectionEyebrow mode="dark" number="03">The solution</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "end", marginBottom: "64px" }}>
        <LandingH1 mode="dark" size={80} max="20ch">One canopy.<br/>Four systems.<br/>Twelve chargers.</LandingH1>
        <LandingBody mode="dark" max="48ch">
          HALO FastHub is a single, prefabricated unit — not four products bolted together on site. It arrives whole, lands in a day, and runs itself from then on.
        </LandingBody>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: CHARCOAL, color: WHITE, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "260px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>0{i+1}</div>
            <div>
              <div style={{ fontFamily: "Montserrat", fontSize: "26px", fontWeight: 500, color: WHITE, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{f.title}</div>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{f.spec}</div>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>{f.body}</div>
          </div>
        ))}
      </div>
      {/* dashboard preview band */}
      <div style={{ marginTop: "48px", background: "#E8E6DF", height: "320px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "30px 40px" }}>
          <DashboardDrawing />
        </div>
        <div style={{ position: "absolute", left: "40px", bottom: "20px", fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          HALO OS · second-by-second energy arbitration
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { LP_Hero, LP_Challenge, LP_Solution });
