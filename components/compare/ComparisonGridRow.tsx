"use client";

import type { Country, MetricKey } from "@/lib/types";
import { METRIC_DEFINITIONS, COMPARISON_COLORS } from "@/lib/constants/tracker";
import { ScoreBadge } from "@/components/country";
import { hasMetricDivergence } from "@/lib/utils/comparison";
import { cn } from "@/lib/utils";

interface ComparisonGridRowProps {
  metricKey: MetricKey;
  countries: Country[];
  showDivergence?: boolean;
}

export function ComparisonGridRow({
  metricKey,
  countries,
  showDivergence = true,
}: ComparisonGridRowProps) {
  const metricDef = METRIC_DEFINITIONS[metricKey];
  const isDivergent = showDivergence && hasMetricDivergence(countries, metricKey);

  return (
    <div
      className={cn(
        "grid gap-4 py-4 border-b border-lavender/20",
        isDivergent && "bg-amber-50/50 -mx-4 px-4"
      )}
      style={{
        gridTemplateColumns: `200px repeat(${countries.length}, 1fr)`,
      }}
    >
      {/* Metric name */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-charcoal">
          {metricDef.displayName}
        </span>
        {isDivergent && (
          <span className="text-xs text-amber-700 mt-0.5">
            Scores differ
          </span>
        )}
      </div>

      {/* Country scores */}
      {countries.map((country, index) => {
        const metric = country.metrics[metricKey];

        return (
          <div key={country.id} className="flex flex-col gap-2">
            {/* Color indicator + Score */}
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COMPARISON_COLORS[index].hex }}
              />
              <ScoreBadge score={metric.score} size="sm" />
            </div>

            {/* Summary (truncated on mobile) */}
            <p className="text-xs text-stone leading-relaxed line-clamp-3">
              {metric.summary}
            </p>
          </div>
        );
      })}
    </div>
  );
}
