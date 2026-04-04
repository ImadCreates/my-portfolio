const skillGroups = [
  {
    category: "Languages",
    skills: ["Java", "JavaScript", "Dart", "SQL", "TypeScript"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["Spring Boot", "React.js", "Flutter", "Provider", "Riverpod"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Google Firebase", "Firestore", "Cloud Functions", "Docker", "GitHub Actions", "Vercel", "Firebase Hosting"],
  },
  {
    category: "Architecture & Concepts",
    skills: ["Microservices", "REST APIs", "API Gateways", "Distributed Systems", "OOP", "System Architecture", "State Management", "IAM"],
  },
  {
    category: "Other",
    skills: ["Linux", "Penetration Testing", "Mobile Applications", "UI Design", "NoSQL", "IoT"],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 0" }}>
      <div className="gradient-divider" />
      <div className="max-container" style={{ paddingTop: "7rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="section-number" style={{ marginBottom: "0.5rem" }}>04</p>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Skills</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Technologies I{" "}
            <span className="gradient-text">work with</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {group.category}
                <span
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
