"use client";

import React from "react";

import SearchResults from "./SearchResults";
import SearchResultsTab from "./SearchResultsTab";
import SearchResultsHeader from "./SearchResultsHeader";

const Index = () => {
  return (
    <React.Fragment>
      <SearchResultsHeader />
      <SearchResultsTab />
      <SearchResults />
    </React.Fragment>
  );
};

export default Index;
