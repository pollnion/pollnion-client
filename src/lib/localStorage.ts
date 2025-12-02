export const useLocalStorage = () => {
  const isBrowser = typeof window !== "undefined";

  const setItem = (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    if (!isBrowser) return null;
    return localStorage.getItem(key);
  };

  const removeItem = (key: string) => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  };

  const clearItem = () => {
    if (!isBrowser) return;
    localStorage.clear();
  };

  return {
    setItem,
    getItem,
    clearItem,
    removeItem,
  };
};
