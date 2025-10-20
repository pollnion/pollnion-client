import {create} from 'zustand'

// useMultiData.ts
export const useMultiData = create<{
  data: AnyObject[]
  setData: (v: AnyObject[]) => void
}>((set) => ({
  data: [],
  setData: (v) => set({data: v}),
}))

// useSingleData.ts
export const useSingleData = create<{
  data: AnyObject | null
  setData: (v: AnyObject) => void
}>((set) => ({
  data: null,
  setData: (v) => set({data: v}),
}))
