"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import type { Country } from "@/lib/types";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";
import { cn, getFlagUrl } from "@/lib/utils";
import { RatingBadge } from "@/components/country/RatingBadge";
import { COMPARISON_COLORS } from "@/lib/constants/tracker";
import { SelectedCountryChip } from "./SelectedCountryChip";

const data = countriesData as TrackerData;

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountriesChange: (countries: Country[]) => void;
  maxCountries?: number;
}

export function CountrySelector({
  selectedCountries,
  onCountriesChange,
  maxCountries = 4,
}: CountrySelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIds = useMemo(
    () => new Set(selectedCountries.map((c) => c.id)),
    [selectedCountries]
  );

  // Filter countries based on query, excluding already selected ones
  const results = useMemo(() => {
    const searchTerm = query.toLowerCase().trim();
    return data.countries.filter(
      (country) =>
        !selectedIds.has(country.id) &&
        (searchTerm === "" ||
          country.name.toLowerCase().includes(searchTerm) ||
          country.id.toLowerCase().includes(searchTerm))
    );
  }, [query, selectedIds]);

  const isMaxReached = selectedCountries.length >= maxCountries;

  // Handle country selection
  const handleSelect = useCallback(
    (country: Country) => {
      if (isMaxReached) return;
      onCountriesChange([...selectedCountries, country]);
      setQuery("");
      setIsOpen(false);
      setSelectedIndex(0);
      inputRef.current?.focus();
    },
    [selectedCountries, onCountriesChange, isMaxReached]
  );

  // Handle country removal
  const handleRemove = useCallback(
    (countryId: string) => {
      onCountriesChange(selectedCountries.filter((c) => c.id !== countryId));
    },
    [selectedCountries, onCountriesChange]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen && query) setIsOpen(true);
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (isOpen && results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setQuery("");
          break;
        case "Backspace":
          if (query === "" && selectedCountries.length > 0) {
            handleRemove(selectedCountries[selectedCountries.length - 1].id);
          }
          break;
      }
    },
    [isOpen, results, selectedIndex, handleSelect, handleRemove, query, selectedCountries]
  );

  // Handle query changes
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
    setIsOpen(!!newQuery);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusMessage = () => {
    if (selectedCountries.length === 0) {
      return "Search and select countries to compare";
    }
    if (selectedCountries.length === 1) {
      return "Select at least one more country";
    }
    if (isMaxReached) {
      return "Maximum 4 countries selected";
    }
    return `${selectedCountries.length} of ${maxCountries} selected`;
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Selected chips */}
      {selectedCountries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCountries.map((country, index) => (
            <SelectedCountryChip
              key={country.id}
              country={country}
              color={COMPARISON_COLORS[index].hex}
              onRemove={() => handleRemove(country.id)}
            />
          ))}
        </div>
      )}

      {/* Search input wrapper */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMaxReached ? "Maximum countries selected" : "Add a country..."}
          disabled={isMaxReached}
          className={cn(
            "search-input w-full pl-11 pr-4 py-3",
            isMaxReached && "opacity-50 cursor-not-allowed"
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="country-selector-results"
          aria-label="Search countries to compare"
        />

        {/* Dropdown - positioned relative to input */}
        {isOpen && query && (
          <div
            id="country-selector-results"
            className="search-dropdown absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto z-[100] shadow-lg"
            role="listbox"
          >
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center text-muted text-sm">
                No countries found
              </div>
            ) : (
              <div className="py-2">
                {results.map((country, index) => (
                  <div
                    key={country.id}
                    className="search-result-item flex items-center gap-3"
                    data-selected={index === selectedIndex}
                    onClick={() => handleSelect(country)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    role="option"
                    aria-selected={index === selectedIndex}
                  >
                    {/* Flag */}
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-lavender/30 flex-shrink-0">
                      <Image
                        src={getFlagUrl(country.flag)}
                        alt=""
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

                    {/* Rating */}
                    <RatingBadge rating={country.overallRating} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status message - below everything */}
      <p className="text-sm text-muted">{getStatusMessage()}</p>
    </div>
  );
}
