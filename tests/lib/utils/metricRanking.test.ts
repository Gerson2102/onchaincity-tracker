import { describe, it, expect } from "vitest";
import type { Country, MetricKey } from "@/lib/types";
import {
  rankCountriesByMetric,
  computeAllMetricRankings,
  getCountryMetricRank,
} from "@/lib/utils/metricRanking";
import { ALL_METRIC_KEYS } from "@/lib/constants/tracker";
import countriesData from "@/data/countries.json";
import type { TrackerData } from "@/lib/types";

const data = countriesData as TrackerData;

function makeCountry(
  overrides: Partial<Country> & { id: string; name: string }
): Country {
  const defaults: Country = {
    id: overrides.id,
    name: overrides.name,
    region: "Europe",
    flag: "xx",
    overallScore: 5.0,
    metrics: {
      eGovServiceDepth: { score: 5.0, summary: "" },
      digitalIdentityInfra: { score: 5.0, summary: "" },
      govInteroperability: { score: 5.0, summary: "" },
      legalClarityDigitalAssets: { score: 5.0, summary: "" },
      stablecoinAdoption: { score: 5.0, summary: "" },
      onOffRampAccess: { score: 5.0, summary: "" },
      tokenizedRwaMaturity: { score: 5.0, summary: "" },
      crossBorderPayments: { score: 5.0, summary: "" },
      digitalNomadFriendliness: { score: 5.0, summary: "" },
      cryptoDigitalLiteracy: { score: 5.0, summary: "" },
    },
  };
  return {
    ...defaults,
    ...overrides,
    metrics: { ...defaults.metrics, ...overrides.metrics },
  };
}

describe("rankCountriesByMetric", () => {
  it("ranks higher scores first", () => {
    const countries: Country[] = [
      makeCountry({
        id: "LOW",
        name: "LowLand",
        metrics: { eGovServiceDepth: { score: 2.0, summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "HIGH",
        name: "HighLand",
        metrics: { eGovServiceDepth: { score: 9.0, summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "MED",
        name: "MedLand",
        metrics: { eGovServiceDepth: { score: 5.5, summary: "" } } as Country["metrics"],
      }),
    ];

    const ranked = rankCountriesByMetric(countries, "eGovServiceDepth");
    expect(ranked[0]).toEqual({ countryId: "HIGH", rank: 1 });
    expect(ranked[1]).toEqual({ countryId: "MED", rank: 2 });
    expect(ranked[2]).toEqual({ countryId: "LOW", rank: 3 });
  });

  it("breaks ties by overall score (desc)", () => {
    const countries: Country[] = [
      makeCountry({
        id: "A",
        name: "Alpha",
        overallScore: 5.5,
        metrics: { eGovServiceDepth: { score: 8.0, summary: "" } } as Country["metrics"],
      }),
      makeCountry({
        id: "B",
        name: "Beta",
        overallScore: 7.5,
        metrics: { eGovServiceDepth: { score: 8.0, summary: "" } } as Country["metrics"],
      }),
    ];

    const ranked = rankCountriesByMetric(countries, "eGovServiceDepth");
    expect(ranked[0].countryId).toBe("B");
    expect(ranked[1].countryId).toBe("A");
  });

  it("breaks ties by total metric score (desc)", () => {
    const a = makeCountry({
      id: "A",
      name: "Alpha",
      overallScore: 7.0,
    });
    // A has all metrics at 5.0 (total = 50)

    const b = makeCountry({
      id: "B",
      name: "Beta",
      overallScore: 7.0,
      metrics: {
        eGovServiceDepth: { score: 5.0, summary: "" },
        digitalIdentityInfra: { score: 8.0, summary: "" },
        govInteroperability: { score: 8.0, summary: "" },
        legalClarityDigitalAssets: { score: 5.0, summary: "" },
        stablecoinAdoption: { score: 5.0, summary: "" },
        onOffRampAccess: { score: 5.0, summary: "" },
        tokenizedRwaMaturity: { score: 5.0, summary: "" },
        crossBorderPayments: { score: 5.0, summary: "" },
        digitalNomadFriendliness: { score: 5.0, summary: "" },
        cryptoDigitalLiteracy: { score: 5.0, summary: "" },
      },
    });
    // B has total = 56

    // Both have same eGovServiceDepth (5.0) and same overall (7.0)
    const ranked = rankCountriesByMetric([a, b], "eGovServiceDepth");
    expect(ranked[0].countryId).toBe("B"); // higher total metric score
    expect(ranked[1].countryId).toBe("A");
  });

  it("falls back to alphabetical for fully equal countries", () => {
    const a = makeCountry({ id: "ZZZ", name: "Zeta" });
    const b = makeCountry({ id: "AAA", name: "Alpha" });

    const ranked = rankCountriesByMetric([a, b], "eGovServiceDepth");
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

    const ranked = rankCountriesByMetric(countries, "eGovServiceDepth");
    const ranks = ranked.map((r) => r.rank);
    expect(ranks).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("computeAllMetricRankings", () => {
  it("returns entries for all countries with all 10 metrics", () => {
    const countries = [
      makeCountry({ id: "A", name: "Alpha" }),
      makeCountry({ id: "B", name: "Beta" }),
      makeCountry({ id: "C", name: "Gamma" }),
    ];

    const rankings = computeAllMetricRankings(countries);
    expect(rankings.size).toBe(3);

    for (const [, ranks] of rankings) {
      for (const key of ALL_METRIC_KEYS) {
        expect(ranks[key]).toBeGreaterThanOrEqual(1);
        expect(ranks[key]).toBeLessThanOrEqual(3);
      }
    }
  });

  it("produces unique ranks 1-20 for each metric with full dataset", () => {
    const rankings = computeAllMetricRankings(data.countries);
    expect(rankings.size).toBe(20);

    for (const metricKey of ALL_METRIC_KEYS) {
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
    const estRank = getCountryMetricRank(rankings, "EST", "eGovServiceDepth");
    expect(estRank).toBeGreaterThanOrEqual(1);
    expect(estRank).toBeLessThanOrEqual(20);
  });

  it("returns undefined for an unknown country", () => {
    const rankings = computeAllMetricRankings(data.countries);
    const rank = getCountryMetricRank(rankings, "UNKNOWN", "eGovServiceDepth");
    expect(rank).toBeUndefined();
  });
});
