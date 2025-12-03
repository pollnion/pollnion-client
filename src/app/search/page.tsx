"use client";

import React from "react";
import { useQuery } from "@/store";
import { useRouter } from "next/navigation";
import SearchResults from "@/modules/search/results";

const Page = () => {
  const { push } = useRouter();
  const { query } = useQuery();

  React.useEffect(() => {
    if (!query?.s) {
      push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SearchResults />;
};

export default Page;
