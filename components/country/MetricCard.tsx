import type { MetricKey, MetricScore } from "@/lib/types";
import { METRIC_DEFINITIONS } from "@/lib/constants/tracker";
import { RatingBadge } from "./RatingBadge";

interface MetricCardProps {
  metricKey: MetricKey;
  score: MetricScore;
}

export function MetricCard({ metricKey, score }: MetricCardProps) {
  const definition = METRIC_DEFINITIONS[metricKey];

  return (
    <div className="card-soft p-6">
      {/* Header: Name + Rating */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="heading-serif text-lg text-charcoal">
          {definition.displayName}
        </h3>
        <RatingBadge rating={score.rating} size="sm" />
      </div>

      {/* Description */}
      <p className="mt-2 text-muted text-sm">
        {definition.description}
      </p>

      {/* Summary */}
      <p className="mt-4 text-stone text-sm leading-relaxed">
        {score.summary}
      </p>
    </div>
  );
}
