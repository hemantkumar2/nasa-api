import React, { useContext, useEffect } from "react";
import { SearchContext } from "context/SearchContext";
import axios from "axios";
import { API_ROOT_IMAGES } from "constants/api-config";

const index = () => {
  const { searchText } = useContext(SearchContext);
  useEffect(() => {
    function fetchNasaImages() {
      axios.get(`${API_ROOT_IMAGES}search?q=${searchText}`);
    }
    fetchNasaImages();
    return () => {};
  }, []);
  console.log(searchText);
  return <div>SearchResultPage</div>;
};

export default index;
