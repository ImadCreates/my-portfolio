export const personalInfo = {
  name: "Imaduddin Ahmed",
  title: "Full-Stack Software Engineer",
  tagline: "Engineer by passion, builder by nature.",
  bio: `I'm a founder building MediLink, a real-time dispatch and field coordination platform
  currently live in production. I'm also a 4th-year Software Engineering student at York University
  and a Full-Stack Developer working across Java (Spring Boot), React, and Flutter. Three internships
  have shaped how I think about shipping code: full-stack mobile at Cetmatrix, healthcare IT
  infrastructure at Care Hospitals, and now software development at Superstars.`,
  location: "North York, Ontario, Canada",
  email: "approachimad@gmail.com",
  github: "https://github.com/ImadCreates",
  linkedin: "https://linkedin.com/in/imadsecures",
  website: "https://imaduddin-ahmed.vercel.app",
  avatar: "/me.png",
};

export const skills = [
  {
    category: "Backend Development",
    color: "#ff4655",
    items: [
      { name: "Java", level: 92 },
      { name: "Spring Boot", level: 90 },
      { name: "RESTful API Design", level: 88 },
      { name: "Microservices", level: 87 },
      { name: "JWT Authentication", level: 82 },
      { name: "Google Firebase", level: 88 },
    ],
  },
  {
    category: "Frontend & Mobile",
    color: "#00d4ff",
    items: [
      { name: "JavaScript", level: 87 },
      { name: "React", level: 86 },
      { name: "Flutter", level: 85 },
      { name: "Dart", level: 84 },
      { name: "HTML & CSS", level: 83 },
      { name: "State Management (Provider, Riverpod)", level: 82 },
    ],
  },
  {
    category: "Tools & Platforms",
    color: "#bd93f9",
    items: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 81 },
      { name: "GitHub Actions", level: 83 },
      { name: "Postman", level: 85 },
      { name: "Linux", level: 78 },
      { name: "Arduino", level: 65 },
    ],
  },
  {
    category: "DevOps & Cloud",
    color: "#ffd700",
    items: [
      { name: "CI/CD Pipelines", level: 83 },
      { name: "Firebase Hosting", level: 86 },
      { name: "Vercel", level: 85 },
      { name: "Web Performance Monitoring", level: 76 },
    ],
  },
];

export const skillTags = [
  "Technical Support", "Hardware Deployment", "ITSM",
  "Healthcare Compliance (HIPAA)", "Server Maintenance",
  "Firestore", "Cloud Functions", "Firebase Auth", "API Gateway", "IAM",
];

export const projects = [
  {
    title: "MediLink",
    subtitle: "Real-Time Dispatch Platform",
    period: "Feb 2026 – Present",
    status: "Active",
    featured: true,
    wide: true,
    description:
      "A real-time dispatch and field coordination platform built across a React dispatcher dashboard, Flutter responder app, and Spring Boot backend. Dispatchers assign the nearest available worker by GPS distance, workers receive targeted push notifications and navigate to the job, and status updates flow back to the dashboard in real time. An optional DE10-Lite FPGA hardware layer handles UART communication, a 4-state FSM, VGA display output, and a buzzer alarm for environments requiring physical alert systems.",
    techStack: ["Flutter", "React", "Spring Boot", "Firebase", "Firestore", "FCM", "Leaflet", "Real-time DB"],
    highlights: ["Active project", "Mobile + Web + Hardware", "Real-time sync", "GPS distance routing"],
    github: "https://github.com/ImadCreates/Medilink",
    live: "https://medilink-technologies.vercel.app/",
    demos: [
      {
        url: "https://www.youtube.com/embed/ykPL2PVdLWw",
        label: "APP DEMO",
        desc: "Dispatch → FCM push → responder accepts → live map → dashboard update",
      },
      {
        url: "https://www.youtube.com/embed/KYjn9Eqjglw",
        label: "HARDWARE DEMO",
        desc: "DE10-Lite FPGA — UART, 4-state FSM, VGA display, buzzer alarm",
      },
    ],
    color: "#00d4ff",
  },
  {
    title: "Valorant Theme Portfolio",
    subtitle: "Stylized Personal Portfolio",
    period: "Apr 2026",
    status: "Active",
    featured: true,
    description:
      "A themed portfolio website inspired by Valorant visuals, focused on bold aesthetics, smooth section transitions, and responsive layout design.",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
    highlights: ["Active project", "Valorant-inspired UI", "Responsive design"],
    github: "https://github.com/ImadCreates/my-portfolio",
    live: "https://imaduddin-ahmed.vercel.app/",
    color: "#ff4655",
  },
];

