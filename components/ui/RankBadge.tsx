import { cn } from "@/lib/utils/cn";

interface RankBadgeProps {
  rank: number;
  total?: number;
  size?: "sm" | "md" | "lg";
  showTotal?: boolean;
  className?: string;
}

export function RankBadge({
  rank,
  total = 20,
  size = "md",
  showTotal = true,
  className,
}: RankBadgeProps) {
  return (
    <span
      className={cn("inline-flex items-baseline", className)}
      aria-label={`Ranked ${rank} of ${total}`}
    >
      {size === "sm" && (
        <>
          <span className="heading-serif text-sm text-stone">{rank}</span>
          {showTotal && (
            <span className="text-[0.5rem] text-muted">/{total}</span>
          )}
        </>
      )}
      {size === "md" && (
        <>
          <span className="heading-serif text-lg text-charcoal">{rank}</span>
          {showTotal && (
            <span className="text-xs text-muted">/{total}</span>
          )}
        </>
      )}
      {size === "lg" && (
        <>
          <span className="stat-display text-4xl text-accent">{rank}</span>
          {showTotal && (
            <span className="text-sm text-muted">/{total}</span>
          )}
        </>
      )}
    </span>
  );
}
