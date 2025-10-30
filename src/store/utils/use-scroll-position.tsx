import { useEffect } from "react";
import { useRef } from "react";
import { create } from "zustand";
import throttle from "lodash/throttle";

type ScrollPositionState = {
  lastScrollY: number;
  setLastScrollY: (lastScrollY: number) => void;
  show: boolean;
  setShow: (show: boolean) => void;
};

const store = create<ScrollPositionState>((set) => ({
  show: true,
  setShow: (show) => set({ show }),
  lastScrollY: 0,
  setLastScrollY: (lastScrollY) => set({ lastScrollY }),
}));

/**
 * Hook to track scroll position and show/hide based on scroll direction
 * @returns
 */
const useScrollPosition = () => {
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
