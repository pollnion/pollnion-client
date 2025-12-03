/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  app_metadata: Record<string, any>;
  aud: string;
  confirmation_sent_at: string | null;
  identities: any | null;
  is_anonymous: boolean;
  phone: string | null;
  role: string;
  user_metadata: Record<string, any>;
}

export type Users = User[];
