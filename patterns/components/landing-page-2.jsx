// HALO FastHub — landing page sections (middle).

// ============================================================
// 4 · PROOF — pull quote · cycle through case studies
// ============================================================
const PROOF_QUOTES = [
  {
    quote: "FastHub allows us to provide flexible charging for our diverse fleet, which is integral to our sustainability strategy.",
    name: "Keith Dickinson",
    role: "Director of Resources · Merseyside Police",
    blurb: "First UK police force to deploy HALO FastHub. Twelve points, mixed marked and unmarked, live within six hours of crane lift.",
  },
  {
    quote: "A convenient, sustainable experience for everyone at the Academy — visitors, staff and our own renewables team.",
    name: "James Galloway",
    role: "Global Product Director · Segen",
    blurb: "Workplace + visitor charging at Segen's renewables academy. 100% of demand met from on-site solar in summer months.",
  },
  {
    quote: "The hub paid for itself in under three years on charging revenue alone. Operationally it's invisible — it just works.",
    name: "Operations lead",
    role: "Commercial vehicles · Bevan Group",
    blurb: "Destination charging for commercial-vehicle customers visiting the dealership. 64,000 EV miles generated annually from solar.",
  },
];

function LP_Proof() {
  const q = PROOF_QUOTES[0];

  return (
    <Section tone="offwhite" id="proof">
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "64px", alignItems: "end" }}>
        <div>
          <SectionEyebrow number="04">Proof</SectionEyebrow>
          <div style={{
            fontFamily: "Montserrat", fontSize: "52px", fontWeight: 500, color: BLACK,
            lineHeight: 1.12, letterSpacing: "-0.014em", maxWidth: "26ch", textWrap: "balance",
          }}>
            {q.quote}
          </div>
          <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: LIGHTGREY }} />
            <div>
              <div style={{ fontFamily: "Montserrat", fontSize: "15px", color: BLACK, fontWeight: 500 }}>{q.name}</div>
              <div style={{ fontFamily: "Montserrat", fontSize: "13px", color: MIDGREY }}>{q.role}</div>
            </div>
          </div>
        </div>

        <div style={{ borderLeft: `1px solid ${LIGHTGREY}`, paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>Case study</div>
          <div style={{ fontFamily: "Montserrat", fontSize: "15px", color: BLACK, lineHeight: 1.5 }}>
            {q.blurb}
          </div>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "row", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <SecondaryButton small arrow>Read this case study</SecondaryButton>
            <SecondaryButton small arrow>View all case studies</SecondaryButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// 5 · CALCULATOR — interactive ROI
// ============================================================
function fmt(n) {
  if (n >= 1_000_000) return "£" + (n / 1_000_000).toFixed(2) + "m";
  if (n >= 1000) return "£" + Math.round(n).toLocaleString("en-GB");
  return "£" + Math.round(n).toLocaleString("en-GB");
}
function fmtK(n) {
  if (n >= 1000) return Math.round(n).toLocaleString("en-GB");
  return Math.round(n).toString();
}

function CalcSlider({ label, value, min, max, step, onChange, suffix, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
        <span style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontFamily: "Montserrat", fontSize: "17px", color: BLACK, fontWeight: 500, letterSpacing: "-0.005em" }}>{format ? format(value) : value}{suffix}</span>
      </div>
      <div style={{ position: "relative", height: "24px", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", marginTop: "-1px", height: "2px", background: LIGHTGREY }} />
        <div style={{ position: "absolute", left: 0, top: "50%", marginTop: "-1px", height: "2px", width: `${pct}%`, background: ORANGE }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", left: 0, right: 0, top: 0, width: "100%", height: "24px",
            margin: 0, opacity: 0, cursor: "pointer", zIndex: 2,
          }}
        />
        <div style={{ position: "absolute", left: `calc(${pct}% - 9px)`, width: "18px", height: "18px", borderRadius: "50%", background: ORANGE, boxShadow: "0 0 0 4px rgba(245,165,0,0.15)", pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: MIDGREY }}>
        <span>{format ? format(min) : min}{suffix}</span>
        <span>{format ? format(max) : max}{suffix}</span>
      </div>
    </div>
  );
}

function TermPicker({ value, onChange }) {
  const options = [60, 84, 120];
  return (
    <div>
      <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Lease term</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              padding: "12px 0",
              fontFamily: "Montserrat",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              background: value === o ? BLACK : WHITE,
              color: value === o ? WHITE : BLACK,
              border: `1px solid ${value === o ? BLACK : LIGHTGREY}`,
              borderRadius: "999px",
            }}
          >
            {o} months
          </button>
        ))}
      </div>
    </div>
  );
}

