/**
 * Base types for the application
 */

export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};
