"use client";

import type { Country } from "@/lib/types";
import { useLeaderboardFilters } from "@/hooks";
import { getLeaderboardData } from "@/lib/utils";
import { FilterBar } from "./FilterBar";
import { RankingsTable } from "./RankingsTable";

interface LeaderboardContentProps {
  countries: Country[];
}

export function LeaderboardContent({ countries }: LeaderboardContentProps) {
  const {
    filters,
    sortState,
    setRegion,
    setRating,
    setSort,
    clearAll,
    hasActiveFilters,
  } = useLeaderboardFilters();

  const rankedCountries = getLeaderboardData(countries, filters, sortState);

  return (
    <>
      <FilterBar
        region={filters.region}
        rating={filters.rating}
        onRegionChange={setRegion}
        onRatingChange={setRating}
        onClearAll={clearAll}
        filteredCount={rankedCountries.length}
        totalCount={countries.length}
        hasActiveFilters={hasActiveFilters}
      />

      <RankingsTable
        countries={rankedCountries}
        sortState={sortState}
        onSort={setSort}
      />
    </>
  );
}
