import React, { useEffect, useState, useContext } from "react";
import { Form, message, Card, Row, Col, Spin } from "antd";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useQuery } from "react-query";

import { API_ROOT_APOD } from "constants/api-config";
import { SearchContext } from "context/SearchContext";
import Navbar from "components/Navbar";
import Button from "components/Button";
import Input from "components/Input";

import "./index.scss";

const { REACT_APP_API_KEY } = process.env;
const HomePage = () => {
  const [apodData, setApodData] = useState();
  const [searchInputText, setSearchInputText] = useState("");
  const { setSearchText } = useContext(SearchContext);
  const history = useHistory();

  const { data, status } = useQuery(
    ["nasa_apod"],
    () => fetchData(API_ROOT_APOD, REACT_APP_API_KEY),
    { keepPreviousData: true }
  );

  useEffect(async () => {
    if (status === "success") setApodData(data);
    return () => {};
  }, [status]);

  const handleInputChange = (e) => {
    setSearchInputText(e.target.value);
  };

  async function fetchData(API_ROOT_APOD, REACT_APP_API_KEY) {
    const response = await fetch(
      `${API_ROOT_APOD}planetary/apod?api_key=${REACT_APP_API_KEY}`
    );
    return response.json();
  }

  const handleSearch = () => {
    if (!searchInputText)
      return message.warning("Please provide any search input!");
    setSearchText(searchInputText);
    history.push("/search-results");
  };
  const getImageOrVideo = () => {
    const url = apodData?.url;
    const isVideo = url.slice(8, 23) === "www.youtube.com";
    if (isVideo) return <ReactPlayer width="100%" url={url} controls={true} />;
    return (
      <img className="apod-image" src={apodData.url} alt={apodData.title} />
    );
  };
  const getApod = () => {
    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            {getImageOrVideo()}
            <div className="apod-details-container">
              <h2>{apodData.title}</h2>
              <p className="apod-date">{apodData.date}</p>
              <p className="apod-explanation">{apodData.explanation}</p>
            </div>
          </Col>
        </Row>
        <br />
      </div>
    );
  };

  const getNavBar = () => {
    return (
      <Navbar>
        <Row justify="center">
          <Col lg={16}></Col>
          <Col lg={8}>
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
  const getHero = () => {
    if (!apodData)
      return (
        <div className="loader">
          <Spin size="large" />
        </div>
      );
    return (
      <Row justify="center">
        <Col xs={22} md={18} lg={14}>
          <Card className="apod-card">{getApod()}</Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {getNavBar()}
      <h1
        className="title-main"
        style={{ textAlign: "center", margin: "2rem 0" }}
      >
        NASA Media
      </h1>
      {getHero()}
    </>
  );
};

export default HomePage;
