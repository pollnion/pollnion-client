import {create} from 'zustand'
import {notify} from '@/lib/sonner'
import {supabase} from '@/supabase/client'
import type {PostgrestError} from '@supabase/supabase-js'

type CreateStore = {
  onSubmit: (item: AnyObject) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useCreateStore = (table: string) => {
  return create<CreateStore>((set) => ({
    error: null,
    isLoading: false,

    onSubmit: async (item) => {
      set({isLoading: true, error: null})

      try {
        const {error} = await supabase.from(table).insert(item)
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
}
