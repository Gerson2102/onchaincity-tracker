/**
 * Mapping from TopoJSON numeric country codes (ISO 3166-1 numeric)
 * to our ISO alpha-3 country IDs used in countries.json
 */
export const TOPOJSON_TO_ISO: Record<string, string> = {
  // Europe
  "233": "EST", // Estonia
  "208": "DNK", // Denmark
  "246": "FIN", // Finland
  "826": "GBR", // United Kingdom
  "276": "DEU", // Germany

  // Asia-Pacific
  "702": "SGP", // Singapore
  "410": "KOR", // South Korea
  "392": "JPN", // Japan
  "036": "AUS", // Australia
  "356": "IND", // India
  "360": "IDN", // Indonesia
  "764": "THA", // Thailand

  // Americas
  "840": "USA", // United States
  "076": "BRA", // Brazil
  "052": "BRB", // Barbados
  "222": "SLV", // El Salvador

  // Middle East & Africa
  "784": "ARE", // United Arab Emirates
  "404": "KEN", // Kenya
  "566": "NGA", // Nigeria
  "834": "TZA", // Tanzania
};

/**
 * Reverse mapping: ISO alpha-3 to TopoJSON numeric
 */
export const ISO_TO_TOPOJSON: Record<string, string> = Object.fromEntries(
  Object.entries(TOPOJSON_TO_ISO).map(([key, value]) => [value, key])
);

/**
 * Check if a TopoJSON country code is tracked
 */
export function isTrackedCountry(topoJsonId: string): boolean {
  return topoJsonId in TOPOJSON_TO_ISO;
}

/**
 * Get ISO alpha-3 code from TopoJSON numeric code
 */
export function getIsoFromTopoJson(topoJsonId: string): string | undefined {
  return TOPOJSON_TO_ISO[topoJsonId];
}
