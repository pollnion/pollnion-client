import React, { useEffect } from "react";
import { isEmpty, uniq } from "lodash";
import { Search } from "lucide-react";

import { cn } from "@/lib";
// import { useSearch } from "@/store";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import { useLocalStorage } from "@/lib/localStorage";
import { Typography } from "@/components/custom/typography";

const SearchSuggestionsHistory = () => {
  const router = useRouter();
  // const searchProps = useSearch();
  const localStorageProps = useLocalStorage();

  const rawStored = localStorageProps.getItem("lastSearch");

  const stored = React.useMemo(() => {
    if (!rawStored) return [];
    try {
      const parsed = JSON.parse(rawStored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [rawStored]);

  const reversed = React.useMemo(() => [...stored].reverse(), [stored]);

  useEffect(() => {
    const raw = localStorageProps.getItem("lastSearch");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) return;

      if (parsed.length > 5) {
        const limited = parsed.slice(-5);
        localStorageProps.setItem("lastSearch", JSON.stringify(limited));
      }
    } catch (err) {
      console.error("Invalid lastSearch in localStorage:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      {!isEmpty(stored) && (
        <div className="flex items-center justify-between px-2 my-2">
          <Typography weight="medium">Search History</Typography>
          <Typography
            className="p-0 m-0 hover:underline cursor-pointer text-sm"
            onClick={() => {
              localStorageProps.removeItem("lastSearch");
              window.location.reload();
              // searchProps.toggle();
            }}
          >
            Clear all
          </Typography>
        </div>
      )}

      {uniq(reversed).map((item, idx) => {
        const handleClick = () => {
          router.push(`/search/result?s=${encodeURIComponent(item)}`);
          const updated = [...reversed, item];
          localStorageProps.setItem("lastSearch", JSON.stringify(updated));
        };

        return (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            onClick={handleClick}
            className={cn("justify-start mb-2")}
          >
            <Search /> {item}
          </Button>
        );
      })}
    </div>
  );
};

export default SearchSuggestionsHistory;
