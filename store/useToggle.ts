import {create} from 'zustand'

export type OpenState = {
  open: boolean
  setOpen: (state: boolean) => void
}

export const useToggle = create<OpenState>((set) => ({
  open: false,
  setOpen: (state) => set({open: !state}),
}))
