import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareContent } from "@/components/compare";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare countries side by side across OnchainCity Tracker metrics.",
};

function CompareLoading() {
  return (
    <div className="space-y-12">
      {/* Selector skeleton */}
      <div className="card-soft p-6 animate-pulse">
        <div className="h-6 w-40 bg-lavender/30 rounded mb-4" />
        <div className="h-12 bg-lavender/20 rounded" />
      </div>

      {/* Content skeleton */}
      <div className="card-soft p-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-lavender/20 mb-6" />
        <div className="h-6 w-48 bg-lavender/30 rounded mx-auto mb-2" />
        <div className="h-4 w-80 bg-lavender/20 rounded mx-auto" />
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="heading-serif text-5xl sm:text-6xl text-charcoal animate-fade-up">
            Compare <span className="heading-serif-italic">Countries</span>
          </h1>
          <p className="mt-6 text-stone text-lg leading-relaxed max-w-xl mx-auto animate-fade-up delay-100">
            Analyze nations side-by-side to understand their digital
            infrastructure strengths and trade-offs.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Suspense fallback={<CompareLoading />}>
            <CompareContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
