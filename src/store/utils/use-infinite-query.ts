"use client";

import { type SupabaseClient } from "@supabase/supabase-js";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

import { supabase } from "@/supabase/client";

// The following types are used to make the hook type-safe. It extracts the database type from the supabase client.
type SupabaseClientType = typeof supabase;

// Utility type to check if the type is any
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

// Extracts the database type from the supabase client. If the supabase client doesn't have a type, it will fallback properly.
type Database =
  SupabaseClientType extends SupabaseClient<infer U>
    ? IfAny<U, never, U>
    : never;

// Change this to the database schema you want to use
type DatabaseSchema = Database extends never
  ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Tables: Record<string, { Row: any }>;
    }
  : Database["public"];

// Extracts the table names from the database type
type SupabaseTableName = string & keyof DatabaseSchema["Tables"];

// Extracts the table definition from the database type
type SupabaseTableData<T extends SupabaseTableName> =
  DatabaseSchema["Tables"][T]["Row"];

// A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseQueryHandler = (query: any) => any;

interface UseInfiniteQueryProps<T extends SupabaseTableName> {
  // The table name to query
  tableName: T;
  // The columns to select, defaults to `*`
  columns?: string;
  // The number of items to fetch per page, defaults to `20`
  pageSize?: number;
  // A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
  trailingQuery?: SupabaseQueryHandler;
}

interface StoreState<TData> {
  data: TData[];
  count: number;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  hasInitialFetch: boolean;
}

type Listener = () => void;

function createStore<
  TData extends SupabaseTableData<T>,
  T extends SupabaseTableName,
>(props: UseInfiniteQueryProps<T>) {
  const { tableName, columns = "*", pageSize = 20, trailingQuery } = props;

  let state: StoreState<TData> = {
    data: [],
    count: 0,
    isSuccess: false,
    isLoading: false,
    isFetching: false,
    error: null,
    hasInitialFetch: false,
  };

  const listeners = new Set<Listener>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const setState = (newState: Partial<StoreState<TData>>) => {
    state = { ...state, ...newState };
    notify();
  };

  const fetchPage = async (skip: number) => {
    if (
      state.hasInitialFetch &&
      (state.isFetching || state.count <= state.data.length)
    )
      return;

    setState({ isFetching: true });

    let query = supabase.from(tableName).select(columns, {
      count: "exact",
    });

    if (trailingQuery) {
      query = trailingQuery(query);
    }
    const {
      data: newData,
      count,
      error,
    } = await query.range(skip, skip + pageSize - 1);

    if (error) {
      console.error("An unexpected error occurred:", error);
      setState({ error });
    } else {
      setState({
        data: [...state.data, ...(newData as unknown as TData[])],
        count: count || 0,
        isSuccess: true,
        error: null,
      });
    }
    setState({ isFetching: false });
  };

  const fetchNextPage = async () => {
    if (state.isFetching) return;
    await fetchPage(state.data.length);
  };

  const initialize = async () => {
    setState({ isLoading: true, isSuccess: false, data: [] });
    await fetchNextPage();
    setState({ isLoading: false, hasInitialFetch: true });
  };

  return {
    getState: () => state,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    fetchNextPage,
    initialize,
  };
}

// Empty initial state to avoid hydration errors.
const initialState: StoreState<never> = {
  data: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  isFetching: false,
  error: null,
  hasInitialFetch: false,
};

function useInfiniteQuery<
  TData extends SupabaseTableData<T>,
  T extends SupabaseTableName = SupabaseTableName,
>(props: UseInfiniteQueryProps<T>) {
  const { tableName, columns, pageSize } = props;

  // Create store once and memoize it based on actual values, not the props object
  const store = useMemo(
    () => createStore<TData, T>(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableName, columns, pageSize]
  );

  const storeRef = useRef(store);

  // Update the ref when store changes
  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  // Create stable callbacks that don't cause re-renders
  const subscribe = useCallback((listener: () => void) => {
    return storeRef.current.subscribe(listener);
  }, []);

  const getSnapshot = useCallback(() => {
    return storeRef.current.getState();
  }, []);

  const getServerSnapshot = useCallback(() => {
    return initialState as StoreState<TData>;
  }, []);

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!state.hasInitialFetch && typeof window !== "undefined") {
      storeRef.current.initialize();
    }
  }, [state.hasInitialFetch]);

  // Create stable fetchNextPage callback
  const fetchNextPage = useCallback(() => {
    storeRef.current.fetchNextPage();
  }, []);

  return {
    data: state.data,
    count: state.count,
    isSuccess: state.isSuccess,
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    error: state.error,
    hasMore: state.count > state.data.length,
    fetchNextPage,
  };
}

export {
  useInfiniteQuery,
  type SupabaseQueryHandler,
  type SupabaseTableData,
  type SupabaseTableName,
  type UseInfiniteQueryProps,
};
