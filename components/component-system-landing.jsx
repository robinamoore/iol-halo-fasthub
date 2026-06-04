// HALO FastHub — Stage 2 components, landing-page block documentation.
// Each slide documents one of the landing-page blocks as a reusable component:
// a scaled preview of the live block + an anatomy + token spec panel.

const {
  // tokens
  ORANGE, BLACK, CHARCOAL, MIDGREY, LIGHTGREY, OFFWHITE, WHITE,
  // primitives
  ArtboardFrame, ArtboardTopRule, ArtboardTitle, Eyebrow, SubHeading, Body, SpecRow,
  Pill,
  // landing blocks
  LP_Hero, LP_Challenge, LP_Solution, LP_Proof, LP_Calculator, LP_Timeline,
  LP_Hurdles, LP_Costs, LP_CaseStudies, LP_FurtherReading, LP_FinalCTA,
  StickyNav, Footer, HaloFastHubLogo, HaloMark, BrandPattern,
  PrimaryButton, SecondaryButton,
} = window;

// ---------- Shared layout for a documented landing-block slide ----------
function DocBlockSlide({
  num, kicker, page, title, sub,
  Block,
  blockHeight = 600,
  blockScale = 0.62,
  blockWidth = 1440,
  blockTop = 0,
  blockBg = WHITE,
  anatomy = [],
  tokens = [],
  notes,
}) {
  return (
    <ArtboardFrame label={`${num} · ${kicker}`}>
      <ArtboardTopRule number={num} kicker={kicker} page={page} />

      <div style={{ marginBottom: "24px" }}>
        <H2DocTitle title={title} sub={sub} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* Scaled live preview of the block */}
        <div style={{
          height: blockHeight, overflow: "hidden", border: `1px solid ${LIGHTGREY}`,
          position: "relative", background: blockBg,
        }}>
          <div style={{
            width: blockWidth, transform: `scale(${blockScale})`, transformOrigin: "top left",
            position: "absolute", top: blockTop, left: 0,
          }}>
            <Block />
          </div>
          <div style={{
            position: "absolute", left: "12px", bottom: "10px",
            fontFamily: "Montserrat", fontSize: "10px", color: MIDGREY,
            letterSpacing: "0.18em", textTransform: "uppercase",
            background: "rgba(255,255,255,0.85)", padding: "3px 8px",
          }}>Live preview · scale {(blockScale * 100).toFixed(0)}%</div>
        </div>

        {/* Anatomy + tokens panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {anatomy.length > 0 && (
            <div>
              <Eyebrow>Anatomy</Eyebrow>
              <div style={{ marginTop: "6px" }}>
                {anatomy.map((a, i) => <SpecRow key={i} label={a[0]} value={a[1]} />)}
              </div>
            </div>
          )}
          {tokens.length > 0 && (
            <div>
              <Eyebrow>Tokens</Eyebrow>
              <div style={{ marginTop: "6px" }}>
                {tokens.map((t, i) => <SpecRow key={i} label={t[0]} value={t[1]} />)}
              </div>
            </div>
          )}
          {notes && (
            <div style={{ marginTop: "auto", fontSize: "11px", color: MIDGREY, lineHeight: 1.5, borderTop: `1px solid ${LIGHTGREY}`, paddingTop: "12px" }}>
              {notes}
            </div>
          )}
        </div>
      </div>
    </ArtboardFrame>
  );
}

// Compact title + sub used inside doc slides (smaller than ArtboardTitle).
function H2DocTitle({ title, sub }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "48px", alignItems: "end" }}>
      <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "36px", fontWeight: 500, letterSpacing: "-0.014em", lineHeight: 1.08, color: BLACK, margin: 0 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "13px", color: MIDGREY, lineHeight: 1.5, margin: 0 }}>{sub}</p>}
    </div>
  );
}

// ============================================================
// 21 · Hero block
// ============================================================
function CMP_LP_Hero() {
  return (
    <DocBlockSlide
      num="21 / 32"
      kicker="Landing block · hero"
      page="Page 21"
      title="Hero block."
      sub="Full-bleed photo · eyebrow · headline · primary CTA + dark support bar with stats. The first impression."
      Block={LP_Hero}
      blockHeight={620}
      blockScale={0.62}
      anatomy={[
        ["Top half", "720 px photo bed · 55-78% black gradient · eyebrow + H1 + CTAs floated to bottom"],
        ["Bottom bar", "Sub-copy left · 3 stat columns separated by 18% white rules"],
        ["Image slot", "id=\"hero-pool-1\" — client-droppable"],
      ]}
      tokens={[
        ["Background", "BLACK + image"],
        ["Headline size", "112 px · weight 500 · -2.6% tracking"],
        ["Eyebrow", "12 px · 22% tracking · midgrey + BLACK number"],
        ["Stat numerals", "36 px · weight 500"],
      ]}
      notes="Always pairs the primary 'Make an enquiry' CTA with one outlined navigation CTA. Never replace the photo with the white-pattern backdrop here."
    />
  );
}

// ============================================================
// 22 · Challenge block
// ============================================================
function CMP_LP_Challenge() {
  return (
    <DocBlockSlide
      num="22 / 32"
      kicker="Landing block · challenge"
      page="Page 22"
      title="Challenge block."
      sub="The problem state. Single H2, supporting body and a three-stat card row in light tone."
      Block={LP_Challenge}
      blockHeight={640}
      blockScale={0.6}
      anatomy={[
        ["Headline", "H2 · ≤22 ch line balance"],
        ["Sub-body", "16 px · midgrey body copy at 46 ch"],
        ["Stat cards", "3 × white cards · 1 px lightgrey keyline · stat 76 px"],
      ]}
      tokens={[
        ["Tone", "OFFWHITE / light"],
        ["Stat label", "11 px · 22% tracking · midgrey"],
        ["Card padding", "36 × 32 px"],
      ]}
      notes="Stat cards always have a top label, a numeral with unit, and a bottom note separated by a 1 px lightgrey rule."
    />
  );
}

// ============================================================
// 23 · Solution block
// ============================================================
function CMP_LP_Solution() {
  return (
    <DocBlockSlide
      num="23 / 32"
      kicker="Landing block · solution"
      page="Page 23"
      title="Solution block."
      sub="The product. Dark tone, four feature cards, dashboard preview band underneath."
      Block={LP_Solution}
      blockHeight={640}
      blockScale={0.6}
      blockBg={BLACK}
      anatomy={[
        ["Headline", "Mode=dark H1 80 px · 20 ch"],
        ["Feature cards", "4 × charcoal · 32×28 padding · 260 px min"],
        ["Dashboard band", "Warm-grey strip with InstallationDrawing SVG"],
      ]}
      tokens={[
        ["Tone", "BLACK"],
        ["Card background", "CHARCOAL #2C2C2C"],
        ["Feature number", "0N · 11 px · 22% tracking · 50% white"],
      ]}
      notes="Feature cards are intentionally tight — one title line, a spec sub-line, two-sentence body. Dashboard band keeps the warm-grey halo pattern association."
    />
  );
}

// ============================================================
// 24 · Proof block
// ============================================================
function CMP_LP_Proof() {
  return (
    <DocBlockSlide
      num="24 / 32"
      kicker="Landing block · proof"
      page="Page 24"
      title="Pull-quote · proof block."
      sub="Single anchor testimonial with adjacent case-study panel. Two outlined CTAs side by side."
      Block={LP_Proof}
      blockHeight={580}
      blockScale={0.62}
      anatomy={[
        ["Quote", "52 px · weight 500 · 26 ch balance"],
        ["Attribution", "Avatar 44 px circle · name + role"],
        ["Case panel", "Left-keyline divider · case-study eyebrow · 2 CTAs"],
      ]}
      tokens={[
        ["Tone", "OFFWHITE"],
        ["Attribution avatar", "LIGHTGREY circle (real photo when supplied)"],
        ["CTAs", "Outlined nav buttons — read + view all"],
      ]}
      notes="Quote is plain copy — no quotation marks. The site rotates between three case studies; only one renders at a time."
    />
  );
}

// ============================================================
// 25 · ROI calculator block
// ============================================================
function CMP_LP_Calculator() {
  return (
    <DocBlockSlide
      num="25 / 32"
      kicker="Landing block · ROI calculator"
      page="Page 25"
      title="Interactive ROI calculator."
      sub="Live sliders on the left, dark result panel on the right. The only interactive block on the page."
      Block={LP_Calculator}
      blockHeight={640}
      blockScale={0.58}
      anatomy={[
        ["Inputs", "3 sliders + 3-button term picker"],
        ["Slider chrome", "2 px lightgrey rail · orange fill · orange thumb with halo glow"],
        ["Result panel", "Black bg · 4 metrics + headline net benefit"],
      ]}
      tokens={[
        ["Slider active", "ORANGE #F7A803 · rail 18 px halo at 15% alpha"],
        ["Term pill", "Active = BLACK fill · WHITE text · 999 px radius"],
        ["Headline metric", "56 px · weight 600 · -2.2% tracking"],
      ]}
      notes="Send-these-numbers CTA always sits in the dark panel beside the headline metric. Disclaimer line under inputs is mandatory."
    />
  );
}

// ============================================================
// 26 · Timeline block
// ============================================================
function CMP_LP_Timeline() {
  return (
    <DocBlockSlide
      num="26 / 32"
      kicker="Landing block · timeline"
      page="Page 26"
      title="12-week timeline."
      sub="Horizontal 5-step timeline with one emphasised milestone (install day). Highlight strip beneath."
      Block={LP_Timeline}
      blockHeight={580}
      blockScale={0.6}
      anatomy={[
        ["Steps", "5 columns · uppercase week + title + 13 px body"],
        ["Connector line", "1 px lightgrey at dot midline"],
        ["Emphasised step", "20 px ORANGE filled dot vs 12 px ringed dot"],
      ]}
      tokens={[
        ["Tone", "WHITE / light"],
        ["Highlight strip", "BLACK band · ORANGE 8 px dot · CTA right"],
      ]}
      notes="Always exactly one emphasised step — the install day. Other dots are outlined only. Highlight strip ends with one outlined CTA on dark."
    />
  );
}

// ============================================================
// 27 · Hurdles block
// ============================================================
function CMP_LP_Hurdles() {
  return (
    <DocBlockSlide
      num="27 / 32"
      kicker="Landing block · hurdles solved"
      page="Page 27"
      title="Common concerns, addressed."
      sub="Q-prefixed concern, headline answer, body, bottom spec list. 3 cards side by side."
      Block={LP_Hurdles}
      blockHeight={640}
      blockScale={0.6}
      anatomy={[
        ["Q prefix", "Black 'Q.' bold + concern in midgrey 13 px"],
        ["Answer headline", "32 px · weight 500 · -1.4% tracking"],
        ["Spec list", "Top-keyline · 16 px black rules + black body"],
      ]}
      tokens={[
        ["Tone", "OFFWHITE"],
        ["Card height", "Min 440 px"],
      ]}
      notes="Always 3 cards (≠ 2 or 4). Each card resolves a single concern; never multi-faceted."
    />
  );
}

// ============================================================
// 28 · Cost benefits block
// ============================================================
function CMP_LP_Costs() {
  return (
    <DocBlockSlide
      num="28 / 32"
      kicker="Landing block · cost benefits"
      page="Page 28"
      title="Three dark stat cards + lease strip."
      sub="The 'revenue-positive from month one' moment. Massive numerals, brief body, terms strip beneath."
      Block={LP_Costs}
      blockHeight={640}
      blockScale={0.58}
      blockBg={BLACK}
      anatomy={[
        ["Stat", "88 px · weight 500 · -2.4% tracking"],
        ["Strip", "Single lease summary in 4 white rule-separated columns"],
      ]}
      tokens={[
        ["Tone", "BLACK"],
        ["Card background", "CHARCOAL"],
        ["Strip border", "1 px white at 18% alpha"],
      ]}
      notes="100% · 70% · £0 is the canonical set. Replacing the numerals is allowed but the count stays at three and the lease strip always follows."
    />
  );
}

// ============================================================
// 29 · Case studies grid
// ============================================================
function CMP_LP_CaseStudies() {
  return (
    <DocBlockSlide
      num="29 / 32"
      kicker="Landing block · case studies"
      page="Page 29"
      title="Three deployments. Different jobs."
      sub="3-card dark case-study grid. Each card carries one big stat, supporting label, and a quote at the foot."
      Block={LP_CaseStudies}
      blockHeight={640}
      blockScale={0.6}
      anatomy={[
        ["Card layout", "Eyebrow + client / stat 72 px / quote with top rule"],
        ["Sector tag", "Fleet · Workplace · Destination — one per card"],
        ["Inline arrow", "Top-right ORANGE → glyph"],
      ]}
      tokens={[
        ["Card background", "BLACK"],
        ["Stat", "72 px · weight 500"],
        ["Quote", "14 px · 85% white"],
      ]}
      notes="Card backgrounds stay BLACK (not CHARCOAL) to differentiate from the cost-benefits block. Only the corner arrow is ORANGE."
    />
  );
}

// ============================================================
// 30 · Further reading grid
// ============================================================
function CMP_LP_FurtherReading() {
  return (
    <DocBlockSlide
      num="30 / 32"
      kicker="Landing block · further reading"
      page="Page 30"
      title="Background for the people who'll ask."
      sub="4-card grid · each card opens with a 180 px image-slot (client-droppable) · kind chip overlay · title + meta."
      Block={LP_FurtherReading}
      blockHeight={600}
      blockScale={0.6}
      anatomy={[
        ["Image slot", "180 px tall · ids reading-1…4 · client supplies"],
        ["Kind chip", "11 px · 22% tracking · white fill · overlay bottom-left"],
        ["Footer", "Meta + ORANGE arrow on a 1 px top rule"],
      ]}
      tokens={[
        ["Tone", "OFFWHITE"],
        ["Slot placeholder", "WARMGREY #E8E6DF"],
      ]}
      notes="Kinds: Whitepaper · Article · Webinar · Press. Always exactly 4 cards in a single row at desktop."
    />
  );
}

// ============================================================
// 31 · Final CTA block
// ============================================================
function CMP_LP_FinalCTA() {
  return (
    <DocBlockSlide
      num="31 / 32"
      kicker="Landing block · final CTA"
      page="Page 31"
      title="Make an enquiry."
      sub="Closing dark band. 96 px H1, sub-copy, primary + outlined CTA, direct-lines panel right."
      Block={LP_FinalCTA}
      blockHeight={640}
      blockScale={0.58}
      blockBg={BLACK}
      anatomy={[
        ["Headline", "96 px · weight 500 · ≤14 ch balance"],
        ["CTAs", "Make an enquiry (ORANGE filled) + Talk to a specialist (outlined dark)"],
        ["Right panel", "Phone + email + NDA note · left keyline"],
      ]}
      tokens={[
        ["Tone", "BLACK"],
        ["Section padding-Y", "120 px (vs default 96)"],
      ]}
      notes="The only place 'Make an enquiry' sits beside 'Talk to a fleet specialist'. The phone number and email always appear here."
    />
  );
}

// ============================================================
// 32 · Imagery & image-slot pattern (extra)
// ============================================================
function CMP_Imagery() {
  return (
    <ArtboardFrame label="32 · Imagery & image slots">
      <ArtboardTopRule number="32 / 32" kicker="Imagery · client-droppable slots" page="Page 32" />

      <div style={{ marginBottom: "24px" }}>
        <H2DocTitle
          title="Real photographs, dropped in."
          sub="Every photographic block on the site is an `image-slot` web component — a stable id, a fallback warm-grey backdrop, and a placeholder caption. The client drags an image onto it; the page persists the drop."
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", marginBottom: "20px" }}>
        {/* Slot anatomy diagram */}
        <div style={{ border: `1px solid ${LIGHTGREY}`, padding: "32px", display: "flex", flexDirection: "column", gap: "20px", background: WHITE }}>
          <Eyebrow>Anatomy</Eyebrow>
          <div style={{
            height: "260px", background: "#E8E6DF", position: "relative", overflow: "hidden", border: `1px dashed ${MIDGREY}`,
          }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <div style={{ width: "44px", height: "44px", border: `2px solid ${BLACK}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat", fontWeight: 500, color: BLACK, fontSize: "18px" }}>+</div>
              <div style={{ fontFamily: "Montserrat", fontSize: "13px", color: BLACK }}>Drop a photo</div>
              <div style={{ fontFamily: "Montserrat", fontSize: "10px", color: MIDGREY, letterSpacing: "0.2em", textTransform: "uppercase" }}>placeholder caption appears here</div>
            </div>
            <div style={{ position: "absolute", left: "10px", top: "10px", fontFamily: "Montserrat", fontSize: "9px", color: MIDGREY, letterSpacing: "0.2em", textTransform: "uppercase" }}>id=&quot;hero-pool-1&quot;</div>
          </div>
          <div style={{ fontSize: "12px", color: BLACK, lineHeight: 1.55 }}>
            Slots accept JPG / PNG / WebP at any resolution. Once dropped, the image is stored against the slot id and re-renders on every page load.
          </div>
        </div>

        {/* Spec sheet */}
        <div>
          <Eyebrow>Slot inventory</Eyebrow>
          <div style={{ marginTop: "6px" }}>
            <SpecRow label="hero-pool-1" value="Landing hero · 720 px" />
            <SpecRow label="reading-1…4" value="Further reading · 180 px" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Eyebrow>Fallback</Eyebrow>
            <div style={{ marginTop: "6px" }}>
              <SpecRow label="Background" value="WARMGREY #E8E6DF" />
              <SpecRow label="Placeholder" value="13 px Montserrat · 10 px caption" />
              <SpecRow label="State" value="Persists across reload" />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Eyebrow>Treatment guidance</Eyebrow>
            <div style={{ marginTop: "6px" }}>
              <SpecRow label="Hero" value="Site context · installation" />
              <SpecRow label="Reading" value="Editorial · subject focus" />
              <SpecRow label="Aspect ratio" value="Free · crop server-side" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: "16px", borderTop: `1px solid ${LIGHTGREY}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Comprehensive Stage 2 · ends here</span>
        <span style={{ fontSize: "11px", color: MIDGREY, letterSpacing: "0.12em" }}>HALO · components</span>
      </div>
    </ArtboardFrame>
  );
}

Object.assign(window, {
  CMP_LP_Hero, CMP_LP_Challenge, CMP_LP_Solution, CMP_LP_Proof,
  CMP_LP_Calculator, CMP_LP_Timeline, CMP_LP_Hurdles, CMP_LP_Costs,
  CMP_LP_CaseStudies, CMP_LP_FurtherReading, CMP_LP_FinalCTA,
  CMP_Imagery,
});
