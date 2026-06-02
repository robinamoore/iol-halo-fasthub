// Five hero-block variants for HALO FastHub landing.
// All are 1440 × 720 (matching the live hero footprint).
// They share image-slot IDs (hero-pool-1..5) so a photo dropped into any
// variant appears in every variant that references the same id.

const HV_W = 1440;
const HV_H = 720;
const HV_PAD = 64;

// ── shared chrome ───────────────────────────────────────────────────────
function HVHeadline({ size = 96 }) {
  return (
    <h1 style={{
      fontFamily: "Montserrat, sans-serif",
      fontSize: `${size}px`,
      fontWeight: 500,
      letterSpacing: "-0.026em",
      lineHeight: 0.98,
      color: WHITE,
      margin: 0,
      maxWidth: "14ch",
      textWrap: "balance",
      textShadow: "0 2px 24px rgba(0,0,0,0.45)",
    }}>
      Twelve charge points.<br/>One day on site.<br/>No grid upgrade.
    </h1>
  );
}

function HVCornerLabel({ children, position = "top-left" }) {
  const pos = position === "top-left" ? { top: "28px", left: `${HV_PAD}px` }
            : position === "top-right" ? { top: "28px", right: `${HV_PAD}px` }
            : position === "bottom-left" ? { bottom: "28px", left: `${HV_PAD}px` }
            : { bottom: "28px", right: `${HV_PAD}px` };
  return (
    <div style={{ position: "absolute", ...pos, fontFamily: "Montserrat", fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.22em", textTransform: "uppercase", zIndex: 3 }}>
      {children}
    </div>
  );
}

// helper to render an <image-slot> with a given id and inline style string
function Slot({ id, placeholder, style }) {
  // React renders the custom element directly; the slot owns its own shadow DOM.
  const cssText = Object.entries(style || {}).map(([k, v]) => {
    const kebab = k.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    return `${kebab}:${typeof v === "number" ? v + "px" : v}`;
  }).join(";");
  return (
    <div dangerouslySetInnerHTML={{ __html: `<image-slot id="${id}" shape="rect" placeholder="${placeholder || "Drop a photo"}" style="${cssText};display:block"></image-slot>` }} />
  );
}

// Dark gradient overlay for headline legibility on any photo
function HVOverlay({ direction = "180deg", strong = 0.6, weak = 0.25 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
      background: `linear-gradient(${direction}, rgba(0,0,0,${strong}) 0%, rgba(0,0,0,${weak}) 45%, rgba(0,0,0,${strong + 0.15}) 100%)`,
    }} />
  );
}

