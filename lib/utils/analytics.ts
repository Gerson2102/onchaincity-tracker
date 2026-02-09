import type {
  Country,
  MetricKey,
  ScoreTierCounts,
  RegionalStats,
  MetricDistribution,
  Insight,
  SpotlightData,
  EnhancedRegionalStats,
  MetricAnalysisData,
} from "@/lib/types";
import { METRIC_DEFINITIONS, ALL_METRIC_KEYS } from "@/lib/constants/tracker";
import { getScoreTier } from "./tracker";

/**
 * Get count of countries by overall score tier
 */
export function getCountsByScoreTier(countries: Country[]): ScoreTierCounts {
  const counts: ScoreTierCounts = { strong: 0, moderate: 0, low: 0, total: countries.length };
  for (const country of countries) {
    const tier = getScoreTier(country.overallScore);
    counts[tier]++;
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
    const strongCount = regionCountries.filter(c => getScoreTier(c.overallScore) === "strong").length;
    const topPerformer = getRegionalLeader(region, countries);
    stats.push({
      region,
      countryCount: regionCountries.length,
      strongCount,
      topPerformer,
    });
  }

  return stats.sort((a, b) => b.strongCount - a.strongCount);
}

/**
 * Get the top performing country in a region
 */
export function getRegionalLeader(region: string, countries: Country[]): Country | null {
  const regionCountries = countries.filter(c => c.region === region);
  if (regionCountries.length === 0) return null;

  return regionCountries.reduce((best, current) =>
    current.overallScore > best.overallScore ? current : best
  );
}

/**
 * Get distribution of score tiers for each metric
 */
export function getMetricDistribution(countries: Country[]): MetricDistribution[] {
  return ALL_METRIC_KEYS.map(metric => {
    const counts: ScoreTierCounts = { strong: 0, moderate: 0, low: 0, total: countries.length };
    let scoreSum = 0;
    for (const country of countries) {
      const score = country.metrics[metric].score;
      const tier = getScoreTier(score);
      counts[tier]++;
      scoreSum += score;
    }
    return {
      metric,
      displayName: METRIC_DEFINITIONS[metric].displayName,
      counts,
      averageScore: Math.round((scoreSum / countries.length) * 10) / 10,
    };
  });
}

/**
 * Get the metric with highest average score globally
 */
export function getStrongestMetric(countries: Country[]): MetricDistribution {
  const distributions = getMetricDistribution(countries);
  return distributions.reduce((strongest, current) =>
    current.averageScore > strongest.averageScore ? current : strongest
  );
}

/**
 * Get the metric with lowest average score (most room for improvement)
 */
export function getWeakestMetric(countries: Country[]): MetricDistribution {
  const distributions = getMetricDistribution(countries);
  return distributions.reduce((weakest, current) =>
    current.averageScore < weakest.averageScore ? current : weakest
  );
}

/**
 * Get countries with all metrics scoring >= 8
 */
export function getPerfectScorers(countries: Country[]): Country[] {
  return countries.filter(country =>
    ALL_METRIC_KEYS.every(key => country.metrics[key].score >= 8)
  );
}

/**
 * Count how many metrics a country has at Strong tier (score >= 7)
 */
export function countStrongMetrics(country: Country): number {
  return ALL_METRIC_KEYS.filter(key => country.metrics[key].score >= 7).length;
}

/**
 * Get countries that have a specific score tier for a specific metric
 */
export function getCountriesByMetricTier(
  metric: MetricKey,
  tier: string,
  countries: Country[]
): Country[] {
  return countries.filter(c => getScoreTier(c.metrics[metric].score) === tier);
}

/**
 * Get the global leader (highest overall score)
 */
export function getGlobalLeader(countries: Country[]): Country | null {
  if (countries.length === 0) return null;
  return countries.reduce((best, current) =>
    current.overallScore > best.overallScore ? current : best
  );
}

/**
 * Get a "rising potential" country - Moderate overall (4-6.9) with 2+ metrics >= 7
 */
export function getRisingPotential(countries: Country[]): Country | null {
  const moderateCountries = countries.filter(c => getScoreTier(c.overallScore) === "moderate");
  const candidates = moderateCountries
    .map(c => ({ country: c, strongCount: countStrongMetrics(c) }))
    .filter(c => c.strongCount >= 2)
    .sort((a, b) => b.strongCount - a.strongCount);

  return candidates.length > 0 ? candidates[0].country : null;
}

