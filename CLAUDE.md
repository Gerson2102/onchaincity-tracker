# CLAUDE.md

## Project Overview

OnchainCity Tracker — a dashboard ranking 20 countries by digital government infrastructure across 10 metrics / 3 pillars, scored 0-10. Built with Next.js 16 App Router, fully static (no API/database).

## Commands

```bash
npm run dev            # Dev server (localhost:3000)
npm run build          # Production build
npm run lint           # ESLint
npm run test           # Vitest watch mode
npm run test:run       # Single test run
npm run test:coverage  # Coverage report
npm run test:e2e       # Playwright E2E tests
```

## Tech Stack

- **Next.js 16.1.5** (App Router) + **React 19.2.3** + **TypeScript 5**
- **Tailwind CSS 4** (PostCSS plugin, CSS variables for theming)
- **Framer Motion 12.29.2** (animations, `useReducedMotion` for a11y)
- **Recharts 3.7.0** (radar charts)
- **react-simple-maps** + **d3-geo** (interactive world map)
- **clsx** + **tailwind-merge** (class composition via `cn()`)
- **Vitest** (unit tests) + **Playwright** (E2E tests)

## Project Structure

```
app/
├── layout.tsx            # Root layout: fonts (Outfit + Cormorant), Navbar, Footer
├── page.tsx              # Landing: hero, world map, feature cards, CTAs
├── leaderboard/page.tsx  # Rankings table + insights dashboard (Suspense)
├── country/[id]/page.tsx # Country detail (static generation for all 20)
├── compare/page.tsx      # Side-by-side comparison (max 4, URL state)
├── about/page.tsx        # Methodology + metric definitions
├── error.tsx             # Client error boundary
├── global-error.tsx      # Root layout error fallback
├── loading.tsx           # Page transition fallback
└── not-found.tsx         # 404 page

components/
├── layout/        # Navbar (mobile menu, search), Footer (multi-column)
├── country/       # CountryHeader, MetricCard, MetricsRadar, ScoreBadge
├── leaderboard/   # RankingsTable/Card, FilterBar, SortableHeader,
│                  # KeyInsights, AtAGlance, Spotlight, RegionalBreakdown,
│                  # MetricAnalysis, DistributionBar, HighMetricsIndicator
├── map/           # WorldMap (zoom/pan/tooltip), MapControls, MapLegend
├── search/        # SearchBar (compact/full variants), SearchResults
├── compare/       # CompareContent, CountrySelector, ComparisonRadar,
│                  # ComparisonGrid/Row, ComparisonInsight, SelectedCountryChip
└── ui/            # ClientOnly (hydration-safe wrapper), RankBadge

lib/
├── types.ts              # All TypeScript interfaces
├── countryCodeMap.ts     # TopoJSON <-> ISO alpha-3 mappings for map
├── constants/tracker.ts  # Metric/pillar definitions, score tier colors, brand, regions
└── utils/
    ├── cn.ts             # clsx + tailwind-merge helper
    ├── tracker.ts        # getScoreTier, getScoreTierLabel, getScoreColor, getFlagUrl, etc.
    ├── leaderboard.ts    # sortCountries, filterCountries, assignRanks, getLeaderboardData
    ├── analytics.ts      # generateInsights, regional/metric stats, spotlight data
    ├── comparison.ts     # parseCountryIdsFromUrl, buildCompareUrl, generateComparisonInsight
    ├── metricRanking.ts  # Per-metric rankings: rankCountriesByMetric, computeAllMetricRankings
    └── index.ts          # Barrel re-export for all utils

data/countries.json       # 20 countries with metadata
tests/lib/utils/          # Unit tests
```

## Scoring System

- **Score**: 0-10 numeric per metric, `overallScore` = average of all 10
- **Tiers** (internal keys `"strong" | "moderate" | "low"`):
  - **High Performers** (7-10) — color: #115E59 (teal)
  - **Developing** (4-6.9) — color: #D97706 (amber)
  - **Emerging** (0-3.9) — color: #BE185D (pink)
