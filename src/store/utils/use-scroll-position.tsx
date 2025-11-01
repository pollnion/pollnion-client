import { useEffect } from "react";
import { useRef } from "react";
import { create } from "zustand";
import throttle from "lodash/throttle";

/**
 * State interface for scroll position tracking
 */
type ScrollPositionState = {
  /** Last recorded scroll Y position */
  lastScrollY: number;
  /** Update the last scroll position */
  setLastScrollY: (lastScrollY: number) => void;
  /** Whether to show the element (based on scroll direction) */
  show: boolean;
  /** Update the show state */
  setShow: (show: boolean) => void;
};

const store = create<ScrollPositionState>((set) => ({
  show: true,
  setShow: (show) => set({ show }),
  lastScrollY: 0,
  setLastScrollY: (lastScrollY) => set({ lastScrollY }),
}));

/**
 * Hook to track scroll position and control visibility based on scroll direction.
 *
 * This hook monitors the window scroll position and returns a boolean indicating
 * whether an element should be shown. It hides elements when scrolling down past
 * 50px and shows them when scrolling up. The scroll event is throttled to 100ms
 * for performance.
 *
 * Commonly used for auto-hiding navigation bars or floating action buttons.
 *
 * @returns Object containing `show` boolean indicating visibility state
 *
 * @example
 * const { show } = useScrollPosition();
 *
 * return (
 *   <nav className={show ? "visible" : "hidden"}>
 *     Navigation
 *   </nav>
 * );
 */
const useScrollPosition = (): { show: boolean } => {
  const { show, setShow } = store();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }
      lastScrollYRef.current = currentScrollY;
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { show };
};

export default useScrollPosition;
