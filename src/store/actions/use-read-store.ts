import { create } from "zustand";
import { useEffect, useMemo, useCallback } from "react";
import { notify } from "@/lib";
import { AnyObject } from "@/types";
import { fetch } from "@/supabase/fetch";
import type { PostgrestError } from "@supabase/supabase-js";

type ReadStore<T = AnyObject> = {
  data: T[];
  isLoading: boolean;
  error: string | null;
  read: () => Promise<void>;
};

const createReadStore = <T extends AnyObject>(
  table: string,
  filters?: Partial<T>
) =>
  create<ReadStore<T>>((set) => ({
    data: [],
    isLoading: false,
    error: null,

    read: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch<T>("read", table, filters);
        const { data, error } = response;

        if (error) throw error;

        // Handle both single item and array responses
        const items = Array.isArray(data) ? data : data ? [data] : [];

        set({ data: items });
      } catch (err) {
        const message = (err as PostgrestError)?.message ?? "Unknown error";
        set({ error: message });
        notify.error(message);
      } finally {
        set({ isLoading: false });
      }
    },
  }));

export const useReadStore = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T> & { ascending?: boolean; orderBy?: string }
) => {
  // Create stable store instance
  const useStore = useMemo(
    () => createReadStore<T>(table, filters),
    [table, filters]
  );

  const { data, isLoading, error, read } = useStore();

  // Stable read function
  const stableRead = useCallback(() => {
    read();
  }, [read]);

  useEffect(() => {
    stableRead();
  }, [stableRead]);

  return { data, isLoading, error, read: stableRead };
};
