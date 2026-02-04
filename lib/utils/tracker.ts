import type { Rating, MetricKey, MetricScore, Country, TrackerData } from "@/lib/types";
import { RATING_COLORS, RATING_BG_COLORS } from "@/lib/constants/tracker";

/**
 * Convert a rating to a numeric value for calculations
 */
export function ratingToNumber(rating: Rating): number {
  switch (rating) {
    case "Low":
      return 1;
    case "Medium":
      return 2;
    case "High":
      return 3;
  }
}

/**
 * Convert a numeric value back to a rating
 */
export function numberToRating(n: number): Rating {
  if (n < 1.67) return "Low";
  if (n <= 2.33) return "Medium";
  return "High";
}

/**
 * Calculate overall rating from metrics
 */
export function calculateOverallRating(
  metrics: Record<MetricKey, MetricScore>
): Rating {
  const metricKeys = Object.keys(metrics) as MetricKey[];
  const sum = metricKeys.reduce(
    (acc, key) => acc + ratingToNumber(metrics[key].rating),
    0
  );
  const average = sum / metricKeys.length;
  return numberToRating(average);
}

/**
 * Get the hex color for a rating
 */
export function getRatingColor(rating: Rating): string {
  return RATING_COLORS[rating];
}

/**
 * Get the background color (with opacity) for a rating
 */
export function getRatingBgColor(rating: Rating): string {
  return RATING_BG_COLORS[rating];
}

/**
 * Find a country by its ISO alpha-3 code
 */
export function getCountryById(
  id: string,
  data: TrackerData
): Country | undefined {
  return data.countries.find((country) => country.id === id);
}

/**
 * Get all countries in a specific region
 */
export function getCountriesByRegion(
  region: string,
  data: TrackerData
): Country[] {
  return data.countries.filter((country) => country.region === region);
}

/**
 * Get flag image URL from flag code
 */
export function getFlagUrl(flag: string): string {
  return `https://flagcdn.com/w80/${flag}.png`;
}
