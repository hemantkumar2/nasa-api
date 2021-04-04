import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, message, Row, Col, Spin } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import moment from "moment";

import { API_ROOT_IMAGES } from "constants/api-config";
import { SearchContext } from "context/SearchContext";
import Pagination from "components/Pagination";
import Navbar from "components/Navbar";

import "./index.scss";

const { Meta } = Card;

const SearchResultPage = () => {
  const { searchText } = useContext(SearchContext);
  const history = useHistory();
  const [imagesData, setImagesData] = useState({
    pageDetails: [],
    images: [],
    status: null,
    nextPageFromApi: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    paginatedImagesData: [],
  });
  const [currentApiPage, setCurrentApiPage] = useState(1);
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const paginatedData = [];
    function fetchNasaImages() {
      axios
        .get(
          `${API_ROOT_IMAGES}search?page=${currentApiPage}&q=${searchText}&media_type=image`
        )
        .then((res) => {
          setImagesData({
            pageDetails: res?.data?.collection?.links,
            images: res?.data?.collection?.items,
            status: res?.status,
            nextPageFromApi: res?.data?.collection?.links,
          });
          const imagesArr = res?.data?.collection?.items;
          for (let i = 0; i < imagesArr.length / 20; i++) {
            paginatedData.push(imagesArr.slice(i * 20, i * 20 + 20));
          }
          setPagination({
            paginatedImagesData: paginatedData,
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

  const fetchMoreData = () => {
    const paginatedData = [];
    axios
      .get(
        `${API_ROOT_IMAGES}search?page=${currentApiPage}&q=${searchText}&media_type=image`
      )
      .then((res) => {
        setImagesData({
          ...pagination,
          pageDetails: res?.data?.collection?.links,
          images: [...imagesData.images, ...res?.data?.collection?.items],
          status: res?.status,
        });
        const imagesArr = [
          ...imagesData.images,
          ...res?.data?.collection?.items,
        ];
        for (let i = 0; i < imagesArr.length / 20; i++) {
          paginatedData.push(imagesArr.slice(i * 20, i * 20 + 20));
        }
        setPagination({
          paginatedImagesData: paginatedData,
        });
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong contact support!");
      });
  };
  const onPageChange = (pageNo) => {
    const maxPageNo = pagination?.paginatedImagesData.length;
    if (pageNo === maxPageNo && currentApiPage <= 100) {
      setCurrentApiPage((previousState) => previousState + 1);
      fetchMoreData();
    }
    setCurrentPage(pageNo);
  };

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
            {pagination?.paginatedImagesData[currentPage - 1]?.map((image) => {
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

  const getPagination = () => {
    const total = imagesData.images.length;
    return (
      <div className="pagination">
        <Pagination
          onChange={(pageNo) => onPageChange(pageNo)}
          hideOnSinglePage={true}
          showSizeChanger={false}
          pageSize={20}
          defaultCurrent={1}
          total={total}
        />
      </div>
    );
  };
  const getNavbar = () => {
    return (
      <Navbar>
        <div className="search-page-navbar" onClick={() => history.push("/")}>
          <LeftCircleTwoTone style={{ fontSize: "34px", marginLeft: "2rem" }} />
          <span className="back-from-search">Back</span>
        </div>
      </Navbar>
    );
  };

  return (
    <>
      {getNavbar(0)}
      {getSearchBody()}
      {getPagination()}
    </>
  );
};

export default SearchResultPage;
