// HALO and FastHub logos. Uses the actual brand PNG assets extracted from the
// official guidelines. Height-based sizing keeps proportions correct.

function HaloLogo({ height = 32, mode = "dark" }) {
  // mode "dark" = dark on light (use logo-halo-dark.png — black HALO + orange arc)
  // mode "light" = light on dark (use logo-halo-light.png — white HALO + orange arc)
  const src = mode === "light" ? "assets/logo-halo-light.png" : "assets/logo-halo-dark.png";
  return <img src={src} alt="HALO" style={{ height: `${height}px`, width: "auto", display: "block" }} />;
}

function FastHubLogo({ height = 28, mode = "dark" }) {
  const src = mode === "light" ? "assets/logo-fasthub-light.png" : "assets/logo-fasthub-dark.png";
  return <img src={src} alt="FastHub" style={{ height: `${height}px`, width: "auto", display: "block" }} />;
}

// Dual logo lockup — HALO + FastHub side by side, with O-of-HALO worth of space between.
function HaloFastHubLogo({ height = 32, mode = "dark", gap = null }) {
  // The standalone HALO is ~4:1 aspect, the O width ~= height. Use height as
  // a rough proxy for the gap.
  const g = gap == null ? Math.round(height * 0.9) : gap;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: `${g}px` }}>
      <HaloLogo height={height} mode={mode} />
      <FastHubLogo height={height * 0.78} mode={mode} />
    </div>
  );
}

// 3ti corporate mark — text-only placeholder until a real asset is available.
function ThreeTiLogo({ fontSize = 18, mode = "light" }) {
  const black = mode === "light" ? "#FFFFFF" : "#1A1A1A";
  const orange = "#F7A803";
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", gap: "8px", fontFamily: "Montserrat, sans-serif", lineHeight: 1 }}>
      <span style={{ fontSize: `${fontSize * 1.5}px`, fontWeight: 700, color: black, letterSpacing: "-0.02em" }}>3ti</span>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: orange, alignSelf: "center", marginBottom: "2px" }} />
      <span style={{ fontSize: `${fontSize * 0.62}px`, fontWeight: 400, color: black, opacity: 0.7, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Energy Hubs
      </span>
    </div>
  );
}

Object.assign(window, { HaloLogo, FastHubLogo, HaloFastHubLogo, ThreeTiLogo });
