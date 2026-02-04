"use client";

import { type ReactNode } from "react";
import { useMounted } from "@/hooks";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrapper component that only renders children on the client.
 * Prevents hydration mismatches for browser-only content.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const mounted = useMounted();
  return mounted ? <>{children}</> : <>{fallback}</>;
}
