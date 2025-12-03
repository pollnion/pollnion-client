import { isEmpty } from "lodash";

import { Space } from "@/models/spaces";
import SearchEmpty from "../SearchEmpty";
import SearchLoading from "../SearchLoading";
import Box from "@/components/custom/layout/box";
import Virtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery, useQuery } from "@/store";

export const Spaces = ({ item }: { item: Space }) => {
  const { label } = item || {};

  return (
    <Box className="p-2 mb-2" color="background">
      <div className="flex items-center gap-2">{label}</div>
    </Box>
  );
};

const SearchResultsSpaces = () => {
  const { query } = useQuery();
  const { s, tab } = query || {};

  const listProps = useInfiniteQuery<Space>({
    tableName: "spaces",
    trailingQuery: (query) =>
      query
        .ilike("label", `%${s.toLowerCase()}%`)
        .order("created_at", { ascending: false }),
  });

  if (tab === "all" && isEmpty(listProps?.data)) {
    return null;
  }

  if (listProps.isLoading) {
    return <SearchLoading />;
  }

  if (isEmpty(listProps?.data)) {
    return <SearchEmpty />;
  }

  return (
    <Virtuoso listProps={listProps}>
      {(idx, item) => <Spaces key={idx} item={item} />}
    </Virtuoso>
  );
};

export default SearchResultsSpaces;
