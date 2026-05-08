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
  monoLabel: "// technical fellow & solutions architect",
  headingPrefix: "Building ",
  headingGradient: "AI Agents",
  headingSuffix: " That Let Small Teams Do Big Things",
  subtitle:
    "I help early-stage startups scale to 100M+ calls without the 100-person overhead. Enterprise architecture on a shoestring budget — backed by 40+ years of building and scaling systems.",
  ctaPrimary: { label: "See What I'm Building", href: "#projects" },
  ctaSecondary: { label: "Connect on LinkedIn", href: SOCIAL_LINKS.linkedin },
  ctaThird: { label: "Schedule a Strategy Call", href: "https://www.linkedin.com/in/johnkjohansen/" }, // Update with Calendly if available
} as const;

// ── About ───────────────────────────────────────────────────
export const ABOUT = {
  narrative: [
    "I'm a hands-on product and engineering executive with over four decades of experience building software systems — from bare-metal infrastructure to cloud-native platforms to AI-powered automation. My career spans enterprise architecture, startup CTO roles, and engineering leadership across fintech, e-commerce, and developer tools.",
    "I've built and led globally distributed, 100% remote engineering organizations, and I'm a strong believer that the best teams are built on mentorship, trust, and asking the right questions — not micromanagement.",
    "These days, I'm focused on the intersection of AI agents and startup efficiency. I believe small, well-tooled teams can outperform organizations ten times their size when they leverage intelligent automation strategically. This conviction led me to build Kaigents, a production-grade substrate for operating AI agent teams in complex enterprise environments.",
    "Based in Pasadena, California, I work with founders and engineering teams to design and build AI agent systems that handle the work of entire departments — letting humans focus on the creative, strategic work that actually moves the needle.",
  ],
  quickFacts: {
    company: "Independent Consultant",
    location: "Pasadena, CA",
    education: "Western Governors University",
    programmingLanguages: [
      { name: "TypeScript", proficiency: 95 },
      { name: "Python", proficiency: 90 },
      { name: "Rust", proficiency: 85 },
      { name: "Go", proficiency: 80 },
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
  impact?: string;
  tags: string[];
  status: "Active" | "Maintained" | "Archive";
  featured?: boolean;
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    title: "TeamKnowl",
    description:
      "A Kubernetes-native, Git-driven knowledge base platform. Features an Obsidian-like experience with sharded indexing and S3-compatible storage (CEPH) for AI + Human teams.",
    impact: "Enables horizontally scalable, self-healing shared memory for autonomous AI agents and engineering teams.",
    tags: ["Go", "Kubernetes Operator", "S3/CEPH", "React"],
    status: "Active",
    featured: true,
  },
  {
    title: "CodeKnowl",
    description:
      "On-prem, local-first codebase analyst that provides a structured relationship store and knowledge base for high-parallelism AI agent workflows.",
    impact: "Provides deep codebase understanding with citations, enabling AI agents to reason accurately about complex systems.",
    tags: ["Rust", "Python", "Graph DB", "AI Agents"],
    status: "Active",
    featured: true,
    link: {
      label: "View on GitHub",
      href: "https://github.com/jensjohansen/codeknowl",
    },
  },
  {
    title: "AI Agents for Startup Automation",
    description:
      "A suite of autonomous agents handling operational workflows from customer support triage to internal knowledge management.",
    impact: "Reduces operational overhead by 40%, letting lean teams punch 10x above their weight.",
    tags: ["AI Agents", "LLM", "Automation", "TypeScript"],
    status: "Active",
    featured: true,
  },
  {
    title: "Kaigents",
    description: "A production-grade, Kubernetes-native substrate for operating AI agent teams. Built for low TCO on AMD Ryzen AI hardware with durable execution via Temporal.",
    impact: "Provides the enterprise-grade visibility, durability, and governance needed to move AI agents from prototype to production at scale.",
    tags: ["Rust", "Go", "Temporal", "Kubernetes", "AI Agents"],
    status: "Active",
    featured: true,
    link: {
      label: "View on GitHub",
      href: "https://github.com/jensjohansen/kaigents",
    },
  },
  {
    title: "AMD Ryzen Monitoring in Linux",
    description:
      "High-performance Rust CLI tool for real-time AMD Ryzen AI NPU telemetry and AI workload optimization.",
    impact: "Enables hardware-aware AI workload scaling for edge and local processing.",
    tags: ["Rust", "CLI", "Hardware", "NPU"],
    status: "Active",
    link: {
      label: "View on GitHub",
      href: "https://github.com/jensjohansen/ryzen_monitoring_linux",
    },
  },
  {
    title: "Enterprise IoT Infrastructure",
    description: "Architected high-availability systems for real-time asset tracking and IoT telemetry.",
    impact: "Supports 100k+ devices with sub-second latency and five-nines reliability.",
    tags: ["IoT", "Kubernetes", "Architecture", "Go"],
    status: "Maintained",
  },
];
