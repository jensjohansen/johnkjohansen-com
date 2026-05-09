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
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Engineering Advisory Services ────────────────────────────
export interface Service {
  slug: string;
  title: string;
  tagline: string;
  price: string;
  priceNote: string;
  summary: string;
  targetSignal: string;
  tags: string[];
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "fractional-cto",
    title: "Fractional CTO Retainer",
    tagline: "Senior engineering leadership without the full-time overhead.",
    price: "$6K–$10K / month",
    priceNote: "3-month minimum · 1–2 clients maximum",
    summary:
      "Series A–C companies need senior technical leadership but can't justify a $400K CTO hire. I provide hands-on architectural guidance, direct team mentorship, and board-level technical communication — on a retainer that scales with the engagement.",
    targetSignal:
      "Your technical co-founder is maxed out, you're approaching a Series B, or your last CTO just left.",
    tags: ["Series A–C", "Architecture", "Team Leadership", "Board Prep"],
    featured: true,
  },
  {
    slug: "cofounder-cto",
    title: "Co-founder CTO",
    tagline: "A technical co-founder for serial entrepreneurs building their next venture.",
    price: "2–4% equity + $2.5K/month",
    priceNote: "or $25K–$40K fixed build · equity path requires prior exit",
    summary:
      "Serial entrepreneurs with proven go-to-market instincts and a new venture to build. I architect, build, and scale the product through initial launch — with 49 years of judgment on what to build and AI acceleration on how fast to build it.",
    targetSignal:
      "You've launched and sold before. You have a validated concept. You don't want a dev shop.",
    tags: ["Pre-seed", "MVP", "Technical Co-founder", "AI-Accelerated"],
  },
  {
    slug: "mvp-build",
    title: "AI-Accelerated MVP Build",
    tagline: "Production-ready software in 6–10 weeks. Not a prototype.",
    price: "$25K–$45K fixed fee",
    priceNote: "Milestone payments · scoping sprint required first",
    summary:
      "Traditional dev shops charge $150K–$300K and take 6–12 months. AI-accelerated senior engineering changes the equation. You get the same quality of architectural judgment at a fraction of the cost — because scaffolding, plumbing, and first drafts are AI-accelerated, leaving senior judgment for the 20% that matters.",
    targetSignal:
      "You have a validated concept, funding to build, and need it in production — not in a demo.",
    tags: ["Fixed Fee", "6–10 Weeks", "Production-Ready", "AI-Accelerated"],
  },
  {
    slug: "tech-transformation",
    title: "Tech Stack Transformation",
    tagline: "Simpler architecture, lower TCO, higher scalability. Phase-gated delivery.",
    price: "$7.5K audit + $8K–$15K/month",
    priceNote: "Two-phase model · Phase 1 deliverable is yours regardless",
    summary:
      "Growing companies accumulate technical debt until engineering velocity collapses and infrastructure costs run ahead of revenue. Phase 1 is a full architecture audit and transformation roadmap. Phase 2 is execution — AI-accelerated, milestone-gated, with your team enabled to own the result.",
    targetSignal:
      "Your infra costs are growing faster than revenue, or you're hiring DevOps/SRE to hold together a system that shouldn't need that.",
    tags: ["Post-Series B", "Legacy Modernization", "Cost Reduction", "Phase-Gated"],
  },
];

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
