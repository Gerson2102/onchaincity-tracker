import type { Country } from "@/lib/types";
import { getCountsByScoreTier } from "@/lib/utils/analytics";
import { StatCard } from "./StatCard";
import { DistributionBar } from "./DistributionBar";

interface AtAGlanceProps {
  countries: Country[];
}

export function AtAGlance({ countries }: AtAGlanceProps) {
  const counts = getCountsByScoreTier(countries);

  return (
    <div>
      <h2 className="heading-serif text-3xl text-charcoal mb-2 animate-fade-up">
        At a <span className="heading-serif-italic">Glance</span>
      </h2>
      <p className="text-stone mb-8 animate-fade-up delay-100">
        How nations stack up across our evaluation framework
      </p>

      <div className="card-soft p-8 animate-fade-up delay-200">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <StatCard label="Countries Tracked" value={counts.total} />
          <StatCard label="High Performers (7-10)" value={counts.strong} scoreTier="strong" />
          <StatCard label="Developing (4-6)" value={counts.moderate} scoreTier="moderate" />
          <StatCard label="Emerging (0-3)" value={counts.low} scoreTier="low" />
        </div>

        {/* Distribution bar */}
        <DistributionBar counts={counts} />
      </div>
    </div>
  );
}
