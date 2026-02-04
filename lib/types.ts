export type Rating = "Low" | "Medium" | "High";

export type MetricKey =
  | "contextContinuity"
  | "userSovereignty"
  | "serviceProgrammability"
  | "interoperability"
  | "verifiableInfrastructure"
  | "digitalAssetMaturity";

export interface MetricScore {
  rating: Rating;
  summary: string;
}

export interface Country {
  id: string; // ISO 3166-1 alpha-3 (e.g., "EST")
  name: string;
  region: string; // "Europe" | "Asia-Pacific" | "Americas" | "Middle East & Africa"
  flag: string; // ISO 3166-1 alpha-2 lowercase (e.g., "ee")
  overallRating: Rating;
  metrics: Record<MetricKey, MetricScore>;
}

export interface TrackerData {
  metadata: {
    version: string;
    lastUpdated: string;
    totalCountries: number;
  };
  countries: Country[];
}

// Leaderboard types
export type SortDirection = "asc" | "desc" | null;
export type SortableColumn = "name" | "overall" | MetricKey;

export interface SortState {
  column: SortableColumn | null;
  direction: SortDirection;
}

export type RegionFilter = "all" | "Europe" | "Asia-Pacific" | "Americas" | "Middle East & Africa";
export type RatingFilter = "all" | Rating;

export interface LeaderboardFilters {
  region: RegionFilter;
  rating: RatingFilter;
}

export interface RankedCountry extends Country {
  rank: number;
}

// Analytics types for Insights Dashboard
export interface RatingCounts {
  High: number;
  Medium: number;
  Low: number;
  total: number;
}

export interface RegionalStats {
  region: string;
  countryCount: number;
  highCount: number;
  topPerformer: Country | null;
}

export interface MetricDistribution {
  metric: MetricKey;
  displayName: string;
  counts: RatingCounts;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
}

export interface SpotlightData {
  country: Country;
  label: string;
  category: string;
  description: string;
}

export interface EnhancedRegionalStats extends RegionalStats {
  mediumCount: number;
  lowCount: number;
}

export interface MetricAnalysisData extends MetricDistribution {
  isStrongest: boolean;
  isWeakest: boolean;
}
