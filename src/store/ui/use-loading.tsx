import { create } from "zustand";

export type LoadingState = {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
  toggle: () => void;
};

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,

  start: () => set({ isLoading: true }),
  stop: () => set({ isLoading: false }),
  toggle: () => set((state) => ({ isLoading: !state.isLoading })),
}));
