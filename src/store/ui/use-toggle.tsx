import { create } from "zustand";

/**
 * State interface for toggle functionality
 */
type ToggleState = {
  /** Current open/closed state */
  isOpen: boolean;
  /** Open the toggle */
  open: () => void;
  /** Close the toggle */
  close: () => void;
  /** Toggle between open and closed states */
  toggle: () => void;
};

/**
 * Zustand store for toggle state management.
 *
 * Provides a simple way to manage boolean toggle states across your application.
 * Useful for modals, dropdowns, sidebars, and other UI elements that need
 * open/closed state.
 *
 * @example
 * const { isOpen, open, close, toggle } = useToggle();
 *
 * // Open programmatically
 * open();
 *
 * // Toggle state
 * <button onClick={toggle}>Toggle Modal</button>
 *
 * // Use state
 * {isOpen && <Modal />}
 */
export const useToggle = create<ToggleState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
