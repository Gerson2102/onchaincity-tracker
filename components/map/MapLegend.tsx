import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
}

const legendItems = [
  { label: "High Performers (7-10)", color: "#115E59" },
  { label: "Developing (4-6)", color: "#D97706" },
  { label: "Emerging (0-3)", color: "#BE185D" },
  { label: "Not tracked", color: "#E8E4E0", muted: true },
];

export function MapLegend({ className }: MapLegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full"
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
