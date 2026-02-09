import Image from "next/image";
import Link from "next/link";
import type { EnhancedRegionalStats } from "@/lib/types";
import { cn, getFlagUrl } from "@/lib/utils";

interface RegionalCardProps {
  stats: EnhancedRegionalStats;
  className?: string;
}

export function RegionalCard({ stats, className }: RegionalCardProps) {
  const { region, countryCount, strongCount, moderateCount, lowCount, topPerformer } = stats;
  const total = countryCount;

  const strongPercent = (strongCount / total) * 100;
  const moderatePercent = (moderateCount / total) * 100;
  const lowPercent = (lowCount / total) * 100;

  return (
    <article className={cn("card-soft p-6", className)}>
      <h3 className="heading-serif text-xl text-charcoal mb-4">{region}</h3>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-stone">{countryCount} countries</span>
        <div className="flex items-center gap-1.5">
          {strongCount > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rating-high)]" />
              <span className="text-xs text-muted">{strongCount}</span>
            </div>
          )}
          {moderateCount > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rating-medium)]" />
              <span className="text-xs text-muted">{moderateCount}</span>
            </div>
          )}
          {lowCount > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rating-low)]" />
              <span className="text-xs text-muted">{lowCount}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="h-2 rounded-full overflow-hidden flex mb-5"
        role="img"
        aria-label={`${region} distribution: ${strongCount} High Performers, ${moderateCount} Developing, ${lowCount} Emerging`}
      >
        <div
          className="bg-[var(--color-rating-high)] transition-all duration-500"
          style={{ width: `${strongPercent}%` }}
        />
        <div
          className="bg-[var(--color-rating-medium)] transition-all duration-500"
          style={{ width: `${moderatePercent}%` }}
        />
        <div
          className="bg-[var(--color-rating-low)] transition-all duration-500"
          style={{ width: `${lowPercent}%` }}
        />
      </div>

      {topPerformer && (
        <div className="pt-4 border-t border-lavender/10">
          <span className="label-subtle text-muted block mb-2">Regional Leader</span>
          <Link
            href={`/country/${topPerformer.id}`}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-lavender/20 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Image
                src={getFlagUrl(topPerformer.flag)}
                alt={`${topPerformer.name} flag`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-charcoal group-hover:text-accent transition-colors flex-1">
              {topPerformer.name}
            </span>
            <svg
              className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
}
