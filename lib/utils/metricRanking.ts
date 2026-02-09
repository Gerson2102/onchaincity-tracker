import type { Country, MetricKey, CountryMetricRanks } from "@/lib/types";
import { ALL_METRIC_KEYS } from "@/lib/constants/tracker";

function countStrongMetrics(country: Country): number {
  return ALL_METRIC_KEYS.filter((key) => country.metrics[key].score >= 7).length;
}

function totalMetricScore(country: Country): number {
  return ALL_METRIC_KEYS.reduce((sum, key) => sum + country.metrics[key].score, 0);
}

/**
 * Rank all countries for a single metric.
 * Tiebreakers: metric score desc → overall score desc → total score desc → name asc.
 */
export function rankCountriesByMetric(
  countries: Country[],
  metricKey: MetricKey
): Array<{ countryId: string; rank: number }> {
  const sorted = [...countries].sort((a, b) => {
    // Primary: metric score descending
    const metricDiff = b.metrics[metricKey].score - a.metrics[metricKey].score;
    if (Math.abs(metricDiff) > 0.001) return metricDiff;

    // Secondary: overall score descending
    const overallDiff = b.overallScore - a.overallScore;
    if (Math.abs(overallDiff) > 0.001) return overallDiff;

    // Tertiary: total metric score descending
    const totalDiff = totalMetricScore(b) - totalMetricScore(a);
    if (Math.abs(totalDiff) > 0.001) return totalDiff;

    // Quaternary: alphabetical by name ascending
    return a.name.localeCompare(b.name);
  });

  return sorted.map((country, index) => ({
    countryId: country.id,
    rank: index + 1,
  }));
}

/**
 * Compute per-metric rankings for all countries across all 10 metrics.
 */
export function computeAllMetricRankings(
  countries: Country[]
): Map<string, CountryMetricRanks> {
  const result = new Map<string, CountryMetricRanks>();

  for (const country of countries) {
    result.set(country.id, {} as CountryMetricRanks);
  }

  for (const metricKey of ALL_METRIC_KEYS) {
    const ranked = rankCountriesByMetric(countries, metricKey);
    for (const { countryId, rank } of ranked) {
      const entry = result.get(countryId);
      if (entry) {
        entry[metricKey] = rank;
      }
    }
  }

  return result;
}

/**
 * Look up a single country's rank for a single metric.
 */
export function getCountryMetricRank(
  rankings: Map<string, CountryMetricRanks>,
  countryId: string,
  metricKey: MetricKey
): number | undefined {
  return rankings.get(countryId)?.[metricKey];
}
