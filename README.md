# Imad Ahmed — Portfolio

Personal portfolio for Imaduddin Ahmed, full-stack software engineer and founder of MediLink.

**Live:** https://imaduddin-ahmed.vercel.app

---

## Features

Two themes in one app, toggled from the navbar:

- **VAL** — Valorant-inspired dark UI with animated agent cards, particle effects, and a kinetic hero section
- **PRO** — Clean professional layout for a more traditional presentation

Same content, different presentation.

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React

---

## Running Locally

```bash
npm install
npm run dev
```

---

## Content

All portfolio data (experience, projects, education, skills) lives in:

```
src/data/portfolioData.js        # VAL theme data source
src/myPortfolio/components/      # PRO theme components (self-contained data)
```

To update content, edit those files. The VAL theme reads from `portfolioData.js`; the PRO theme has its data inline in each component.
