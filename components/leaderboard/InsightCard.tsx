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

      <p className="label-subtle mb-3">{insight.title}</p>
      <p className="text-stone text-sm leading-relaxed">
        {insight.description}
      </p>
    </article>
  );
}
