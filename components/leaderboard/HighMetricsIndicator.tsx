import { cn } from "@/lib/utils";

interface HighMetricsIndicatorProps {
  count: number;
  total?: number;
  className?: string;
}

export function HighMetricsIndicator({
  count,
  total = 10,
  className,
}: HighMetricsIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      title={`${count} of ${total} metrics scored High Performer`}
      aria-label={`${count} of ${total} high performer metrics`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            i < count ? "bg-[var(--color-rating-high)]" : "bg-lavender/30"
          )}
        />
      ))}
      <span className="text-xs text-muted ml-0.5">{count}/{total}</span>
    </div>
  );
}
