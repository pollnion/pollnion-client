import { useEffect } from "react";
import { create } from "zustand";

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
  const { lastScrollY, setLastScrollY, show, setShow } = store();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, setShow]);

  return { show };
};

export default useScrollPosition;
