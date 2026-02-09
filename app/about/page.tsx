import type { Metadata } from "next";
import { PILLAR_DEFINITIONS, METRIC_KEYS_BY_PILLAR, METRIC_DEFINITIONS } from "@/lib/constants";
import type { Pillar } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the OnchainCity Tracker methodology and metrics.",
};

const pillarOrder: Pillar[] = ["Digital Government", "Legal & Financial", "Lifestyle & Mobility"];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal animate-fade-up">
            What is the{" "}
            <br />
            <span className="heading-serif-italic">OnchainCity</span> Tracker?
          </h1>
          <p className="mt-8 text-stone text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-up delay-100">
            A research initiative measuring how countries build digital
            infrastructure for the programmable future.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Section 1 */}
          <section id="overview" className="mb-20 animate-fade-up">
            <p className="text-stone text-lg leading-relaxed">
              Unlike traditional e-government indexes that focus on whether
              services are online, we measure whether digital systems give
              citizens genuine control.
            </p>
            <p className="mt-6 text-stone text-lg leading-relaxed">
              We evaluate ten indexes across three pillars:{" "}
              <strong className="text-charcoal">Digital Government</strong> (e-governance,
              digital identity, and data privacy),{" "}
              <strong className="text-charcoal">Legal &amp; Financial</strong> (crypto
              literacy, legal clarity, tax frameworks, and cross-border payments), and{" "}
              <strong className="text-charcoal">Lifestyle &amp; Mobility</strong> (digital
              nomad readiness, quality of life, and cost of living).
            </p>
            <p className="mt-6 text-stone text-lg leading-relaxed">
              The Tracker complements existing indexes like the UN E-Government
              Development Index (EGDI) and World Bank GovTech Maturity Index by
              measuring dimensions they don&apos;t capture: how well countries
              support global citizens through legal frameworks, financial
              infrastructure, and digital mobility.
            </p>
          </section>

          {/* Section 2: What We Measure — grouped by Pillar */}
          <section className="mb-20">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              Ten <span className="heading-serif-italic">Indexes</span>, Three Pillars
            </h2>

            <p className="text-stone leading-relaxed mb-10 animate-fade-up delay-100">
              We assess countries across ten indexes organized into three pillars
              that together capture the foundations of citizen-centric digital
              infrastructure.
            </p>

            <div className="space-y-10">
              {pillarOrder.map((pillar, pi) => {
                const pillarDef = PILLAR_DEFINITIONS[pillar];
                const keys = METRIC_KEYS_BY_PILLAR[pillar];

                return (
                  <div key={pillar} className="animate-fade-up" style={{ animationDelay: `${(pi + 2) * 100}ms` }}>
                    <h3 className="heading-serif text-xl text-charcoal mb-1">
                      {pillar}
                    </h3>
                    <p className="text-stone text-sm mb-4">
                      {pillarDef.description}
                    </p>
                    <div className="grid gap-3">
                      {keys.map((key) => {
                        const metric = METRIC_DEFINITIONS[key];
                        return (
                          <div
                            key={key}
                            className="card-soft p-5"
                          >
                            <h4 className="heading-serif text-lg text-charcoal">
                              {metric.displayName}
                            </h4>
                            <p className="mt-1.5 text-stone text-sm leading-relaxed">
                              {metric.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: What Existing Indexes Miss */}
          <section id="existing-indexes" className="mb-20">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              What Existing <span className="heading-serif-italic">Indexes Miss</span>
            </h2>

            <p className="text-stone text-lg leading-relaxed mb-6 animate-fade-up delay-100">
              Current global indexes measure digitization—whether forms are
              online, whether citizens can submit applications electronically.
              This is necessary but insufficient.
            </p>

            <p className="text-stone text-lg leading-relaxed mb-8 animate-fade-up delay-200">
              A country can score highly on UN EGDI while having:
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "No Crypto Framework",
                  desc: "No legal clarity for digital assets, leaving citizens and businesses in regulatory limbo",
                },
                {
                  label: "No Nomad Pathway",
                  desc: "No dedicated visa or tax framework for remote workers and global citizens",
                },
                {
                  label: "No Cross-Border Rails",
                  desc: "No efficient infrastructure for international payments and financial interoperability",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-soft p-5 border-l-4 border-rose animate-fade-up"
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <span className="heading-serif text-lg text-charcoal">{item.label}:</span>{" "}
                  <span className="text-stone">{item.desc}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-stone text-lg leading-relaxed animate-fade-up delay-600">
              The OnchainCity Tracker fills this gap by measuring infrastructure
              qualities that enable genuine digital transformation for global citizens.
            </p>
          </section>

          {/* Section 4: Methodology */}
          <section id="methodology" className="mb-20">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              <span className="heading-serif-italic">Methodology</span>
            </h2>

            <div className="space-y-6 text-stone text-lg leading-relaxed animate-fade-up delay-100">
              <p>
                Countries receive a score from{" "}
                <strong className="text-charcoal">0 to 10</strong>{" "}
                for each of the ten indexes. Scores map to three tiers:
              </p>
            </div>

            {/* Score scale */}
            <div className="card-soft p-6 mt-6 mb-8 animate-fade-up delay-200">
              <span className="label-subtle mb-4 block">Score Scale (0–10)</span>
              <div className="flex items-center gap-4">
                {[
                  { label: "Emerging (0-3.9)", color: "bg-rating-low" },
                  { label: "Developing (4-6.9)", color: "bg-rating-medium" },
                  { label: "High Performers (7-10)", color: "bg-rating-high" },
                ].map((tier, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-3 ${tier.color} rounded-full mb-2`} />
                    <span className="text-charcoal text-sm">{tier.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-stone text-lg leading-relaxed animate-fade-up delay-300">
              <p>
                The overall score is calculated as the average of all ten index
                scores. Rankings use tiebreakers: overall score, then total metric
                score, then count of High Performer metrics (≥ 7), then alphabetical name.
              </p>
              <p>
                Data is updated periodically as countries implement new systems.
                Scores reflect the current state of deployed infrastructure,
                not announced plans or pilots.
              </p>
            </div>
          </section>

          {/* Section 5: About OnchainCity */}
          <section id="about-onchaincity">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              About <span className="heading-serif-italic">OnchainCity</span>
            </h2>

            <div className="space-y-6 text-stone text-lg leading-relaxed animate-fade-up delay-100">
              <p>
                OnchainCity is a research and advocacy initiative focused on the
                intersection of blockchain technology and public infrastructure.
                We believe that cryptographic verification, programmable services,
                and user sovereignty should be foundational to how governments
                serve citizens in the digital age.
              </p>
              <p>
                Learn more at{" "}
                <a
                  href="https://onchain.city/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal underline underline-offset-4 hover:text-stone transition-colors"
                >
                  onchain.city
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
