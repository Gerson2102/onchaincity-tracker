"use client";

import Image from "next/image";
import type { Country } from "@/lib/types";
import { getFlagUrl } from "@/lib/utils";
import { ScoreBadge } from "@/components/country";

interface SearchResultsProps {
  results: Country[];
  selectedIndex: number;
  onSelect: (country: Country) => void;
  onHover: (index: number) => void;
}

export function SearchResults({
  results,
  selectedIndex,
  onSelect,
  onHover,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-muted text-sm">
        No countries found
      </div>
    );
  }

  return (
    <div className="py-2">
      {results.map((country, index) => (
        <div
          key={country.id}
          id={`search-result-${country.id}`}
          className="search-result-item flex items-center gap-3"
          data-selected={index === selectedIndex}
          onMouseDown={(e) => { e.preventDefault(); onSelect(country); }}
          onMouseEnter={() => onHover(index)}
          role="option"
          aria-selected={index === selectedIndex}
        >
          {/* Flag */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-lavender/30 flex-shrink-0">
            <Image
              src={getFlagUrl(country.flag)}
              alt={`${country.name} flag`}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Region */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-charcoal truncate">
              {country.name}
            </div>
            <div className="text-xs text-muted truncate">
              {country.region}
            </div>
          </div>

          {/* Score */}
          <ScoreBadge score={country.overallScore} size="sm" />
        </div>
      ))}
    </div>
  );
}
