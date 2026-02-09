"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { RankedCountry, MetricKey } from "@/lib/types";
import { ScoreBadge } from "@/components/country/ScoreBadge";
import { cn, getFlagUrl } from "@/lib/utils";
import { METRIC_SHORT_NAMES } from "@/lib/constants/tracker";
import { HighMetricsIndicator } from "./HighMetricsIndicator";
import { countStrongMetrics } from "@/lib/utils/analytics";

interface RankingsCardProps {
  country: RankedCountry;
  metricKeys: MetricKey[];
  className?: string;
}

export function RankingsCard({
  country,
  metricKeys,
  className,
}: RankingsCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/country/${country.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${country.name} details`}
      className={cn(
        "card-soft p-5 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="heading-serif text-2xl text-charcoal w-8 text-center">
          {country.rank}
        </span>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-lavender/20 flex-shrink-0">
          <Image
            src={getFlagUrl(country.flag)}
            alt={`${country.name} flag`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-charcoal truncate">{country.name}</h3>
          <span className="text-xs text-muted">{country.region}</span>
        </div>
        <div className="flex items-center gap-2">
          <ScoreBadge score={country.overallScore} size="lg" />
          <HighMetricsIndicator count={countStrongMetrics(country)} />
        </div>
      </div>

      {/* Metrics Grid - 2x5 */}
      <div className="grid grid-cols-2 gap-2">
        {metricKeys.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between gap-2 bg-ivory/50 rounded-lg px-3 py-2"
          >
            <span className="text-xs text-muted truncate">
              {METRIC_SHORT_NAMES[key]}
            </span>
            <ScoreBadge score={country.metrics[key].score} size="sm" />
          </div>
        ))}
      </div>
    </article>
  );
}
