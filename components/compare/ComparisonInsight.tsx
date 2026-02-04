"use client";

import type { Country } from "@/lib/types";
import { generateComparisonInsight } from "@/lib/utils/comparison";
import { cn } from "@/lib/utils";

interface ComparisonInsightProps {
  countries: Country[];
  className?: string;
}

export function ComparisonInsight({ countries, className }: ComparisonInsightProps) {
  const insight = generateComparisonInsight(countries);

  return (
    <article
      className={cn(
        "card-soft p-6 relative overflow-hidden",
        className
      )}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <h3 className="label-subtle mb-3">COMPARISON INSIGHT</h3>
      <p className="text-stone text-sm leading-relaxed">
        {insight}
      </p>
    </article>
  );
}
