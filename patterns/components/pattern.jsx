// Brand pattern — uses the official asset PNG extracted from the brand
// guidelines. Two source files:
//   assets/pattern-dark-clean.png   — neutral grey on transparent (texture use)
//   assets/pattern-dark.png         — same, with one focal orange halo
//   assets/pattern-light-clean.png  — neutral light on transparent (for dark bg)
//   assets/pattern-light.png        — same, with one focal orange halo
//
// The PNG renders the wave correctly (halos up alternating with smiles down,
// offset). We tile it as a CSS background.

function BrandPattern({
  mode = "light",          // "light" = dark pattern on light bg; "dark" = light pattern on dark; "white" = pure-white pattern (use on any colour)
  opacity = 0.08,
  tileWidth = 800,         // CSS px width of one full pattern image (2048 logical wide)
  withOrangeAccent = false,// keep the focal orange halo from the original asset
  rotated = false,
  style = {},
  className = "",
}) {
  let accent;
  if (mode === "white") {
    accent = "assets/pattern-white.png";
  } else if (withOrangeAccent) {
    accent = mode === "dark" ? "assets/pattern-light.png" : "assets/pattern-dark.png";
  } else {
    accent = mode === "dark" ? "assets/pattern-light-clean.png" : "assets/pattern-dark-clean.png";
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${accent}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${tileWidth}px auto`,
        opacity,
        transform: rotated ? "rotate(180deg)" : "none",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// One halo motif as a static image. Useful as an inline accent.
function HaloMark({ size = 64, mode = "light", style = {} }) {
  const src = mode === "dark" ? "assets/pattern-light-clean.png" : "assets/pattern-dark-clean.png";
  // The pattern asset includes many halos; crop to one via background-position.
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size * 0.28}px`,
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${size * 10}px auto`,
        backgroundPosition: "-360px -50px",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// Simple SVG glyph version for small inline use (callouts, dingbats).
function HaloGlyph({ size = 60, color = "currentColor", strokeWidth = 2.5 }) {
  return (
    <svg viewBox="0 0 200 60" width={size} height={size * 0.3} aria-hidden="true">
      <path
        d="M 8 50 A 110 105 0 0 1 192 50 L 200 60 L 132 60 A 36 16 0 0 0 68 60 L 0 60 Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

Object.assign(window, { BrandPattern, HaloMark, HaloGlyph });
