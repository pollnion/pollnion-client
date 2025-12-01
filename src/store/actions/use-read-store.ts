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
    isLoading: true,
    error: null,

    read: async () => {
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

/**
 * This hook reads data from the store with optional filters
 * @param table
 * @param filters
 * @returns
 */
export const useReadStore = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T> & { ascending?: boolean; orderBy?: string }
) => {
  // Create stable filter key for memoization
  const filterKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  // Create stable store instance
  const useStore = useMemo(
    () => createReadStore<T>(table, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, filterKey] // Use filterKey instead of filters
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

/**
 * This returns a single item when an 'id' filter is provided
 * @param table
 * @param filters
 * @returns
 */
export const useReadStoreById = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T> & { ascending?: boolean; orderBy?: string }
) => {
  // Create stable filter key for memoization
  const filterKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  // Create stable store instance
  const useStore = useMemo(
    () => createReadStore<T>(table, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, filterKey] // Use filterKey instead of filters
  );

  const { data, isLoading, error, read } = useStore();

  // Stable read function
  const stableRead = useCallback(() => {
    read();
  }, [read]);

  useEffect(() => {
    stableRead();
  }, [stableRead]);

  return { data: data[0], isLoading, error, read: stableRead };
};
