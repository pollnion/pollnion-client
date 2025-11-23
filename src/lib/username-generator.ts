/**
 * Generates a random username based on user's email
 * Format: adjective_noun_number (e.g., happy_dolphin_42)
 */

const adjectives = [
  "happy",
  "clever",
  "bright",
  "swift",
  "brave",
  "calm",
  "cool",
  "eager",
  "gentle",
  "kind",
  "lively",
  "proud",
  "quick",
  "witty",
  "bold",
  "wise",
  "vivid",
  "zealous",
  "noble",
  "serene",
];

const nouns = [
  "panda",
  "tiger",
  "eagle",
  "dolphin",
  "phoenix",
  "dragon",
  "falcon",
  "wolf",
  "fox",
  "bear",
  "hawk",
  "lion",
  "owl",
  "raven",
  "shark",
  "whale",
  "lynx",
  "leopard",
  "jaguar",
  "cobra",
];

/**
 * Generate a random username
 * @param email - User's email address (optional, for seeding)
 * @returns Generated username in format: adjective_noun_number
 */
export const generateUsername = (email?: string): string => {
  // Use email for some determinism if provided, otherwise random
  const seed = email
    ? email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : Math.random() * 10000;

  const adjIndex = Math.floor((seed * 7) % adjectives.length);
  const nounIndex = Math.floor((seed * 13) % nouns.length);
  const number = Math.floor((seed * 997) % 100);

  const adjective = adjectives[adjIndex];
  const noun = nouns[nounIndex];

  return `${adjective}_${noun}_${number}`;
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

  // Try to extract a meaningful name from email
  const namePart = email.split("@")[0];
  const cleanName = namePart
    .replace(/[._-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return cleanName || generateUsername(email);
};
