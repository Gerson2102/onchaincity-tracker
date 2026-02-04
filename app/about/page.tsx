import type { Metadata } from "next";
import { METRIC_DEFINITIONS } from "@/lib/constants";
import type { MetricKey } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the OnchainCity Tracker methodology and metrics.",
};

const metricKeys = Object.keys(METRIC_DEFINITIONS) as MetricKey[];

export default function AboutPage() {
  return (
    <main id="main-content" className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal animate-fade-up">
            What is the
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
          <section className="mb-20 animate-fade-up">
            <p className="text-stone text-lg leading-relaxed">
              Unlike traditional e-government indexes that focus on whether
              services are online, we measure whether digital systems give
              citizens genuine control.
            </p>
            <p className="mt-6 text-stone text-lg leading-relaxed">
              We evaluate three core principles:{" "}
              <strong className="text-charcoal">programmability</strong> (can
              services be automated and composed?),{" "}
              <strong className="text-charcoal">interoperability</strong> (can
              data flow where citizens need it?), and{" "}
              <strong className="text-charcoal">user sovereignty</strong> (do
              citizens control their own data?).
            </p>
            <p className="mt-6 text-stone text-lg leading-relaxed">
              The Tracker complements existing indexes like the UN E-Government
              Development Index (EGDI) and World Bank GovTech Maturity Index by
              measuring dimensions they don&apos;t capture: whether infrastructure
              has memory, whether services expose APIs, and whether records are
              cryptographically verifiable.
            </p>
          </section>

          {/* Section 2: What We Measure */}
          <section className="mb-20">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              The Six <span className="heading-serif-italic">Dimensions</span>
            </h2>

            <p className="text-stone leading-relaxed mb-10 animate-fade-up delay-100">
              We assess countries across six dimensions that together capture
              the foundations of programmable, citizen-centric digital
              infrastructure.
            </p>

            <div className="grid gap-4">
              {metricKeys.map((key, i) => {
                const metric = METRIC_DEFINITIONS[key];
                return (
                  <div
                    key={key}
                    className="card-soft p-6 animate-fade-up"
                    style={{ animationDelay: `${(i + 2) * 100}ms` }}
                  >
                    <h3 className="heading-serif text-xl text-charcoal">
                      {metric.displayName}
                    </h3>
                    <p className="mt-2 text-stone text-sm leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: What Existing Indexes Miss */}
          <section className="mb-20">
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
                  label: "No Memory",
                  desc: "Citizens must re-verify their identity for every service, with no context continuity",
                },
                {
                  label: "No APIs",
                  desc: "Services cannot be automated or composed by third parties",
                },
                {
                  label: "No Verification",
                  desc: "Records exist only as database entries that could be silently altered",
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
              qualities that enable genuine digital transformation.
            </p>
          </section>

          {/* Section 4: Methodology */}
          <section className="mb-20">
            <h2 className="heading-serif text-3xl sm:text-4xl text-charcoal mb-8 animate-fade-up">
              <span className="heading-serif-italic">Methodology</span>
            </h2>

            <div className="space-y-6 text-stone text-lg leading-relaxed animate-fade-up delay-100">
              <p>
                Countries receive qualitative ratings of{" "}
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rating-low" />
                  <strong className="text-charcoal">Low</strong>
                </span>
                ,{" "}
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rating-medium" />
                  <strong className="text-charcoal">Medium</strong>
                </span>
                , or{" "}
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rating-high" />
                  <strong className="text-charcoal">High</strong>
                </span>{" "}
                for each of the six metrics.
              </p>
              <p>
                The overall rating is calculated as the average of all six metric
                ratings, converted back to a Low/Medium/High scale.
              </p>
              <p>
                Data is updated periodically as countries implement new systems.
                Ratings reflect the current state of deployed infrastructure,
                not announced plans or pilots.
              </p>
            </div>

            {/* Rating scale */}
            <div className="card-soft p-6 mt-8 animate-fade-up delay-200">
              <span className="label-subtle mb-4 block">Rating Scale</span>
              <div className="flex items-center gap-4">
                {[
                  { label: "Low", color: "bg-rating-low" },
                  { label: "Medium", color: "bg-rating-medium" },
                  { label: "High", color: "bg-rating-high" },
                ].map((rating, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-3 ${rating.color} rounded-full mb-2`} />
                    <span className="text-charcoal text-sm">{rating.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: About OnchainCity */}
          <section>
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
