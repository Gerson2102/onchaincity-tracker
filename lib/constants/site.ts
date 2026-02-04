/**
 * Site-wide constants
 */
export const SITE_CONFIG = {
  name: "OnchainCity Tracker",
  description: "Discover the blockchain visualized.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://onchaincity.tracker",
} as const;
