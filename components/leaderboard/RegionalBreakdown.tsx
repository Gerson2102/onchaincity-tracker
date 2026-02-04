import type { Country } from "@/lib/types";
import { getEnhancedRegionalStats, getRegionalInsightText } from "@/lib/utils/analytics";
import { RegionalCard } from "./RegionalCard";
import { InsightCard } from "./InsightCard";

interface RegionalBreakdownProps {
  countries: Country[];
}

export function RegionalBreakdown({ countries }: RegionalBreakdownProps) {
  const stats = getEnhancedRegionalStats(countries);
  const insightText = getRegionalInsightText(stats);

  return (
    <section className="animate-fade-up delay-300">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="heading-serif text-3xl text-charcoal mb-2">
          Regional <span className="heading-serif-italic">Breakdown</span>
        </h2>
        <p className="text-stone">
          How digital government progress varies across geographic regions.
        </p>
      </div>

      {/* Regional Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <RegionalCard
            key={stat.region}
            stats={stat}
            className={`animate-fade-up delay-${(index + 1) * 100}`}
          />
        ))}
      </div>

      {/* Insight Callout */}
      <InsightCard
        insight={{
          id: "regional-insight",
          title: "Regional Leadership",
          description: insightText,
        }}
        className="animate-fade-up delay-500"
      />
    </section>
  );
}
