"use client";

import Image from "next/image";
import Link from "next/link";
import type { SpotlightData } from "@/lib/types";
import { cn, getFlagUrl } from "@/lib/utils";

interface SpotlightCardProps {
  data: SpotlightData;
  className?: string;
}

export function SpotlightCard({ data, className }: SpotlightCardProps) {
  const { country, label, category, description } = data;

  return (
    <Link
      href={`/country/${country.id}`}
      className={cn(
        "card-soft p-6 block group",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Category label */}
      <span className="label-subtle text-accent mb-4 block">{category}</span>

      {/* Flag and name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-lavender/20 flex-shrink-0">
          <Image
            src={getFlagUrl(country.flag)}
            alt={`${country.name} flag`}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="heading-serif text-2xl text-charcoal group-hover:text-accent transition-colors">
            {country.name}
          </h3>
          <span className="text-xs text-muted">{label}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-stone text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* View profile link */}
      <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        View profile
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </Link>
  );
}
