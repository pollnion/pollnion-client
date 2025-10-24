import {create} from 'zustand'
import {notify} from '@/lib/sonner'
import {fetch} from '../helper/use-fetch'
import type {PostgrestError} from '@supabase/supabase-js'

type CreateStore = {
  isLoading: boolean
  error: string | null
  onSubmit: (item: AnyObject) => Promise<void>
}

const store = (table: string) =>
  create<CreateStore>((set) => ({
    error: null,
    isLoading: false,

    onSubmit: async (payload) => {
      set({isLoading: true, error: null})
      try {
        const {error} = await fetch('create', table, {payload: payload})
        if (error) throw error
      } catch (err: unknown) {
        const error = err as PostgrestError
        set({error: error.message})
        notify?.error(error.message)
      } finally {
        set({isLoading: false})
      }
    },
  }))

export const useCreateStore = (table: string) => {
  const hook = store(table)
  return hook()
}
