"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import type { Country } from "@/lib/types";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";
import { parseCountryIdsFromUrl, buildCompareUrl } from "@/lib/utils/comparison";
import { CountrySelector } from "./CountrySelector";
import { ComparisonRadar } from "./ComparisonRadar";
import { ComparisonGrid } from "./ComparisonGrid";
import { ComparisonInsight } from "./ComparisonInsight";

const data = countriesData as TrackerData;

export function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse selected country IDs from URL
  const selectedCountries = useMemo(() => {
    const ids = parseCountryIdsFromUrl(searchParams);
    return ids
      .map((id) => data.countries.find((c) => c.id === id))
      .filter((c): c is Country => c !== undefined)
      .slice(0, 4); // Max 4 countries
  }, [searchParams]);

  // Update URL when countries change
  const handleCountriesChange = useCallback(
    (countries: Country[]) => {
      const url = buildCompareUrl(countries.map((c) => c.id));
      router.push(url, { scroll: false });
    },
    [router]
  );

  const hasEnoughCountries = selectedCountries.length >= 2;

  return (
    <div className="space-y-12">
      {/* Country selector - higher z-index for dropdown visibility */}
      <section className="card-soft p-6 animate-fade-up relative z-20 overflow-visible">
        <h2 className="heading-serif text-xl text-charcoal mb-4">
          Select <span className="heading-serif-italic">Countries</span>
        </h2>
        <CountrySelector
          selectedCountries={selectedCountries}
          onCountriesChange={handleCountriesChange}
        />
      </section>

      {/* Empty state - lower z-index so dropdown appears above */}
      {selectedCountries.length === 0 && (
        <section className="card-soft p-12 text-center animate-fade-up delay-100 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-lavender/40 flex items-center justify-center mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          <h3 className="heading-serif text-xl text-charcoal mb-2">
            Start <span className="heading-serif-italic">Comparing</span>
          </h3>

          <p className="text-stone text-sm max-w-md mx-auto">
            Search for countries above to compare their digital infrastructure
            across all six metrics. Select 2-4 countries for a side-by-side analysis.
          </p>
        </section>
      )}

      {/* One country selected - prompt for more */}
      {selectedCountries.length === 1 && (
        <section className="card-soft p-8 text-center animate-fade-up delay-100 relative z-10">
          <p className="text-stone">
            <span className="font-medium text-charcoal">{selectedCountries[0].name}</span> selected.
            Add at least one more country to begin comparison.
          </p>
        </section>
      )}

      {/* Full comparison view (2+ countries) */}
      {hasEnoughCountries && (
        <>
          {/* Radar chart */}
          <section className="card-soft p-6 animate-fade-up delay-100">
            <h2 className="heading-serif text-xl text-charcoal mb-6">
              Performance <span className="heading-serif-italic">Overview</span>
            </h2>
            <ComparisonRadar countries={selectedCountries} />
          </section>

          {/* Dynamic insight */}
          <ComparisonInsight
            countries={selectedCountries}
            className="animate-fade-up delay-200"
          />

          {/* Detailed grid comparison */}
          <section className="card-soft p-6 animate-fade-up delay-300">
            <h2 className="heading-serif text-xl text-charcoal mb-6">
              Metric <span className="heading-serif-italic">Details</span>
            </h2>
            <ComparisonGrid countries={selectedCountries} />
          </section>
        </>
      )}
    </div>
  );
}
