import React from "react";
import { Route } from "react-router-dom";
import HomePage from "containers/HomePage";
import SearchResultPage from "containers/SearchResultPage";

const index = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/search-result" component={SearchResultPage} />
    </div>
  );
};

export default index;
