"use client";

import type { RankedCountry, SortState, SortableColumn, MetricKey, Pillar } from "@/lib/types";
import { METRIC_SHORT_NAMES, METRIC_KEYS_BY_PILLAR, ALL_METRIC_KEYS } from "@/lib/constants/tracker";
import { SortableHeader } from "./SortableHeader";
import { RankingsTableRow } from "./RankingsTableRow";
import { RankingsCard } from "./RankingsCard";

const PILLAR_ORDER: Pillar[] = ["Digital Government", "Legal & Financial", "Lifestyle & Mobility"];

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
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="card-soft card-flat overflow-x-auto">
          <table className="w-full min-w-[1300px]">
            <thead>
              {/* Pillar grouping row */}
              <tr className="border-b border-lavender/5">
                <th className="sticky-col sticky-col-rank bg-[#F5F3EE] py-2 px-2" />
                <th className="sticky-col sticky-col-country bg-[#F5F3EE] py-2 px-2" />
                <th className="sticky-col sticky-col-overall bg-[#F5F3EE] py-2 px-2" />
                <th className="sticky-col sticky-col-hp bg-[#F5F3EE] py-2 px-2" />
                {PILLAR_ORDER.map((pillar) => (
                  <th
                    key={pillar}
                    colSpan={METRIC_KEYS_BY_PILLAR[pillar].length}
                    className="bg-[#F5F3EE] py-2 px-2 text-center"
                  >
                    <span className="text-[0.6rem] uppercase tracking-wider text-muted font-medium">{pillar}</span>
                  </th>
                ))}
              </tr>
              {/* Column headers */}
              <tr className="border-b border-lavender/10">
                <th className="sticky-col sticky-col-rank bg-[#F8F6F1] py-3 px-3 text-center">
                  <span className="label-subtle text-muted">Rank</span>
                </th>
                <th className="sticky-col sticky-col-country bg-[#F8F6F1] py-3 px-3 text-left">
                  <SortableHeader
                    label="Country"
                    direction={sortState.column === "name" ? sortState.direction : null}
                    isActive={sortState.column === "name"}
                    onClick={() => onSort("name")}
                  />
                </th>
                <th className="sticky-col sticky-col-overall bg-[#F8F6F1] py-3 px-2 text-center">
                  <SortableHeader
                    label="Overall"
                    direction={sortState.column === "overall" ? sortState.direction : null}
                    isActive={sortState.column === "overall"}
                    onClick={() => onSort("overall")}
                  />
                </th>
                <th className="sticky-col sticky-col-hp bg-[#F8F6F1] py-3 px-2 text-center">
                  <span className="label-subtle text-muted" title="High Performer Metrics Count">HP</span>
                </th>
                {ALL_METRIC_KEYS.map((key) => (
                  <th key={key} className="bg-[#F8F6F1] py-3 px-2 text-center">
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
                  metricKeys={ALL_METRIC_KEYS}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {countries.map((country) => (
          <RankingsCard
            key={country.id}
            country={country}
            metricKeys={ALL_METRIC_KEYS}
          />
        ))}
      </div>
    </>
  );
}
