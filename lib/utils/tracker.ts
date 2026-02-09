import type { MetricKey, MetricScore, Country, TrackerData, ScoreTier } from "@/lib/types";
import { SCORE_TIER_COLORS, SCORE_TIER_BG_COLORS } from "@/lib/constants/tracker";

/**
 * Get the tier for a numeric score
 */
export function getScoreTier(score: number): ScoreTier {
  if (score >= 7) return "strong";
  if (score >= 4) return "moderate";
  return "low";
}

/**
 * Get a display label for a score tier
 */
export function getScoreTierLabel(tier: ScoreTier): string {
  switch (tier) {
    case "strong": return "High Performers";
    case "moderate": return "Developing";
    case "low": return "Emerging";
  }
}

/**
 * Get the hex color for a score
 */
export function getScoreColor(score: number): string {
  return SCORE_TIER_COLORS[getScoreTier(score)];
}

/**
 * Get the background color (with opacity) for a score
 */
export function getScoreBgColor(score: number): string {
  return SCORE_TIER_BG_COLORS[getScoreTier(score)];
}

/**
 * Calculate overall score as the average of all metric scores
 */
export function calculateOverallScore(
  metrics: Record<MetricKey, MetricScore>
): number {
  const metricKeys = Object.keys(metrics) as MetricKey[];
  const sum = metricKeys.reduce(
    (acc, key) => acc + metrics[key].score,
    0
  );
  return Math.round((sum / metricKeys.length) * 10) / 10;
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
