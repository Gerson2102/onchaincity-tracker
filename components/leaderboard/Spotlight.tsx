import type { Country } from "@/lib/types";
import { getSpotlightData } from "@/lib/utils/analytics";
import { SpotlightCard } from "./SpotlightCard";

interface SpotlightProps {
  countries: Country[];
}

export function Spotlight({ countries }: SpotlightProps) {
  const spotlights = getSpotlightData(countries);

  if (spotlights.length === 0) return null;

  return (
    <div>
      <h2 className="heading-serif text-3xl text-charcoal mb-2 animate-fade-up">
        In the <span className="heading-serif-italic">Spotlight</span>
      </h2>
      <p className="text-stone mb-8 animate-fade-up delay-100">
        Countries leading the way in digital government transformation
      </p>

      {/* Desktop: 3-col grid, Mobile: horizontal scroll */}
      <div className="relative">
        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlights.map((spotlight, index) => (
            <SpotlightCard
              key={spotlight.country.id}
              data={spotlight}
              className={`animate-fade-up delay-${(index + 2) * 100}`}
            />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {spotlights.map((spotlight, index) => (
              <SpotlightCard
                key={spotlight.country.id}
                data={spotlight}
                className={`min-w-[280px] flex-shrink-0 animate-fade-up delay-${(index + 2) * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
