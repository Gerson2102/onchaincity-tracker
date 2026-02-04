"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { RankedCountry, MetricKey } from "@/lib/types";
import { RatingBadge } from "@/components/country/RatingBadge";
import { cn, getFlagUrl } from "@/lib/utils";
import { HighMetricsIndicator } from "./HighMetricsIndicator";
import { countHighMetrics } from "@/lib/utils/analytics";

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
      role="link"
      className={cn(
        "table-row-interactive bg-white/60 cursor-pointer",
        "border-b border-charcoal/5 last:border-b-0",
        "focus:outline-none focus-visible:bg-accent/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
        "group",
        className
      )}
    >
      {/* Rank */}
      <td className="py-4 px-4 text-center">
        <span className="heading-serif text-xl text-charcoal group-hover:text-accent transition-colors">
          {country.rank}
        </span>
      </td>

      {/* Country */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
            <Image
              src={getFlagUrl(country.flag)}
              alt={`${country.name} flag`}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-medium text-charcoal group-hover:text-accent transition-colors">
              {country.name}
            </span>
            <span className="block text-xs text-muted">{country.region}</span>
          </div>
        </div>
      </td>

      {/* Overall Rating - Use bar variant for emphasis */}
      <td className="py-4 px-4 text-center">
        <RatingBadge rating={country.overallRating} variant="bar" />
      </td>

      {/* High Metrics Indicator */}
      <td className="py-4 px-3 text-center">
        <HighMetricsIndicator count={countHighMetrics(country)} />
      </td>

      {/* Metric Ratings */}
      {metricKeys.map((key) => (
        <td key={key} className="py-4 px-3 text-center">
          <RatingBadge rating={country.metrics[key].rating} size="sm" />
        </td>
      ))}
    </tr>
  );
}
