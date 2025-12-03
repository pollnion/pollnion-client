import type { ProfileItem } from "@/models/profiles";

export type SearchUserResult = Pick<
  ProfileItem,
  "username" | "avatar_url" | "id"
>;

export type SearchLabelResult = {
  id: string;
  label: string;
};

export type SearchFeedResult = {
  id: string;
  title: string;
};

export interface SearchResultRow {
  feeds: SearchFeedResult[];
  users: SearchUserResult[];
  labels: SearchLabelResult[];
}
