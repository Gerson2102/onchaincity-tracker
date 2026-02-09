import type { MetricKey, Pillar, ScoreTier } from "@/lib/types";

export const SCORE_TIER_COLORS: Record<ScoreTier, string> = {
  low: "#BE185D",
  moderate: "#D97706",
  strong: "#115E59",
};

export const SCORE_TIER_BG_COLORS: Record<ScoreTier, string> = {
  low: "rgba(190, 24, 93, 0.12)",
  moderate: "rgba(217, 119, 6, 0.12)",
  strong: "rgba(17, 94, 89, 0.12)",
};

export const METRIC_DEFINITIONS: Record<
  MetricKey,
  { displayName: string; description: string }
> = {
  eGovServiceDepth: {
    displayName: "eGovernment Service Depth",
    description: "How digitized and accessible are core public services? Measures online service delivery, digital portals, and paperless processes.",
  },
  digitalIdentityInfra: {
    displayName: "Digital Identity Infrastructure",
    description: "Can citizens use a single digital ID across government and private services? Measures ID coverage, reusability, and biometric/SSO infrastructure.",
  },
  govInteroperability: {
    displayName: "Gov. Interoperability",
    description: "Can government systems exchange data seamlessly? Measures cross-agency data sharing, API ecosystems, and standards adoption.",
  },
  legalClarityDigitalAssets: {
    displayName: "Legal Clarity for Digital Assets",
    description: "Is there a clear regulatory framework for digital assets and blockchain? Measures licensing regimes, legal definitions, and regulatory certainty.",
  },
  stablecoinAdoption: {
    displayName: "Stablecoin Presence & Adoption",
    description: "How prevalent are stablecoins in the local economy? Measures regulatory acceptance, merchant adoption, and stablecoin payment volumes.",
  },
  onOffRampAccess: {
    displayName: "On/Off-Ramp Accessibility",
    description: "How easy is it to convert between fiat and crypto? Measures licensed exchange availability, banking integration, and supported payment methods.",
  },
  tokenizedRwaMaturity: {
    displayName: "Tokenized RWA Maturity",
    description: "How advanced is the country in tokenizing real-world assets? Measures regulatory frameworks for security tokens, real estate tokenization, and institutional adoption.",
  },
  crossBorderPayments: {
    displayName: "Cross-Border Payments",
    description: "How easy is it to send and receive money internationally? Measures remittance costs, payment rail infrastructure, and crypto-enabled cross-border transfers.",
  },
  digitalNomadFriendliness: {
    displayName: "Digital Nomad Friendliness",
    description: "Does the country offer visa programs and infrastructure for remote workers? Measures nomad visas, coworking density, and internet quality.",
  },
  cryptoDigitalLiteracy: {
    displayName: "Crypto & Digital Literacy",
    description: "How familiar is the population with digital assets and blockchain? Measures crypto adoption rates, blockchain awareness, and Web3 developer activity.",
  },
};

export const METRIC_SHORT_NAMES: Record<MetricKey, string> = {
  eGovServiceDepth: "e-Gov",
  digitalIdentityInfra: "Identity",
  govInteroperability: "Interop",
  legalClarityDigitalAssets: "Legal",
  stablecoinAdoption: "Stablecoin",
  onOffRampAccess: "On/Off-Ramp",
  tokenizedRwaMaturity: "RWA",
  crossBorderPayments: "Payments",
  digitalNomadFriendliness: "Nomad",
  cryptoDigitalLiteracy: "Literacy",
};

export const PILLAR_DEFINITIONS: Record<
  Pillar,
  { description: string }
> = {
  "Digital Government": {
    description: "How effectively a country delivers digital public services, identity systems, and cross-agency interoperability.",
  },
  "Legal & Financial": {
    description: "Regulatory clarity for digital assets, stablecoin infrastructure, fiat-crypto ramps, and tokenized real-world assets.",
  },
  "Lifestyle & Mobility": {
    description: "Cross-border payment access, openness to remote workers, and population-level crypto literacy.",
  },
};

export const METRIC_PILLARS: Record<MetricKey, Pillar> = {
  eGovServiceDepth: "Digital Government",
  digitalIdentityInfra: "Digital Government",
  govInteroperability: "Digital Government",
  legalClarityDigitalAssets: "Legal & Financial",
  stablecoinAdoption: "Legal & Financial",
  onOffRampAccess: "Legal & Financial",
  tokenizedRwaMaturity: "Legal & Financial",
  crossBorderPayments: "Lifestyle & Mobility",
  digitalNomadFriendliness: "Lifestyle & Mobility",
  cryptoDigitalLiteracy: "Lifestyle & Mobility",
};

export const METRIC_KEYS_BY_PILLAR: Record<Pillar, MetricKey[]> = {
  "Digital Government": ["eGovServiceDepth", "digitalIdentityInfra", "govInteroperability"],
  "Legal & Financial": ["legalClarityDigitalAssets", "stablecoinAdoption", "onOffRampAccess", "tokenizedRwaMaturity"],
  "Lifestyle & Mobility": ["crossBorderPayments", "digitalNomadFriendliness", "cryptoDigitalLiteracy"],
};

export const ALL_METRIC_KEYS: MetricKey[] = [
  "eGovServiceDepth",
  "digitalIdentityInfra",
  "govInteroperability",
  "legalClarityDigitalAssets",
  "stablecoinAdoption",
  "onOffRampAccess",
  "tokenizedRwaMaturity",
  "crossBorderPayments",
  "digitalNomadFriendliness",
  "cryptoDigitalLiteracy",
];

export const REGIONS = [
  "Europe",
  "Asia-Pacific",
  "Americas",
  "Middle East & Africa",
] as const;

export type Region = (typeof REGIONS)[number];

export const BRAND_COLORS = {
  primary: "#6B46C1",
  background: "#0F0D1A",
  surface: "#1A1A2E",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
} as const;

export const COMPARISON_COLORS = [
  { name: "Teal", hex: "#0D9488", rgb: "13, 148, 136" },
  { name: "Amber", hex: "#D97706", rgb: "217, 119, 6" },
  { name: "Purple", hex: "#7C3AED", rgb: "124, 58, 237" },
  { name: "Pink", hex: "#DB2777", rgb: "219, 39, 119" },
] as const;
