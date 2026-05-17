"use client";

const stats = [
  { value: "4th", label: "Year at York University" },
  { value: "3x", label: "Internships" },
  { value: "1", label: "Active Project" },
];

export default function About() {

  return (
    <section id="about" style={{ padding: "7rem 0" }}>
      <div className="max-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          {/* Left */}
          <div>
            <p className="section-number" style={{ marginBottom: "0.5rem" }}>01</p>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>About Me</p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
                lineHeight: 1.2,
              }}
            >
              Engineer by passion,{" "}
              <span className="gradient-text">builder by nature</span>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              The clearest measure of where I am right now is building MediLink,
              a real-time dispatch and field coordination platform I designed and
              shipped solo across React, Flutter, and Spring Boot. I&apos;m also
              a Full-Stack Developer and 4th-year Software Engineering student at
              York University, working across Java, React, and Flutter.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
              Three real-world roles have shaped how I build: full-stack mobile
              development at Cetmatrix, healthcare IT infrastructure at Care
              Hospitals, and now software development at Superstars. That range
              of experience, from writing code to keeping production systems
              running, gives me a practical picture of how software works at
              every layer.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
              I&apos;m looking to join an engineering team where I can contribute
              immediately and grow into a technical lead role over time. At the
              same time, I&apos;m taking MediLink to market as a real company.
              Both goals push me in the same direction.
            </p>

          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="glass-card"
                  style={{ padding: "1.5rem 1rem", textAlign: "center" }}
                >
                  <div
                    className="gradient-text"
                    style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.4rem" }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Info card */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Degree", value: "Software Engineering" },
                  { label: "School", value: "Lassonde School of Engineering, York University" },
                  { label: "Location", value: "North York, Ontario, Canada" },
                  { label: "Focus", value: "Full-Stack Web & Mobile" },
                  { label: "Status", value: "Open to Opportunities", highlight: true },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", minWidth: "80px", fontFamily: "var(--font-geist-mono)" }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: item.highlight ? "var(--accent)" : "var(--text)",
                        textAlign: "right",
                      }}
                    >
                      {item.highlight && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            marginRight: "6px",
                            verticalAlign: "middle",
                            boxShadow: "0 0 6px var(--accent)",
                          }}
                        />
                      )}
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
