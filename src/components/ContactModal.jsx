"use client";

import { useEffect, useState } from "react";

const CONTACT_EMAIL = "approachimad@gmail.com";
const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  const handleFieldChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject =
      form.subject.trim() || `Portfolio inquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setForm(initialForm);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="contact-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="contact-modal-panel" role="dialog" aria-modal="true" aria-label="Contact form">
        <div className="contact-modal-header">
          <div>
            <p className="section-label" style={{ marginBottom: "0.45rem" }}>Reach Out</p>
            <h3
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Send a <span className="gradient-text">message</span>
            </h3>
          </div>

          <button
            type="button"
            className="contact-modal-close"
            onClick={onClose}
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div>
            <label className="contact-field-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={handleFieldChange("name")}
              className="contact-field"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="contact-field-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={handleFieldChange("email")}
              className="contact-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="contact-field-label" htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              value={form.subject}
              onChange={handleFieldChange("subject")}
              className="contact-field"
              placeholder="What would you like to discuss?"
            />
          </div>

          <div>
            <label className="contact-field-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={handleFieldChange("message")}
              className="contact-field"
              style={{ resize: "vertical", minHeight: "120px" }}
              placeholder="Share your project, role, or idea..."
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
            <button type="submit" className="btn-primary">
              <span>Send Message</span>
            </button>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-outline">
              Email Directly
            </a>
          </div>

          <p style={{ fontSize: "0.74rem", color: "var(--muted)", lineHeight: 1.6 }}>
            Submitting opens your email app with a pre-filled draft to {CONTACT_EMAIL}.
          </p>
        </form>
      </div>

      <style>{`
        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 70;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(7, 9, 15, 0.8);
          backdrop-filter: blur(8px);
        }

        .contact-modal-panel {
          width: min(620px, 100%);
          background: linear-gradient(180deg, rgba(13, 21, 37, 0.98), rgba(10, 14, 24, 0.98));
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 16px;
          box-shadow: 0 24px 65px rgba(34, 211, 238, 0.16);
          padding: 1.4rem;
        }

        .contact-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .contact-modal-close {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.02);
          color: var(--muted);
          font-size: 1.2rem;
          line-height: 1;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .contact-modal-close:hover {
          color: var(--accent);
          border-color: rgba(34, 211, 238, 0.35);
          background: rgba(34, 211, 238, 0.06);
        }

        .contact-field-label {
          display: inline-block;
          margin-bottom: 0.45rem;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          font-family: var(--font-geist-mono), monospace;
        }

        .contact-field {
          width: 100%;
          padding: 0.78rem 0.95rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text);
          transition: all 0.2s ease;
          font-size: 0.92rem;
        }

        .contact-field::placeholder {
          color: #64748b;
        }

        .contact-field:focus {
          outline: none;
          border-color: rgba(34, 211, 238, 0.45);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
        }

        @media (max-width: 560px) {
          .contact-modal-panel {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
