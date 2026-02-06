"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { Country } from "@/lib/types";
import { TOPOJSON_TO_ISO, isTrackedCountry } from "@/lib/countryCodeMap";
import { MapControls } from "./MapControls";
import { CountryTooltip } from "./CountryTooltip";

interface WorldMapProps {
  countries: Country[];
}

const geoUrl = "/world-110m.json";

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const DEFAULT_CENTER: [number, number] = [0, 20];

function getRatingColor(rating: string, hovered: boolean): string {
  const opacity = hovered ? 0.85 : 0.55;
  switch (rating) {
    case "High":
      // Teal - #115E59
      return `rgba(17, 94, 89, ${opacity})`;
    case "Medium":
      // Amber - #D97706
      return `rgba(217, 119, 6, ${opacity})`;
    case "Low":
      // Rose - #BE185D
      return `rgba(190, 24, 93, ${opacity})`;
    default:
      return "#E8E4E0";
  }
}

export function WorldMap({ countries }: WorldMapProps) {
  const router = useRouter();
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);

  // Create lookup map for quick access
  const countryMap = useMemo(() => {
    const map = new Map<string, Country>();
    countries.forEach((c) => map.set(c.id, c));
    return map;
  }, [countries]);

  const hoveredCountry = hoveredCountryId ? countryMap.get(hoveredCountryId) : null;

  const handleMouseEnter = useCallback(
    (geo: { id?: string | number }, event: React.MouseEvent) => {
      const topoId = String(geo.id);
      if (isTrackedCountry(topoId)) {
        const isoCode = TOPOJSON_TO_ISO[topoId];
        setHoveredCountryId(isoCode);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      }
    },
    []
  );

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCountryId(null);
  }, []);

  const handleClick = useCallback(
    (geo: { id?: string | number }) => {
      const topoId = String(geo.id);
      if (isTrackedCountry(topoId)) {
        const isoCode = TOPOJSON_TO_ISO[topoId];
        router.push(`/country/${isoCode}`);
      }
    },
    [router]
  );

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.5, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.5, MIN_ZOOM));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setCenter(DEFAULT_CENTER);
  }, []);

  const handleMoveEnd = useCallback(
    (position: { coordinates: [number, number]; zoom: number }) => {
      setCenter(position.coordinates);
      setZoom(position.zoom);
    },
    []
  );

  return (
    <div className="relative w-full" role="application" aria-label="Interactive world map showing country ratings">
      {/* Keyboard-accessible country navigation */}
      <nav className="sr-only" aria-label="Map countries">
        <ul>
          {countries.map((c) => (
            <li key={c.id}>
              <a href={`/country/${c.id}`}>{c.name} – rated {c.overallRating}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [0, 30],
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={handleMoveEnd}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const topoId = String(geo.id);
                const isTracked = isTrackedCountry(topoId);
                const isoCode = isTracked ? TOPOJSON_TO_ISO[topoId] : null;
                const country = isoCode ? countryMap.get(isoCode) : null;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(event) => handleMouseEnter(geo, event)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(geo)}
                    style={{
                      default: {
                        fill: country
                          ? getRatingColor(country.overallRating, false)
                          : "#E8E4E0",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isTracked ? "pointer" : "default",
                      },
                      hover: {
                        fill: country
                          ? getRatingColor(country.overallRating, true)
                          : "#E8E4E0",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isTracked ? "pointer" : "default",
                      },
                      pressed: {
                        fill: country
                          ? getRatingColor(country.overallRating, true)
                          : "#E8E4E0",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        zoom={zoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        className="absolute bottom-4 right-4"
      />

      {/* Tooltip */}
      <CountryTooltip
        country={hoveredCountry || null}
        position={tooltipPosition}
        visible={!!hoveredCountry}
      />

      {/* Visually-hidden text alternative for screen readers */}
      <div className="sr-only">
        <p>Interactive map of 20 countries rated by digital government infrastructure. Use Tab to navigate to individual countries, then Enter to view details.</p>
      </div>
    </div>
  );
}
