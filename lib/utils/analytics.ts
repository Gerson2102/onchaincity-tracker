import type {
  Country,
  MetricKey,
  Rating,
  RatingCounts,
  RegionalStats,
  MetricDistribution,
  Insight,
  SpotlightData,
  EnhancedRegionalStats,
  MetricAnalysisData,
} from "@/lib/types";
import { METRIC_DEFINITIONS } from "@/lib/constants/tracker";
import { ratingToNumber } from "./tracker";

const METRIC_KEYS: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

/**
 * Get count of countries by overall rating
 */
export function getCountsByRating(countries: Country[]): RatingCounts {
  const counts: RatingCounts = { High: 0, Medium: 0, Low: 0, total: countries.length };
  for (const country of countries) {
    counts[country.overallRating]++;
  }
  return counts;
}

/**
 * Get statistics for each region
 */
export function getRegionalStats(countries: Country[]): RegionalStats[] {
  const regionMap = new Map<string, Country[]>();

  for (const country of countries) {
    const existing = regionMap.get(country.region) || [];
    existing.push(country);
    regionMap.set(country.region, existing);
  }

  const stats: RegionalStats[] = [];
  for (const [region, regionCountries] of regionMap) {
    const highCount = regionCountries.filter(c => c.overallRating === "High").length;
    const topPerformer = getRegionalLeader(region, countries);
    stats.push({
      region,
      countryCount: regionCountries.length,
      highCount,
      topPerformer,
    });
  }

  return stats.sort((a, b) => b.highCount - a.highCount);
}

/**
 * Get the top performing country in a region
 */
export function getRegionalLeader(region: string, countries: Country[]): Country | null {
  const regionCountries = countries.filter(c => c.region === region);
  if (regionCountries.length === 0) return null;

  return regionCountries.reduce((best, current) => {
    const bestScore = getCountryScore(best);
    const currentScore = getCountryScore(current);
    return currentScore > bestScore ? current : best;
  });
}

/**
 * Calculate a numeric score for a country based on all metrics
 */
function getCountryScore(country: Country): number {
  let score = 0;
  for (const key of METRIC_KEYS) {
    score += ratingToNumber(country.metrics[key].rating);
  }
  return score;
}

/**
 * Get distribution of ratings for each metric
 */
export function getMetricDistribution(countries: Country[]): MetricDistribution[] {
  return METRIC_KEYS.map(metric => {
    const counts: RatingCounts = { High: 0, Medium: 0, Low: 0, total: countries.length };
    for (const country of countries) {
      const rating = country.metrics[metric].rating;
      counts[rating]++;
    }
    return {
      metric,
      displayName: METRIC_DEFINITIONS[metric].displayName,
      counts,
    };
  });
}

/**
 * Get the metric with most High ratings globally
 */
export function getStrongestMetric(countries: Country[]): MetricDistribution {
  const distributions = getMetricDistribution(countries);
  return distributions.reduce((strongest, current) =>
    current.counts.High > strongest.counts.High ? current : strongest
  );
}

/**
 * Get the metric with fewest High ratings (most room for improvement)
 */
export function getWeakestMetric(countries: Country[]): MetricDistribution {
  const distributions = getMetricDistribution(countries);
  return distributions.reduce((weakest, current) =>
    current.counts.High < weakest.counts.High ? current : weakest
  );
}

/**
 * Get countries with High rating across all metrics
 */
export function getPerfectScorers(countries: Country[]): Country[] {
  return countries.filter(country =>
    METRIC_KEYS.every(key => country.metrics[key].rating === "High")
  );
}

/**
 * Count how many metrics a country has at High rating
 */
export function countHighMetrics(country: Country): number {
  return METRIC_KEYS.filter(key => country.metrics[key].rating === "High").length;
}

/**
 * Get countries that have a specific rating for a specific metric
 */
export function getCountriesByMetricRating(
  metric: MetricKey,
  rating: Rating,
  countries: Country[]
): Country[] {
  return countries.filter(c => c.metrics[metric].rating === rating);
}

/**
 * Get the global leader (highest overall score)
 */
export function getGlobalLeader(countries: Country[]): Country | null {
  if (countries.length === 0) return null;
  return countries.reduce((best, current) => {
    const bestScore = getCountryScore(best);
    const currentScore = getCountryScore(current);
    return currentScore > bestScore ? current : best;
  });
}

/**
 * Get a "rising potential" country - Medium overall but with 2+ High metrics
 */
export function getRisingPotential(countries: Country[]): Country | null {
  const mediumCountries = countries.filter(c => c.overallRating === "Medium");
  const candidates = mediumCountries
    .map(c => ({ country: c, highCount: countHighMetrics(c) }))
    .filter(c => c.highCount >= 2)
    .sort((a, b) => b.highCount - a.highCount);

  return candidates.length > 0 ? candidates[0].country : null;
}

/**
 * Get the top non-Europe country (regional pioneer)
 */
export function getRegionalPioneer(countries: Country[]): Country | null {
  const nonEurope = countries.filter(c => c.region !== "Europe");
  if (nonEurope.length === 0) return null;

  return nonEurope.reduce((best, current) => {
    const bestScore = getCountryScore(best);
    const currentScore = getCountryScore(current);
    return currentScore > bestScore ? current : best;
  });
}

/**
 * Generate dynamic insights based on country data
 */
