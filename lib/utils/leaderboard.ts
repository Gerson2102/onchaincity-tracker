import type {
  Country,
  RankedCountry,
  SortState,
  SortDirection,
  SortableColumn,
  LeaderboardFilters,
  ScoreTierCounts,
} from "@/lib/types";
import { ALL_METRIC_KEYS } from "@/lib/constants/tracker";
import { getScoreTier } from "./tracker";

/**
 * Count how many metrics a country has at Strong tier (score >= 7)
 */
function countStrongMetrics(country: Country): number {
  return ALL_METRIC_KEYS.filter(key => country.metrics[key].score >= 7).length;
}

/**
 * Get total metric score for a country
 */
function totalMetricScore(country: Country): number {
  return ALL_METRIC_KEYS.reduce((sum, key) => sum + country.metrics[key].score, 0);
}

/**
 * Get the next sort direction in the tri-state cycle: null → desc → asc → null
 */
export function getNextSortDirection(current: SortDirection): SortDirection {
  if (current === null) return "desc";
  if (current === "desc") return "asc";
  return null;
}

/**
 * Get the sort value for a country based on the column
 */
function getSortValue(country: Country, column: SortableColumn): number | string {
  if (column === "name") {
    return country.name.toLowerCase();
  }
  if (column === "overall") {
    return country.overallScore;
  }
  // It's a metric key
  return country.metrics[column].score;
}

/**
 * Sort countries based on sort state
 */
export function sortCountries(
  countries: Country[],
  sortState: SortState
): Country[] {
  const sorted = [...countries];

  // If no explicit sort, default to overall score descending
  if (sortState.column === null || sortState.direction === null) {
    return sorted.sort((a, b) => {
      const diff = b.overallScore - a.overallScore;
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name);
    });
  }

  const { column, direction } = sortState;
  const multiplier = direction === "asc" ? 1 : -1;

  return sorted.sort((a, b) => {
    const aValue = getSortValue(a, column);
    const bValue = getSortValue(b, column);

    if (typeof aValue === "string" && typeof bValue === "string") {
      return multiplier * aValue.localeCompare(bValue);
    }

    const diff = (aValue as number) - (bValue as number);
    if (diff === 0) {
      return a.name.localeCompare(b.name);
    }
    return multiplier * diff;
  });
}

/**
 * Filter countries by region and/or score tier
 */
export function filterCountries(
  countries: Country[],
  filters: LeaderboardFilters
): Country[] {
  return countries.filter((country) => {
    if (filters.region !== "all" && country.region !== filters.region) {
      return false;
    }
    if (filters.scoreTier !== "all" && getScoreTier(country.overallScore) !== filters.scoreTier) {
      return false;
    }
    return true;
  });
}

/**
 * Assign unique sequential ranks to countries
 * Sort by: overall score (desc) → total metric score (desc) → strong metrics count (desc) → name (alpha)
 */
export function assignRanks(countries: Country[]): RankedCountry[] {
  const sorted = [...countries].sort((a, b) => {
    // Primary: overall score descending
    const overallDiff = b.overallScore - a.overallScore;
    if (Math.abs(overallDiff) > 0.001) return overallDiff;

    // Secondary: total metric score descending
    const totalDiff = totalMetricScore(b) - totalMetricScore(a);
    if (Math.abs(totalDiff) > 0.001) return totalDiff;

    // Tertiary: strong metrics count descending
    const strongDiff = countStrongMetrics(b) - countStrongMetrics(a);
    if (strongDiff !== 0) return strongDiff;

    // Quaternary: alphabetical by name
    return a.name.localeCompare(b.name);
  });

  return sorted.map((country, index) => ({
    ...country,
    rank: index + 1,
  }));
}

/**
 * Get sorted and filtered countries with ranks
 */
export function getLeaderboardData(
  countries: Country[],
  filters: LeaderboardFilters,
  sortState: SortState
): RankedCountry[] {
  const filtered = filterCountries(countries, filters);
  const ranked = assignRanks(filtered);
  const sorted = sortCountries(ranked, sortState);

  return sorted as RankedCountry[];
}

/**
 * Count countries by score tier
 */
export function countByScoreTier(countries: Country[]): ScoreTierCounts {
  const counts: ScoreTierCounts = { strong: 0, moderate: 0, low: 0, total: countries.length };
  for (const country of countries) {
    const tier = getScoreTier(country.overallScore);
    counts[tier]++;
  }
  return counts;
}
