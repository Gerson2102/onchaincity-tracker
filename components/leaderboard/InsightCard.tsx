import type { Insight } from "@/lib/types";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insight: Insight;
  className?: string;
}

export function InsightCard({ insight, className }: InsightCardProps) {
  return (
    <article
      className={cn(
        "card-soft p-6 relative overflow-hidden",
        className
      )}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <h3 className="label-subtle mb-3">{insight.title}</h3>
      <p className="text-stone text-sm leading-relaxed">
        {insight.description}
      </p>
    </article>
  );
}
