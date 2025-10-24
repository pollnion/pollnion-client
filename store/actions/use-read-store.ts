import {create} from 'zustand'
import {useEffect, useMemo} from 'react'
import {notify} from '@/lib/sonner'
import {fetch} from '../helper/use-fetch'
import type {PostgrestError} from '@supabase/supabase-js'

type ReadStore<T = AnyObject> = ReadType<T> & {
  read: (filters?: Partial<T>) => Promise<void>
}

export const store = <T extends AnyObject = AnyObject>(
  table: string,
  filters?: Partial<T>
) =>
  create<ReadStore<T>>((set) => ({
    data: [],
    isLoading: false,
    error: null,

    loadMore: async () => {
      console.log('load more')
    },

    read: async () => {
      set({isLoading: true, error: null})
      try {
        const {data, error} = await fetch('read', table, filters)
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
