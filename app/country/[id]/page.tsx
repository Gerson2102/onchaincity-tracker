import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import countriesData from "@/data/countries.json";
import type { TrackerData, MetricKey } from "@/lib/types";
import { CountryHeader, MetricCard, MetricsRadar } from "@/components/country";

const data = countriesData as TrackerData;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return data.countries.map((country) => ({
    id: country.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const country = data.countries.find((c) => c.id === id);

  if (!country) {
    return {
      title: "Country Not Found",
    };
  }

  return {
    title: `${country.name} - OnchainCity Tracker`,
    description: `See how ${country.name} scores on programmability, interoperability, user sovereignty, and other digital infrastructure metrics.`,
  };
}

const metricKeys: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

export default async function CountryPage({ params }: PageProps) {
  const { id } = await params;
  const country = data.countries.find((c) => c.id === id);

  if (!country) {
    notFound();
  }

  return (
    <main id="main-content" className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone hover:text-charcoal transition-colors mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Map
          </Link>

          {/* Country Header */}
          <CountryHeader country={country} />
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Radar Chart */}
          <div className="card-soft p-8 mb-12 animate-fade-up">
            <h2 className="heading-serif text-2xl text-charcoal text-center mb-6">
              Performance Overview
            </h2>
            <MetricsRadar country={country} />
          </div>

          {/* Metric Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {metricKeys.map((key, index) => (
              <div
                key={key}
                className={`animate-fade-up delay-${(index + 1) * 100}`}
              >
                <MetricCard metricKey={key} score={country.metrics[key]} />
              </div>
            ))}
          </div>

          {/* Compare CTA */}
          <div className="mt-12 text-center animate-fade-up delay-600">
            <Link
              href={`/compare?countries=${country.id}`}
              className="btn-pill btn-pill-primary"
            >
              Compare with Other Countries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
