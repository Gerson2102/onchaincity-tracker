"use client";

import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { Country, MetricKey } from "@/lib/types";
import { METRIC_DEFINITIONS, METRIC_SHORT_NAMES, COMPARISON_COLORS } from "@/lib/constants/tracker";
import { ratingToNumber } from "@/lib/utils/tracker";

interface ComparisonRadarProps {
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

export function ComparisonRadar({ countries }: ComparisonRadarProps) {
  const [hiddenCountries, setHiddenCountries] = useState<Set<string>>(new Set());

  // Prepare radar data with all countries' values
  const radarData = metricKeys.map((key) => {
    const dataPoint: Record<string, string | number> = {
      metric: METRIC_SHORT_NAMES[key],
      fullName: METRIC_DEFINITIONS[key].displayName,
      fullMark: 3,
    };

    countries.forEach((country) => {
      dataPoint[country.id] = ratingToNumber(country.metrics[key].rating);
    });

    return dataPoint;
  });

  const toggleCountry = (countryId: string) => {
    setHiddenCountries((prev) => {
      const next = new Set(prev);
      if (next.has(countryId)) {
        next.delete(countryId);
      } else {
        next.add(countryId);
      }
      return next;
    });
  };

  // Custom legend renderer
  const renderLegend = () => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {countries.map((country, index) => {
        const isHidden = hiddenCountries.has(country.id);
        const color = COMPARISON_COLORS[index].hex;

        return (
          <button
            key={country.id}
            type="button"
            onClick={() => toggleCountry(country.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
              isHidden
                ? "border-lavender/30 bg-transparent opacity-50"
                : "border-transparent bg-ivory"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isHidden ? "#9CA3AF" : color,
              }}
            />
            <span
              className={`text-sm ${
                isHidden ? "text-muted line-through" : "text-charcoal"
              }`}
            >
              {country.name}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div className="w-full h-96 sm:h-80" role="img" aria-label={`Comparison radar chart for ${countries.map(c => c.name).join(', ')}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid
              stroke="rgba(201, 184, 212, 0.3)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#5C5753", fontSize: 12 }}
              tickLine={false}
            />
            {countries.map((country, index) => {
              const isHidden = hiddenCountries.has(country.id);
              if (isHidden) return null;

              const color = COMPARISON_COLORS[index].hex;

              return (
                <Radar
                  key={country.id}
                  name={country.name}
                  dataKey={country.id}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              );
            })}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend with toggle functionality */}
      {renderLegend()}
    </div>
  );
}
