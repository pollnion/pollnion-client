import { create } from "zustand";
import { notify } from "@/lib";
import { fetch } from "@/supabase/fetch";
import type { PostgrestError } from "@supabase/supabase-js";
import { AnyObject } from "@/types/global";

type CreateStore = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (item: AnyObject) => Promise<void>;
};

const createStore = (table: string) =>
  create<CreateStore>((set) => ({
    error: null,
    isLoading: false,

    onSubmit: async (payload) => {
      set({ isLoading: true, error: null });
      try {
        const { error } = await fetch("create", table, { payload });
        if (error) throw error;
      } catch (err: unknown) {
        const error = err as PostgrestError;
        set({ error: error.message });
        notify?.error(error.message);
      } finally {
        set({ isLoading: false });
      }
    },
  }));

const storeCache: Record<string, ReturnType<typeof createStore>> = {};

export const useCreateStore = (table: string) => {
  if (!storeCache[table]) {
    storeCache[table] = createStore(table);
  }
  return storeCache[table]();
};