function LP_Calculator() {
  const [points, setPoints] = React.useState(12);
  const [hours, setHours] = React.useState(5);
  const [tariff, setTariff] = React.useState(45); // pence per kWh
  const [term, setTerm] = React.useState(84);

  // Model
  const avgPower = 11; // kW
  const kWhPerMonth = points * hours * 30 * avgPower;
  const solarFraction = Math.min(0.65, 0.30 + (12 / points) * 0.25); // smaller sites cover more from solar
  const mainsCost = 0.18; // £/kWh
  const gridKWh = kWhPerMonth * (1 - solarFraction);
  const energyCost = gridKWh * mainsCost;
  const revenue = kWhPerMonth * (tariff / 100);
  const termFactor = term === 60 ? 1.08 : term === 84 ? 1.0 : 0.95;
  const leaseMonthly = (2500 + (points - 12) * 180) * termFactor;
  const netMonthly = revenue - energyCost - leaseMonthly;
  const cumulative = netMonthly * term;
  const co2Tonnes = (kWhPerMonth * 0.193) / 1000 * 12; // annual kg → tonnes

  return (
    <Section tone="light" id="calculator">
      <div style={{ position: "relative" }}>
        <SectionEyebrow number="05">Your numbers</SectionEyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "64px", alignItems: "end", marginBottom: "56px" }}>
          <LandingH2>Build your hub. See the payback.</LandingH2>
          <LandingBody max="44ch">
            Move the sliders below. The result panel updates live with monthly energy, revenue, lease cost and the cumulative benefit over your chosen term. Indicative — your real proposal lands within seven working days of a site visit.
          </LandingBody>
        </div>

        {/* Calculator card */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0, background: WHITE, border: `1px solid ${LIGHTGREY}` }}>
          {/* Inputs */}
          <div style={{ padding: "44px 44px", display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase" }}>Configure your hub</div>
            <CalcSlider label="Charge points" value={points} min={6} max={24} step={1} onChange={setPoints} suffix="" />
            <CalcSlider label="Average utilisation" value={hours} min={2} max={10} step={1} onChange={setHours} suffix=" hrs / day" />
            <CalcSlider label="Your charging tariff" value={tariff} min={30} max={80} step={1} onChange={setTariff} suffix="p / kWh" />
            <TermPicker value={term} onChange={setTerm} />
            <div style={{ fontSize: "11px", color: MIDGREY, lineHeight: 1.5, paddingTop: "8px", borderTop: `1px solid ${LIGHTGREY}` }}>
              Model assumes 11 kW average per point, {Math.round(solarFraction*100)}% solar + battery share, 18 p/kWh mains, no DNO upgrade.
            </div>
          </div>

          {/* Results — dark panel */}
          <div style={{ background: BLACK, color: WHITE, padding: "44px 44px", display: "flex", flexDirection: "column", gap: "28px", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Indicative monthly</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 24px" }}>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Charging revenue</div>
                <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, marginTop: "6px", letterSpacing: "-0.015em" }}>{fmt(revenue)}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{fmtK(kWhPerMonth)} kWh dispensed</div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Energy cost</div>
                <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, marginTop: "6px", letterSpacing: "-0.015em" }}>{fmt(energyCost)}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Mains top-up after solar</div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Lease</div>
                <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, marginTop: "6px", letterSpacing: "-0.015em" }}>{fmt(leaseMonthly)}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{term}-month term</div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>CO₂ displaced</div>
                <div style={{ fontFamily: "Montserrat", fontSize: "32px", fontWeight: 500, marginTop: "6px", letterSpacing: "-0.015em" }}>{co2Tonnes.toFixed(1)} t</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Per year vs. ICE fleet</div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Net monthly benefit</div>
                <div style={{ fontFamily: "Montserrat", fontSize: "56px", fontWeight: 600, color: WHITE, marginTop: "4px", letterSpacing: "-0.022em", lineHeight: 1 }}>{fmt(netMonthly)}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "6px" }}>≈ {fmt(cumulative)} over the {term}-month term</div>
              </div>
              <PrimaryButton small>Send these numbers</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// 6 · TIMELINE