export const experience = [
  {
    role: "Founder",
    company: "MediLink",
    period: "Apr 2026 – Present",
    location: "Self-employed",
    description:
      "Building MediLink, a dispatch and field coordination platform for any team that moves people to locations. Dispatchers assign the nearest available worker to any job from a live web dashboard. Workers receive the assignment on their phone, accept, navigate, and mark it done. Built the full system solo across React, Flutter, Spring Boot, and Firebase. Currently live at medilink-technologies.vercel.app and being taken to market.",
    achievements: [
      "Built the full dispatcher dashboard in React with live Firestore listeners, a Leaflet map, haversine distance ranking, and a two-step dispatch modal",
      "Built the Flutter responder app on Android with GPS tracking, FCM push notifications targeted by UID, and a full alert lifecycle",
      "Built the Spring Boot backend deployed on Railway handling alert encoding and targeted FCM delivery via fcm_tokens per user UID",
      "Implemented Firestore security rules, environment variable hardening, and composite indexes for production readiness",
    ],
    color: "#00d4ff",
  },
  {
    role: "Software Developer Intern",
    company: "Superstars",
    period: "May 2026 – Present",
    location: "",
    description:
      "Building and improving features on the Superstars platform at superstars.co, a professional networking app available on iOS and Android. Working directly with the team on mobile development and product strategy.",
    achievements: [
      "Mobile development using Flutter and Dart",
      "Connecting front end to back end via REST APIs",
      "Weekly sprints and product strategy discussions",
      "Contributing to platform improvements and special projects",
    ],
    color: "#bd93f9",
  },
  {
    role: "Software Engineer Intern",
    company: "CETMATRIX — Career Education and Travel",
    period: "Sep 2025 – Dec 2025",
    duration: "4 months",
    location: "On-site",
    description:
      "Developed and maintained cross-platform Flutter applications, engineered CI/CD pipelines, and extended cloud backend infrastructure on Google Firebase.",
    achievements: [
      "Built cross-platform Flutter apps in Dart with Provider & Riverpod state management",
      "Extended cloud backend on Google Firebase — Firestore, Cloud Functions, and Firebase Auth",
      "Engineered CI/CD pipelines with GitHub Actions to automate testing & deployment",
      "Created internal tools using Cloud Functions and social media APIs for analytics & reporting",
      "Managed company website infrastructure on Firebase Hosting and Vercel",
    ],
    color: "#ffd700",
  },
  {
    role: "IT Infrastructure Intern",
    company: "CARE Hospitals, Quality CARE India Limited",
    period: "Sep 2025 – Dec 2025",
    duration: "4 months",
    location: "On-site",
    description:
      "Managed critical IT infrastructure for a high-volume healthcare environment, maintaining 99.9% uptime for essential medical databases and bridging hardware-software requirements.",
    achievements: [
      "Supported infrastructure projects to increase operational efficiency and identify delays on internal web portals",
      "Gained experience in healthcare IT compliance and data security (HIPAA) in a critical environment",
      "Utilized ITSM systems to log, track, and resolve support tickets, adhering to service level agreements",
    ],
    color: "#ff4655",
  },
];

export const education = [
  {
    degree: "B.Eng. Software Engineering",
    institution: "Lassonde School of Engineering, York University",
    period: "2022 – 2027",
    location: "North York, Ontario, Canada",
    gpa: null,
    honors: "4th Year — Currently Enrolled",
    highlights: [
      "Relevant Courses: Advanced OOP, Data Structures & Algorithms, Building E-Commerce Systems, Digital Systems Engineering",
      "Completed internships in software engineering and IT infrastructure across CETMATRIX and Care Hospitals",
      "Currently building MediLink, a live dispatch and field coordination platform being taken to market",
      "Actively seeking new-grad and junior engineering roles",
    ],
    color: "#39ff88",
  },
];
