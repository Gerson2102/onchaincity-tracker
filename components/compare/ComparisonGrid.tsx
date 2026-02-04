"use client";

import Image from "next/image";
import type { Country, MetricKey } from "@/lib/types";
import { COMPARISON_COLORS } from "@/lib/constants/tracker";
import { RatingBadge } from "@/components/country/RatingBadge";
import { getFlagUrl } from "@/lib/utils";
import { ComparisonGridRow } from "./ComparisonGridRow";

interface ComparisonGridProps {
  countries: Country[];
}

const metricKeys: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

export function ComparisonGrid({ countries }: ComparisonGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header row with country info */}
        <div
          className="grid gap-4 pb-4 border-b-2 border-lavender/30"
          style={{
            gridTemplateColumns: `200px repeat(${countries.length}, 1fr)`,
          }}
        >
          {/* Empty cell for metric column */}
          <div className="text-sm font-medium text-muted">
            Metric
          </div>

          {/* Country headers */}
          {countries.map((country, index) => (
            <div key={country.id} className="flex items-center gap-3">
              {/* Flag */}
              <div className="w-12 h-12 rounded-full overflow-hidden border border-lavender/30 flex-shrink-0">
                <Image
                  src={getFlagUrl(country.flag)}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Country name with color indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COMPARISON_COLORS[index].hex }}
                  />
                  <span className="text-sm font-medium text-charcoal truncate">
                    {country.name}
                  </span>
                </div>

                {/* Overall rating */}
                <div className="mt-1">
                  <RatingBadge rating={country.overallRating} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metric rows */}
        {metricKeys.map((key) => (
          <ComparisonGridRow
            key={key}
            metricKey={key}
            countries={countries}
          />
        ))}
      </div>
    </div>
  );
}
