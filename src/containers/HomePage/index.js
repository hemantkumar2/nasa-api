import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_ROOT_APOD, API_KEY } from "constants/api-config";
import { Input, Button, Form } from "antd";
import { SearchContext } from "context/SearchContext";

const index = () => {
  const [apodData, setApodData] = useState(null);
  const [searchInputText, setSearchInputText] = useState("");
  const { setSearchText } = useContext(SearchContext);
  const history = useHistory();
  useEffect(async () => {
    const apodData = await axios.get(
      `${API_ROOT_APOD}planetary/apod?api_key=${API_KEY}`
    );
    const { data } = apodData;
    setApodData(data);
  }, []);

  const handleInputChange = (e) => {
    setSearchInputText(e.target.value);
  };
  const handleSearch = () => {
    setSearchText(searchInputText);
    history.push("/search-results");
  };

  return (
    <>
      {apodData && (
        <div
          style={{
            paddingTop: "30vh",
            textAlign: "center",
          }}
        >
          <h1>NASA Media search</h1>
          <Form>
            <Input
              onChange={(e) => handleInputChange(e)}
              style={{ width: "20rem" }}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Form>
          <br />

          <img
            style={{ width: "50vh" }}
            src={apodData.url}
            alt={apodData.title}
          />
        </div>
      )}
    </>
  );
};

export default index;
