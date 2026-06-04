// HALO FastHub — WIREFRAME renderer. Greyscale skeletons of all 20 canonical
// blocks, each labelled "NN - Name". Reads window.BLOCKS for names and the
// SITEMAP for per-page layouts. Pure presentation — no real content.

const WIRE_INK = "#C9C9C9";      // text bars
const WIRE_INK2 = "#DADADA";     // lighter bars
const WIRE_BOX = "#ECECEC";      // image boxes
const WIRE_LINE = "#D0D0D0";     // outlines
const WIRE_DARK = "#3A3A3A";     // "dark tone" blocks
const WIRE_DARKBAR = "#6A6A6A";
const WIRE_ACCENT = "#F7A803";   // only the orange-reserved marks (quote rule, timeline emphasis, arrow)
const WIRE_MONO = "Montserrat, sans-serif";

// --- skeleton primitives ---
function Bar({ w = "100%", h = 12, c = WIRE_INK, mb = 0, r = 3 }) {
  return <div style={{ width: w, height: h, background: c, borderRadius: r, marginBottom: mb }} />;
}
function ImgBox({ h = 160, dark = false }) {
  return (
    <div style={{ width: "100%", height: h, background: dark ? "rgba(255,255,255,0.08)" : WIRE_BOX, border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : WIRE_LINE}`, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={dark ? "rgba(255,255,255,0.25)" : WIRE_LINE} />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={dark ? "rgba(255,255,255,0.25)" : WIRE_LINE} />
      </svg>
    </div>
  );
}
function PillW({ w = 130, dark = false, accent = false }) {
  return (
    <div style={{ width: w, height: 38, borderRadius: 999, border: `1px solid ${accent ? WIRE_ACCENT : dark ? "rgba(255,255,255,0.35)" : WIRE_LINE}`, background: accent ? WIRE_ACCENT : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: w - 50, height: 8, background: accent ? "rgba(0,0,0,0.35)" : dark ? "rgba(255,255,255,0.4)" : WIRE_INK, borderRadius: 2 }} />
    </div>
  );
}
function IntroSkel({ dark = false }) {
  const c = dark ? WIRE_DARKBAR : WIRE_INK;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 24, height: 2, background: c }} /><Bar w={90} h={8} c={c} />
      </div>
      <Bar w="44%" h={26} c={c} mb={10} />
      <Bar w="30%" h={26} c={c} />
    </div>
  );
}
const cols = (n) => ({ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 16 });

// --- per-block skeletons ---
function skel(id, props = {}) {
  const p = props;
  switch (id) {
    case "01": return <div><IntroSkel /><Bar w="55%" h={10} c={WIRE_INK2} /></div>;
    case "02": {
      const n = p.cols || (p.items ? p.items.length : 3);
      return (
        <div>{p.intro && <IntroSkel />}
          <div style={cols(Math.min(n, 5))}>
            {Array.from({ length: Math.min(n, 5) }).map((_, i) => (
              <div key={i} style={{ border: `1px solid ${WIRE_LINE}` }}>
                <ImgBox h={120} />
                <div style={{ padding: 16 }}><Bar w="50%" h={8} c={WIRE_INK2} mb={10} /><Bar w="80%" h={12} mb={8} /><Bar w="95%" h={8} c={WIRE_INK2} /></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "03": {
      const n = (p.stats ? p.stats.length : 4);
      return (
        <div>{p.intro && <IntroSkel />}
          <div style={cols(n)}>
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} style={{ border: `1px solid ${WIRE_LINE}`, padding: 20 }}><Bar w="50%" h={8} c={WIRE_INK2} mb={16} /><Bar w="60%" h={30} /></div>
            ))}
          </div>
        </div>
      );
    }
    case "04": return (
      <div style={{ background: WIRE_DARK, padding: 36, display: "grid", gridTemplateColumns: p.image ? "1.1fr 0.9fr" : "1fr", gap: 40 }}>
        <div>
          <Bar w={110} h={8} c={WIRE_DARKBAR} mb={20} />
          <Bar w="80%" h={32} c={WIRE_DARKBAR} mb={12} /><Bar w="55%" h={32} c={WIRE_DARKBAR} mb={22} />
          <Bar w="70%" h={10} c={WIRE_DARKBAR} mb={8} /><Bar w="60%" h={10} c={WIRE_DARKBAR} mb={26} />
          <div style={{ display: "flex", gap: 14 }}><PillW w={150} accent /><PillW w={150} dark /></div>
          {p.stat && <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 18 }}><Bar w={120} h={26} c={WIRE_DARKBAR} /></div>}
        </div>
        {p.image && <ImgBox h={230} dark />}
      </div>
    );
    case "05": return (
      <div style={{ background: WIRE_DARK, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32 }}>
        <div style={{ flex: 1 }}><Bar w="50%" h={22} c={WIRE_DARKBAR} mb={12} /><Bar w="70%" h={9} c={WIRE_DARKBAR} /></div>
        <div style={{ display: "flex", gap: 12 }}><PillW w={150} accent /><PillW w={140} dark /></div>
      </div>
    );
    case "06": return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(p.rows || [0, 1]).map((_, i) => (
          <div key={i} style={{ border: `1px solid ${WIRE_LINE}`, padding: 20, display: "grid", gridTemplateColumns: i % 2 ? "1fr 1fr" : "1fr 1fr", gap: 32 }}>
            {i % 2 === 0 ? <ImgBox h={150} /> : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}><Bar w={50} h={28} mb={14} /><Bar w="70%" h={16} mb={10} /><Bar w="90%" h={8} c={WIRE_INK2} /></div>}
            {i % 2 === 0 ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}><Bar w={50} h={28} mb={14} /><Bar w="70%" h={16} mb={10} /><Bar w="90%" h={8} c={WIRE_INK2} /></div> : <ImgBox h={150} />}
          </div>
        ))}
      </div>
    );
    case "07": return (
      <div style={{ maxWidth: "62%" }}>
        <div style={{ width: 40, height: 3, background: WIRE_ACCENT, marginBottom: 22 }} />
        <Bar w="95%" h={18} mb={10} /><Bar w="85%" h={18} mb={10} /><Bar w="60%" h={18} mb={22} />
        <Bar w={180} h={9} c={WIRE_INK2} />
      </div>
    );
    case "08": return (
      <div style={cols(3)}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ border: `1px solid ${WIRE_LINE}`, padding: 22 }}>
            <Bar w="55%" h={8} c={WIRE_INK2} mb={16} />
            {[0, 1, 2, 3, 4].map((j) => <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid ${WIRE_LINE}` }}><Bar w={70} h={8} c={WIRE_INK2} /><Bar w={50} h={8} /></div>)}
          </div>
        ))}
      </div>
    );
    case "09": return (
      <div>{p.intro && <IntroSkel />}
        <div style={{ borderTop: `1px solid ${WIRE_LINE}` }}>
          {(p.items || [0, 1, 2]).map((_, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: `1px solid ${WIRE_LINE}` }}>
              <Bar w="40%" h={14} /><div style={{ fontFamily: WIRE_MONO, fontSize: 22, color: WIRE_INK }}>{i === 0 ? "–" : "+"}</div>
            </div>
          ))}
        </div>
      </div>
    );
    case "10": {
      const n = (p.steps ? p.steps.length : 4);
      return (
        <div>{p.intro && <IntroSkel />}
          <div style={cols(n)}>
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} style={{ borderTop: `2px solid ${i === n - 1 ? WIRE_ACCENT : "#A8A8A8"}`, paddingTop: 16 }}><Bar w="50%" h={8} c={WIRE_INK2} mb={14} /><Bar w="80%" h={12} mb={10} /><Bar w="95%" h={8} c={WIRE_INK2} /></div>
            ))}
          </div>
        </div>
      );
    }
    case "11": return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
        <div><Bar w={100} h={8} c={WIRE_INK2} mb={8} /><Bar w={200} h={12} /></div>
        <div style={{ display: "flex", gap: 22, flex: 1, justifyContent: "flex-end" }}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 110, height: 40, background: WIRE_BOX, border: `1px solid ${WIRE_LINE}` }} />)}</div>
      </div>
    );
    case "12": return (
      <div><Bar w={120} h={8} c={WIRE_INK2} mb={20} /><Bar w="90%" h={30} mb={12} /><Bar w="75%" h={30} mb={12} /><Bar w="40%" h={30} mb={26} />
        <div style={{ display: "flex", gap: 28 }}>{[0, 1, 2].map((i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}><Bar w={120} h={10} /><span style={{ color: WIRE_ACCENT }}>→</span></div>)}</div>
      </div>
    );
    case "13": return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div><Bar w="70%" h={18} mb={20} /><div style={cols(2)}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ border: `1px solid ${WIRE_LINE}`, padding: 16 }}><Bar w="50%" h={12} mb={8} /><Bar w="80%" h={7} c={WIRE_INK2} /></div>)}</div></div>
        <div><Bar w={90} h={8} c={WIRE_INK2} mb={18} />{[0, 1, 2, 3].map((i) => <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderTop: `1px solid ${WIRE_LINE}` }}><Bar w={24} h={16} /><Bar w="80%" h={9} c={WIRE_INK2} /></div>)}</div>
      </div>
    );
    case "14":
    case "15": return (
      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>{[90, 70, 80, 75].map((w, i) => <PillW key={i} w={w} accent={i === 0} />)}</div>
        <div style={cols(3)}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ border: `1px solid ${WIRE_LINE}` }}><ImgBox h={110} /><div style={{ padding: 16 }}><Bar w="40%" h={7} c={WIRE_INK2} mb={10} /><Bar w="75%" h={12} mb={8} /><Bar w="55%" h={8} c={WIRE_INK2} /></div></div>)}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 36, height: 36, border: `1px solid ${WIRE_LINE}`, background: i === 0 ? "#BdBdBd" : "transparent" }} />)}</div>
      </div>
    );
    case "16": return (
      <div style={{ background: WIRE_DARK, padding: 32 }}>{p.intro && <IntroSkel dark />}
        <div style={cols(3)}>{[0, 1, 2].map((i) => <div key={i} style={{ border: "1px solid rgba(255,255,255,0.18)" }}><ImgBox h={110} dark /><div style={{ padding: 16 }}><Bar w="40%" h={7} c={WIRE_DARKBAR} mb={10} /><Bar w="70%" h={12} c={WIRE_DARKBAR} mb={12} /><Bar w="50%" h={24} c={WIRE_DARKBAR} /></div></div>)}</div>
      </div>
    );
    case "17": return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Bar w={120} h={8} c={WIRE_INK2} mb={16} /><Bar w="95%" h={28} mb={10} /><Bar w="70%" h={28} mb={18} /><Bar w={260} h={8} c={WIRE_INK2} mb={26} />
        <ImgBox h={200} /><div style={{ height: 24 }} />
        {[95, 90, 80, 60].map((w, i) => <Bar key={i} w={w + "%"} h={9} c={WIRE_INK2} mb={12} />)}
        <div style={{ height: 16 }} /><Bar w="50%" h={16} mb={14} />{[92, 85, 70].map((w, i) => <Bar key={i} w={w + "%"} h={9} c={WIRE_INK2} mb={12} />)}
      </div>
    );
    case "18": return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40 }}>
        <div><Bar w={90} h={8} c={WIRE_INK2} mb={16} /><Bar w="80%" h={22} mb={12} /><Bar w="90%" h={8} c={WIRE_INK2} mb={8} /><Bar w="70%" h={8} c={WIRE_INK2} /></div>
        <div style={{ border: `1px solid ${WIRE_LINE}`, padding: 28 }}><div style={cols(2)}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i}><Bar w="40%" h={7} c={WIRE_INK2} mb={10} /><div style={{ borderBottom: `1px solid #B8B8B8`, paddingBottom: 8 }}><Bar w="70%" h={9} c={WIRE_INK2} /></div></div>)}</div><div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}><PillW w={150} accent /></div></div>
      </div>
    );
    case "19": return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40 }}>
        <div><Bar w={80} h={8} c={WIRE_INK2} mb={16} /><Bar w="80%" h={20} mb={20} />{[0, 1, 2, 3].map((i) => <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, padding: "14px 0", borderTop: `1px solid ${WIRE_LINE}` }}><Bar w={50} h={7} c={WIRE_INK2} /><Bar w="70%" h={9} /></div>)}<div style={{ marginTop: 20 }}><PillW w={150} accent /></div></div>
        <ImgBox h={340} />
      </div>
    );
    case "20": return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>{[0, 1, 2].map((i) => <div key={i} style={{ marginBottom: 26 }}><Bar w="40%" h={8} c={WIRE_INK2} mb={12} /><div style={{ height: 4, background: WIRE_LINE, borderRadius: 2, position: "relative" }}><div style={{ position: "absolute", left: `${30 + i * 18}%`, top: -7, width: 18, height: 18, borderRadius: 999, background: WIRE_ACCENT }} /></div></div>)}</div>
        <div style={{ background: WIRE_DARK, padding: 28 }}><Bar w="50%" h={8} c={WIRE_DARKBAR} mb={18} /><Bar w="70%" h={34} c={WIRE_DARKBAR} mb={20} /><Bar w="90%" h={8} c={WIRE_DARKBAR} mb={10} /><Bar w="80%" h={8} c={WIRE_DARKBAR} /></div>
      </div>
    );
    default: return <Bar w="100%" h={60} />;
  }
}

// --- labelled wireframe block ---
function WireBlock({ id, props, note }) {
  const def = window.BLOCKS[id] || { name: "?" };
  return (
    <div style={{ position: "relative", border: `1px solid ${WIRE_LINE}`, background: "#fff", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderBottom: `1px dashed ${WIRE_LINE}`, background: "#FAFAFA" }}>
        <span style={{ fontFamily: WIRE_MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#1A1A1A", background: "#EDEDED", padding: "4px 9px", borderRadius: 3 }}>{id} - {def.name}</span>
        {note && <span style={{ fontFamily: WIRE_MONO, fontSize: 11, color: "#9A9A9A" }}>{note}</span>}
      </div>
      <div style={{ padding: 28 }}>{skel(id, props)}</div>
    </div>
  );
}

Object.assign(window, { WireBlock, wireSkel: skel });
