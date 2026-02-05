# CLAUDE.md

## Project Overview

OnchainCity Tracker — a dashboard ranking 20 countries by digital government infrastructure across 6 metrics rated High/Medium/Low. Built with Next.js 16 App Router, fully static (no API/database).

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

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (PostCSS plugin, CSS variables for theming)
- **Framer Motion 12** (animations, `useReducedMotion` for a11y)
- **Recharts 3** (radar charts)
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
├── country/       # CountryHeader, MetricCard, MetricsRadar, RatingBadge
├── leaderboard/   # RankingsTable/Card, FilterBar, SortableHeader,
│                  # KeyInsights, AtAGlance, Spotlight, RegionalBreakdown,
│                  # MetricAnalysis, DistributionBar, HighMetricsIndicator
├── map/           # WorldMap (zoom/pan/tooltip), MapControls, MapLegend
├── search/        # SearchBar (compact/full variants), SearchResults
├── compare/       # CompareContent, CountrySelector, ComparisonRadar,
│                  # ComparisonGrid/Row, ComparisonInsight, SelectedCountryChip
└── ui/            # ClientOnly (hydration-safe wrapper)

lib/
├── types.ts              # All TypeScript interfaces (see Types section)
├── countryCodeMap.ts     # TopoJSON ↔ ISO alpha-3 mappings for map
├── constants/tracker.ts  # Metric definitions, rating colors, brand, regions
└── utils/
    ├── cn.ts             # clsx + tailwind-merge helper
    ├── tracker.ts        # ratingToNumber, getFlagUrl, getCountryById, etc.
    ├── leaderboard.ts    # sortCountries, filterCountries, assignRanks, getLeaderboardData
    ├── analytics.ts      # generateInsights, regional/metric stats, spotlight data
    └── comparison.ts     # parseCountryIdsFromUrl, buildCompareUrl, generateComparisonInsight

data/countries.json       # 20 countries with metadata (version 1.0.0, updated 2026-02-01)
```

## Core Types (lib/types.ts)

```typescript
type Rating = "Low" | "Medium" | "High"
type MetricKey = "contextContinuity" | "userSovereignty" | "serviceProgrammability"
               | "interoperability" | "verifiableInfrastructure" | "digitalAssetMaturity"

interface MetricScore { rating: Rating; summary: string }
interface Country { id: string; name: string; region: string; flag: string;
                    overallRating: Rating; metrics: Record<MetricKey, MetricScore> }
interface TrackerData { metadata: {...}; countries: Country[] }
interface RankedCountry extends Country { rank: number }
```

- `id` = ISO 3166-1 alpha-3 (e.g. "EST"), `flag` = alpha-2 (e.g. "ee") for flagcdn.com
- Regions: Europe, Asia-Pacific, Americas, Middle East & Africa
- Filters: `RegionFilter` = "all" | region, `RatingFilter` = "all" | Rating
- Sort: `SortableColumn` = "name" | "overall" | MetricKey

## Country Data (data/countries.json)

20 countries across 4 regions. Each has 6 metrics with rating + summary text.

| Rating | Countries |
|--------|-----------|
| High (8) | Estonia, Singapore, South Korea, Denmark, Finland, UAE |
| Medium (10) | USA, UK, Germany, Japan, Australia, India, Brazil, Kenya, Indonesia, Thailand, Barbados, El Salvador |
| Low (2) | Nigeria, Tanzania |

## Key Patterns

### Data Flow
- All data from `data/countries.json` — no API calls
- Country detail pages use `generateStaticParams()` (pre-built at build time)
- Leaderboard pipeline: Filter → Rank → Sort (unique ranks, tiebreakers: overall desc → high count desc → name alpha)
- Compare page: state stored in URL params (`?countries=EST,SGP`), max 4 countries
- Analytics computed dynamically via pure functions (no caching layer)

### Styling
- **CSS variables**: `--color-rating-high/medium/low`, `--color-charcoal`, `--color-cream`, `--color-accent`, `--color-lavender`
- **Rating colors**: High=#10B981 (green), Medium=#F59E0B (amber), Low=#EF4444 (red)
- **Utility classes**: `card-soft`, `heading-serif`, `heading-serif-italic`, `label-subtle`, `label-accent`, `link-draw`
- **Animation classes**: `animate-fade-up`, `animate-slide-left`, `animate-fade-in`, `animate-scale-in` with `delay-50/100/120/200/250`
- **Button classes**: `btn-pill`, `btn-pill-primary`, `btn-pill-outline`, `btn-pill-sweep`
- **Fonts**: Outfit (sans, weights 300-700) + Cormorant (serif, weights 300-700) via CSS vars `--font-outfit`, `--font-cormorant`
- **Path alias**: `@/*` → project root
- **Class merging**: `cn()` from `lib/utils/cn.ts` (clsx + tailwind-merge)

### Component Patterns
- `RatingBadge` — rating pill with badge/bar variants, sm/md/lg sizes
- `HighMetricsIndicator` — 6 colored dots showing high metric count
- `DistributionBar` — horizontal stacked bar for rating distribution
- `ClientOnly` — wraps client-only components to prevent hydration mismatch
- Leaderboard has dual layout: table (desktop) + cards (mobile)
- SearchBar has two variants: `compact` (icon trigger) and `full` (expanded input)
- Keyboard nav throughout: Arrow keys, Enter, Escape for dropdowns

### Accessibility
- Skip-to-content link in root layout
- `useReducedMotion` hook for animation preferences
- ARIA roles: combobox, listbox, option, img
- Focus-visible rings, sr-only labels
- Semantic HTML throughout

### External Resources
- Country flags: `https://flagcdn.com/w80/{flag}.png`
- Map topology: TopoJSON data via react-simple-maps
- Next.js image config allows `flagcdn.com` remote patterns

### Config Notes
- `next.config.ts`: only sets `images.remotePatterns` for flagcdn.com
- `tsconfig.json`: target ES2017, strict mode, bundler resolution
- Tailwind v4 via PostCSS plugin (no tailwind.config file)