export function generateInsights(countries: Country[]): Insight[] {
  const regionalStats = getRegionalStats(countries);
  const europeStats = regionalStats.find(r => r.region === "Europe");
  const ratingCounts = getCountsByRating(countries);
  const strongestMetric = getStrongestMetric(countries);
  const weakestMetric = getWeakestMetric(countries);
  const perfectScorers = getPerfectScorers(countries);

  const insights: Insight[] = [];

  // Insight 1: Regional Dominance
  if (europeStats && europeStats.highCount > 0) {
    insights.push({
      id: "regional-dominance",
      title: "Regional Dominance",
      description: `${europeStats.highCount} of ${ratingCounts.High} High-rated countries are in Europe, establishing the region as the global leader in digital government infrastructure.`,
    });
  }

  // Insight 2: Global Challenge
  insights.push({
    id: "global-challenge",
    title: "Global Challenge",
    description: `${weakestMetric.displayName} shows the most room for improvement globally, with only ${weakestMetric.counts.High} countries achieving High status.`,
  });

  // Insight 3: Digital Pioneer
  if (perfectScorers.length > 0) {
    const pioneer = perfectScorers[0];
    insights.push({
      id: "digital-pioneer",
      title: "Digital Pioneer",
      description: `${pioneer.name} achieves High ratings across all six dimensions, setting the benchmark for comprehensive digital government.`,
    });
  }

  // Insight 4: Global Strength
  insights.push({
    id: "global-strength",
    title: "Global Strength",
    description: `${strongestMetric.displayName} shows the most global progress, with ${strongestMetric.counts.High} countries achieving High status.`,
  });

  return insights;
}

/**
 * Get spotlight data for featured countries
 */
export function getSpotlightData(countries: Country[]): SpotlightData[] {
  const spotlights: SpotlightData[] = [];

  // Spotlight 1: The Leader
  const leader = getGlobalLeader(countries);
  if (leader) {
    spotlights.push({
      country: leader,
      label: "Digital Pioneer",
      category: "The Leader",
      description: "Setting the global standard for citizen-centric digital infrastructure.",
    });
  }

  // Spotlight 2: Rising Potential
  const rising = getRisingPotential(countries);
  if (rising) {
    const highCount = countHighMetrics(rising);
    spotlights.push({
      country: rising,
      label: "Emerging Contender",
      category: "Rising Potential",
      description: `Strong performance in ${highCount} key dimensions signals rapid digital transformation.`,
    });
  }

  // Spotlight 3: Regional Pioneer
  const pioneer = getRegionalPioneer(countries);
  if (pioneer) {
    spotlights.push({
      country: pioneer,
      label: `${pioneer.region} Leader`,
      category: "Regional Pioneer",
      description: `Leading digital government innovation outside of Europe.`,
    });
  }

  return spotlights;
}

/**
 * Get enhanced statistics for each region including full rating breakdown
 */
export function getEnhancedRegionalStats(countries: Country[]): EnhancedRegionalStats[] {
  const regionMap = new Map<string, Country[]>();

  for (const country of countries) {
    const existing = regionMap.get(country.region) || [];
    existing.push(country);
    regionMap.set(country.region, existing);
  }

  const stats: EnhancedRegionalStats[] = [];
  for (const [region, regionCountries] of regionMap) {
    const highCount = regionCountries.filter(c => c.overallRating === "High").length;
    const mediumCount = regionCountries.filter(c => c.overallRating === "Medium").length;
    const lowCount = regionCountries.filter(c => c.overallRating === "Low").length;
    const topPerformer = getRegionalLeader(region, countries);
    stats.push({
      region,
      countryCount: regionCountries.length,
      highCount,
      mediumCount,
      lowCount,
      topPerformer,
    });
  }

  return stats.sort((a, b) => b.highCount - a.highCount);
}

/**
 * Get metric distribution data with strongest/weakest flags
 */
export function getMetricAnalysisData(countries: Country[]): MetricAnalysisData[] {
  const distributions = getMetricDistribution(countries);
  const strongest = getStrongestMetric(countries);
  const weakest = getWeakestMetric(countries);

  return distributions.map(dist => ({
    ...dist,
    isStrongest: dist.metric === strongest.metric,
    isWeakest: dist.metric === weakest.metric,
  }));
}

/**
 * Generate insight text about regional distribution
 */
export function getRegionalInsightText(stats: EnhancedRegionalStats[]): string {
  const europeStats = stats.find(r => r.region === "Europe");
  const totalHigh = stats.reduce((sum, s) => sum + s.highCount, 0);

  if (europeStats && totalHigh > 0) {
    const europePercent = Math.round((europeStats.highCount / totalHigh) * 100);
    return `Europe accounts for ${europePercent}% of all High-rated countries, establishing clear regional leadership in digital government infrastructure.`;
  }

  return "Regional distribution shows varied progress across different geographic areas.";
}

/**
 * Generate insight text about metric analysis
 */
export function getMetricInsightText(countries: Country[]): string {
  const strongest = getStrongestMetric(countries);
  const weakest = getWeakestMetric(countries);

  return `${strongest.displayName} shows the most global adoption with ${strongest.counts.High} countries rated High, while ${weakest.displayName} presents the greatest opportunity for improvement with only ${weakest.counts.High} High ratings.`;
}
