# johnkjohansen.com

Personal website for John K Johansen — software architect, tech executive, and AI agent builder.

**Live:** [johnkjohansen.com](https://johnkjohansen.com)

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** (`motion`) — scroll reveals and animated SVG illustrations
- **Lucide React** — icons
- **Fonts:** Inter + JetBrains Mono via `next/font`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page assembling all sections
│   ├── globals.css         # Dark theme, keyframes, utilities
│   └── not-found.tsx       # Custom 404
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, About, FocusAreas, Projects, Contact
│   └── ui/                 # RevealOnScroll, GlowCard, Badge, GradientText,
│                           # SVG illustrations, SectionDivider, SocialLink
└── lib/
    └── constants.ts        # All site content centralized
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deployment

Deployed automatically via [Vercel](https://vercel.com) on push to `main`.
