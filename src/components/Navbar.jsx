"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(7, 9, 15, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(34, 211, 238, 0.07)" : "none",
        }}
      >
        <div className="max-container" style={{ height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: "none" }}>
            <span className="gradient-text" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.1rem", fontWeight: 700 }}>
              IA.
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`nav-link ${active === l.href.slice(1) ? "active" : ""}`}>
                {l.label}
              </a>
            ))}
            <a href="mailto:approachimad@gmail.com" className="btn-outline" style={{ padding: "0.45rem 1.1rem", fontSize: "0.85rem" }}>
              <span>Let's Connect</span>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "1px solid rgba(34,211,238,0.2)",
              borderRadius: "8px",
              padding: "7px 9px",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: mobileOpen && i === 1 ? "transparent" : "var(--accent)",
                  transition: "all 0.3s ease",
                  transform:
                    mobileOpen
                      ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                      : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                      : ""
                      : "",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(7, 9, 15, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(34, 211, 238, 0.08)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${active === l.href.slice(1) ? "active" : ""}`}
              style={{ fontSize: "1rem" }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="mailto:approachimad@gmail.com" className="btn-outline" style={{ alignSelf: "flex-start" }}>
            <span>Let's Connect</span>
          </a>
        </div>
      )}
    </>
  );
}
