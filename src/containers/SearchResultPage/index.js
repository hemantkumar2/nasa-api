import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "context/SearchContext";
import axios from "axios";
import { API_ROOT_IMAGES } from "constants/api-config";
import { Card, message, Row, Col } from "antd";
import moment from "moment";

const { Meta } = Card;

const index = () => {
  const { searchText } = useContext(SearchContext);
  const [imagesData, setImagesData] = useState({
    pageDetails: [],
    images: [],
  });

  useEffect(() => {
    function fetchNasaImages() {
      axios
        .get(
          `${API_ROOT_IMAGES}search?page=${1}&q=${searchText}&media_type=image`
        )
        .then((res) =>
          setImagesData({
            pageDetails: res?.data?.collection?.links,
            images: res?.data?.collection?.items,
          })
        )
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong contact support");
        });
    }
    fetchNasaImages();
    return () => {};
  }, []);

  const getFormattedDate = (date) => {
    return moment(date).format("MMM Do YYYY");
  };

  return (
    <>
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
    </>
  );
};

export default index;
