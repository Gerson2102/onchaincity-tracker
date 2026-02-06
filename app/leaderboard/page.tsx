import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  LeaderboardContent,
  KeyInsights,
  AtAGlance,
  Spotlight,
  RegionalBreakdown,
  MetricAnalysis,
} from "@/components/leaderboard";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";

const data = countriesData as TrackerData;

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "See how countries rank across all OnchainCity Tracker metrics.",
};

function LeaderboardLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-4">
        <div className="h-10 w-32 bg-lavender/20 rounded-full" />
        <div className="h-10 w-32 bg-lavender/20 rounded-full" />
      </div>
      <div className="card-soft p-8 h-96 bg-lavender/10" />
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="heading-serif text-5xl sm:text-6xl text-charcoal animate-fade-up">
            Global <span className="heading-serif-italic">Rankings</span>
          </h1>
          <p className="mt-6 text-stone text-lg leading-relaxed max-w-xl mx-auto animate-fade-up delay-100">
            See how nations compare in building programmable, citizen-centric
            digital infrastructure.
          </p>
        </div>
      </section>

      {/* Insights Dashboard */}
      <section className="relative py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          <KeyInsights countries={data.countries} />
          <AtAGlance countries={data.countries} />
          <Spotlight countries={data.countries} />
          <RegionalBreakdown countries={data.countries} />
          <MetricAnalysis countries={data.countries} />
        </div>
      </section>

      {/* Full Rankings */}
      <section className="relative py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="heading-serif text-3xl text-charcoal mb-8">
            Full <span className="heading-serif-italic">Rankings</span>
          </h2>
          <Suspense fallback={<LeaderboardLoading />}>
            <LeaderboardContent countries={data.countries} />
          </Suspense>

          {/* Methodology note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted">
              Rankings are based on our six-dimension evaluation framework.{" "}
              <Link
                href="/about"
                className="text-stone hover:text-charcoal underline underline-offset-2 transition-colors"
              >
                Learn about our methodology
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
