import type { Rating } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  rating?: Rating;
  className?: string;
}

const ratingColorClasses: Record<Rating, string> = {
  High: "text-[var(--color-rating-high)]",
  Medium: "text-[#B45309] font-medium",
  Low: "text-[var(--color-rating-low)]",
};

export function StatCard({ label, value, rating, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "stat-display text-5xl mb-2",
          rating ? ratingColorClasses[rating] : "text-charcoal"
        )}
      >
        {value}
      </p>
      <p className="label-subtle">{label}</p>
    </div>
  );
}
