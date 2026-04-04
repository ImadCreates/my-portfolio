export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "70px",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb-1"
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="orb-2"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      <div className="max-container" style={{ position: "relative", zIndex: 1, width: "100%", padding: "4rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: "1.25rem" }}
            >
              Hello, I&apos;m
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              <span className="gradient-text">Imaduddin</span>
              <br />
              <span style={{ color: "var(--text)" }}>Ahmed</span>
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--muted)",
                marginBottom: "1.25rem",
                lineHeight: 1.5,
              }}
            >
              Full-Stack Software Engineer
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: "480px",
                marginBottom: "2.25rem",
              }}
            >
              4th-year Software Engineering student at York University. I build
              scalable end-to-end systems — from high-performance Java backends
              to polished mobile apps and web dashboards.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
              <a
                href="https://val-portfolio-steel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Valorant Theme Portfolio
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", alignItems: "center" }}>
              <a
                href="https://linkedin.com/in/imadsecures"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/ImadCreates"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right — code card */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="code-card" style={{ width: "100%", maxWidth: "420px" }}>
              <div className="code-card-header">
                <span className="code-dot code-dot-red" />
                <span className="code-dot code-dot-yellow" />
                <span className="code-dot code-dot-green" />
                <span style={{ marginLeft: "0.5rem", color: "var(--muted)", fontSize: "0.75rem" }}>developer.ts</span>
              </div>
              <div className="code-body">
                <div>
                  <span className="c-keyword">const </span>
                  <span className="c-var">developer</span>
                  <span className="c-bracket"> = </span>
                  <span className="c-bracket">{"{"}</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">name</span>
                  <span className="c-bracket">: </span>
                  <span className="c-string">&quot;Imaduddin Ahmed&quot;</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">role</span>
                  <span className="c-bracket">: </span>
                  <span className="c-string">&quot;Full-Stack Engineer&quot;</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">stack</span>
                  <span className="c-bracket">: [</span>
                </div>
                <div style={{ paddingLeft: "2.5rem" }}>
                  <span className="c-string">&quot;Java&quot;</span>
                  <span className="c-bracket">, </span>
                  <span className="c-string">&quot;Spring Boot&quot;</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "2.5rem" }}>
                  <span className="c-string">&quot;React&quot;</span>
                  <span className="c-bracket">, </span>
                  <span className="c-string">&quot;Flutter&quot;</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "2.5rem" }}>
                  <span className="c-string">&quot;Firebase&quot;</span>
                  <span className="c-bracket">, </span>
                  <span className="c-string">&quot;Node.js&quot;</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-bracket">],</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">university</span>
                  <span className="c-bracket">: </span>
                  <span className="c-string">&quot;York University&quot;</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">year</span>
                  <span className="c-bracket">: </span>
                  <span className="c-num">4</span>
                  <span className="c-bracket">,</span>
                </div>
                <div style={{ paddingLeft: "1.25rem" }}>
                  <span className="c-key">openToWork</span>
                  <span className="c-bracket">: </span>
                  <span className="c-keyword">true</span>
                </div>
                <div>
                  <span className="c-bracket">{"}"}</span>
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  <span className="c-comment">// Currently building PrimeBid & MediLink</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.4,
        }}
      >
        <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", color: "var(--muted)" }}>
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
