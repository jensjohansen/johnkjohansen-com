import {
  Bot,
  Server,
  Database,
  Users,
  type LucideIcon,
} from "lucide-react";

// ── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Social Links ────────────────────────────────────────────
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/johnkjohansen/",
  github: "https://github.com/jensjohansen",
} as const;

// ── Hero ────────────────────────────────────────────────────
export const HERO = {
  monoLabel: "// software architect & tech executive",
  headingPrefix: "Building ",
  headingGradient: "AI Agents",
  headingSuffix: " That Let Small Teams Do Big Things",
  subtitle:
    "Helping startups stretch funding through intelligent automation — backed by 20+ years of building scalable systems, leading engineering orgs, and shipping products that matter.",
  ctaPrimary: { label: "See What I'm Building", href: "#projects" },
  ctaSecondary: { label: "Connect on LinkedIn", href: SOCIAL_LINKS.linkedin },
} as const;

// ── About ───────────────────────────────────────────────────
export const ABOUT = {
  narrative: [
    "I'm a hands-on product and engineering executive with over two decades of experience building software systems — from bare-metal infrastructure to cloud-native platforms to AI-powered automation. My career spans enterprise architecture, startup CTO roles, and engineering leadership across fintech, e-commerce, and developer tools.",
    "I've built and led globally distributed, 100% remote engineering organizations, and I'm a strong believer that the best teams are built on mentorship, trust, and asking the right questions — not micromanagement.",
    "These days, I'm focused on the intersection of AI agents and startup efficiency. I believe small, well-tooled teams can outperform organizations ten times their size when they leverage intelligent automation strategically.",
    "Based in Pasadena, California, I work with founders and engineering teams to design and build AI agent systems that handle the work of entire departments — letting humans focus on the creative, strategic work that actually moves the needle.",
  ],
  quickFacts: {
    company: "Bonsai (AI Agent Engineering)",
    location: "Pasadena, CA",
    education: "Western Governors University",
    programmingLanguages: [
      { name: "TypeScript", proficiency: 95 },
      { name: "Python", proficiency: 90 },
      { name: "Rust", proficiency: 75 },
      { name: "Go", proficiency: 70 },
    ],
    spokenLanguages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Professional" },
      { name: "German", level: "Limited Working" },
      { name: "Mandarin Chinese", level: "Elementary" },
    ],
    certifications: [
      "CompTIA A+",
      "CompTIA Network+",
      "CompTIA Security+",
      "CompTIA Project+",
      "Certified Scrum Master",
      "OCA Java 8 (IZ0-808)",
      "OCP Java 8 (IZ0-809)",
    ],
  },
} as const;

// ── Focus Areas ─────────────────────────────────────────────
export interface FocusArea {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  featured?: boolean;
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    title: "AI Agent Engineering",
    description:
      "Designing and building autonomous AI agent systems that handle complex workflows — from LLM orchestration and tool use to RAG pipelines and multi-agent coordination.",
    tags: ["LLM Systems", "Agent Orchestration", "Tool Use", "RAG"],
    icon: Bot,
    featured: true,
  },
  {
    title: "System Architecture",
    description:
      "Crafting scalable, maintainable architectures for products that need to grow. Microservices, event-driven systems, and cloud-native infrastructure designed for real-world load.",
    tags: ["Microservices", "API Design", "Cloud-Native", "Kubernetes"],
    icon: Server,
  },
  {
    title: "Data Engineering",
    description:
      "Building data pipelines and ML infrastructure that turn raw information into actionable intelligence. From ETL to real-time analytics to ML model deployment.",
    tags: ["Data Pipelines", "ML Ops", "Analytics", "Real-Time"],
    icon: Database,
  },
  {
    title: "Engineering Leadership",
    description:
      "Building and scaling engineering teams that ship great software. Mentorship, technical strategy, and creating cultures where engineers do their best work.",
    tags: ["Team Building", "Mentorship", "Strategy", "Remote Teams"],
    icon: Users,
  },
];

// ── Projects ────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "Active" | "Maintained" | "Archive";
  featured?: boolean;
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    title: "AI Agents for Startup Automation",
    description:
      "Building a suite of AI agent systems designed to automate operational workflows for early-stage startups — handling tasks from customer support triage to internal knowledge management, letting lean teams punch above their weight.",
    tags: ["AI Agents", "LLM", "Automation", "TypeScript"],
    status: "Active",
    featured: true,
  },
  {
    title: "ryzen_monitoring",
    description:
      "A Rust CLI tool for monitoring AMD Ryzen AI NPU performance metrics. Real-time telemetry for AI workloads running on local hardware accelerators.",
    tags: ["Rust", "CLI", "Hardware", "NPU"],
    status: "Active",
    link: {
      label: "View on GitHub",
      href: "https://github.com/jensjohansen/ryzen_monitoring",
    },
  },
  {
    title: "Technical Writing",
    description:
      "10+ articles on LinkedIn covering engineering leadership, system architecture, and the evolving role of AI in software development. Focused on practical insights for engineering leaders.",
    tags: ["Writing", "Leadership", "Architecture", "AI"],
    status: "Active",
    link: {
      label: "Read on LinkedIn",
      href: SOCIAL_LINKS.linkedin,
    },
  },
];
