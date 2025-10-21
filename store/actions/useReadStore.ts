import {create} from 'zustand'
import {notify} from '@/lib/sonner'
import {supabase} from '@/supabase/client'
import type {PostgrestError} from '@supabase/supabase-js'

type ReadStore<T = AnyObject> = {
  data: T[]
  readItems: (filters?: Partial<T>) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useReadStore = <T extends AnyObject = AnyObject>(table: string) =>
  create<ReadStore<T>>((set) => ({
    data: [],
    isLoading: false,
    error: null,

    readItems: async (filters) => {
      set({isLoading: true, error: null})
      try {
        const query = supabase.from(table).select('*')

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query.eq(key, value)
          })
        }

        const {data, error} = await query
        if (error) throw error

        set({data: data as T[]})
      } catch (err: unknown) {
        const e = err as PostgrestError
        set({error: e.message})
        notify.error(e.message)
      } finally {
        set({isLoading: false})
      }
    },
  }))()
