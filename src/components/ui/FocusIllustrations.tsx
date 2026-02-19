"use client";

// Individual mini SVG illustrations for each focus area card

export function AgentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="agent-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Central brain/hub */}
      <circle cx="60" cy="36" r="12" fill="#12121a" stroke="url(#agent-g)" strokeWidth="1.5" />
      <circle cx="60" cy="36" r="5" fill="url(#agent-g)" opacity="0.6" />
      {/* Radiating agent nodes */}
      {[
        { x: 24, y: 20 }, { x: 96, y: 20 },
        { x: 20, y: 56 }, { x: 100, y: 56 },
        { x: 60, y: 72 },
      ].map((n, i) => (
        <g key={i}>
          <line x1="60" y1="36" x2={n.x} y2={n.y} stroke="#6366f1" strokeOpacity="0.2" strokeWidth="0.75" />
          <circle cx={n.x} cy={n.y} r="4" fill="#12121a" stroke="#6366f1" strokeOpacity="0.5" strokeWidth="0.75" />
          <circle cx={n.x} cy={n.y} r="1.5" fill="#6366f1" opacity="0.6" />
        </g>
      ))}
      {/* Pulse rings */}
      <circle cx="60" cy="36" r="20" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="60" cy="36" r="30" stroke="#22d3ee" strokeOpacity="0.07" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

export function ArchitectureIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      {/* Microservice boxes */}
      {[
        { x: 8, y: 8, w: 30, h: 20 },
        { x: 45, y: 8, w: 30, h: 20 },
        { x: 82, y: 8, w: 30, h: 20 },
        { x: 26, y: 52, w: 30, h: 20 },
        { x: 64, y: 52, w: 30, h: 20 },
      ].map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="4" fill="#12121a" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="0.75" />
      ))}
      {/* API gateway bar */}
      <rect x="16" y="36" width="88" height="8" rx="4" fill="url(#arch-g)" opacity="0.15" />
      <rect x="16" y="36" width="88" height="8" rx="4" fill="none" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="0.75" />
      {/* Connections top to gateway */}
      {[23, 60, 97].map((x, i) => (
        <line key={`t-${i}`} x1={x} y1="28" x2={x} y2="36" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="0.75" />
      ))}
      {/* Connections gateway to bottom */}
      {[41, 79].map((x, i) => (
        <line key={`b-${i}`} x1={x} y1="44" x2={x} y2="52" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="0.75" />
      ))}
      <defs>
        <linearGradient id="arch-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Dots in boxes */}
      {[
        { x: 23, y: 18 }, { x: 60, y: 18 }, { x: 97, y: 18 },
        { x: 41, y: 62 }, { x: 79, y: 62 },
      ].map((d, i) => (
        <circle key={`dot-${i}`} cx={d.x} cy={d.y} r="2" fill="#6366f1" opacity="0.4" />
      ))}
    </svg>
  );
}

export function DataIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="data-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Pipeline flow: source → transform → sink */}
      {/* Source cylinder */}
      <ellipse cx="20" cy="28" rx="14" ry="6" fill="#12121a" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="0.75" />
      <path d="M6 28 L6 48 Q6 54 20 54 Q34 54 34 48 L34 28" fill="#12121a" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="0.75" />
      <ellipse cx="20" cy="48" rx="14" ry="6" fill="none" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="0.75" />
      {/* Flow arrows */}
      <path d="M36 40 L48 40" stroke="url(#data-g)" strokeOpacity="0.4" strokeWidth="1" markerEnd="url(#arrow)" />
      <path d="M72 40 L84 40" stroke="url(#data-g)" strokeOpacity="0.4" strokeWidth="1" markerEnd="url(#arrow)" />
      {/* Transform box */}
      <rect x="48" y="26" width="24" height="28" rx="4" fill="#12121a" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="0.75" />
      {/* Gear icon in transform */}
      <circle cx="60" cy="40" r="6" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="0.75" fill="none" />
      <circle cx="60" cy="40" r="2" fill="#22d3ee" opacity="0.5" />
      {/* Sink / chart */}
      <rect x="86" y="26" width="28" height="28" rx="4" fill="#12121a" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="0.75" />
      {/* Bar chart inside */}
      {[
        { x: 92, h: 12 }, { x: 98, h: 18 }, { x: 104, h: 10 },
      ].map((bar, i) => (
        <rect key={i} x={bar.x} y={54 - bar.h - 4} width="4" height={bar.h} rx="1" fill="#6366f1" opacity={0.3 + i * 0.15} />
      ))}
      {/* Arrow marker */}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0 0 L6 2 L0 4" fill="none" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="0.75" />
        </marker>
      </defs>
      {/* Data dots flowing */}
      {[40, 44, 76, 80].map((x, i) => (
        <circle key={`flow-${i}`} cx={x} cy={40} r="1" fill="#22d3ee" opacity="0.5" />
      ))}
    </svg>
  );
}

export function LeadershipIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      {/* Org tree */}
      {/* Top node (leader) */}
      <circle cx="60" cy="16" r="8" fill="#12121a" stroke="#6366f1" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="60" cy="14" r="3" fill="#6366f1" opacity="0.4" />
      <path d="M57 19 Q60 22 63 19" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="0.75" fill="none" />
      {/* Mid-level */}
      {[30, 60, 90].map((x, i) => (
        <g key={`mid-${i}`}>
          <line x1="60" y1="24" x2={x} y2="40" stroke="#6366f1" strokeOpacity="0.15" strokeWidth="0.75" />
          <circle cx={x} cy="44" r="6" fill="#12121a" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="0.75" />
          <circle cx={x} cy="42" r="2" fill="#22d3ee" opacity="0.3" />
        </g>
      ))}
      {/* Bottom level */}
      {[14, 30, 46, 60, 74, 90, 106].map((x, i) => {
        const parent = i < 2 ? 30 : i < 5 ? 60 : 90;
        return (
          <g key={`bot-${i}`}>
            <line x1={parent} y1="50" x2={x} y2="62" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="0.5" />
            <circle cx={x} cy="66" r="4" fill="#12121a" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="0.5" />
            <circle cx={x} cy="65" r="1.5" fill="#6366f1" opacity="0.2" />
          </g>
        );
      })}
    </svg>
  );
}
