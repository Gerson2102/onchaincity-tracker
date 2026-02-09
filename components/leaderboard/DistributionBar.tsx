import type { ScoreTierCounts } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DistributionBarProps {
  counts: ScoreTierCounts;
  className?: string;
}

export function DistributionBar({ counts, className }: DistributionBarProps) {
  const { strong, moderate, low, total } = counts;

  const strongPercent = (strong / total) * 100;
  const moderatePercent = (moderate / total) * 100;
  const lowPercent = (low / total) * 100;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Bar */}
      <div
        className="h-3 rounded-full overflow-hidden flex"
        role="img"
        aria-label={`Distribution: ${strong} High Performers, ${moderate} Developing, ${low} Emerging`}
      >
        <div
          className="bg-[var(--color-rating-high)] transition-all duration-500"
          style={{ width: `${strongPercent}%` }}
          title={`High Performers: ${strong} countries (${Math.round(strongPercent)}%)`}
        />
        <div
          className="bg-[var(--color-rating-medium)] transition-all duration-500"
          style={{ width: `${moderatePercent}%` }}
          title={`Developing: ${moderate} countries (${Math.round(moderatePercent)}%)`}
        />
        <div
          className="bg-[var(--color-rating-low)] transition-all duration-500"
          style={{ width: `${lowPercent}%` }}
          title={`Emerging: ${low} countries (${Math.round(lowPercent)}%)`}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-high)]" />
          <span className="text-muted">High Performers ({Math.round(strongPercent)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-medium)]" />
          <span className="text-muted">Developing ({Math.round(moderatePercent)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-low)]" />
          <span className="text-muted">Emerging ({Math.round(lowPercent)}%)</span>
        </div>
      </div>
    </div>
  );
}
