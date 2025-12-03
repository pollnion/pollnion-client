export interface Space {
  id: string;
  value: string;
  label: string;
  created_at: string; // ISO date string
}

export type Spaces = Space[];
