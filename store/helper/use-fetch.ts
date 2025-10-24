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
  delayMs?: number // optional delay
}

type DBMethod = 'read' | 'create' | 'update' | 'delete'

// 💤 simple promise-based delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
    ascending = false,
    orderBy = 'created_at',
    delayMs = 1, // default half a second
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

      await delay(delayMs)
      return await query
    }

    // 🟢 CREATE
    case 'create': {
      if (!payload) throw new Error('Missing payload for create')
      await delay(delayMs)
      return await query.insert(payload).select()
    }

    // 🟡 UPDATE
    case 'update': {
      if (!payload) throw new Error('Missing payload for update')
      if (id === undefined) throw new Error('Missing id for update')
      await delay(delayMs)
      return await query.update(payload).eq('id', id).select().single()
    }

    // 🔴 DELETE
    case 'delete': {
      if (id === undefined) throw new Error('Missing id for delete')
      await delay(delayMs)
      return await query.delete().eq('id', id)
    }

    default:
      throw new Error(`Unsupported method: ${method}`)
  }
}
