/*
  RANK ONE content. Every stat here is real and verifiable.
  No skill percentages, no invented numbers, no buzzwords.
*/

export const personalInfo = {
  name: 'Imaduddin Ahmed',
  shortName: 'IMAD.A',
  positioning:
    'Software engineer, security specialization. Founder of Routy. Every line on this record was earned.',
  location: 'Toronto',
  email: 'approachimad@gmail.com',
  github: 'https://github.com/ImadCreates',
  linkedin: 'https://linkedin.com/in/imadsecures',
  resume: '/Imaduddin_Ahmed_Resume.pdf',
  photo: '/me.png',
};

export const hero = {
  eyebrow: ['PLAYER PROFILE', 'SEASON 2026', 'TORONTO'],
  recordStrip: ['LIVE PRODUCT: ROUTY', '03 INTERNSHIPS', "SECURITY SPEC · YORK '27"],
};

/* The Record: projects as match history rows. Routy first and dominant. */
export const record = [
  {
    slug: 'routy',
    year: '2026',
    status: 'LIVE',
    title: 'ROUTY',
    stack: 'Flutter / React / Firebase',
    blurb: 'Live dispatch for small trades teams. Assign, push, navigate, close out.',
    media: {
      src: '/media/routy-dashboard.webp',
      alt: 'Routy dispatcher dashboard preview',
      width: 1600,
      height: 1000,
    },
    outcome:
      'Live dispatch platform for small trades teams, in production, approaching first paying pilot.',
    fight:
      'In a small trades company the owner is the routing engine. Jobs come in by phone, get assigned over group texts, and nobody can see who is actually free. The day runs on the owner chasing his own guys.',
    decisions: [
      {
        title: 'Firestore security rules and multi-tenancy',
        body: 'Every document is scoped to a team, and the rules enforce it. A dispatcher can assign jobs for their own team only, a responder can read and update only the jobs assigned to them. Access control lives in the database layer, not in client code that can be bypassed.',
      },
      {
        title: 'Push delivery targeted by user',
        body: 'Dispatch notifications go out through Firebase Cloud Messaging against a device token stored per user. The assigned responder gets the push, nobody else does, and the token refresh path is handled so a reinstalled app keeps receiving work.',
      },
      {
        title: 'One backend, two clients, live state',
        body: 'The React dispatcher dashboard and the Flutter responder app read the same Firestore collections through realtime listeners. A status change on a phone shows up on the dispatch map without polling or a refresh.',
      },
    ],
    caseMedia: {
      loop: {
        src: '/media/routy-loop.webm',
        poster: '/media/routy-dashboard.webp',
        width: 1600,
        height: 1000,
        label: 'Routy dispatch loop screen capture, silent',
        caption: 'THE LOOP · DISPATCH TO CLOSE-OUT · SILENT',
      },
      stills: [
        {
          src: '/media/routy-dashboard.webp',
          alt: 'Routy dispatcher dashboard with live map',
          width: 1600,
          height: 1000,
        },
        {
          src: '/media/routy-mobile.webp',
          alt: 'Routy responder app on a phone',
          width: 900,
          height: 1900,
        },
        {
          src: '/media/routy-close.webp',
          alt: 'Routy job close-out view',
          width: 1600,
          height: 1000,
        },
      ],
    },
    replay: {
      url: 'https://www.youtube.com/embed/ykPL2PVdLWw',
      caption: 'Dispatch → push → accept → live map → close-out.',
    },
    links: {
      repo: 'https://github.com/ImadCreates/Routy',
      live: 'https://routy.ca',
    },
    architecture:
      'React + Vite dispatcher dashboard on Vercel. Flutter responder app. Firebase backend: Firestore, Firebase Auth, Firebase Cloud Messaging.',
  },
  {
    slug: null,
    year: '2026',
    status: 'COURSEWORK',
    title: 'DE10-LITE ALERT SYSTEM',
    stack: 'FPGA / UART / VGA',
    blurb: 'FPGA alert system. UART, 4-state FSM, VGA out.',
    media: {
      src: '/media/de10-fpga.webp',
      alt: 'DE10-Lite FPGA alert system preview',
      width: 1600,
      height: 1000,
    },
    outcome:
      'University digital systems project. A DE10-Lite FPGA alert unit with UART communication, a four-state FSM, VGA output, and a buzzer alarm.',
    links: {
      demo: 'https://www.youtube.com/watch?v=KYjn9Eqjglw',
    },
  },
];

/* Loadout: skill plus receipt. A skill without evidence does not go on the page. */
export const loadout = [
  { skill: 'FLUTTER / DART', evidence: 'Routy responder app, Superstars production features' },
  { skill: 'REACT / VITE', evidence: 'Routy dispatcher dashboard, this site' },
  { skill: 'FIREBASE / FIRESTORE', evidence: 'Auth, FCM, security rules, multi-tenant data model' },
  { skill: 'SECURITY', evidence: 'Lassonde specialization, Firestore rule hardening' },
  { skill: 'CI/CD', evidence: 'GitHub Actions pipelines at CETMATRIX and on Routy' },
];

/* The Player: three beats. Discipline, arc, direction. */
export const player = {
  paragraphs: [
    'I run on routine. Up at 5, fundamentals before anything that counts, shipping before class. The standard is the same everywhere: one clean motion, no wasted movement.',
    'Three internships taught me how production software actually gets built. Hospital IT at CARE, cross-platform mobile at CETMATRIX, product work at Superstars. Then I watched small trades crews run their whole day over group texts, and I started Routy to fix it.',
    'I am finishing a software engineering degree at York with a security specialization. I want to build products people rely on, with the security work done as part of the build, not as an audit afterward.',
  ],
};

/* Career entries. Roles, companies, and dates carried over exactly. */
export const experience = [
  {
    role: 'Founder',
    company: 'Routy',
    period: 'Apr 2026 – Present',
    description:
      'Dispatch platform for small trades teams. A dispatcher assigns a job from a live web dashboard, the responder gets a push on their phone, accepts, navigates, and closes it out. Built solo: React + Vite dashboard on Vercel, Flutter responder app, Firebase backend with Firestore, Auth, and Cloud Messaging.',
  },
  {
    role: 'Software Developer Intern',
    company: 'Superstars',
    period: 'May 2026 – Present',
    description:
      'Building features on the Superstars app, a professional networking platform on iOS and Android. Flutter and Dart, wiring the front end to REST APIs, weekly sprints with the team.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'CETMATRIX — Career Education and Travel',
    period: 'Sep 2025 – Dec 2025',
    description:
      'Built cross-platform Flutter apps with Provider and Riverpod state management. Extended the Firebase backend across Firestore, Cloud Functions, and Auth. Set up GitHub Actions pipelines for testing and deployment, and ran the company sites on Firebase Hosting and Vercel.',
  },
  {
    role: 'IT Infrastructure Intern',
    company: 'CARE Hospitals, Quality CARE India Limited',
    period: 'Sep 2025 – Dec 2025',
    description:
      'Kept hospital IT infrastructure running in a high-volume environment. Logged, tracked, and resolved tickets in an ITSM system under service level agreements, and worked inside healthcare data compliance rules.',
  },
];

export const education = [
  {
    degree: 'B.Eng. Software Engineering',
    institution: 'Lassonde School of Engineering, York University',
    period: '2022 – 2027',
    description: 'Security specialization. Fourth year, currently enrolled.',
  },
];

export const challenge = {
  headline: 'ISSUE A CHALLENGE.',
  line: 'Hiring for a co-op or building something real? I answer fast.',
};
