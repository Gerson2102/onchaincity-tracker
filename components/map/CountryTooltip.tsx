"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Country, MetricKey } from "@/lib/types";
import { getFlagUrl } from "@/lib/utils";
import { RatingBadge } from "@/components/country/RatingBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountryTooltipProps {
  country: Country | null;
  position: { x: number; y: number };
  visible: boolean;
}

const metricKeys: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

function getRatingDotColor(rating: string): string {
  switch (rating) {
    case "High":
      return "var(--color-rating-high)";
    case "Medium":
      return "var(--color-rating-medium)";
    case "Low":
      return "var(--color-rating-low)";
    default:
      return "#E8E4E0";
  }
}

export function CountryTooltip({ country, position, visible }: CountryTooltipProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && country && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="tooltip-soft px-4 py-3 pointer-events-none fixed z-50"
          style={{
            left: Math.min(position.x + 12, typeof window !== "undefined" ? window.innerWidth - 220 : position.x + 12),
            top: position.y < 100 ? position.y + 20 : position.y - 10,
          }}
        >
          {/* Header: Flag + Name + Rating */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-lavender/30 flex-shrink-0">
              <Image
                src={getFlagUrl(country.flag)}
                alt={`${country.name} flag`}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="heading-serif text-base text-charcoal">
              {country.name}
            </span>
            <RatingBadge rating={country.overallRating} size="sm" />
          </div>

          {/* Mini metric indicators */}
          <div className="flex items-center gap-1.5 mt-2">
            {metricKeys.map((key) => (
              <span
                key={key}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: getRatingDotColor(country.metrics[key].rating),
                }}
                title={key}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
