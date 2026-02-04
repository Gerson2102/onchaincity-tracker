import type { Rating } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: Rating;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "bar";
  className?: string;
}

export function RatingBadge({
  rating,
  size = "md",
  variant = "badge",
  className
}: RatingBadgeProps) {
  // Bar variant - vertical indicator with label
  if (variant === "bar") {
    return (
      <span
        className={cn(
          "rating-indicator",
          `rating-indicator-${rating.toLowerCase()}`,
          className
        )}
      >
        <span className="rating-indicator-bar" />
        <span>{rating}</span>
      </span>
    );
  }

  // Badge variant - compact pill/rounded rect
  const sizeClasses = {
    sm: "text-[0.625rem] px-2 py-0.5",
    md: "badge-rating",
    lg: "badge-rating badge-rating-lg",
  };

  const ratingClasses = {
    High: "badge-rating-high",
    Medium: "badge-rating-medium",
    Low: "badge-rating-low",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold",
        sizeClasses[size],
        ratingClasses[rating],
        className
      )}
    >
      {rating}
    </span>
  );
}
