import type { ScoreTier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  scoreTier?: ScoreTier;
  className?: string;
}

const tierColorClasses: Record<ScoreTier, string> = {
  strong: "text-[var(--color-rating-high)]",
  moderate: "text-[#B45309] font-medium",
  low: "text-[var(--color-rating-low)]",
};

export function StatCard({ label, value, scoreTier, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "stat-display text-5xl mb-2",
          scoreTier ? tierColorClasses[scoreTier] : "text-charcoal"
        )}
      >
        {value}
      </p>
      <p className="label-subtle">{label}</p>
    </div>
  );
}
