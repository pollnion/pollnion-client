import {create} from 'zustand'

type DialogStore = DialogProps

const store = create<DialogStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({isOpen: !state.isOpen})),
}))

export const useDialog = () => {
  const _store = store()

  return _store
}
