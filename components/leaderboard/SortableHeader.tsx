"use client";

import type { SortDirection } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SortableHeaderProps {
  label: string;
  direction: SortDirection;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2.5L8.5 6.5H1.5L5 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L1.5 3.5H8.5L5 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SortableHeader({
  label,
  direction,
  isActive,
  onClick,
  className,
}: SortableHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 text-left font-medium transition-colors",
        "hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        isActive ? "text-charcoal" : "text-muted",
        className
      )}
      aria-label={`Sort by ${label}${isActive ? (direction === "asc" ? ", ascending" : ", descending") : ""}`}
    >
      <span className="label-subtle whitespace-nowrap">{label}</span>
      <span className="flex flex-col -my-1">
        <ChevronUp
          className={cn(
            "transition-opacity",
            isActive && direction === "asc" ? "opacity-100" : "opacity-30"
          )}
        />
        <ChevronDown
          className={cn(
            "transition-opacity -mt-0.5",
            isActive && direction === "desc" ? "opacity-100" : "opacity-30"
          )}
        />
      </span>
    </button>
  );
}
