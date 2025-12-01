"use client";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY } from "@/constants/keys";
import { SUPABASE_PROJECT_URL } from "@/constants/keys";

export const supabase = createClient(
  SUPABASE_PROJECT_URL! as string,
  SUPABASE_API_KEY! as string
);
