import { describe, it, expect } from "vitest";
import type { Country, MetricKey } from "@/lib/types";
import {
  rankCountriesByMetric,
  computeAllMetricRankings,
  getCountryMetricRank,
} from "@/lib/utils/metricRanking";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";

const data = countriesData as TrackerData;

const METRIC_KEYS: MetricKey[] = [
  "contextContinuity",
  "userSovereignty",
  "serviceProgrammability",
  "interoperability",
  "verifiableInfrastructure",
  "digitalAssetMaturity",
];

function makeCountry(
  overrides: Partial<Country> & { id: string; name: string }
): Country {
  const defaults: Country = {
    id: overrides.id,
    name: overrides.name,
    region: "Europe",
    flag: "xx",
    overallRating: "Medium",
    metrics: {
      contextContinuity: { rating: "Medium", summary: "" },
      userSovereignty: { rating: "Medium", summary: "" },
      serviceProgrammability: { rating: "Medium", summary: "" },
      interoperability: { rating: "Medium", summary: "" },
      verifiableInfrastructure: { rating: "Medium", summary: "" },
      digitalAssetMaturity: { rating: "Medium", summary: "" },
    },
  };
  return {
    ...defaults,
    ...overrides,
    metrics: { ...defaults.metrics, ...overrides.metrics },
  };
}

describe("rankCountriesByMetric", () => {
  it("ranks High > Medium > Low", () => {
    const countries: Country[] = [
      makeCountry({
        id: "LOW",
        name: "LowLand",
        metrics: { contextContinuity: { rating: "Low", summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "HIGH",
        name: "HighLand",
        metrics: { contextContinuity: { rating: "High", summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "MED",
        name: "MedLand",
        metrics: { contextContinuity: { rating: "Medium", summary: "" } } as Country["metrics"],
      }),
    ];

    const ranked = rankCountriesByMetric(countries, "contextContinuity");
    expect(ranked[0]).toEqual({ countryId: "HIGH", rank: 1 });
    expect(ranked[1]).toEqual({ countryId: "MED", rank: 2 });
    expect(ranked[2]).toEqual({ countryId: "LOW", rank: 3 });
  });

  it("breaks ties by overall rating (desc)", () => {
    const countries: Country[] = [
      makeCountry({
        id: "A",
        name: "Alpha",
        overallRating: "Medium",
        metrics: { contextContinuity: { rating: "High", summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "B",
        name: "Beta",
        overallRating: "High",
        metrics: { contextContinuity: { rating: "High", summary: "" } } as Country["metrics"],
      }),
    ];

    const ranked = rankCountriesByMetric(countries, "contextContinuity");
    expect(ranked[0].countryId).toBe("B");
    expect(ranked[1].countryId).toBe("A");
  });

  it("breaks ties by high metric count (desc)", () => {
    const a = makeCountry({
      id: "A",
      name: "Alpha",
      overallRating: "High",
    });
    // A has 0 High metrics (all Medium from defaults)

    const b = makeCountry({
      id: "B",
      name: "Beta",
      overallRating: "High",
      metrics: {
        contextContinuity: { rating: "Medium", summary: "" },
        userSovereignty: { rating: "High", summary: "" },
        serviceProgrammability: { rating: "High", summary: "" },
        interoperability: { rating: "Medium", summary: "" },
        verifiableInfrastructure: { rating: "Medium", summary: "" },
        digitalAssetMaturity: { rating: "Medium", summary: "" },
      },
    });
    // B has 2 High metrics

    // Both have same contextContinuity (Medium) and same overall (High)
    const ranked = rankCountriesByMetric([a, b], "contextContinuity");
    expect(ranked[0].countryId).toBe("B"); // more High metrics
    expect(ranked[1].countryId).toBe("A");
  });

  it("falls back to alphabetical for fully equal countries", () => {
    const a = makeCountry({ id: "ZZZ", name: "Zeta" });
    const b = makeCountry({ id: "AAA", name: "Alpha" });

    const ranked = rankCountriesByMetric([a, b], "contextContinuity");
    expect(ranked[0].countryId).toBe("AAA"); // Alpha < Zeta
    expect(ranked[1].countryId).toBe("ZZZ");
  });

  it("produces sequential ranks 1..N with no gaps", () => {
    const countries = [
      makeCountry({ id: "A", name: "A" }),
      makeCountry({ id: "B", name: "B" }),
      makeCountry({ id: "C", name: "C" }),
      makeCountry({ id: "D", name: "D" }),
      makeCountry({ id: "E", name: "E" }),
    ];

    const ranked = rankCountriesByMetric(countries, "contextContinuity");
    const ranks = ranked.map((r) => r.rank);
    expect(ranks).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("computeAllMetricRankings", () => {
  it("returns entries for all countries with all 6 metrics", () => {
    const countries = [
      makeCountry({ id: "A", name: "Alpha" }),
      makeCountry({ id: "B", name: "Beta" }),
      makeCountry({ id: "C", name: "Gamma" }),
    ];

    const rankings = computeAllMetricRankings(countries);
    expect(rankings.size).toBe(3);

    for (const [, ranks] of rankings) {
      for (const key of METRIC_KEYS) {
        expect(ranks[key]).toBeGreaterThanOrEqual(1);
        expect(ranks[key]).toBeLessThanOrEqual(3);
      }
    }
  });

  it("produces unique ranks 1-20 for each metric with full dataset", () => {
    const rankings = computeAllMetricRankings(data.countries);
    expect(rankings.size).toBe(20);

    for (const metricKey of METRIC_KEYS) {
      const ranks = Array.from(rankings.values()).map((r) => r[metricKey]);
      ranks.sort((a, b) => a - b);
      expect(ranks).toEqual(
        Array.from({ length: 20 }, (_, i) => i + 1)
      );
    }
  });
});

describe("getCountryMetricRank", () => {
  it("returns the correct rank for a known country and metric", () => {
    const rankings = computeAllMetricRankings(data.countries);
    const estRank = getCountryMetricRank(rankings, "EST", "contextContinuity");
    expect(estRank).toBeGreaterThanOrEqual(1);
    expect(estRank).toBeLessThanOrEqual(20);
  });

  it("returns undefined for an unknown country", () => {
    const rankings = computeAllMetricRankings(data.countries);
    const rank = getCountryMetricRank(rankings, "UNKNOWN", "contextContinuity");
    expect(rank).toBeUndefined();
  });
});
