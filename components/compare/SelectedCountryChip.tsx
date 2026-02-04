"use client";

import Image from "next/image";
import type { Country } from "@/lib/types";
import { getFlagUrl } from "@/lib/utils";

interface SelectedCountryChipProps {
  country: Country;
  color: string;
  onRemove: () => void;
}

export function SelectedCountryChip({
  country,
  color,
  onRemove,
}: SelectedCountryChipProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ivory border border-lavender/30 rounded-full">
      {/* Color indicator */}
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Flag */}
      <div className="w-5 h-5 rounded-full overflow-hidden border border-lavender/20 flex-shrink-0">
        <Image
          src={getFlagUrl(country.flag)}
          alt=""
          width={20}
          height={20}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Country name */}
      <span className="text-sm font-medium text-charcoal">{country.name}</span>

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 p-0.5 text-muted hover:text-charcoal transition-colors"
        aria-label={`Remove ${country.name}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