// ============================================================
function LP_Timeline() {
  const steps = [
    { week: "Week 0", title: "Enquiry & free site assessment", body: "We come to you. Walk the car park, review your supply, map current and future demand.", emphasis: false },
    { week: "Week 1", title: "Proposal in your inbox", body: "Sized, costed and scheduled. Includes lease terms, energy model and a planning opinion.", emphasis: false },
    { week: "Weeks 2–6", title: "Survey & manufacture", body: "Topographic + electrical survey. Hub manufactured in parallel. Planning lodged if needed.", emphasis: false },
    { week: "Weeks 7–11", title: "Delivery prep & commissioning", body: "Foundations prepared, civils finished, hub crated to site. HALO OS pre-configured to your tariff.", emphasis: false },
    { week: "Week 12", title: "Install day · live the same day", body: "One day on site. Crane in, energise, commission, hand over. Charging that evening.", emphasis: true },
  ];
  return (
    <Section tone="light" id="timeline">
      <SectionEyebrow number="06">Timeline</SectionEyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "64px", alignItems: "end", marginBottom: "64px" }}>
        <LandingH2>From enquiry to charging in twelve weeks.</LandingH2>
        <LandingBody max="46ch">
          One of those weeks is just the install day itself. The rest is design, manufacture and a quiet civils visit. No grid upgrade. No multi-year DNO queue.
        </LandingBody>
      </div>

      {/* Horizontal timeline */}
      <div style={{ position: "relative", padding: "40px 0 0" }}>
        {/* connector line */}
        <div style={{ position: "absolute", top: "60px", left: "40px", right: "40px", height: "1px", background: LIGHTGREY }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", position: "relative" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0 20px" }}>
              {/* dot */}
              <div style={{
                width: s.emphasis ? "20px" : "12px",
                height: s.emphasis ? "20px" : "12px",
                borderRadius: "50%",
                background: s.emphasis ? ORANGE : WHITE,
                border: `2px solid ${s.emphasis ? ORANGE : BLACK}`,
                marginBottom: "24px",
                marginTop: s.emphasis ? "-4px" : "0px",
                marginLeft: s.emphasis ? "-4px" : "0px",
                zIndex: 1,
              }} />
              <div style={{ fontFamily: "Montserrat", fontSize: "11px", color: MIDGREY, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "10px" }}>{s.week}</div>
              <div style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 500, color: BLACK, letterSpacing: "-0.005em", lineHeight: 1.25, marginBottom: "10px" }}>{s.title}</div>
              <div style={{ fontSize: "13px", color: MIDGREY, lineHeight: 1.55 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight strip */}
      <div style={{ marginTop: "64px", padding: "24px 32px", background: BLACK, color: WHITE, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: ORANGE }} />
          <span style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: 500, letterSpacing: "-0.005em" }}>
            No grid upgrade. No DNO queue. No planning permission for most car-park sites.
          </span>
        </div>
        <SecondaryButton mode="dark" small arrow>How we handle planning</SecondaryButton>
      </div>
    </Section>
  );
}

Object.assign(window, { LP_Proof, LP_Calculator, LP_Timeline });
