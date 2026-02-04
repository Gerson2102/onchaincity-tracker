import type { Rating, MetricKey } from "@/lib/types";

export const RATING_COLORS: Record<Rating, string> = {
  Low: "#EF4444",
  Medium: "#F59E0B",
  High: "#10B981",
};

export const RATING_BG_COLORS: Record<Rating, string> = {
  Low: "rgba(239, 68, 68, 0.15)",
  Medium: "rgba(245, 158, 11, 0.15)",
  High: "rgba(16, 185, 129, 0.15)",
};

export const METRIC_DEFINITIONS: Record<
  MetricKey,
  { displayName: string; description: string }
> = {
  contextContinuity: {
    displayName: "Context Continuity",
    description: "Can citizens reuse verified identity across services?",
  },
  userSovereignty: {
    displayName: "User Sovereignty & Privacy",
    description: "Who controls citizen data? Is consent granular?",
  },
  serviceProgrammability: {
    displayName: "Service Programmability",
    description: "Are services API-driven and automatable?",
  },
  interoperability: {
    displayName: "Interoperability Readiness",
    description: "Can data flow between agencies?",
  },
  verifiableInfrastructure: {
    displayName: "Verifiable Infrastructure",
    description: "Are records cryptographically verifiable?",
  },
  digitalAssetMaturity: {
    displayName: "Digital Asset & Registry Maturity",
    description: "Are registries digital?",
  },
};

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

export const METRIC_SHORT_NAMES: Record<MetricKey, string> = {
  contextContinuity: "Context",
  userSovereignty: "Sovereignty",
  serviceProgrammability: "Programmability",
  interoperability: "Interoperability",
  verifiableInfrastructure: "Verifiable",
  digitalAssetMaturity: "Digital Assets",
};

export const COMPARISON_COLORS = [
  { name: "Teal", hex: "#0D9488", rgb: "13, 148, 136" },
  { name: "Amber", hex: "#D97706", rgb: "217, 119, 6" },
  { name: "Purple", hex: "#7C3AED", rgb: "124, 58, 237" },
  { name: "Pink", hex: "#DB2777", rgb: "219, 39, 119" },
] as const;
