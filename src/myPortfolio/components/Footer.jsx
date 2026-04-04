export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "2rem 0",
        marginTop: "2rem",
      }}
    >
      <div
        className="max-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          className="gradient-text"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem", fontWeight: 700 }}
        >
          IA.
        </span>
        <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
          Designed & built by{" "}
          <span style={{ color: "var(--text)" }}>Imaduddin Ahmed</span>
        </p>
      </div>
    </footer>
  );
}
