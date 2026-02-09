import Link from "next/link";
import Image from "next/image";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { WorldMap, MapLegend } from "@/components/map";
import { SearchBar } from "@/components/search";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";

const data = countriesData as TrackerData;

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="relative">
      {/* Hero Section - Asymmetric with large accent number */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient background with noise */}
        <div className="absolute inset-0 gradient-dreamy noise-overlay" />

        {/* Soft cloud overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 clouds-bg" />

        {/* Large decorative number */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
          <span className="stat-hero" aria-hidden="true">20</span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          {/* Asymmetric layout - text left aligned on large screens */}
          <div className="max-w-3xl lg:max-w-2xl lg:ml-0">
            {/* Main heading with staggered animation */}
            <h1>
              <span className="block heading-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal animate-fade-up">
                A home for
              </span>
              <span className="block heading-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal animate-slide-left delay-50">
                global{" "}
                <span className="heading-serif-italic text-accent animate-fade-in delay-180">citizens</span>
              </span>
            </h1>

            {/* Subtitle with accent divider */}
            <div className="mt-10 animate-fade-up delay-300">
              <div className="divider-accent mb-6" />
              <p className="text-stone text-lg sm:text-xl leading-relaxed max-w-xl">
                Simplifying access for internet citizens to global government
                services with programmable & cryptographically secure systems.
              </p>
            </div>

            {/* CTA Buttons - Primary action stands out */}
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-350">
              <Link href="/leaderboard" className="btn-pill btn-pill-primary btn-pill-sweep animate-fade-up delay-250">
                View Rankings
              </Link>
              <Link href="/about" className="btn-pill btn-pill-outline animate-fade-up delay-350">
                Read Manifesto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Map Section - Full width feel */}
      <section className="relative py-28 lg:py-36 bg-ivory noise-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header - left aligned */}
          <div className="max-w-2xl mb-12">
            <span className="label-accent animate-fade-in">Explore</span>
            <h2 className="heading-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-3 animate-slide-left delay-100">
              The World at a Glance
            </h2>
            <p className="mt-4 text-stone text-lg animate-fade-up delay-200">
              Discover how nations score on digital infrastructure.
              Click any highlighted country to see their full profile.
            </p>
          </div>

          {/* Search Bar - higher z-index for dropdown visibility */}
          <div className="max-w-md mb-8 animate-fade-up delay-300 relative z-20">
            <SearchBar variant="full" />
          </div>

          {/* Map Container - lower z-index so search dropdown appears above */}
          <div className="card-soft p-4 sm:p-6 lg:p-8 animate-scale-in delay-400 relative z-10">
            <ClientOnly
              fallback={
                <div className="w-full aspect-[2/1] flex items-center justify-center bg-ivory/50 rounded-xl">
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading map...</span>
                  </div>
                </div>
              }
            >
              <WorldMap countries={data.countries} />
            </ClientOnly>

            {/* Legend */}
            <div className="mt-6 flex justify-center">
              <MapLegend />
            </div>
          </div>
        </div>
      </section>

      {/* Global Demand Section - More dynamic layout */}
      <section className="relative py-20 lg:py-28 bg-cream noise-overlay overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text content */}
            <div className="lg:sticky lg:top-32 animate-slide-left">
              <span className="label-accent">Why This Matters</span>
              <h2 className="heading-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-3">
                Global Demand from{" "}
                <span className="heading-serif-italic text-accent">Citizens</span>
              </h2>
              <p className="mt-6 text-stone text-lg leading-relaxed max-w-lg">
                The call for a new model of governance is growing louder.
                Millions from all over the world are seeking easier access
                to visas, banking, and identity solutions.
              </p>

              {/* Country flags with stagger */}
              <div className="mt-8 flex items-center gap-3">
                {["ee", "sg", "ae", "jp", "gb"].map((flag, i) => (
                  <div
                    key={flag}
                    className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md animate-scale-in"
                    style={{ animationDelay: `${400 + i * 100}ms` }}
                  >
                    <Image
                      src={`https://flagcdn.com/w80/${flag}.png`}
                      alt=""
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <span className="text-muted text-sm ml-2">+15 more</span>
              </div>
            </div>

            {/* Feature cards - staggered grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Digital Identity Infrastructure",
                  desc: "Secure, portable digital IDs that work across borders and services",
                  delay: "delay-120"
                },
                {
                  title: "Legal Clarity for Digital Assets",
                  desc: "Clear frameworks for digital assets, smart contracts, and DAOs",
                  delay: "delay-250"
                },
                {
                  title: "Stablecoin Adoption",
                  desc: "Growing stablecoin presence powering commerce and cross-border transfers",
                  delay: "delay-350"
                },
                {
                  title: "Tokenized RWA Maturity",
                  desc: "Real-world assets on-chain — real estate, bonds, and equities tokenized at scale",
                  delay: "delay-450"
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`card-soft p-6 animate-fade-up ${item.delay}`}
                >
                  <h3 className="heading-serif text-xl text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-stone text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold and clear */}
      <section className="relative py-28 lg:py-40 clouds-bg bg-ivory overflow-hidden noise-overlay">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="label-accent animate-fade-in">Get Started</span>

          <h2 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal mt-4 animate-fade-up delay-100">
            Create The Future With
            <br />
            <span className="heading-serif-italic text-accent">Onchain City</span>
          </h2>

          <p className="mt-6 text-stone text-lg max-w-xl mx-auto animate-fade-up delay-200">
            Explore how nations are building programmable infrastructure
            for global citizens.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/leaderboard" className="btn-pill btn-pill-primary btn-pill-sweep animate-fade-up delay-250">
              View Leaderboard
            </Link>
            <Link href="/compare" className="btn-pill btn-pill-outline animate-fade-up delay-350">
              Compare Countries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
