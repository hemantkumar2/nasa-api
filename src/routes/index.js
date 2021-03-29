import React from "react";
import { Route } from "react-router-dom";
import HomePage from "containers/HomePage";
import SearchResultPage from "containers/SearchResultPage";
import { SearchTextProvider } from "context/SearchContext";

const index = () => {
  return (
    <SearchTextProvider>
      <Route exact path="/" component={HomePage} />
      <Route path="/search-results" component={SearchResultPage} />
    </SearchTextProvider>
  );
};

export default index;
