import { isEmpty } from "lodash";

import Users from "@/modules/users";
import { User } from "@/models/users";
import SearchEmpty from "../SearchEmpty";
import { useInfiniteQuery, useQuery } from "@/store";
import Virtuoso from "@/components/custom/virtusio";
import SearchLoading from "../SearchLoading";

const SearchResultsUsers = () => {
  const { query } = useQuery();
  const { s, tab } = query || {};

  const listProps = useInfiniteQuery<User>({
    tableName: "profiles",
    trailingQuery: (queryBuilder) => {
      if (!s) return queryBuilder.order("created_at", { ascending: false });

      return queryBuilder
        .or(
          `username.ilike.%${s.toLowerCase()}%,display_name.ilike.%${s.toLowerCase()}%,email.ilike.%${s.toLowerCase()}%`
        )
        .order("created_at", { ascending: false });
    },
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
      {(idx, item) => <Users key={idx} item={item} />}
    </Virtuoso>
  );
};

export default SearchResultsUsers;
