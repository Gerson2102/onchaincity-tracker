import Image from "next/image";
import type { Country } from "@/lib/types";
import { getFlagUrl } from "@/lib/utils";
import { ScoreBadge } from "./ScoreBadge";

interface CountryHeaderProps {
  country: Country;
  rank?: number;
  totalCountries?: number;
}

export function CountryHeader({ country, rank, totalCountries }: CountryHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Flag */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 animate-fade-up">
        <Image
          src={getFlagUrl(country.flag)}
          alt={`${country.name} flag`}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Country Name */}
      <h1 className="heading-serif text-5xl sm:text-6xl text-charcoal animate-fade-up delay-100">
        {country.name}
      </h1>

      {/* Region */}
      <p className="mt-4 text-stone text-lg animate-fade-up delay-200">
        {country.region}
      </p>

      {/* Overall Rank */}
      {rank !== undefined && (
        <div className="mt-6 flex flex-col items-center animate-fade-up delay-250">
          <span className="label-subtle">Overall Rank</span>
          <span className="inline-flex items-baseline" aria-label={`Ranked ${rank} of ${totalCountries ?? 20}`}>
            <span className="stat-display text-7xl sm:text-8xl text-accent">{rank}</span>
            <span className="text-xl sm:text-2xl text-muted font-light">/{totalCountries ?? 20}</span>
          </span>
        </div>
      )}

      {/* Overall Score Badge */}
      <div className="mt-5 animate-fade-up delay-300">
        <ScoreBadge score={country.overallScore} size="lg" showLabel />
      </div>
    </div>
  );
}
