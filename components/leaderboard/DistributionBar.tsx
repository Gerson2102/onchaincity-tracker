import type { RatingCounts } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DistributionBarProps {
  counts: RatingCounts;
  className?: string;
}

export function DistributionBar({ counts, className }: DistributionBarProps) {
  const { High, Medium, Low, total } = counts;

  const highPercent = (High / total) * 100;
  const mediumPercent = (Medium / total) * 100;
  const lowPercent = (Low / total) * 100;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Bar */}
      <div
        className="h-3 rounded-full overflow-hidden flex"
        role="img"
        aria-label={`Distribution: ${High} High, ${Medium} Medium, ${Low} Low`}
      >
        <div
          className="bg-[var(--color-rating-high)] transition-all duration-500"
          style={{ width: `${highPercent}%` }}
          title={`High: ${High} countries (${Math.round(highPercent)}%)`}
        />
        <div
          className="bg-[var(--color-rating-medium)] transition-all duration-500"
          style={{ width: `${mediumPercent}%` }}
          title={`Medium: ${Medium} countries (${Math.round(mediumPercent)}%)`}
        />
        <div
          className="bg-[var(--color-rating-low)] transition-all duration-500"
          style={{ width: `${lowPercent}%` }}
          title={`Low: ${Low} countries (${Math.round(lowPercent)}%)`}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-high)]" />
          <span className="text-muted">High ({Math.round(highPercent)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-medium)]" />
          <span className="text-muted">Medium ({Math.round(mediumPercent)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-low)]" />
          <span className="text-muted">Low ({Math.round(lowPercent)}%)</span>
        </div>
      </div>
    </div>
  );
}
