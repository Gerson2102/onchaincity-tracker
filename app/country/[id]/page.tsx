import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";
import { assignRanks, computeAllMetricRankings } from "@/lib/utils";
import { METRIC_KEYS_BY_PILLAR, PILLAR_DEFINITIONS, METRIC_DEFINITIONS } from "@/lib/constants/tracker";
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
    description: `See how ${country.name} scores across ten digital infrastructure indexes including e-government, digital identity, and crypto literacy.`,
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { id } = await params;
  const country = data.countries.find((c) => c.id === id);

  if (!country) {
    notFound();
  }

  // Compute overall rank
  const rankedCountries = assignRanks(data.countries);
  const overallRank = rankedCountries.find((c) => c.id === id)?.rank;

  // Compute per-metric rankings
  const metricRankings = computeAllMetricRankings(data.countries);
  const countryMetricRanks = metricRankings.get(id);

  const pillarEntries = Object.entries(METRIC_KEYS_BY_PILLAR) as Array<
    [keyof typeof PILLAR_DEFINITIONS, (keyof typeof METRIC_DEFINITIONS)[]]
  >;

  return (
    <main id="main-content" tabIndex={-1} className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-dreamy" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-stone">
              <li><Link href="/" className="hover:text-charcoal transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-muted">/</li>
              <li><Link href="/leaderboard" className="hover:text-charcoal transition-colors">Leaderboard</Link></li>
              <li aria-hidden="true" className="text-muted">/</li>
              <li aria-current="page" className="text-charcoal font-medium">{country.name}</li>
            </ol>
          </nav>

          {/* Country Header */}
          <CountryHeader country={country} rank={overallRank} totalCountries={data.countries.length} />
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative pt-12 pb-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Radar Chart */}
          <div className="card-soft p-8 mb-12 animate-fade-up">
            <h2 className="heading-serif text-2xl text-charcoal text-center mb-6">
              Performance Overview
            </h2>
            <MetricsRadar country={country} />
          </div>

          {/* Metric Cards grouped by Pillar */}
          {pillarEntries.map(([pillar, keys], pillarIndex) => (
            <div key={pillar} className="mb-12 last:mb-0">
              <h2 className="heading-serif text-2xl text-charcoal mb-2 animate-fade-up">
                {pillar}
              </h2>
              <p className="text-stone text-sm mb-6 animate-fade-up delay-50">
                {PILLAR_DEFINITIONS[pillar].description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {keys.map((key, index) => (
                  <div
                    key={key}
                    className={`animate-fade-up delay-${((pillarIndex * 3 + index + 1) % 5) * 100}`}
                  >
                    <MetricCard
                      metricKey={key}
                      score={country.metrics[key]}
                      metricRank={countryMetricRanks?.[key]}
                      totalCountries={data.countries.length}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

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
