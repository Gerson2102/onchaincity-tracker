import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://twitter.com/onchaincity", label: "X" },
  { href: "https://linkedin.com/company/onchaincity", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative clouds-bg bg-cream"
      role="contentinfo"
    >
      {/* Cloud gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gradient-purple/20 via-gradient-pink/10 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Contact */}
          <div className="md:col-span-4">
            <p className="label-subtle mb-4">Contact Us</p>
            <a
              href="mailto:hello@onchain.city"
              className="heading-serif text-2xl sm:text-3xl text-charcoal hover:text-stone transition-colors min-h-[44px] inline-flex items-center"
            >
              hello@onchain.city
            </a>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <p className="label-subtle mb-4">Social Media</p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone hover:text-charcoal text-sm transition-colors link-draw min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="label-subtle mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone hover:text-charcoal text-sm transition-colors link-draw min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div className="md:col-span-2">
            <p className="label-subtle mb-4">External</p>
            <a
              href="https://onchain.city/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-charcoal text-sm transition-colors link-draw min-h-[44px] inline-flex items-center"
            >
              onchain.city
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-soft mb-8" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {currentYear} Onchain Ventures — UAE
          </p>

          {/* Logo mark - lavender only for brand identity */}
          <div className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-lavender/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-lavender" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
