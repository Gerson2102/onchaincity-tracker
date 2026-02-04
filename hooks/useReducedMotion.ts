"use client";

import { useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

/**
 * Hook to detect user's prefers-reduced-motion preference.
 * Returns true if the user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    getServerSnapshot
  );
}
