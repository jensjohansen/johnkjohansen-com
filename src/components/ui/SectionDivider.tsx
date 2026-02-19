// Subtle gradient line divider between sections
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl px-6 ${className}`} aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
  );
}
