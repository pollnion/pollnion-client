/**
 * Returns a short, human-readable string showing how much time has passed
 * since a given timestamp (e.g. "5m ago", "2h ago", "3d ago").
 *
 * @param timestamp - A valid date input (string, number, or Date object)
 * @returns A formatted relative time string like "10s ago", "3h ago", or "2w ago"
 *
 * Example:
 * timeDiff("2025-10-28T10:00:00Z") → "5m ago"
 */
export const timeDiff = (timestamp: string | number | Date) => {
  const date = new Date(timestamp);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count}${i.label} ago`;
  }

  return `${Math.floor(seconds)}s ago`;
};
