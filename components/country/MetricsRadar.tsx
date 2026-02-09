"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { Country } from "@/lib/types";
import { METRIC_DEFINITIONS, METRIC_SHORT_NAMES, ALL_METRIC_KEYS } from "@/lib/constants/tracker";

interface MetricsRadarProps {
  country: Country;
}

export function MetricsRadar({ country }: MetricsRadarProps) {
  const radarData = ALL_METRIC_KEYS.map((key) => ({
    metric: METRIC_SHORT_NAMES[key],
    fullName: METRIC_DEFINITIONS[key].displayName,
    value: country.metrics[key].score,
    fullMark: 10,
  }));

  const ariaLabel = `Radar chart for ${country.name}: ${radarData.map((d, i) => `${d.fullName} ${country.metrics[ALL_METRIC_KEYS[i]].score}/10`).join(', ')}`;

  return (
    <div className="w-full h-80" role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
          <PolarGrid
            stroke="rgba(201, 184, 212, 0.3)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#5C5753", fontSize: 10 }}
            tickLine={false}
          />
          <Radar
            name={country.name}
            dataKey="value"
            stroke="rgba(45, 42, 38, 0.6)"
            fill="rgba(201, 184, 212, 0.4)"
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
