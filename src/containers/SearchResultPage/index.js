import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "context/SearchContext";
import axios from "axios";
import { API_ROOT_IMAGES } from "constants/api-config";
import { Card, message, Row, Col, Spin } from "antd";
import moment from "moment";

import "./index.scss";

const { Meta } = Card;

const SearchResultPage = () => {
  const { searchText } = useContext(SearchContext);
  const [imagesData, setImagesData] = useState({
    pageDetails: [],
    images: [],
    status: null,
  });

  useEffect(() => {
    function fetchNasaImages() {
      axios
        .get(
          `${API_ROOT_IMAGES}search?page=${1}&q=${searchText}&media_type=image`
        )
        .then((res) => {
          console.log(res.status);
          setImagesData({
            pageDetails: res?.data?.collection?.links,
            images: res?.data?.collection?.items,
            status: res?.status,
          });
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong contact support!");
        });
    }
    fetchNasaImages();
    return () => {};
  }, []);
  console.log(imagesData);
  const getFormattedDate = (date) => {
    return moment(date).format("MMM Do YYYY");
  };

  const getImageCardContainer = () => {
    return (
      <Row justify="center">
        <Col xs={22} sm={20} md={20} lg={18} xl={16}>
          <Row
            style={{ paddingTop: "5rem" }}
            gutter={[16, 16]}
            justify="center"
          >
            {imagesData?.images?.map((image) => {
              return (
                <Col key={image?.data[0]?.nasa_id}>
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                        style={{ height: "15rem" }}
                        alt={image?.data[0]?.title}
                        src={image?.links[0]?.href}
                      />
                    }
                  >
                    <Meta
                      title={image?.data[0].title}
                      description={getFormattedDate(
                        image?.data[0]?.date_created
                      )}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    );
  };
  const getSearchBody = () => {
    if (imagesData.status === null)
      return (
        <div className="loader">
          <Spin size="large" />
        </div>
      );
    if (imagesData.status === 200 && !imagesData.images.length)
      return <div>No Images found</div>;
    if (imagesData.status === 200 && imagesData.images.length)
      return getImageCardContainer();
  };

  return <>{getSearchBody()}</>;
};

export default SearchResultPage;
