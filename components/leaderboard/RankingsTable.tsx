"use client";

import type { RankedCountry, SortState, SortableColumn, MetricKey } from "@/lib/types";
import { METRIC_SHORT_NAMES } from "@/lib/constants/tracker";
import { SortableHeader } from "./SortableHeader";
import { RankingsTableRow } from "./RankingsTableRow";
import { RankingsCard } from "./RankingsCard";

const METRIC_KEYS: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

interface RankingsTableProps {
  countries: RankedCountry[];
  sortState: SortState;
  onSort: (column: SortableColumn) => void;
}

export function RankingsTable({
  countries,
  sortState,
  onSort,
}: RankingsTableProps) {
  if (countries.length === 0) {
    return (
      <div className="card-soft p-12 text-center">
        <p className="text-muted">No countries match your filters.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <div className="card-soft overflow-hidden">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-ivory/50 border-b border-lavender/10">
                <th className="py-3 px-4 text-center w-16">
                  <span className="label-subtle text-muted">#</span>
                </th>
                <th className="py-3 px-4 text-left min-w-[200px]">
                  <SortableHeader
                    label="Country"
                    direction={sortState.column === "name" ? sortState.direction : null}
                    isActive={sortState.column === "name"}
                    onClick={() => onSort("name")}
                  />
                </th>
                <th className="py-3 px-4 text-center">
                  <SortableHeader
                    label="Overall"
                    direction={sortState.column === "overall" ? sortState.direction : null}
                    isActive={sortState.column === "overall"}
                    onClick={() => onSort("overall")}
                  />
                </th>
                <th className="py-3 px-3 text-center">
                  <span className="label-subtle text-muted" title="High Metrics Count">Highs</span>
                </th>
                {METRIC_KEYS.map((key) => (
                  <th key={key} className="py-3 px-3 text-center">
                    <SortableHeader
                      label={METRIC_SHORT_NAMES[key]}
                      direction={sortState.column === key ? sortState.direction : null}
                      isActive={sortState.column === key}
                      onClick={() => onSort(key)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <RankingsTableRow
                  key={country.id}
                  country={country}
                  metricKeys={METRIC_KEYS}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards - shown on mobile only */}
      <div className="md:hidden space-y-4">
        {countries.map((country) => (
          <RankingsCard
            key={country.id}
            country={country}
            metricKeys={METRIC_KEYS}
          />
        ))}
      </div>
    </>
  );
}
