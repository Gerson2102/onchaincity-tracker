"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  SortState,
  SortDirection,
  SortableColumn,
  LeaderboardFilters,
  RegionFilter,
  ScoreTierFilter,
} from "@/lib/types";
import { getNextSortDirection } from "@/lib/utils";

const VALID_REGIONS: RegionFilter[] = [
  "all",
  "Europe",
  "Asia-Pacific",
  "Americas",
  "Middle East & Africa",
];

const VALID_SCORE_TIERS: ScoreTierFilter[] = ["all", "strong", "moderate", "low"];

const VALID_COLUMNS: SortableColumn[] = [
  "name",
  "overall",
  "eGovServiceDepth",
  "digitalIdentityInfra",
  "govInteroperability",
  "legalClarityDigitalAssets",
  "stablecoinAdoption",
  "onOffRampAccess",
  "tokenizedRwaMaturity",
  "crossBorderPayments",
  "digitalNomadFriendliness",
  "cryptoDigitalLiteracy",
];

const VALID_DIRECTIONS: SortDirection[] = ["asc", "desc", null];

function isValidRegion(value: string | null): value is RegionFilter {
  return value !== null && VALID_REGIONS.includes(value as RegionFilter);
}

function isValidScoreTier(value: string | null): value is ScoreTierFilter {
  return value !== null && VALID_SCORE_TIERS.includes(value as ScoreTierFilter);
}

function isValidColumn(value: string | null): value is SortableColumn {
  return value !== null && VALID_COLUMNS.includes(value as SortableColumn);
}

function isValidDirection(value: string | null): value is SortDirection {
  if (value === null) return true;
  return VALID_DIRECTIONS.includes(value as SortDirection);
}

export interface UseLeaderboardFiltersReturn {
  filters: LeaderboardFilters;
  sortState: SortState;
  setRegion: (region: RegionFilter) => void;
  setScoreTier: (tier: ScoreTierFilter) => void;
  setSort: (column: SortableColumn) => void;
  clearAll: () => void;
  hasActiveFilters: boolean;
}

export function useLeaderboardFilters(): UseLeaderboardFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const filters = useMemo<LeaderboardFilters>(() => {
    const regionParam = searchParams.get("region");
    const tierParam = searchParams.get("tier");

    return {
      region: isValidRegion(regionParam) ? regionParam : "all",
      scoreTier: isValidScoreTier(tierParam) ? tierParam : "all",
    };
  }, [searchParams]);

  // Parse sort state from URL
  const sortState = useMemo<SortState>(() => {
    const sortParam = searchParams.get("sort");
    const dirParam = searchParams.get("dir");

    const column = isValidColumn(sortParam) ? sortParam : null;
    const direction = isValidDirection(dirParam) ? dirParam : null;

    return { column, direction };
  }, [searchParams]);

  // Helper to update URL params
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "", { scroll: false });
    },
    [router, searchParams]
  );

  const setRegion = useCallback(
    (region: RegionFilter) => {
      updateParams({ region: region === "all" ? null : region });
    },
    [updateParams]
  );

  const setScoreTier = useCallback(
    (tier: ScoreTierFilter) => {
      updateParams({ tier: tier === "all" ? null : tier });
    },
    [updateParams]
  );

  const setSort = useCallback(
    (column: SortableColumn) => {
      let newDirection: SortDirection;
      if (sortState.column === column) {
        newDirection = getNextSortDirection(sortState.direction);
      } else {
        newDirection = "desc";
      }

      updateParams({
        sort: newDirection === null ? null : column,
        dir: newDirection,
      });
    },
    [sortState, updateParams]
  );

  const clearAll = useCallback(() => {
    router.push("", { scroll: false });
  }, [router]);

  const hasActiveFilters =
    filters.region !== "all" ||
    filters.scoreTier !== "all" ||
    sortState.column !== null;

  return {
    filters,
    sortState,
    setRegion,
    setScoreTier,
    setSort,
    clearAll,
    hasActiveFilters,
  };
}
