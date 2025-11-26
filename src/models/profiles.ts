/**
 * Profile interface representing user profile data.
 */
export interface ProfileItem {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export type ProfileItems = ProfileItem[];
