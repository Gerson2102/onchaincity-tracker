import type { Country, MetricKey, Rating } from "@/lib/types";
import { METRIC_DEFINITIONS } from "@/lib/constants/tracker";
import { ratingToNumber } from "./tracker";

/**
 * Parse country IDs from URL search params
 */
export function parseCountryIdsFromUrl(searchParams: { get(name: string): string | null }): string[] {
  const countriesParam = searchParams.get("countries");
  if (!countriesParam) return [];
  return countriesParam.split(",").filter(Boolean);
}

/**
 * Build a shareable comparison URL
 */
export function buildCompareUrl(countryIds: string[]): string {
  if (countryIds.length === 0) return "/compare";
  return `/compare?countries=${countryIds.join(",")}`;
}

/**
 * Get metrics where all compared countries have "High" rating
 */
export function getSharedHighMetrics(countries: Country[]): MetricKey[] {
  if (countries.length < 2) return [];

  const metricKeys = Object.keys(METRIC_DEFINITIONS) as MetricKey[];

  return metricKeys.filter((key) =>
    countries.every((country) => country.metrics[key].rating === "High")
  );
}

/**
 * Get the metric with the largest rating spread (most divergence)
 */
export function getBiggestDivergence(
  countries: Country[]
): { metric: MetricKey; displayName: string; spread: number } | null {
  if (countries.length < 2) return null;

  const metricKeys = Object.keys(METRIC_DEFINITIONS) as MetricKey[];

  let maxSpread = 0;
  let divergentMetric: MetricKey | null = null;

  for (const key of metricKeys) {
    const ratings = countries.map((c) => ratingToNumber(c.metrics[key].rating));
    const spread = Math.max(...ratings) - Math.min(...ratings);

    if (spread > maxSpread) {
      maxSpread = spread;
      divergentMetric = key;
    }
  }

  if (!divergentMetric || maxSpread === 0) return null;

  return {
    metric: divergentMetric,
    displayName: METRIC_DEFINITIONS[divergentMetric].displayName,
    spread: maxSpread,
  };
}

/**
 * Check if a metric has divergent ratings across countries
 */
export function hasMetricDivergence(countries: Country[], metricKey: MetricKey): boolean {
  if (countries.length < 2) return false;

  const ratings = new Set(countries.map((c) => c.metrics[metricKey].rating));
  return ratings.size > 1;
}

/**
 * Get rating distribution for a metric across compared countries
 */
export function getMetricRatingDistribution(
  countries: Country[],
  metricKey: MetricKey
): Record<Rating, number> {
  const distribution: Record<Rating, number> = { High: 0, Medium: 0, Low: 0 };

  for (const country of countries) {
    const rating = country.metrics[metricKey].rating;
    distribution[rating]++;
  }

  return distribution;
}

/**
 * Generate a dynamic comparison insight based on the selected countries
 */
export function generateComparisonInsight(countries: Country[]): string {
  if (countries.length < 2) {
    return "Select at least two countries to see comparison insights.";
  }

  const sharedHigh = getSharedHighMetrics(countries);
  const divergence = getBiggestDivergence(countries);
  const countryNames = countries.map((c) => c.name);

  const parts: string[] = [];

  // Shared strengths
  if (sharedHigh.length > 0) {
    const metricNames = sharedHigh
      .slice(0, 3)
      .map((key) => METRIC_DEFINITIONS[key].displayName);

    if (sharedHigh.length === 1) {
      parts.push(`All countries excel in ${metricNames[0]}.`);
    } else if (sharedHigh.length === 6) {
      parts.push("All countries achieve High ratings across every metric - a remarkable alignment of digital infrastructure excellence.");
    } else {
      parts.push(`Shared strengths: ${metricNames.join(", ")}.`);
    }
  }

  // Divergence
  if (divergence) {
    const highCountries = countries
      .filter((c) => c.metrics[divergence.metric].rating === "High")
      .map((c) => c.name);
    const lowCountries = countries
      .filter((c) => c.metrics[divergence.metric].rating === "Low")
      .map((c) => c.name);

    if (highCountries.length > 0 && lowCountries.length > 0) {
      parts.push(
        `Biggest contrast in ${divergence.displayName}: ${highCountries.join(", ")} lead${highCountries.length === 1 ? "s" : ""} while ${lowCountries.join(", ")} trail${lowCountries.length === 1 ? "s" : ""}.`
      );
    } else if (divergence.spread > 0) {
      parts.push(`${divergence.displayName} shows the most variation across these countries.`);
    }
  }

  // Overall pattern
  const highPerformers = countries.filter((c) => c.overallRating === "High");
  if (highPerformers.length === countries.length) {
    parts.push("This comparison features top-tier digital nations - differences are in implementation details rather than capability.");
  } else if (highPerformers.length === 0) {
    parts.push("These nations are developing their digital infrastructure with varying approaches and priorities.");
  }

  if (parts.length === 0) {
    return `Comparing ${countryNames.join(", ")} reveals diverse approaches to digital government infrastructure.`;
  }

  return parts.join(" ");
}