- `getScoreTier(score)` returns internal key, `getScoreTierLabel(tier)` returns display label
- `ScoreBadge` component renders score with tier-colored pill (badge/bar variants, sm/md/lg)

## Core Types (lib/types.ts)

```typescript
type ScoreTier = "strong" | "moderate" | "low"
type Pillar = "Digital Government" | "Legal & Financial" | "Lifestyle & Mobility"
type MetricKey = "eGovServiceDepth" | "digitalIdentityInfra" | "govInteroperability"
  | "legalClarityDigitalAssets" | "stablecoinAdoption" | "onOffRampAccess"
  | "tokenizedRwaMaturity" | "crossBorderPayments" | "digitalNomadFriendliness"
  | "cryptoDigitalLiteracy"

interface MetricScore { score: number; summary: string }
interface Country { id: string; name: string; region: string; flag: string;
                    overallScore: number; metrics: Record<MetricKey, MetricScore> }
interface RankedCountry extends Country { rank: number }
type CountryMetricRanks = Record<MetricKey, number>
```

- `id` = ISO 3166-1 alpha-3 (e.g. "EST"), `flag` = alpha-2 (e.g. "ee") for flagcdn.com
- Regions: Europe, Asia-Pacific, Americas, Middle East & Africa
- Filters: `RegionFilter`, `ScoreTierFilter`; Sort: `SortableColumn` = "name" | "overall" | MetricKey

## Pillars & Metrics

| Pillar | Metrics |
|--------|---------|
| Digital Government (3) | eGovServiceDepth, digitalIdentityInfra, govInteroperability |
| Legal & Financial (4) | legalClarityDigitalAssets, stablecoinAdoption, onOffRampAccess, tokenizedRwaMaturity |
| Lifestyle & Mobility (3) | crossBorderPayments, digitalNomadFriendliness, cryptoDigitalLiteracy |

`PILLAR_DEFINITIONS` keyed by pillar name string (no `displayName` field — use key directly).

## Key Patterns

### Data Flow
- All data from `data/countries.json` — no API calls
- Country detail pages use `generateStaticParams()` (pre-built at build time)
- Leaderboard pipeline: Filter -> Rank -> Sort (tiebreakers: overall desc -> total metric score desc -> high performer count desc -> name alpha)
- Compare page: URL state (`?countries=EST,SGP`), max 4 countries
- Analytics computed dynamically via pure functions

