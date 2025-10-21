import {create} from 'zustand'
import {notify} from '@/lib/sonner'
import {supabase} from '@/supabase/client'
import type {PostgrestError} from '@supabase/supabase-js'

type UpdateStore = {
  updateItem: (id: string | number, updates: Partial<AnyObject>) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useUpdateStore = (table: string) =>
  create<UpdateStore>((set) => ({
    isLoading: false,
    error: null,

    updateItem: async (id, updates) => {
      set({isLoading: true, error: null})

      try {
        const {error: supabaseError} = await supabase
          .from(table)
          .update(updates)
          .eq('id', id)

        if (supabaseError) throw supabaseError

        notify.success('Item updated successfully!')
      } catch (err: unknown) {
        const e = err as PostgrestError
        set({error: e.message})
        notify.error(e.message)
      } finally {
        set({isLoading: false})
      }
    },
  }))()
