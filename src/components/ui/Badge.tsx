interface BadgeProps {
  children: string;
  variant?: "default" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles =
    variant === "accent"
      ? "bg-accent/10 text-accent border-accent/20"
      : "bg-white/5 text-muted border-white/10";

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
}
