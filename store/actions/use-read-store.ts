import {create} from 'zustand'
import {useEffect, useMemo} from 'react'
import {notify} from '@/lib/sonner'
import {fetch} from '../helper/use-fetch'
import type {PostgrestError} from '@supabase/supabase-js'

type ReadStore<T = AnyObject> = {
  data: T[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  page: number
  read: (reset?: boolean) => Promise<void>
  loadMore: () => Promise<void>
}

const PAGE_SIZE = 2

export const store = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T>
) =>
  create<ReadStore<T>>((set, get) => ({
    data: [],
    isLoading: false,
    error: null,
    hasMore: true,
    page: 0,

    read: async (reset = false) => {
      const {page, data} = get()
      const offset = reset ? 0 : page * PAGE_SIZE

      set({isLoading: true, error: null})
      try {
        const response = await fetch<T>('read', table, {
          ...filters,
          limit: PAGE_SIZE,
          offset,
        })

        const result = response.data as T[] | null
        const error = response.error

        if (error) throw error

        set((state) => ({
          data: [...state.data, ...(result || [])],
          page: reset ? 1 : state.page + 1,
          hasMore: (result?.length || 0) === PAGE_SIZE,
        }))
      } catch (err: unknown) {
        const e = err as PostgrestError
        set({error: e.message})
        notify.error(e.message)
      } finally {
        set({isLoading: false})
      }
    },

    loadMore: async () => {
      const {isLoading, hasMore} = get()
      if (isLoading || !hasMore) return
      await get().read()
    },
  }))

export const useReadStore = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T> & {ascending?: boolean; orderBy?: string}
) => {
  const useHook = useMemo(() => store<T>(table, filters), [table])
  const props = useHook()

  useEffect(() => {
    props.read()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)])

  return props
}
