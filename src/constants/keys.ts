// ================================================================
// ENVIRONMENT VARIABLES
// ---------------------------------------------------------------
// Configure all environment-specific values below.
// Keep sensitive data (like API keys) private and never commit
// this file to a public repository.
// ================================================================

// Project URL
export const PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL as string;

// Image Hosting
export const IMAGE_LINK = process.env.NEXT_PUBLIC_IMAGE_LINK as string;

// Supabase Project URL
export const SUPABASE_PROJECT_URL = process.env
  .NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;

// Supabase API Key
export const SUPABASE_API_KEY = process.env
  .NEXT_PUBLIC_SUPABASE_API_KEY as string;
