"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { Country, MetricKey } from "@/lib/types";
import { METRIC_DEFINITIONS } from "@/lib/constants/tracker";
import { ratingToNumber } from "@/lib/utils/tracker";

interface MetricsRadarProps {
  country: Country;
}

const metricKeys: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

export function MetricsRadar({ country }: MetricsRadarProps) {
  const radarData = metricKeys.map((key) => ({
    metric: METRIC_DEFINITIONS[key].displayName.split(" ")[0], // Short name for chart
    fullName: METRIC_DEFINITIONS[key].displayName,
    value: ratingToNumber(country.metrics[key].rating),
    fullMark: 3,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid
            stroke="rgba(201, 184, 212, 0.3)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#5C5753", fontSize: 11 }}
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
