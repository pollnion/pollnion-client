import React from "react";
import { useQuery } from "@/store";
import { usePathname } from "next/navigation";
import Button from "@/components/custom/button";

const SearchResultsTab = () => {
  const pathname = usePathname();
  const { pushQuery, query } = useQuery();
  const { tab } = query || {};

  const onClickTab = (tab: string) => {
    pushQuery({ tab });
  };

  React.useEffect(() => {
    if (!tab) {
      onClickTab("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query]);

  const btns = [
    {
      label: "All",
      onClick: () => onClickTab("all"),
    },
    {
      label: "Feeds",
      onClick: () => onClickTab("feeds"),
    },
    {
      label: "Users",
      onClick: () => onClickTab("users"),
    },
    {
      label: "Spaces",
      onClick: () => onClickTab("spaces"),
    },
  ];

  return (
    <div className="flex flex-row space-x-2 px-2 sm:px-0">
      {btns.map((btn, index) => (
        <Button
          size="sm"
          key={index}
          onClick={btn.onClick}
          variant={tab === btn.label.toLowerCase() ? "default" : "ghost"}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
};

export default SearchResultsTab;