### Styling (globals.css Design System)
- **CSS variables** (via `@theme`): `--color-rating-high/medium/low`, `--color-charcoal`, `--color-cream`, `--color-accent` (terracotta #C4553D), `--color-lavender`, `--color-ivory`, etc.
- **Card classes**: `card-soft`, `card-accent`, `card-editorial`, `card-stark`, `card-floating`
- **Typography**: `heading-serif`, `heading-serif-italic`, `label-subtle`, `stat-display`, `stat-hero`
- **Buttons**: `btn-pill`, `btn-pill-primary`, `btn-pill-outline`, `btn-pill-sweep`
- **Rating classes**: `badge-rating`, `badge-rating-high/medium/low`, `rating-indicator`
- **Animations**: `animate-fade-up`, `animate-slide-left`, `animate-fade-in`, `animate-scale-in` with delays
- **Fonts**: Outfit (sans) + Cormorant (serif) via `--font-outfit`, `--font-cormorant`
- **Class merging**: `cn()` from `lib/utils/cn.ts` (clsx + tailwind-merge)

### Server vs Client Components
- **Server**: All pages, CountryHeader, MetricCard, ScoreBadge, RankBadge, Footer, MapLegend, all insight/stat components
- **Client** (`"use client"`): Navbar, WorldMap, MapControls, CountryTooltip, SearchBar, SearchResults, MetricsRadar, LeaderboardContent, RankingsTable/Row/Card, FilterBar, SortableHeader, all Compare components, ClientOnly

### Component Patterns
- `ScoreBadge` — score pill with badge/bar variants, sm/md/lg sizes
- `RankBadge` — displays rank as "#N/total" with sm/md/lg sizes, ARIA label
- `HighMetricsIndicator` — 10 colored dots showing high performer metric count
- `DistributionBar` — horizontal stacked bar for tier distribution
- `ClientOnly` — wraps client-only components to prevent hydration mismatch
- Leaderboard has dual layout: table (desktop) + cards (mobile)
- `ComparisonGrid` — responsive: side-by-side columns (desktop) / stacked cards (mobile)

### Constants (lib/constants/tracker.ts)
- `METRIC_DEFINITIONS` — display names + descriptions for all 10 metrics
- `METRIC_SHORT_NAMES` — abbreviated labels for radar charts
- `PILLAR_DEFINITIONS` — description per pillar
- `METRIC_PILLARS` / `METRIC_KEYS_BY_PILLAR` / `ALL_METRIC_KEYS` — pillar<->metric mappings
- `COMPARISON_COLORS` — 4-color palette for compare page
- `REGIONS`, `BRAND_COLORS`, `SCORE_TIER_COLORS`, `SCORE_TIER_BG_COLORS`

### Utility Functions (lib/utils/)
- **tracker.ts**: `getScoreTier()`, `getScoreTierLabel()`, `getScoreColor()`, `getScoreBgColor()`, `calculateOverallScore()`, `getCountryById()`, `getCountriesByRegion()`, `getFlagUrl()`
- **leaderboard.ts**: `getNextSortDirection()`, `sortCountries()`, `filterCountries()`, `assignRanks()`, `getLeaderboardData()`, `countByScoreTier()`
- **analytics.ts**: `generateInsights()`, `getSpotlightData()`, `getEnhancedRegionalStats()`, `getMetricAnalysisData()`, `getCountsByScoreTier()`, `getRegionalInsightText()`, `getMetricInsightText()`
- **comparison.ts**: `parseCountryIdsFromUrl()`, `buildCompareUrl()`, `getSharedHighMetrics()`, `getBiggestDivergence()`, `hasMetricDivergence()`, `generateComparisonInsight()`
- **metricRanking.ts**: `rankCountriesByMetric()`, `computeAllMetricRankings()`, `getCountryMetricRank()`

### Hooks
- `useLeaderboardFilters()` — manages filter/sort state for leaderboard
- `useMounted()` — returns boolean after first render (used by `ClientOnly`)
- `useReducedMotion()` — respects `prefers-reduced-motion`

### Accessibility
- Skip-to-content link, `useReducedMotion`, ARIA roles (combobox, listbox, navigation)
- Focus-visible rings, sr-only labels, WCAG 2.1 AA contrast, `prefers-reduced-motion` CSS fallbacks
- Mobile touch targets min 44x44px

### Config Notes
- `next.config.ts`: `images.remotePatterns` for flagcdn.com
- `postcss.config.mjs`: `@tailwindcss/postcss` (Tailwind v4, no tailwind.config)
- `vitest.config.ts`: jsdom, `./tests/setup.ts`, coverage via v8
- `playwright.config.ts`: production URL, single worker, 60s timeout, Chromium

## Changelog

### 2026-02-09 — Metric Migration & Tier Rename
- **10 real metrics** replacing 6 placeholders, organized into 3 pillars
- **Numeric scores (0-10)** replacing Low/Medium/High ratings
- **ScoreBadge** replaced RatingBadge across ~40 files (RatingBadge.tsx deleted)
- **Tier display labels renamed**: Strong -> High Performers, Moderate -> Developing, Low -> Emerging (internal keys unchanged)

### 2026-02-05 — Accessibility & UX Audit
- Rating colors updated for WCAG AA contrast
- 23 issues fixed (home/leaderboard), 12 issues fixed (country/compare)

### 2026-02-04 — Ranking & Comparison Features
- Per-metric ranking system, RankBadge component, barrel exports
- METRIC_SHORT_NAMES, COMPARISON_COLORS, ComparisonGrid mobile layout
