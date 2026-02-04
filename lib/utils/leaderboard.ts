import type {
  Country,
  RankedCountry,
  SortState,
  SortDirection,
  SortableColumn,
  LeaderboardFilters,
  MetricKey,
} from "@/lib/types";
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
 * Count how many metrics a country has at High rating
 */
function countHighMetrics(country: Country): number {
  return METRIC_KEYS.filter(key => country.metrics[key].rating === "High").length;
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
    return ratingToNumber(country.overallRating);
  }
  // It's a metric key
  return ratingToNumber(country.metrics[column].rating);
}

/**
 * Sort countries based on sort state
 * Uses tri-state sorting: null (default by overall desc) → desc → asc → null
 */
export function sortCountries(
  countries: Country[],
  sortState: SortState
): Country[] {
  const sorted = [...countries];

  // If no explicit sort, default to overall rating descending
  if (sortState.column === null || sortState.direction === null) {
    return sorted.sort((a, b) => {
      const aValue = ratingToNumber(a.overallRating);
      const bValue = ratingToNumber(b.overallRating);
      // Secondary sort by name for stable ordering
      if (bValue === aValue) {
        return a.name.localeCompare(b.name);
      }
      return bValue - aValue;
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

    // Numeric comparison
    const diff = (aValue as number) - (bValue as number);
    if (diff === 0) {
      // Secondary sort by name for stable ordering
      return a.name.localeCompare(b.name);
    }
    return multiplier * diff;
  });
}

/**
 * Filter countries by region and/or rating
 */
export function filterCountries(
  countries: Country[],
  filters: LeaderboardFilters
): Country[] {
  return countries.filter((country) => {
    // Region filter
    if (filters.region !== "all" && country.region !== filters.region) {
      return false;
    }
    // Rating filter
    if (filters.rating !== "all" && country.overallRating !== filters.rating) {
      return false;
    }
    return true;
  });
}

/**
 * Assign unique sequential ranks to countries
 * Sort by: overall rating (desc) → high metrics count (desc) → name (alpha)
 */
export function assignRanks(countries: Country[]): RankedCountry[] {
  // Sort with tiebreakers for unique ranks
  const sorted = [...countries].sort((a, b) => {
    // Primary: overall rating descending
    const ratingDiff = ratingToNumber(b.overallRating) - ratingToNumber(a.overallRating);
    if (ratingDiff !== 0) return ratingDiff;

    // Secondary: high metrics count descending
    const highDiff = countHighMetrics(b) - countHighMetrics(a);
    if (highDiff !== 0) return highDiff;

    // Tertiary: alphabetical by name
    return a.name.localeCompare(b.name);
  });

  // Assign sequential ranks 1, 2, 3... (no ties)
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
  // First filter
  const filtered = filterCountries(countries, filters);
  // Assign ranks based on filtered set
  const ranked = assignRanks(filtered);
  // Then sort (preserving ranks)
  const sorted = sortCountries(ranked, sortState);

  return sorted as RankedCountry[];
}

/**
 * Count countries by rating
 */
export function countByRating(countries: Country[]): Record<string, number> {
  return countries.reduce(
    (acc, country) => {
      acc[country.overallRating] = (acc[country.overallRating] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
