import Image from "next/image";
import type { Country } from "@/lib/types";
import { getFlagUrl } from "@/lib/utils";
import { RatingBadge } from "./RatingBadge";

interface CountryHeaderProps {
  country: Country;
}

export function CountryHeader({ country }: CountryHeaderProps) {
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

      {/* Overall Rating Badge */}
      <div className="mt-4 animate-fade-up delay-300">
        <RatingBadge rating={country.overallRating} size="lg" />
      </div>
    </div>
  );
}