// ── A · Cinematic full-bleed ────────────────────────────────────────────
function HeroVariantA() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, overflow: "hidden" }}>
      <Slot id="hero-pool-1" placeholder="Drop a full-bleed installation photo" style={{ width: "100%", height: `${HV_H}px` }} />
      <HVOverlay />
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">A · Cinematic full-bleed</HVCornerLabel>
      <div style={{ position: "absolute", inset: 0, padding: `0 ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
        <HVHeadline size={96} />
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton>Make an enquiry</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// ── B · Editorial split — vertical column of 4 tiles ────────────────────
function HeroVariantB() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, color: WHITE, overflow: "hidden", display: "grid", gridTemplateColumns: "1.4fr 1fr" }}>
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">B · Editorial · vertical tiles</HVCornerLabel>
      {/* Left — copy */}
      <div style={{ padding: `${HV_PAD + 24}px ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
        <HVHeadline size={86} />
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton>Make an enquiry</PrimaryButton>
        </div>
      </div>
      {/* Right — 4 stacked tiles */}
      <div style={{ display: "grid", gridTemplateRows: "repeat(4, 1fr)", gap: "6px", padding: "6px 6px 6px 0" }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ position: "relative", background: CHARCOAL, overflow: "hidden" }}>
            <Slot id={`hero-pool-${i}`} placeholder={`Tile ${i}`} style={{ width: "100%", height: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── C · Auto-advancing carousel on right ────────────────────────────────
function HeroVariantC() {
  const [i, setI] = React.useState(0);
  const slots = [1, 2, 3, 4, 5];
  React.useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % slots.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, color: WHITE, overflow: "hidden", display: "grid", gridTemplateColumns: "1.3fr 1fr" }}>
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">C · Auto-carousel · 5 photos</HVCornerLabel>
      {/* Left — copy */}
      <div style={{ padding: `${HV_PAD + 24}px ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
        <HVHeadline size={86} />
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton>Make an enquiry</PrimaryButton>
        </div>
      </div>
      {/* Right — layered slots, one visible at a time */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {slots.map((n, idx) => (
          <div key={n} style={{
            position: "absolute", inset: 0,
            opacity: idx === i ? 1 : 0,
            transition: "opacity 700ms ease",
          }}>
            <Slot id={`hero-pool-${n}`} placeholder={`Photo ${n} of 5`} style={{ width: "100%", height: "100%" }} />
          </div>
        ))}
        {/* progress strip + counter */}
        <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "20px", zIndex: 2, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {slots.map((_, idx) => (
              <div key={idx} style={{ flex: 1, height: "2px", background: idx <= i ? WHITE : "rgba(255,255,255,0.3)", transition: "background 300ms" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Montserrat", fontSize: "10px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span>Auto · 3.5s</span>
            <span>{String(i + 1).padStart(2, "0")} / 05</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── D · Full-bleed background + filmstrip thumbnails below headline ─────
function HeroVariantD() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, overflow: "hidden" }}>
      <Slot id="hero-pool-1" placeholder="Drop a full-bleed background photo" style={{ width: "100%", height: `${HV_H}px` }} />
      <HVOverlay strong={0.65} weak={0.35} />
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">D · Filmstrip · hero + 5 thumbs</HVCornerLabel>
      <div style={{ position: "absolute", inset: 0, padding: `${HV_PAD + 36}px ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2 }}>
        <div>
          <HVHeadline size={88} />
          <div style={{ marginTop: "32px" }}>
            <PrimaryButton>Make an enquiry</PrimaryButton>
          </div>
        </div>
        {/* filmstrip */}
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.22em", textTransform: "uppercase", paddingBottom: "6px", marginRight: "12px" }}>
            View / 05
          </div>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{ position: "relative", width: "180px", height: "108px", background: CHARCOAL, border: n === 1 ? `1px solid ${WHITE}` : "1px solid rgba(255,255,255,0.25)", overflow: "hidden" }}>
              <Slot id={`hero-pool-${n}`} placeholder={`Thumb ${n}`} style={{ width: "100%", height: "100%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── E · Asymmetric mosaic on right ──────────────────────────────────────
function HeroVariantE() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, color: WHITE, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1.1fr" }}>
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">E · Asymmetric mosaic · 5 tiles</HVCornerLabel>
      {/* Left — copy */}
      <div style={{ padding: `${HV_PAD + 24}px ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
        <HVHeadline size={84} />
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton>Make an enquiry</PrimaryButton>
        </div>
      </div>
      {/* Right — mosaic: 1 tall on left + 2x2 grid on right */}
      <div style={{ padding: "6px 6px 6px 0", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "6px" }}>
        {/* Tall tile */}
        <div style={{ position: "relative", background: CHARCOAL, overflow: "hidden" }}>
          <Slot id="hero-pool-1" placeholder="Hero tile · tall" style={{ width: "100%", height: "100%" }} />
        </div>
        {/* 2x2 grid */}
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {[2, 3, 4, 5].map(n => (
            <div key={n} style={{ position: "relative", background: CHARCOAL, overflow: "hidden" }}>
              <Slot id={`hero-pool-${n}`} placeholder={`Tile ${n}`} style={{ width: "100%", height: "100%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroVariantA, HeroVariantB, HeroVariantC, HeroVariantD, HeroVariantE, HeroVariantF, HV_W, HV_H });

// ── F · Highlighter-marker headline · frosted-glass blur ────────────────
// Each line of the headline sits inside its own translucent block. The
// block uses backdrop-filter: blur so only the patch of photo directly
// behind the text is blurred — the rest of the image stays crisp. This is
// frosted-glass / glassmorphism applied as a typography device.
function HeroVariantF() {
  const lines = ["Twelve charge points.", "One day on site.", "No grid upgrade."];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, overflow: "hidden" }}>
      <Slot id="hero-pool-1" placeholder="Drop a full-bleed installation photo" style={{ width: "100%", height: `${HV_H}px` }} />
      {/* very soft gradient just for the corner labels — far weaker than A */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.40) 100%)" }} />
      <HVCornerLabel position="top-left">HALO FastHub</HVCornerLabel>
      <HVCornerLabel position="top-right">F · Highlighter marker · frosted blur</HVCornerLabel>

      <div style={{ position: "absolute", inset: 0, padding: `0 ${HV_PAD}px ${HV_PAD}px`, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>
        {/* Headline — one block per line, tightly fitted, with frosted blur */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
          {lines.map((ln, i) => (
            <span key={i} style={{
              display: "inline-block",
              padding: "6px 18px 10px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "96px",
              fontWeight: 500,
              letterSpacing: "-0.026em",
              lineHeight: 1.0,
              color: WHITE,
              // pure frosted blur — no tint, no keyline
              background: "transparent",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}>
              {ln}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton>Make an enquiry</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
