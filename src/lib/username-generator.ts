import {
  colors,
  animals,
  adjectives,
  uniqueNamesGenerator,
} from "unique-names-generator";

/**
 * Generate a random username
 * @param email - User's email address (optional, used for deterministic seed)
 * @returns Generated username in format: adjective_noun_number
 */
export const generateUsername = (email?: string): string => {
  // Use a deterministic seed if email is provided
  const seed = email
    ? email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : undefined;

  // Generate username with unique-names-generator
  const username = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "_",
    style: "lowerCase",
    seed,
  });

  // Append a number to make collisions less likely
  const number = seed
    ? (seed * 997) % 10000
    : Math.floor(Math.random() * 10000);

  return `${username}_${number}`;
};

/**
 * Extract username from email (fallback method)
 * @param email - User's email address
 * @returns Username part before @ symbol
 */
export const extractUsernameFromEmail = (email: string): string => {
  return email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
};

/**
 * Generate a display name from email or create random one
 * @param email - User's email address
 * @returns A user-friendly display name
 */
export const generateDisplayName = (email?: string): string => {
  if (!email) return generateUsername();

  const namePart = email.split("@")[0];
  const cleanName = namePart
    .replace(/[._-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return cleanName || generateUsername(email);
};
