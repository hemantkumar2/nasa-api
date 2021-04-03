import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Form, message, Card, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

import { API_ROOT_APOD } from "constants/api-config";
import { SearchContext } from "context/SearchContext";
import Navbar from "components/Navbar";
import Button from "components/Button";
import Input from "components/Input";

import "./index.scss";

const { REACT_APP_API_KEY } = process.env;
const index = () => {
  const [apodData, setApodData] = useState(null);
  const [searchInputText, setSearchInputText] = useState("");
  const { setSearchText } = useContext(SearchContext);
  const history = useHistory();

  useEffect(async () => {
    const apodData = await axios.get(
      `${API_ROOT_APOD}planetary/apod?api_key=${REACT_APP_API_KEY}`
    );
    const { data } = apodData;
    setApodData(data);
  }, []);

  const handleInputChange = (e) => {
    setSearchInputText(e.target.value);
  };

  const handleSearch = () => {
    if (!searchInputText)
      return message.warning("Please provide any search input!");
    setSearchText(searchInputText);
    history.push("/search-results");
  };

  const getApod = () => {
    console.log(apodData);
    return (
      <>
        {apodData && (
          <div>
            <Row justify="center">
              <Col span={24}>
                <img
                  className="apod-image"
                  src={apodData.url}
                  alt={apodData.title}
                />
                <div className="apod-details-container">
                  <h2>{apodData.title}</h2>
                  <p className="apod-date">{apodData.date}</p>
                  <p className="apod-explanation">{apodData.explanation}</p>
                </div>
              </Col>
            </Row>
            <br />
          </div>
        )}
      </>
    );
  };
  const getNavBar = () => {
    return (
      <Navbar>
        <Row>
          <Col lg={16}></Col>
          <Col span={8}>
            <Form onFinish={handleSearch}>
              <Row>
                <Col span={18}>
                  <Input
                    placeholder="Search more images"
                    className="search-input"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Col>
                <Col span={4}>
                  <Button className="search-button" onClick={handleSearch}>
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Navbar>
    );
  };

  return (
    <>
      {getNavBar()}
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>NASA Media</h1>
      <Row justify="center">
        <Col xs={22} md={18} lg={14}>
          <Card className="apod-card">{getApod()}</Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
