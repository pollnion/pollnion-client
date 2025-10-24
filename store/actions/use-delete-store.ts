import {create} from 'zustand'
import {notify} from '@/lib/sonner'
import {supabase} from '@/supabase/client'
import type {PostgrestError} from '@supabase/supabase-js'

type DeleteStore = {
  deleteItem: (id: string | number) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useDeleteStore = (table: string) =>
  create<DeleteStore>((set) => ({
    error: null,
    isLoading: false,

    deleteItem: async (id) => {
      set({isLoading: true, error: null})

      try {
        const {error: supabaseError} = await supabase.from(table).delete().eq('id', id)

        if (supabaseError) throw supabaseError

        notify.success('Item deleted successfully!')
      } catch (err: unknown) {
        const e = err as PostgrestError
        set({error: e.message})
        notify.error(e.message)
      } finally {
        set({isLoading: false})
      }
    },
  }))()
