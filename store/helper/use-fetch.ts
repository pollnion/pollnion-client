/* eslint-disable @typescript-eslint/no-explicit-any */
import {supabase} from '@/supabase/client'
import type {PostgrestResponse, PostgrestSingleResponse} from '@supabase/supabase-js'

type FetchOptions<T> = {
  to?: number
  from?: number
  orderBy?: string
  ascending?: boolean
  id?: string | number
  filters?: Partial<T>
  payload?: Partial<T> | Partial<T>[] // for create/update
}

type DBMethod = 'read' | 'create' | 'update' | 'delete'

export async function fetch<T>(
  method: DBMethod,
  table: string,
  options: FetchOptions<T> = {}
): Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>> {
  const {
    id,
    to,
    from,
    filters,
    payload,
    ascending = true,
    orderBy = 'created_at',
  } = options

  let query: any = supabase.from(table)

  switch (method) {
    // 🔵 READ
    case 'read': {
      query = query.select('*')

      if (id !== undefined) {
        query = query.eq('id', id).single()
      } else {
        query = query.order(orderBy, {ascending})
        if (from !== undefined && to !== undefined) {
          query = query.range(from, to)
        }
      }

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query.eq(key, value)
          }
        })
      }

      return await query
    }

    // 🟢 CREATE
    case 'create': {
      if (!payload) throw new Error('Missing payload for create')
      query = query.insert(payload).select()
      return await query
    }

    // 🟡 UPDATE
    case 'update': {
      if (!payload) throw new Error('Missing payload for update')
      if (id === undefined) throw new Error('Missing id for update')
      query = query.update(payload).eq('id', id).select().single()
      return await query
    }

    // 🔴 DELETE
    case 'delete': {
      if (id === undefined) throw new Error('Missing id for delete')
      query = query.delete().eq('id', id)
      return await query
    }

    default:
      throw new Error(`Unsupported method: ${method}`)
  }
}
