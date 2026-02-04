"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Country } from "@/lib/types";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SearchResults } from "./SearchResults";

const data = countriesData as TrackerData;

interface SearchBarProps {
  variant?: "full" | "compact";
  onSelect?: (country: Country) => void;
  className?: string;
}

export function SearchBar({ variant = "full", onSelect, className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(variant === "full");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter countries based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return data.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.id.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  // Handle country selection
  const handleSelect = useCallback(
    (country: Country) => {
      if (onSelect) {
        onSelect(country);
      } else {
        router.push(`/country/${country.id}`);
      }
      setQuery("");
      setIsOpen(false);
      setIsExpanded(variant === "full");
      inputRef.current?.blur();
    },
    [onSelect, router, variant]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setQuery("");
          setIsExpanded(variant === "full");
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, selectedIndex, handleSelect, variant]
  );

// Handle query changes - reset selected index
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
        if (variant === "compact" && !query) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, query]);

  // Handle input focus for compact variant
  const handleFocus = () => {
    setIsExpanded(true);
    if (query) setIsOpen(true);
  };

  const handleBlur = () => {
    // Delay to allow click events on results
    setTimeout(() => {
      if (variant === "compact" && !query) {
        setIsExpanded(false);
      }
    }, 200);
  };

  // Compact variant: show just icon when collapsed
  if (variant === "compact" && !isExpanded) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="p-2 text-stone hover:text-charcoal transition-colors"
        aria-label="Open search"
      >
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
      </button>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search countries..."
          className={cn(
            "search-input w-full pl-11 pr-4 py-3",
            variant === "compact" && "py-2 text-sm"
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-results"
          aria-label="Search countries"
        />
      </div>

      {/* Dropdown */}
      {isOpen && query && (
        <div
          id="search-results"
          className="search-dropdown absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto z-[100] shadow-lg"
          role="listbox"
        >
          <SearchResults
            results={results}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            onHover={setSelectedIndex}
          />
        </div>
      )}
    </div>
  );
}
