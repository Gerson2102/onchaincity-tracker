export type ScoreTier = "strong" | "moderate" | "low";

export type Pillar = "Digital Government" | "Legal & Financial" | "Lifestyle & Mobility";

export type MetricKey =
  | "eGovServiceDepth"
  | "digitalIdentityInfra"
  | "govInteroperability"
  | "legalClarityDigitalAssets"
  | "stablecoinAdoption"
  | "onOffRampAccess"
  | "tokenizedRwaMaturity"
  | "crossBorderPayments"
  | "digitalNomadFriendliness"
  | "cryptoDigitalLiteracy";

export interface MetricScore {
  score: number;
  summary: string;
}

export interface Country {
  id: string; // ISO 3166-1 alpha-3 (e.g., "EST")
  name: string;
  region: string; // "Europe" | "Asia-Pacific" | "Americas" | "Middle East & Africa"
  flag: string; // ISO 3166-1 alpha-2 lowercase (e.g., "ee")
  overallScore: number;
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
export type ScoreTierFilter = "all" | ScoreTier;

export interface LeaderboardFilters {
  region: RegionFilter;
  scoreTier: ScoreTierFilter;
}

export interface RankedCountry extends Country {
  rank: number;
}

// Analytics types for Insights Dashboard
export interface ScoreTierCounts {
  strong: number;
  moderate: number;
  low: number;
  total: number;
}

export interface RegionalStats {
  region: string;
  countryCount: number;
  strongCount: number;
  topPerformer: Country | null;
}

export interface MetricDistribution {
  metric: MetricKey;
  displayName: string;
  counts: ScoreTierCounts;
  averageScore: number;
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
  moderateCount: number;
  lowCount: number;
  averageScore: number;
}

export interface MetricAnalysisData extends MetricDistribution {
  isStrongest: boolean;
  isWeakest: boolean;
}

/** Per-metric rank data for one country: metricKey -> rank (1-20) */
export type CountryMetricRanks = Record<MetricKey, number>;
