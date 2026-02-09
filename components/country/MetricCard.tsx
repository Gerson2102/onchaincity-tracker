import type { MetricKey, MetricScore } from "@/lib/types";
import { METRIC_DEFINITIONS } from "@/lib/constants/tracker";
import { ScoreBadge } from "./ScoreBadge";
import { RankBadge } from "@/components/ui/RankBadge";

interface MetricCardProps {
  metricKey: MetricKey;
  score: MetricScore;
  metricRank?: number;
  totalCountries?: number;
}

export function MetricCard({ metricKey, score, metricRank, totalCountries }: MetricCardProps) {
  const definition = METRIC_DEFINITIONS[metricKey];

  return (
    <div className="card-soft p-6">
      {/* Header: Name + Score */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="heading-serif text-lg text-charcoal">
          {definition.displayName}
        </h3>
        <div className="flex items-center gap-2.5">
          {metricRank !== undefined && (
            <RankBadge rank={metricRank} total={totalCountries} size="sm" />
          )}
          <ScoreBadge score={score.score} size="sm" />
        </div>
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
