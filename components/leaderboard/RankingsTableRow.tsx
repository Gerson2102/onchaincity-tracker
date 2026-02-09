"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { RankedCountry, MetricKey } from "@/lib/types";
import { ScoreBadge } from "@/components/country/ScoreBadge";
import { cn, getFlagUrl } from "@/lib/utils";
import { HighMetricsIndicator } from "./HighMetricsIndicator";
import { countStrongMetrics } from "@/lib/utils/analytics";

interface RankingsTableRowProps {
  country: RankedCountry;
  metricKeys: MetricKey[];
  className?: string;
}

export function RankingsTableRow({
  country,
  metricKeys,
  className,
}: RankingsTableRowProps) {
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
    <tr
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`View ${country.name} details`}
      className={cn(
        "table-row-interactive bg-white/60 cursor-pointer",
        "border-b border-charcoal/5 last:border-b-0",
        "focus:outline-none focus-visible:bg-accent/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
        "group",
        className
      )}
    >
      {/* Rank */}
      <td className="sticky-col sticky-col-rank bg-white group-hover:bg-[#faf6f0] py-3 px-3 text-center">
        <span className="heading-serif text-xl text-charcoal group-hover:text-accent transition-colors">
          {country.rank}
        </span>
      </td>

      {/* Country */}
      <td className="sticky-col sticky-col-country bg-white group-hover:bg-[#faf6f0] py-3 px-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
            <Image
              src={getFlagUrl(country.flag)}
              alt={`${country.name} flag`}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-medium text-charcoal group-hover:text-accent transition-colors text-sm">
              {country.name}
            </span>
            <span className="block text-xs text-muted">{country.region}</span>
          </div>
        </div>
      </td>

      {/* Overall Score */}
      <td className="sticky-col sticky-col-overall bg-white group-hover:bg-[#faf6f0] py-3 px-2 text-center">
        <ScoreBadge score={country.overallScore} variant="bar" />
      </td>

      {/* Strong Metrics Indicator */}
      <td className="sticky-col sticky-col-hp bg-white group-hover:bg-[#faf6f0] py-3 px-2 text-center">
        <HighMetricsIndicator count={countStrongMetrics(country)} />
      </td>

      {/* Metric Scores */}
      {metricKeys.map((key) => (
        <td key={key} className="py-3 px-2 text-center">
          <ScoreBadge score={country.metrics[key].score} size="sm" />
        </td>
      ))}
    </tr>
  );
}
