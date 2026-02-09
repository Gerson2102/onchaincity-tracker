"use client";

import type { RegionFilter, ScoreTierFilter } from "@/lib/types";
import { REGIONS } from "@/lib/constants/tracker";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  region: RegionFilter;
  scoreTier: ScoreTierFilter;
  onRegionChange: (region: RegionFilter) => void;
  onScoreTierChange: (tier: ScoreTierFilter) => void;
  onClearAll: () => void;
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

export function FilterBar({
  region,
  scoreTier,
  onRegionChange,
  onScoreTierChange,
  onClearAll,
  filteredCount,
  totalCount,
  hasActiveFilters,
}: FilterBarProps) {
  const getSelectClasses = (isActive: boolean) =>
    cn(
      "appearance-none rounded-full",
      "px-4 py-2 pr-8 text-sm text-charcoal",
      "focus:outline-none focus:ring-2 focus:ring-lavender focus:border-lavender",
      "cursor-pointer transition-colors hover:border-lavender/50",
      isActive
        ? "border border-accent/40 bg-accent/5"
        : "border border-lavender/30 bg-white/80"
    );

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Region Filter */}
      <div className="relative">
        <label htmlFor="region-filter" className="sr-only">
          Filter by region
        </label>
        <select
          id="region-filter"
          value={region}
          onChange={(e) => onRegionChange(e.target.value as RegionFilter)}
          className={getSelectClasses(region !== "all")}
        >
          <option value="all">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
      </div>

      {/* Score Tier Filter */}
      <div className="relative">
        <label htmlFor="tier-filter" className="sr-only">
          Filter by score tier
        </label>
        <select
          id="tier-filter"
          value={scoreTier}
          onChange={(e) => onScoreTierChange(e.target.value as ScoreTierFilter)}
          className={getSelectClasses(scoreTier !== "all")}
        >
          <option value="all">All Tiers</option>
          <option value="strong">High Performers (7-10)</option>
          <option value="moderate">Developing (4-6)</option>
          <option value="low">Emerging (0-3)</option>
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
      </div>

      {/* Results count */}
      <span className="text-sm text-muted">
        Showing {filteredCount} of {totalCount} countries
      </span>

      {/* Clear all button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm text-stone hover:text-charcoal transition-colors underline underline-offset-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
