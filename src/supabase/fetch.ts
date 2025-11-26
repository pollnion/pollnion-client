import { supabase } from "@/supabase/client";
import type {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { ParamValue } from "next/dist/server/request/params";

type DBMethod = "read" | "create" | "update" | "delete";

type BaseOptions = {
  delayMs?: number;
};

type ReadOptions<T> = BaseOptions & {
  id?: ParamValue | string | number;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
  filters?: Partial<T>;
};

type CreateOptions<T> = BaseOptions & {
  payload: Partial<T> | Partial<T>[];
};

type UpdateOptions<T> = BaseOptions & {
  id: string | number;
  payload: Partial<T>;
};

type DeleteOptions = BaseOptions & {
  id: string | number;
};

type FetchOptions<T> =
  | ReadOptions<T>
  | CreateOptions<T>
  | UpdateOptions<T>
  | DeleteOptions;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildReadQuery = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  options: ReadOptions<T>
) => {
  const {
    id,
    from,
    to,
    limit,
    offset,
    filters,
    ascending = false,
    orderBy = "created_at",
  } = options;

  query = query.select("*");

  if (id !== undefined) {
    return query.eq("id", id).single();
  }

  query = query.order(orderBy, { ascending });

  // Apply range if specified
  if (typeof offset === "number" && typeof limit === "number") {
    query = query.range(offset, offset + limit - 1);
  } else if (typeof from === "number" && typeof to === "number") {
    query = query.range(from, to);
  }

  // Apply filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query = query.eq(key, value);
      }
    });
  }

  return query;
};

const handleRead = async <T>(
  table: string,
  options: ReadOptions<T>
): Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>> => {
  const { delayMs = 1 } = options;
  const query = buildReadQuery(supabase.from(table), options);
  await delay(delayMs);
  return await query;
};

const handleCreate = async <T>(
  table: string,
  options: CreateOptions<T>
): Promise<PostgrestResponse<T>> => {
  const { payload, delayMs = 1 } = options;
  await delay(delayMs);
  return await supabase.from(table).insert(payload).select();
};

const handleUpdate = async <T>(
  table: string,
  options: UpdateOptions<T>
): Promise<PostgrestSingleResponse<T>> => {
  const { id, payload, delayMs = 1 } = options;
  await delay(delayMs);
  return await supabase
    .from(table)
    .update(payload)
    .eq("id", id)
    .select()
    .single();
};

const handleDelete = async (
  table: string,
  options: DeleteOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const { id, delayMs = 1 } = options;
  await delay(delayMs);
  return await supabase.from(table).delete().eq("id", id);
};

// Overload signatures for better type inference
export async function fetch<T>(
  method: "read",
  table: string,
  options?: ReadOptions<T>
): Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>>;

export async function fetch<T>(
  method: "create",
  table: string,
  options: CreateOptions<T>
): Promise<PostgrestResponse<T>>;

export async function fetch<T>(
  method: "update",
  table: string,
  options: UpdateOptions<T>
): Promise<PostgrestSingleResponse<T>>;

export async function fetch(
  method: "delete",
  table: string,
  options: DeleteOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any>;

// Implementation
export async function fetch<T>(
  method: DBMethod,
  table: string,
  options: FetchOptions<T> = {} as FetchOptions<T>
) {
  switch (method) {
    case "read":
      return handleRead<T>(table, options as ReadOptions<T>);
    case "create":
      return handleCreate<T>(table, options as CreateOptions<T>);
    case "update":
      return handleUpdate<T>(table, options as UpdateOptions<T>);
    case "delete":
      return handleDelete(table, options as DeleteOptions);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}
