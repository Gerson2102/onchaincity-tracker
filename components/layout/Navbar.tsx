"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/search";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Document-level Escape handler + focus first link when menu opens
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus first interactive element in the menu
    const firstLink = menuRef.current?.querySelector<HTMLElement>("input, a, button");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="OnchainCity Tracker - Home"
          >
            {/* Circle logo mark - lavender only for brand identity */}
            <div className="w-9 h-9 rounded-full border border-charcoal/10 flex items-center justify-center bg-white/50">
              <div className="w-5 h-5 rounded-full border border-lavender/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-lavender" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors link-draw",
                  isActive(link.href)
                    ? "text-charcoal"
                    : "text-stone hover:text-charcoal"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : "nav-underline"}
                    className="absolute -bottom-1 left-0 right-0 h-px bg-charcoal/30"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side: Search */}
          <div className="hidden md:block w-64">
            <SearchBar variant="compact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden p-2 text-stone hover:text-charcoal transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={cn(
                  "block h-px bg-current transition-all duration-300 origin-center",
                  isOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px bg-current transition-all duration-300",
                  isOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px bg-current transition-all duration-300 origin-center",
                  isOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-cream backdrop-blur-md border-t border-charcoal/6"
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <SearchBar variant="full" onSelect={() => setIsOpen(false)} />
              </div>
              <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm transition-colors",
                    isActive(link.href)
                      ? "bg-accent/8 text-charcoal"
                      : "text-stone hover:text-charcoal hover:bg-accent/4"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
