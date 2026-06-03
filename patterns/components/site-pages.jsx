// HALO FastHub — SITEMAP. Every page is just an ordered list of blocks
// (id from the registry) + content props. This is the proof of rationalisation:
// the whole site is data over the 20 canonical blocks. renderPage maps each
// entry through window.BLOCKS. Used by both the design site (Site v2) and the
// wireframe view (Wireframes) — same data, two renderers.

const CASE_SHOWCASE = [
  { sector: "Fleet", client: "Merseyside Police", stat: "6 hrs", label: "to first charge", slot: "rel-1" },
  { sector: "Workplace", client: "Segen Academy", stat: "65%", label: "demand from solar", slot: "rel-2" },
  { sector: "Destination", client: "Bevan Group", stat: "+18%", label: "dwell time", slot: "rel-3" },
];

const SITEMAP = {
  home: {
    title: "Home", nav: "",
    blocks: [
      { id: "04", props: { eyebrow: "Smart EV charging", title: "Charging that lands in a day.", sub: "Solar canopy, battery, mains and twelve charge points — one leased unit, installed in twenty-four hours, no grid upgrade.", primary: true, secondary: ["Explore the product", "Product.html"], image: "home-hero", stat: ["1", "day install", "Crane in, charging by evening"] } },
      { id: "11" },
      { id: "02", props: { tone: "light", intro: { overline: "The product", heading: "One canopy. Four systems. Twelve chargers.", intro: "The installation is identical at every site — configuration, access and tariff are what change.", align: "split" }, cols: 3, items: [
        { eyebrow: "Generate", title: "Solar canopy", body: "19.32 kWp, covering the bulk of daytime demand." },
        { eyebrow: "Store", title: "Battery", body: "Shifts solar into evening and night charging." },
        { eyebrow: "Manage", title: "HALO OS", body: "Arbitrates solar, battery and mains second by second." },
      ] } },
      { id: "16", props: { tone: "dark", intro: { overline: "Proof", heading: "Real hubs, really deployed.", align: "left" }, items: CASE_SHOWCASE } },
      { id: "05", props: { secondary: ["Explore the product", "Product.html"] } },
    ],
  },

  product: {
    title: "Product", nav: "Product",
    blocks: [
      { id: "04", props: { eyebrow: "Product · HALO FastHub", title: "The hub that lands in a day.", sub: "Solar canopy, battery storage, mains integration and twelve charge points — one leased unit, deployed in twenty-four hours.", primary: true, secondary: ["Technical deep dive", "Technical deep dive.html"], image: "prod-hero", stat: ["12", "charge points", "Type 2, fleet-sized"] } },
      { id: "02", props: { tone: "offwhite", intro: { overline: "The solution", heading: "Everything the site needs, prefabricated.", align: "split", intro: "Delivered whole, commissioned on the day, managed end-to-end." }, cols: 3, items: [
        { eyebrow: "Generate", title: "Solar canopy", body: "19.32 kWp monocrystalline over twelve bays." },
        { eyebrow: "Store", title: "Battery storage", body: "Smart-grid balanced; shifts solar into peak demand." },
        { eyebrow: "Manage", title: "HALO OS", body: "Live arbitration against your tariff and demand." },
      ] } },
      { id: "08" },
      { id: "06", props: { number: "How", eyebrow: "How it works", title: "From first visit to fully managed charging.", rows: [
        { step: "01", title: "Free site assessment", body: "We come to you, walk the car park, review your supply and map demand.", slot: "p-s1", placeholder: "Site assessment" },
        { step: "02", title: "Sized, costed proposal", body: "Within seven working days: lease terms, energy model, planning opinion, install date.", slot: "p-s2", placeholder: "Proposal" },
        { step: "03", title: "One day on site", body: "Crane in, energise, commission, hand over. Charging the same evening.", slot: "p-s3", placeholder: "Install day" },
      ] } },
      { id: "05", props: { title: "Fifty-plus parking spaces? Let's size your hub.", sub: "A free, obligation-free site assessment is the only thing between you and a working hub." } },
      { id: "02", props: { tone: "light", intro: { overline: "Sectors", heading: "One hub. Three jobs.", align: "split", intro: "The installation is identical — configuration, access and tariff change by sector." }, cols: 3, items: [
        { image: "sec-f", title: "Fleets", body: "Round-the-clock charging for marked, unmarked and commercial vehicles.", link: "Sector.html?sector=fleets", linkLabel: "View fleets" },
        { image: "sec-w", title: "Workplaces", body: "Staff and visitor parking, with revenue from every bay.", link: "Sector.html?sector=workplaces", linkLabel: "View workplaces" },
        { image: "sec-d", title: "Destinations", body: "Attract EV drivers, extend dwell time, unlock revenue.", link: "Sector.html?sector=destinations", linkLabel: "View destinations" },
      ] } },
      { id: "09", props: { intro: { overline: "Common hurdles", heading: "The objections, answered.", align: "split" }, items: [
        { q: "Don't we need a grid upgrade?", a: "No. The hub sits behind your existing meter — no new DNO connection is requested, so no reinforcement is scheduled." },
        { q: "How long does install really take?", a: "One day on site: crane in, energise, commission, hand over. Your fleet charges the same evening." },
        { q: "Who sets the tariff?", a: "You do. Every penny of charging revenue is retained — it's a margin, not a cost centre." },
      ] } },
      { id: "05", props: { secondary: ["Technical deep dive", "Technical deep dive.html"] } },
    ],
  },

  tech: {
    title: "Technical deep dive", nav: "Product",
    blocks: [
      { id: "04", props: { eyebrow: "Product · Technical deep dive", title: "The full specification.", sub: "For engineers and procurement — hardware, performance envelope, software and support, in detail.", primary: true, compact: true, size: 60 } },
      { id: "08" },
      { id: "06", props: { number: "Tech", eyebrow: "Technical detail", title: "How the energy actually flows.", tone: "offwhite", rows: [
        { step: "01", title: "Generation & storage", body: "A 19.32 kWp canopy feeds a smart-grid-balanced battery shifting solar into evening windows.", slot: "t-s1", placeholder: "Canopy + battery" },
        { step: "02", title: "Behind-the-meter", body: "The hub sits inside your existing supply — no new connection requested.", slot: "t-s2", placeholder: "Energy flow" },
      ] } },
      { id: "13" },
      { id: "09", props: { intro: { overline: "Engineering FAQ", heading: "For the technical reviewer.", align: "split" }, items: [
        { q: "What's the connection arrangement?", a: "Behind-the-meter tie-in to your existing distribution board; no DNO notification required." },
        { q: "What are the foundation requirements?", a: "Ground screws or pre-cast pads on standard car-park sub-base — no deep excavation." },
      ] } },
      { id: "05" },
    ],
  },

  cases: {
    title: "Case studies", nav: "Case studies",
    blocks: [
      { id: "04", props: { eyebrow: "Case studies", title: "Real hubs, really deployed.", sub: "From a 24/7 police fleet to a destination forecourt — see how the same hub adapts to each job.", primary: true } },
      { id: "14" },
      { id: "05" },
    ],
  },

  caseStudy: {
    title: "Case study", nav: "Case studies",
    blocks: [
      { id: "04", props: { eyebrow: "Fleet · Merseyside Police", title: "A 24/7 emergency fleet, charging on solar.", sub: "The first UK police force to deploy HALO FastHub — twelve points, live the same afternoon as the crane lift.", primary: true, image: "cs-hero", stat: ["6 hrs", "to first charge", "From crane lift"] } },
      { id: "06", props: { number: "01", eyebrow: "The work", title: "Challenge, solution, results.", rows: [
        { step: "01", title: "The challenge", body: "A 24/7 emergency fleet electrifying fast, with a DNO quoting an eight-year wait for a grid upgrade.", slot: "cs-1", placeholder: "Fleet vehicles" },
        { step: "02", title: "The solution", body: "A single hub behind the existing meter — twelve points, no new connection requested.", slot: "cs-2", placeholder: "Installed hub" },
        { step: "03", title: "The results", body: "Live within six hours of the crane lift; charging on solar by day, shifted battery by night.", slot: "cs-3", placeholder: "Charging in use" },
      ] } },
      { id: "07", props: { quote: "“Live within six hours of the crane lift — and now charging on solar by day, shifted battery by night.”", attribution: "Fleet Manager · Merseyside Police" } },
      { id: "03", props: { tone: "warm", intro: { overline: "Results", heading: "What changed after install.", align: "left" }, stats: [["6 hrs", "to first charge", "Speed"], ["12", "charge points", "Capacity"], ["0", "grid upgrade", "Connection"], ["100%", "uptime", "Since install"]] } },
      { id: "16", props: { tone: "dark", intro: { overline: "More deployments", heading: "Related case studies.", align: "left" }, items: CASE_SHOWCASE } },
      { id: "05" },
    ],
  },

  about: {
    title: "About", nav: "About",
    blocks: [
      { id: "04", props: { eyebrow: "About · 3ti Energy Hubs", title: "The people closing the charging gap.", sub: "A B Corp-certified team of energy engineers, fleet specialists and sustainability scientists.", compact: true } },
      { id: "12" },
      { id: "06", props: { number: "02", eyebrow: "Our story", title: "From solar car parks to smart hubs.", rows: [
        { step: "01", title: "Solar car parks, reimagined", body: "3ti began by building solar car parks; smart self-generating hubs were the natural next step.", slot: "ab-1", placeholder: "Early project" },
        { step: "02", title: "A B Corp from the start", body: "Certified B Corp — built to balance commercial return with measurable impact.", slot: "ab-2", placeholder: "Team" },
      ] } },
      { id: "03", props: { tone: "warm", intro: { overline: "3ti in numbers", heading: "A decade of clean-energy infrastructure.", align: "left" }, stats: [["10+", "years", "Clean energy"], ["B Corp", "certified", "Governance"], ["12", "points", "Per hub"], ["1", "day", "Every install"]] } },
      { id: "02", props: { tone: "light", intro: { overline: "The team", heading: "The people behind the hub.", align: "split", intro: "The same people who scope your site stay with you through install and beyond." }, cols: 3, items: [
        { image: "tm-1", title: "Tim Evans", eyebrow: "Chief Executive", body: "Twenty years scaling clean-energy infrastructure." },
        { image: "tm-2", title: "Dr. Helen Carr", eyebrow: "Chief Technology Officer", body: "Leads HALO OS, the energy-arbitration brain." },
        { image: "tm-3", title: "Marcus Boateng", eyebrow: "Head of Fleet", body: "Translates duty cycles into hub specs." },
      ] } },
      { id: "07", props: { quote: "“A B Corp that treats charging infrastructure as a public good, not just a product.”", attribution: "Sustainability Lead · 3ti Energy Hubs" } },
      { id: "05" },
    ],
  },

  news: {
    title: "News", nav: "News",
    blocks: [
      { id: "04", props: { eyebrow: "News & insights", title: "Thinking on fleet electrification.", sub: "Whitepapers, technical articles, press and recorded sessions — for the people who ask the hard questions.", primary: true } },
      { id: "15" },
      { id: "05" },
    ],
  },

  article: {
    title: "Article", nav: "News",
    blocks: [
      { id: "17" },
      { id: "05" },
    ],
  },

  contact: {
    title: "Contact", nav: "Contact",
    blocks: [
      { id: "04", props: { eyebrow: "Contact", title: "Start a conversation.", sub: "Tell us about your site, or reach us directly — we reply within seven working days.", compact: true } },
      { id: "18" },
      { id: "19" },
    ],
  },
};

const SITE_ORDER = ["home", "product", "tech", "cases", "caseStudy", "about", "news", "article", "contact"];

// Map a block list through the registry → React elements.
function renderBlocks(list) {
  return list.map((b, i) => {
    const def = window.BLOCKS[b.id];
    if (!def) return null;
    const C = def.C;
    return <C key={i} {...(b.props || {})} />;
  });
}

// Full design page (nav + blocks + footer).
function SitePageV2({ slug }) {
  const page = SITEMAP[slug] || SITEMAP.home;
  return (
    <div style={{ background: WHITE, fontFamily: "Montserrat, sans-serif", color: BLACK }}>
      <window.SiteNav active={page.nav} />
      {renderBlocks(page.blocks)}
      <window.Footer />
    </div>
  );
}

Object.assign(window, { SITEMAP, SITE_ORDER, renderBlocks, SitePageV2 });
