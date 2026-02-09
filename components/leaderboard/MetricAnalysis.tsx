import type { Country } from "@/lib/types";
import { getMetricAnalysisData, getMetricInsightText } from "@/lib/utils/analytics";
import { MetricBar } from "./MetricBar";
import { InsightCard } from "./InsightCard";

interface MetricAnalysisProps {
  countries: Country[];
}

export function MetricAnalysis({ countries }: MetricAnalysisProps) {
  const metricsData = getMetricAnalysisData(countries);
  const insightText = getMetricInsightText(countries);

  return (
    <section className="animate-fade-up delay-400">
      <div className="mb-8">
        <h2 className="heading-serif text-3xl text-charcoal mb-2">
          Metric <span className="heading-serif-italic">Analysis</span>
        </h2>
        <p className="text-stone">
          Global performance distribution across each evaluation index.
        </p>
      </div>

      <div className="card-soft p-6 mb-6">
        <div className="space-y-1">
          {metricsData.map((data, index) => (
            <MetricBar
              key={data.metric}
              data={data}
              className={`animate-fade-up delay-${(index + 1) * 50}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs mt-6 pt-4 border-t border-lavender/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-high)]" />
            <span className="text-muted">High Performers (7-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-medium)]" />
            <span className="text-muted">Developing (4-6)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-rating-low)]" />
            <span className="text-muted">Emerging (0-3)</span>
          </div>
        </div>
      </div>

      <InsightCard
        insight={{
          id: "metric-insight",
          title: "Metric Trends",
          description: insightText,
        }}
        className="animate-fade-up delay-500"
      />
    </section>
  );
}
