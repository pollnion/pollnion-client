import {create} from 'zustand'

type LoadingState = {
  isLoading: boolean
  setLoading: (state: boolean) => void
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (state) => set({isLoading: state}),
}))
