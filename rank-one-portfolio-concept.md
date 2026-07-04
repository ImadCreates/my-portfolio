# RANK ONE
## Portfolio concept for Imaduddin Ahmed

The feeling to replicate: you open the profile of the number one player on the ladder. Nobody gave them that spot. The page doesn't shout. It doesn't need to. Every number on it is a receipt.

The current site borrows Riot's world. This concept builds yours. Katana discipline without anime styling, ladder culture without Valorant assets, and one signature mechanic instead of ten effects.

---

## 1. Overall theme

**Name:** RANK ONE. The site is structured as a player profile, but the "game" is your actual career. Projects are your match record. Skills are your loadout. The about page is the player behind the record. Contact is issuing a challenge.

**The core metaphor is the cut.** Iaijutsu: the sword is drawn, one cut, resheathed. One motion, no wasted movement. Every transition on the site is a single clean diagonal wipe. Nothing else moves unless it has a reason to. This is your signature and the only place the site spends its boldness. Everything around it stays quiet and disciplined.

**Rules of the world (enforce these against every future idea):**
- Nothing glows. Neon glow is the number one tell of a gamer template. Edges are sharp, light is flat.
- One accent color. If a second accent appears anywhere, delete it.
- No Riot assets, no agent references, no Valorant red (#ff4655), no Valorant fonts (Rajdhani/Tungsten). Zero. The Valorant DNA survives only as feeling: earned rank, clean UI, competitive stakes.
- Uppercase is reserved for the display face and mono labels. Body copy is normal case.
- Every stat shown must be real and verifiable. No skill percentages, ever.

---

## 2. Color palette

Six values total. Derived from steel, ink, and the vermilion of a seal stamp (the red ink used to sign a record in East Asian calligraphy, which is a duel-record reference, not an anime one).

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0A0B` | Page background. Near-black, not pure black, so true black elements can sit on it |
| `--ash` | `#141416` | Raised surfaces: cards, the command palette |
| `--hairline` | `#232327` | All borders. 1px, always |
| `--steel` | `#8A8A93` | Secondary text, labels |
| `--bone` | `#EDEDE9` | Primary text. Slightly warm white, easier on the eyes than #fff |
| `--seal` | `#C81E2E` | The only accent. Cuts, active states, the challenge CTA, nothing else |

Rule: `--seal` should occupy less than 2 percent of any viewport. Scarcity is what makes it hit. If a screen has red in three places, it has red in two too many.

---

## 3. Typography

Three faces, three jobs. All free.

- **Display: Anton or Archivo Black** (Google Fonts) for headings and the giant name. Tall, condensed, blade-like. Used in caps, tight leading (0.95), tight tracking. If you want a more premium option later, Clash Display from Fontshare is the upgrade.
- **Body: Inter or General Sans** at 16 to 18px, normal case, line-height 1.6. Completely quiet. The display face carries the personality so the body face must not compete.
- **Data: JetBrains Mono** for labels, stats, timestamps, the record strip, nav. Uppercase, letter-spacing 0.1em to 0.18em, 11 to 12px. Tabular numerals for anything numeric so digits align like a scoreboard.

Type scale: 12 / 16 / 24 / 40 / clamp(64px, 10vw, 140px) for the hero name. Big jumps, no in-between sizes. Hierarchy comes from contrast, not from twelve sizes.

---

## 4. Navigation

Fixed top bar, mono face, hairline bottom border. Left: `IMAD.A`. Right: four links.

- `RECORD` (projects)
- `LOADOUT` (stack and proof)
- `THE PLAYER` (about)
- `CHALLENGE` (contact, always in `--seal`)

Active section gets a 1px red underline that slides between links (GSAP, 0.4s). On scroll down the bar slides away; on any scroll up it returns instantly. Recruiters skim; never make them hunt for nav.

**Command palette:** Cmd+K / Ctrl+K opens a palette (jump to section, copy email, open GitHub, open resume PDF, toggle sound). This is the single feature that makes engineers at Stripe and Linear-adjacent companies smile, because it says you use the tools they use. Style it like the rest: ash surface, hairline border, mono text, no rounded-blob styling.

Mobile: hamburger becomes a full-screen overlay that opens with the cut wipe. Links stacked in display face. Same world, no compromise version.

---

## 5. Loading screen

First visit only, session-cached, under 1 second, and it must never block content that is already ready.

Sequence on pure `--ink`:
1. 0.0s: a single 1px `--seal` line draws diagonally across the screen, top-right to bottom-left, 0.4s, ease `power3.inOut`. This is the sword being drawn.
2. 0.4s: `IMADUDDIN AHMED` in the display face snaps in along the line, one frame, no fade. Impact, not entrance.
3. 0.8s: the two halves of the screen separate along the cut line and reveal the hero underneath.

That reveal IS the page transition system introduced for the first time. The loader teaches the visitor the site's one gesture. Repeat visits skip straight to the hero. Anyone with `prefers-reduced-motion` gets a plain instant load.

No percentage counters, no fake progress bars, no "ENTERING LOBBY" text. Those are the template moves.

---

## 6. Transitions: The Cut

One transition for the whole site. Between routes and into the project detail view:

- A 1px `--seal` diagonal line draws across the viewport (0.3s).
- The outgoing page splits along that line, the two halves slide apart slightly and fade (0.35s).
- The incoming page is already underneath. Total under 0.7s, interruptible, never queued.

Implementation: GSAP timeline plus two clip-path polygons. Barba.js or the View Transitions API if you move to Astro/Next; a top-level route wrapper if you stay on Vite + React.

Because there is exactly one transition, it becomes identity. Visitors will remember "the site with the cut" the way people remember specific award-winning portfolio mechanics. Scattered unique transitions per page would kill this.

---

## 7. Animations and motion system

Define tokens once, reuse everywhere, like a type scale for movement:

```
--ease-cut:   cubic-bezier(0.83, 0, 0.17, 1)   /* the cut, decisive */
--ease-settle: cubic-bezier(0.22, 1, 0.36, 1)  /* everything else, calm */
--t-fast: 0.2s   /* hovers */
--t-base: 0.4s   /* reveals */
--t-cut:  0.7s   /* page transitions, total */
```

- **Scroll reveals:** text rises 24px and fades in with `--ease-settle`, staggered 60ms, triggered once via GSAP ScrollTrigger. No re-triggering on scroll up. No rotation, no scale, no blur on entrance. Ever.
- **Smooth scroll:** Lenis, lerp around 0.1. This single library is half the "expensive" feel of every current Awwwards winner.
- **Hero ambient (optional, the one WebGL moment):** an ultra-subtle Three.js shader on the hero only: fine directional grain drifting like light on brushed steel, monochrome, near-invisible. If it drops the hero below 60fps on a mid phone, cut it entirely. A fast site with no shader beats a slow site with one.
- `prefers-reduced-motion`: all reveals become opacity-only, the cut becomes a fade, Lenis disabled. This is non-negotiable and Google/Apple reviewers check it.

Performance budget, hard limits: Lighthouse performance and accessibility 95 plus on mobile, LCP under 1.5s, total JS under 250KB gzipped, fonts preloaded with `font-display: swap`. The portfolio of a security-specialized engineer must itself be a well-engineered artifact; a janky portfolio contradicts your own pitch.

---

## 8. Interactions

Each one carries information. None decorate.

- **Record rows (project list):** each project is a full-width row like a match history entry. On hover, a 1px red line draws left to right under the row (0.2s) and the row's mono metadata (year, status, stack) shifts from `--steel` to `--bone`. The hover literally answers "is this clickable and what is it."
- **Buttons:** text plus a small diagonal tick. On hover the tick extends into a short slash. Click gives a 1-frame position snap (2px). Decisive, like everything else.
- **Cursor:** default system cursor. A custom crosshair cursor is the most copied gamer-portfolio move of the last three years; skipping it reads as confidence.
- **Copy email:** in contact, clicking the address copies it and the mono label flips to `COPIED` for 1.2s. No toast.
- **Easter egg:** typing `gg` anywhere opens the challenge (contact) overlay with the cut. People who find it will screenshot it. Costs 10 lines of code.
- **Sound (off by default):** a single sub-100ms metallic tick on page transitions, toggleable in the corner and in Cmd+K. Never autoplay. Most visitors keep it off; the ones who turn it on get the full world.

---

## 9. Storytelling

The homepage is one continuous narrative in four beats, and the scroll order argues your case the way a match tells a story:

1. **The name (hero).** Full-viewport. Mono eyebrow: `PLAYER PROFILE / SEASON 2026 / TORONTO`. The name huge in display face. One sentence: "Software engineer, security specialization. Founder of Routy. Every line on this record was earned." Beneath, the record strip: `LIVE PRODUCT: ROUTY / 03 INTERNSHIPS / SECURITY SPEC, YORK '27`. A recruiter now has the whole pitch in five seconds without scrolling.
2. **The record (projects).** Proof before personality. Routy first and dominant.
3. **The loadout.** How you fight: stack, methods, the security angle.
4. **The challenge.** Direct ask: hire me or build with me.

The narrative claim is "earned, not granted," and every section supplies evidence. No section exists for decoration.

---

## 10. Project presentation: The Record

Kill the card grid. Projects are rows, each expanding into a full case study via the cut transition.

Row anatomy (mono metadata, display title):

```
2026 · LIVE          ROUTY                    Flutter / React / Firebase
2025 · SHIPPED       FLEETBRIDGE              ...
```

Case study page structure, in this order:
1. **Outcome line first.** One sentence of result before any tech: "Live dispatch platform for small trades teams, in production, approaching first paying pilot."
2. **The fight.** The problem in the customer's words (you already have this written in your startup brief: "I spend all day chasing my own guys").
3. **Decisions.** Two or three real engineering decisions and why. For Routy: Firestore security rules and multi-tenancy design. This is where your security specialization becomes visible instead of claimed.
4. **Replay.** The demo video, embedded, muted, with a real caption of the loop: dispatch, push, accept, live map, close-out.
5. **Verifiable links.** Repo, live URL.

**Content corrections required before this ships:**
- The current Routy description says Spring Boot backend and FPGA layer. Your actual stack is Firebase; the Spring Boot backend is dead. A staff engineer cross-referencing your repo will catch this in minutes. Rewrite to the real architecture, and if you want to keep the FPGA demo, frame it as a separate coursework artifact, not part of Routy.
- Remove "Valorant Theme Portfolio" as a featured project. The new site replaces it, and a portfolio listing itself as its second-best project signals a thin record. Fleetbridge or a security-focused project should take that slot.
- Two or three projects, deep. Not six, shallow. This matches your own non-negotiable: build fewer things exceptionally well.

---

## 11. Loadout (skills) and About: The Player

**Loadout:** no bars, no percentages, no radar charts. A mono-face table where every skill is attached to evidence:

```
FLUTTER / DART        Routy responder app, Superstars production features
FIREBASE / FIRESTORE  Auth, FCM, security rules, multi-tenant data model
SECURITY              Lassonde specialization, Firestore rule hardening
CI/CD                 GitHub Actions pipelines at CetMatrix and on Routy
```

A skill without a receipt doesn't go on the page. This single change moves you from junior-coded to senior-coded presentation.

**The Player (about):** short, three beats, first person, plain language.
1. The discipline: up at 5 AM, trains aim before ranked, ships before class. One paragraph that makes the katana theme make sense without ever saying katana.
2. The arc: three internships, then founding Routy because you watched small crews run their day over group texts.
3. The direction: security-specialized engineer who wants to build products people rely on.

One real photo, black and white, high contrast, or none at all. No AI avatars, no anime-adjacent illustration (your constraint), no stock.

---

## 12. Contact: Challenge

Full-viewport final section. Display face, enormous: `ISSUE A CHALLENGE.` Below it, one line: "Hiring for a co-op or building something real? I answer fast." Then the email in mono (click to copy), GitHub, LinkedIn, and a resume PDF link. That is the entire section. No contact form; forms on personal sites go unanswered-looking and add spam handling for nothing.

Footer: one hairline, `IMAD.A / TORONTO / 2026`, and a "built with" line linking the portfolio's own repo, because for an engineer the source is part of the portfolio. Which means the repo must be clean: single component tree, no dead code, a real README with a screenshot and the motion-system tokens documented.

---

## 13. Music

- Off by default, always. Autoplay audio is an instant back-button for recruiters and an instant deduction from Awwwards judges.
- One ambient track, looped, quiet, plus the transition tick. The reference feeling is focused pre-match calm, not hype: dark ambient with a slow pulse. Directions to search: Hiroyuki Sawano's quieter instrumental work is off-limits by your no-anime rule, so instead: **Ryuichi Sakamoto's "async"**, **Hania Rani**, **Jon Hopkins' "Immunity"** era ambient pieces, or a royalty-safe route via Artlist/Epidemic searching "dark ambient minimal pulse."
- Best long-term move: commission or make a 60 to 90 second custom loop so nothing on the site is borrowed. Even a simple self-made pad in GarageBand beats licensed music for the story it tells.

---

## 14. Tech stack for the rebuild

- **Framework:** Astro with React islands, or Next.js. Both give you static-fast pages and real routing for case studies. Staying on Vite + React SPA is acceptable but you lose easy per-project routes and some SEO.
- **Motion:** GSAP (ScrollTrigger, Flip) + Lenis. Drop framer-motion; mixing two animation systems creates timing conflicts and doubles bundle weight.
- **Transitions:** Barba.js or View Transitions API for the cut.
- **3D (optional):** Three.js only for the hero grain shader, lazy-loaded, feature-flagged.
- **Styling:** Tailwind is fine; define the six colors and motion tokens as the entire theme.
- **Hosting:** Vercel, as now.

Repo hygiene before you show anyone: delete the duplicated `src/myPortfolio` tree, delete the skill-percentage data, add a README with a hero screenshot, and set up a basic Lighthouse CI check in GitHub Actions so the performance budget is enforced by a robot instead of by memory.

---

## 15. Build order

Do it in this order. Each step ships something visible.

1. **Tonight (2 hours):** in the existing repo, delete `src/myPortfolio/`, delete all skill percentages, fix the Routy description to the real Firebase architecture, and change the hero title from "Full-Stack Software Engineer" to the founder/security positioning. This makes the current site honest while you build the new one.
2. Scaffold the new project. Commit the design tokens (colors, type scale, motion tokens) as the first real commit.
3. Build the hero static: nav, name, record strip. No animation yet. Get spacing and type perfect at mobile and desktop.
4. Add Lenis plus the scroll reveal system.
5. Build the Record rows and one full Routy case study with the corrected story and demo video.
6. Build the cut transition and the loading sequence (they share code).
7. Loadout, The Player, Challenge sections.
8. Cmd+K palette, copy-to-clipboard, the `gg` easter egg.
9. Performance pass: Lighthouse 95 plus mobile, reduced-motion audit, keyboard-only walkthrough.
10. Optional layer: hero shader, sound toggle. Only after step 9 passes.

Steps 1 through 5 are a portfolio you can send with your SOTI follow-up. Steps 6 through 10 are what makes it unforgettable.
