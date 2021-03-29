/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchTextProvider(props) {
  const [searchText, setSearchText] = useState("Some value");
  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {props.children}
    </SearchContext.Provider>
  );
}
