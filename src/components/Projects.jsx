const projects = [
  {
    number: "01",
    name: "MediLink",
    subtitle: "Full-Stack Healthcare Ecosystem",
    status: "Active",
    period: "Feb 2026 – Present",
    description:
      "A comprehensive full-stack ecosystem bridging mobile and web platforms to create a unified, responsive user experience. Leverages Flutter for the mobile app and React for the administrative web dashboard, seamlessly integrated with Google Firebase for real-time sync and secure authentication.",
    tags: ["Flutter", "React", "Firebase", "Firestore", "JavaScript", "Real-time DB"],
    github: "https://github.com/ImadCreates/Medilink",
    live: "https://medilink-pied.vercel.app",
  },
  {
    number: "02",
    name: "PrimeBid",
    subtitle: "Microservices Auction Architecture",
    status: "In Development",
    period: "Jan 2026 – Present",
    description:
      "A distributed auction platform built with Java and Spring Boot to manage high-concurrency bidding environments. Features five core microservices — including a centralized API Gateway and IAM — ensuring scalable, isolated service management with automated environment parity and secure routing protocols.",
    tags: ["Java", "Spring Boot", "Microservices", "Docker", "API Gateway", "IAM"],
    github: null,
    live: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 0" }}>
      <div className="gradient-divider" />
      <div className="max-container" style={{ paddingTop: "7rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="section-number" style={{ marginBottom: "0.5rem" }}>03</p>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Projects</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            What I&apos;ve{" "}
            <span className="gradient-text">built</span>
          </h2>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}
          className="projects-grid"
        >
          {projects.map((p) => (
            <div key={p.number} className="project-card" style={{ padding: "2rem", position: "relative" }}>
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "rgba(34,211,238,0.3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {p.number}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    border: `1px solid ${p.status === "Active" ? "rgba(34,197,94,0.3)" : "rgba(34,211,238,0.2)"}`,
                    color: p.status === "Active" ? "#86efac" : "var(--accent)",
                    background: p.status === "Active" ? "rgba(34,197,94,0.06)" : "rgba(34,211,238,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: p.status === "Active" ? "#86efac" : "var(--accent)",
                      boxShadow: `0 0 5px ${p.status === "Active" ? "#86efac" : "var(--accent)"}`,
                    }}
                  />
                  {p.status}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>
                {p.name}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--accent)", marginBottom: "1.25rem", fontWeight: 500 }}>
                {p.subtitle}
              </p>

              {/* Description */}
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                {p.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.75rem" }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {!p.github && !p.live && (
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontStyle: "italic" }}>
                    Private repository · In development
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
