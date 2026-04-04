const experiences = [
  {
    role: "Software Engineer Intern",
    company: "CETMATRIX — Career Education and Travel",
    period: "Sep 2025 – Dec 2025",
    type: "Internship · 4 months",
    tags: ["Flutter", "Dart", "Firebase", "GitHub Actions", "CI/CD", "Vercel"],
    bullets: [
      "Developed and maintained cross-platform Flutter applications using Dart, implementing robust state management with Provider and Riverpod.",
      "Built and extended cloud backend infrastructure on Google Firebase — managing Firestore databases, Cloud Functions, and Firebase Authentication.",
      "Engineered CI/CD pipelines using GitHub Actions to automate testing and deployment of web and mobile applications.",
      "Created internal tools utilizing Cloud Functions and social media APIs to automate analytics, reporting, and dynamic content display.",
      "Managed company website infrastructure: hosting, deployment, and performance monitoring on Firebase Hosting and Vercel.",
    ],
  },
  {
    role: "IT Infrastructure Intern",
    company: "CARE Hospitals, Quality CARE India Limited",
    period: "Sep 2025 – Dec 2025",
    type: "Internship · 4 months",
    tags: ["Networking", "System Security", "Cloud Infrastructure", "Healthcare IT"],
    bullets: [
      "Managed critical IT infrastructure for a high-volume healthcare environment, ensuring 99.9% uptime for essential medical databases and staff workstations.",
      "Streamlined hardware-to-software integration by troubleshooting complex network issues and maintaining system security protocols across local and cloud-based assets.",
      "Collaborated with cross-functional teams to provide technical solutions for real-time data management, bridging hardware limitations with software requirements.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 0" }}>
      <div className="gradient-divider" />
      <div className="max-container" style={{ paddingTop: "7rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="section-number" style={{ marginBottom: "0.5rem" }}>02</p>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Experience</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Where I&apos;ve{" "}
            <span className="gradient-text">worked</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card" style={{ padding: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.25rem" }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 500 }}>
                    {exp.company}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
                    {exp.period}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "2px" }}>
                    {exp.type}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.25rem 0" }}>
                {exp.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        opacity: 0.6,
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
