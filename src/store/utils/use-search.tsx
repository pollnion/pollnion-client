import { useContext } from "react";
import { SearchContext } from "@/components/providers/search-provider";

/**
 * Custom hook to access search context
 * @returns
 */
export const useSearch = () => useContext(SearchContext);