/**
 * Get the top non-Europe country (regional pioneer)
 */
export function getRegionalPioneer(countries: Country[]): Country | null {
  const nonEurope = countries.filter(c => c.region !== "Europe");
  if (nonEurope.length === 0) return null;

  return nonEurope.reduce((best, current) =>
    current.overallScore > best.overallScore ? current : best
  );
}

/**
 * Generate dynamic insights based on country data
 */
export function generateInsights(countries: Country[]): Insight[] {
  const regionalStats = getRegionalStats(countries);
  const europeStats = regionalStats.find(r => r.region === "Europe");
  const tierCounts = getCountsByScoreTier(countries);
  const strongestMetric = getStrongestMetric(countries);
  const weakestMetric = getWeakestMetric(countries);
  const perfectScorers = getPerfectScorers(countries);

  const insights: Insight[] = [];

  // Insight 1: Regional Dominance
  if (europeStats && europeStats.strongCount > 0) {
    insights.push({
      id: "regional-dominance",
      title: "Regional Dominance",
      description: `${europeStats.strongCount} of ${tierCounts.strong} High Performer countries are in Europe, establishing the region as the global leader in digital government infrastructure.`,
    });
  }

  // Insight 2: Global Challenge
  insights.push({
    id: "global-challenge",
    title: "Global Challenge",
    description: `${weakestMetric.displayName} shows the most room for improvement globally, with an average score of just ${weakestMetric.averageScore}/10.`,
  });

  // Insight 3: Digital Pioneer
  if (perfectScorers.length > 0) {
    const pioneer = perfectScorers[0];
    insights.push({
      id: "digital-pioneer",
      title: "Digital Pioneer",
      description: `${pioneer.name} scores 8+ across all ten indexes, setting the benchmark for comprehensive digital infrastructure.`,
    });
  }

  // Insight 4: Global Strength
  insights.push({
    id: "global-strength",
    title: "Global Strength",
    description: `${strongestMetric.displayName} leads globally with an average score of ${strongestMetric.averageScore}/10 across all countries.`,
  });

  return insights;
}

/**
 * Get spotlight data for featured countries
 */
export function getSpotlightData(countries: Country[]): SpotlightData[] {
  const spotlights: SpotlightData[] = [];

  const leader = getGlobalLeader(countries);
  if (leader) {
    spotlights.push({
      country: leader,
      label: "Digital Pioneer",
      category: "The Leader",
      description: "Setting the global standard for citizen-centric digital infrastructure.",
    });
  }

  const rising = getRisingPotential(countries);
  if (rising) {
    const strongCount = countStrongMetrics(rising);
    spotlights.push({
      country: rising,
      label: "Emerging Contender",
      category: "Rising Potential",
      description: `Strong performance in ${strongCount} key indexes signals rapid digital transformation.`,
    });
  }

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
 * Get enhanced statistics for each region including full tier breakdown
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
    const strongCount = regionCountries.filter(c => getScoreTier(c.overallScore) === "strong").length;
    const moderateCount = regionCountries.filter(c => getScoreTier(c.overallScore) === "moderate").length;
    const lowCount = regionCountries.filter(c => getScoreTier(c.overallScore) === "low").length;
    const avgScore = Math.round(
      (regionCountries.reduce((sum, c) => sum + c.overallScore, 0) / regionCountries.length) * 10
    ) / 10;
    const topPerformer = getRegionalLeader(region, countries);
    stats.push({
      region,
      countryCount: regionCountries.length,
      strongCount,
      moderateCount,
      lowCount,
      averageScore: avgScore,
      topPerformer,
    });
  }

  return stats.sort((a, b) => b.strongCount - a.strongCount);
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
  const totalStrong = stats.reduce((sum, s) => sum + s.strongCount, 0);

  if (europeStats && totalStrong > 0) {
    const europePercent = Math.round((europeStats.strongCount / totalStrong) * 100);
    return `Europe accounts for ${europePercent}% of all High Performer countries, establishing clear regional leadership in digital government infrastructure.`;
  }

  return "Regional distribution shows varied progress across different geographic areas.";
}

/**
 * Generate insight text about metric analysis
 */
export function getMetricInsightText(countries: Country[]): string {
  const strongest = getStrongestMetric(countries);
  const weakest = getWeakestMetric(countries);

  return `${strongest.displayName} leads globally with an average of ${strongest.averageScore}/10, while ${weakest.displayName} presents the greatest opportunity for improvement at ${weakest.averageScore}/10.`;
}
