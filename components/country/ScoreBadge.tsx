import type { ScoreTier } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getScoreTier, getScoreTierLabel } from "@/lib/utils/tracker";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "bar";
  showLabel?: boolean;
  className?: string;
}

const tierToCssClass: Record<ScoreTier, string> = {
  strong: "badge-rating-high",
  moderate: "badge-rating-medium",
  low: "badge-rating-low",
};

const tierToIndicatorClass: Record<ScoreTier, string> = {
  strong: "rating-indicator-high",
  moderate: "rating-indicator-medium",
  low: "rating-indicator-low",
};

export function ScoreBadge({
  score,
  size = "md",
  variant = "badge",
  showLabel = false,
  className,
}: ScoreBadgeProps) {
  const tier = getScoreTier(score);
  const label = getScoreTierLabel(tier);

  // Bar variant - vertical indicator with score
  if (variant === "bar") {
    return (
      <span
        className={cn(
          "rating-indicator",
          tierToIndicatorClass[tier],
          className
        )}
      >
        <span className="rating-indicator-bar" />
        <span>{score.toFixed(1)}</span>
      </span>
    );
  }

  // Badge variant - compact pill
  const sizeClasses = {
    sm: "text-[0.625rem] px-2 py-0.5",
    md: "badge-rating",
    lg: "badge-rating badge-rating-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold",
        sizeClasses[size],
        tierToCssClass[tier],
        className
      )}
      title={`${score.toFixed(1)} - ${label}`}
    >
      {score.toFixed(1)}
      {showLabel && <span className="ml-1 font-normal opacity-80">{label}</span>}
    </span>
  );
}
