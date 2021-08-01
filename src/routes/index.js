import React from "react";
import { Route } from "react-router-dom";
import HomePage from "containers/HomePage";
import SearchResultPage from "containers/SearchResultPage";
import { SearchTextProvider } from "context/SearchContext";
// import { ReactQueryDevtools } from "react-query-devtools";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const index = () => {
  return (
    <SearchTextProvider>
      <QueryClientProvider client={queryClient}>
        <Route exact path="/" component={HomePage} />
        <Route path="/search-results" component={SearchResultPage} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SearchTextProvider>
  );
};

export default index;
