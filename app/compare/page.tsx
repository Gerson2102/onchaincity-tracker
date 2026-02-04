import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare countries side by side across OnchainCity Tracker metrics.",
};

export default function ComparePage() {
  return (
    <main id="main-content" className="relative">
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
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="card-soft p-12">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-lavender/40 flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full border border-stone/30" />
            </div>

            <h2 className="heading-serif text-2xl text-charcoal">
              Coming <span className="heading-serif-italic">Soon</span>
            </h2>

            <p className="mt-4 text-stone">
              The comparison tool is being developed. Soon you&apos;ll be able to
              select multiple countries and compare their performance across
              all six dimensions of our framework.
            </p>

            <Link
              href="/leaderboard"
              className="btn-pill btn-pill-outline mt-8"
            >
              View Rankings Instead
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
