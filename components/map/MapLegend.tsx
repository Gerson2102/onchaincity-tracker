import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
}

const legendItems = [
  { label: "High", color: "#115E59" },
  { label: "Medium", color: "#D97706" },
  { label: "Low", color: "#BE185D" },
  { label: "Not tracked", color: "#E8E4E0", muted: true },
];

export function MapLegend({ className }: MapLegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className={cn("text-sm", item.muted ? "text-muted" : "text-stone")}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
