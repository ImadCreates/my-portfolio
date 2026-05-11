export const personalInfo = {
  name: "Imaduddin Ahmed",
  title: "Full-Stack Software Engineer",
  tagline: "Engineer by passion, builder by nature.",
  bio: `I'm a 4th-year Software Engineering student at York University and a Full-Stack Developer
  focused on building scalable, end-to-end solutions. I specialize in bridging high-performance
  backend architectures with polished, user-centric interfaces using Java (Spring Boot), React,
  and Flutter. I recently completed concurrent internships — balancing full-stack mobile development
  at Cetmatrix with critical IT infrastructure management at Care Hospitals — mastering both the
  software lifecycle and the underlying systems that keep applications running securely.`,
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
    subtitle: "Full Stack Ecosystem",
    period: "Feb 2026 – Present",
    status: "Active",
    featured: true,
    wide: true,
    description:
      "An emergency dispatch ecosystem connecting a React web dashboard, Flutter mobile app, and a DE10-Lite FPGA board in real time. A dispatcher sends an alert from the web app — Firebase triggers an FCM push notification to the responder's phone, the responder accepts, a live map loads, and the dashboard updates instantly. The FPGA runs 8 Verilog modules handling UART communication, a 4-state FSM, VGA display output, and a buzzer alarm — bridging hardware and software in a single cohesive system.",
    techStack: ["Flutter", "React", "Firebase", "Firestore", "Verilog", "FPGA", "FCM", "Real-time DB"],
    highlights: ["Active project", "Mobile + Web + Hardware", "Real-time sync", "FPGA integration"],
    github: "https://github.com/ImadCreates/Medilink",
    live: "https://medilink-pied.vercel.app",
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
      "Completed concurrent dual internships in software engineering and IT infrastructure",
      "Currently architecting PrimeBid (microservices) and MediLink (full-stack ecosystem)",
      "Actively seeking new-grad and junior engineering roles",
    ],
    color: "#39ff88",
  },
];
