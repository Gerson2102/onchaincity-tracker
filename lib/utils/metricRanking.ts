import type { Country, MetricKey, CountryMetricRanks } from "@/lib/types";
import { ratingToNumber } from "./tracker";

const METRIC_KEYS: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

function countHighMetrics(country: Country): number {
  return METRIC_KEYS.filter((key) => country.metrics[key].rating === "High").length;
}

/**
 * Rank all countries for a single metric.
 * Tiebreakers: metric rating desc → overall rating desc → high count desc → name asc.
 * Returns sequential unique ranks 1..N.
 */
export function rankCountriesByMetric(
  countries: Country[],
  metricKey: MetricKey
): Array<{ countryId: string; rank: number }> {
  const sorted = [...countries].sort((a, b) => {
    // Primary: metric rating descending
    const metricDiff =
      ratingToNumber(b.metrics[metricKey].rating) -
      ratingToNumber(a.metrics[metricKey].rating);
    if (metricDiff !== 0) return metricDiff;

    // Secondary: overall rating descending
    const overallDiff =
      ratingToNumber(b.overallRating) - ratingToNumber(a.overallRating);
    if (overallDiff !== 0) return overallDiff;

    // Tertiary: high metrics count descending
    const highDiff = countHighMetrics(b) - countHighMetrics(a);
    if (highDiff !== 0) return highDiff;

    // Quaternary: alphabetical by name ascending
    return a.name.localeCompare(b.name);
  });

  return sorted.map((country, index) => ({
    countryId: country.id,
    rank: index + 1,
  }));
}

/**
 * Compute per-metric rankings for all countries across all 6 metrics.
 * Returns a Map keyed by country ID → CountryMetricRanks.
 */
export function computeAllMetricRankings(
  countries: Country[]
): Map<string, CountryMetricRanks> {
  const result = new Map<string, CountryMetricRanks>();

  // Initialize entries for all countries
  for (const country of countries) {
    result.set(country.id, {} as CountryMetricRanks);
  }

  // Rank each metric and fill in
  for (const metricKey of METRIC_KEYS) {
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
