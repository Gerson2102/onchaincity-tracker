import type { Country } from "@/lib/types";
import { generateInsights } from "@/lib/utils/analytics";
import { InsightCard } from "./InsightCard";

interface KeyInsightsProps {
  countries: Country[];
}

export function KeyInsights({ countries }: KeyInsightsProps) {
  const insights = generateInsights(countries);

  return (
    <div>
      <h2 className="heading-serif text-3xl text-charcoal mb-2 animate-fade-up">
        Key <span className="heading-serif-italic">Insights</span>
      </h2>
      <p className="text-stone mb-8 animate-fade-up delay-100">
        Patterns emerging from our global assessment
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            className={`animate-fade-up delay-${(index + 1) * 100}`}
          />
        ))}
      </div>
    </div>
  );
}
