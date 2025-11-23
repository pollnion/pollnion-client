/**
 * Get clean base URL without query params or hash fragments
 */
export const BASE_URL =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    : "";
