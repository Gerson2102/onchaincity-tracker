"use client";

import Image from "next/image";
import type { Country } from "@/lib/types";
import {
  COMPARISON_COLORS,
  METRIC_DEFINITIONS,
  ALL_METRIC_KEYS,
} from "@/lib/constants/tracker";
import { ScoreBadge } from "@/components/country";
import { getFlagUrl } from "@/lib/utils";
import { hasMetricDivergence } from "@/lib/utils/comparison";
import { cn } from "@/lib/utils";
import { ComparisonGridRow } from "./ComparisonGridRow";

interface ComparisonGridProps {
  countries: Country[];
}

export function ComparisonGrid({ countries }: ComparisonGridProps) {
  return (
    <>
      {/* Desktop grid layout */}
      <div className="hidden md:block">
        {/* Header row with country info */}
        <div
          className="grid gap-4 pb-4 border-b-2 border-lavender/30"
          style={{
            gridTemplateColumns: `200px repeat(${countries.length}, 1fr)`,
          }}
        >
          {/* Empty cell for metric column */}
          <div className="text-sm font-medium text-muted">Metric</div>

          {/* Country headers */}
          {countries.map((country, index) => (
            <div key={country.id} className="flex items-center gap-3">
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
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COMPARISON_COLORS[index].hex }}
                  />
                  <span className="text-sm font-medium text-charcoal truncate">
                    {country.name}
                  </span>
                </div>
                <div className="mt-1">
                  <ScoreBadge score={country.overallScore} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metric rows */}
        {ALL_METRIC_KEYS.map((key) => (
          <ComparisonGridRow
            key={key}
            metricKey={key}
            countries={countries}
          />
        ))}
      </div>

      {/* Mobile stacked card layout */}
      <div className="md:hidden space-y-4">
        {ALL_METRIC_KEYS.map((key) => {
          const metricDef = METRIC_DEFINITIONS[key];
          const isDivergent = hasMetricDivergence(countries, key);

          return (
            <div
              key={key}
              className={cn(
                "rounded-xl border border-lavender/20 p-4",
                isDivergent && "border-amber-300/50 bg-amber-50/30"
              )}
            >
              {/* Metric header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-charcoal">
                  {metricDef.displayName}
                </h3>
                {isDivergent && (
                  <span className="text-xs text-amber-700 font-medium">
                    Scores differ
                  </span>
                )}
              </div>

              {/* Country rows */}
              <div className="space-y-3">
                {countries.map((country, index) => {
                  const metric = country.metrics[key];

                  return (
                    <div
                      key={country.id}
                      className="flex items-start gap-3"
                    >
                      {/* Color dot */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{
                          backgroundColor: COMPARISON_COLORS[index].hex,
                        }}
                      />

                      {/* Flag */}
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-lavender/20 flex-shrink-0">
                        <Image
                          src={getFlagUrl(country.flag)}
                          alt=""
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name + score + summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-charcoal">
                            {country.name}
                          </span>
                          <ScoreBadge score={metric.score} size="sm" />
                        </div>
                        <p className="text-xs text-stone leading-relaxed line-clamp-2">
                          {metric.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
