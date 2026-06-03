// HALO FastHub — landing page composer.

function Landing() {
  return (
    <div style={{ background: WHITE, fontFamily: "Montserrat, sans-serif", color: BLACK }}>
      <SiteNav active="" />
      <LP_Hero />
      <LP_Challenge />
      <LP_Solution />
      <LP_Proof />
      <LP_Calculator />
      <LP_Timeline />
      <LP_Hurdles />
      <LP_Costs />
      <LP_CaseStudies />
      <LP_FurtherReading />
      <LP_FinalCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />);
