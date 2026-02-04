# CLAUDE.md

## Project Overview

OnchainCity Tracker - a dashboard ranking countries by digital government infrastructure across 6 metrics: Context Continuity, User Sovereignty, Service Programmability, Interoperability, Verifiable Infrastructure, and Digital Asset Maturity. Each metric is rated High/Medium/Low.

## Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** with CSS variables for theming
- **Framer Motion 12** for animations
- **Recharts** for radar charts

## Project Structure

```
app/
├── page.tsx              # Landing page with world map
├── leaderboard/page.tsx  # Rankings + insights dashboard
├── country/[id]/page.tsx # Country detail pages
├── compare/page.tsx      # Country comparison
└── about/page.tsx        # Methodology

components/
├── leaderboard/   # Rankings table, insights, regional/metric analysis
├── country/       # Country header, metric cards, radar chart
├── map/           # Interactive world map
├── search/        # Country search
├── layout/        # Navbar, Footer
└── ui/            # Button, shared components

lib/
├── types.ts              # All TypeScript interfaces
├── constants/tracker.ts  # Metric definitions, rating colors
└── utils/
    ├── analytics.ts      # Insights calculations
    ├── leaderboard.ts    # Sorting, filtering, ranking
    └── tracker.ts        # Rating utilities

data/countries.json       # Country data (20 countries)
```

## Key Patterns

### Styling
- CSS variables: `--color-rating-high/medium/low`, `--color-charcoal`, `--color-cream`
- Utility classes: `card-soft`, `heading-serif`, `label-subtle`, `animate-fade-up`
- Path alias: `@/*` maps to project root

### Data Flow
- Country data loaded from `data/countries.json`
- Rankings use unique sequential ranks (tiebreakers: high metrics count → name)
- Analytics functions in `lib/utils/analytics.ts` compute insights dynamically

### Components
- `RatingBadge` - displays High/Medium/Low with color coding
- `HighMetricsIndicator` - 6 dots showing high metric count
- `DistributionBar` - horizontal stacked bar for rating distribution
