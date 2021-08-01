import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, message, Row, Col, Spin } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import moment from "moment";
import { useQuery } from "react-query";

import { API_ROOT_IMAGES } from "constants/api-config";
import { SearchContext } from "context/SearchContext";
import Pagination from "components/Pagination";
import Navbar from "components/Navbar";

import "./index.scss";

const { Meta } = Card;

const fetchData = async ({ queryKey }) => {
  const response = await fetch(
    `${API_ROOT_IMAGES}search?page=${queryKey[1]}&q=${queryKey[2]}&media_type=image`
  );
  return response.json();
};

const SearchResultPage = () => {
  const { searchText } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentApiPage, setCurrentApiPage] = useState(1);
  const { data, status } = useQuery(
    ["nasaImageData", currentApiPage, searchText],
    fetchData,
    { keepPreviousData: true }
  );
  const history = useHistory();
  const [imagesData, setImagesData] = useState({
    pageDetails: [],
    images: [],
    dataFetchStatus: null,
    nextPageFromApi: {},
  });
  const [pagination, setPagination] = useState({
    paginatedImagesData: [],
  });
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  console.log("imageData", data, status);

  useEffect(() => {
    const paginatedData = [];
    fetchNasaImages(paginatedData);
    return () => {
      console.log("return from search!");
    };
  }, [status]);

  function fetchNasaImages(paginatedData) {
    try {
      if (status === "success") {
        setImagesData({
          pageDetails: data?.collection?.links,
          images: [...imagesData.images, ...data?.collection?.items],
          dataFetchStatus: status,
          nextPageFromApi: data?.collection?.links,
        });
        const imagesArr = [...imagesData.images, ...data?.collection?.items];
        for (let i = 0; i < imagesArr.length / 20; i++) {
          paginatedData.push(imagesArr.slice(i * 20, i * 20 + 20));
        }
        setPagination({
          paginatedImagesData: paginatedData,
        });
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong contact support!");
    }
  }

  const fetchMoreData = async () => {
    const paginatedData = [];
    fetchNasaImages(paginatedData);
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
            style={{
              paddingTop: "5rem",
              display: "flex",
              justifyContent: "center",
            }}
            gutter={[16, 16]}
          >
            {pagination?.paginatedImagesData[currentPage - 1]?.map((image) => {
              return (
                <Col key={image?.data[0]?.nasa_id}>
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                        loading="lazy"
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
    if (imagesData.dataFetchStatus === null)
      return (
        <div className="loader">
          <Spin size="large" />
        </div>
      );
    if (imagesData.dataFetchStatus === "success" && !imagesData.images.length)
      return <div className="no-img-found">No Image found</div>;
    if (imagesData.images.length) return getImageCardContainer();
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
