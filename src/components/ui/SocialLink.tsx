import type { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  large?: boolean;
}

export function SocialLink({
  href,
  icon: Icon,
  label,
  description,
  large,
}: SocialLinkProps) {
  if (large) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="glow-card flex items-center gap-4 p-6 transition-colors hover:border-accent/30"
        aria-label={label}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{label}</p>
          {description && (
            <p className="text-sm text-muted">{description}</p>
          )}
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm">{label}</span>
    </a>
  );
}
