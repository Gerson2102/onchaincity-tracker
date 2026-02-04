import Link from "next/link";
import type { Country } from "@/lib/types";

interface LeaderboardStatsProps {
  countries: Country[];
}

export function LeaderboardStats({ countries }: LeaderboardStatsProps) {
  const totalCountries = countries.length;
  const highRatedCount = countries.filter(
    (c) => c.overallRating === "High"
  ).length;

  const stats = [
    { value: totalCountries.toString(), label: "Countries Tracked", accent: true },
    { value: "6", label: "Dimensions", accent: false },
    { value: highRatedCount.toString(), label: "High-Rated", accent: false },
  ];

  return (
    <section className="relative py-16 bg-warm-white noise-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="card-stark p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Stats with visual emphasis */}
            <div className="flex flex-wrap gap-12 lg:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <span
                    className={`stat-display text-4xl sm:text-5xl transition-colors ${
                      stat.accent
                        ? "text-accent"
                        : "text-charcoal group-hover:text-accent"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="block mt-2 text-sm text-stone">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA with arrow */}
            <Link
              href="/leaderboard"
              className="btn-pill btn-pill-primary btn-arrow-slide inline-flex items-center gap-3 self-start lg:self-center"
            >
              <span>View Full Rankings</span>
              <ArrowRightIcon className="arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 9H14M14 9L9.5 4.5M14 9L9.5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
