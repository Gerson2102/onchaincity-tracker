import type { MetricAnalysisData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MetricBarProps {
  data: MetricAnalysisData;
  className?: string;
}

export function MetricBar({ data, className }: MetricBarProps) {
  const { displayName, counts, isStrongest, isWeakest } = data;
  const { High, Medium, Low, total } = counts;

  const highPercent = (High / total) * 100;
  const mediumPercent = (Medium / total) * 100;
  const lowPercent = (Low / total) * 100;

  const isHighlighted = isStrongest || isWeakest;
  const highlightLabel = isStrongest ? "Strongest" : isWeakest ? "Most Room to Grow" : null;

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-3 px-4 rounded-lg transition-colors",
        isHighlighted && "bg-ivory/80",
        className
      )}
    >
      {/* Metric Name */}
      <div className="w-36 flex-shrink-0">
        <span className="text-sm font-medium text-charcoal">{displayName}</span>
        {highlightLabel && (
          <span
            className={cn(
              "block text-xs mt-0.5",
              isStrongest && "text-[var(--color-rating-high)]",
              isWeakest && "text-[var(--color-rating-low)]"
            )}
          >
            {highlightLabel}
          </span>
        )}
      </div>

      {/* Horizontal Bar */}
      <div className="flex-1">
        <div
          className="h-3 rounded-full overflow-hidden flex"
          role="img"
          aria-label={`${displayName}: ${High} High, ${Medium} Medium, ${Low} Low`}
        >
          <div
            className="bg-[var(--color-rating-high)] transition-all duration-500"
            style={{ width: `${highPercent}%` }}
          />
          <div
            className="bg-[var(--color-rating-medium)] transition-all duration-500"
            style={{ width: `${mediumPercent}%` }}
          />
          <div
            className="bg-[var(--color-rating-low)] transition-all duration-500"
            style={{ width: `${lowPercent}%` }}
          />
        </div>
      </div>

      {/* Counts */}
      <div className="w-24 flex-shrink-0 flex justify-end gap-2 text-xs text-muted">
        <span className="text-[var(--color-rating-high)]">{High}</span>
        <span>/</span>
        <span className="text-[var(--color-rating-medium)]">{Medium}</span>
        <span>/</span>
        <span className="text-[var(--color-rating-low)]">{Low}</span>
      </div>
    </div>
  );
}
