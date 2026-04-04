"use client";

const links = [
  {
    label: "Email",
    value: "approachimad@gmail.com",
    href: "mailto:approachimad@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/imadsecures",
    href: "https://linkedin.com/in/imadsecures",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/ImadCreates",
    href: "https://github.com/ImadCreates",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Contact({ onOpenContact }) {
  return (
    <section id="contact" style={{ padding: "7rem 0 5rem" }}>
      <div className="gradient-divider" />
      <div className="max-container" style={{ paddingTop: "7rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-number" style={{ marginBottom: "0.5rem" }}>05</p>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Contact</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Let&apos;s build something{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            I&apos;m actively looking for new opportunities. Whether you have a role in
            mind, a project to collaborate on, or just want to say hi — my inbox
            is always open.
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "4rem" }}>
          <button type="button" onClick={onOpenContact} className="btn-primary">
            <span>Say Hello</span>
          </button>
        </div>

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1.5rem 1rem",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(34,211,238,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ color: "var(--accent)" }}>{link.icon}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                {link.label}
              </span>
              <span style={{ fontSize: "0.72rem", textAlign: "center", wordBreak: "break-all" }}>
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr !important; max-width: 320px !important; }
        }
      `}</style>
    </section>
  );
}
