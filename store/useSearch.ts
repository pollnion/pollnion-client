import {create} from 'zustand'

type SearchState = {
  val: string
  setVal: (state: string) => void
}

export const useSearch = create<SearchState>((set) => ({
  val: '',
  setVal: (state) => set({val: state}),
}))
