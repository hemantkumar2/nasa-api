import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ROOT, API_KEY } from "constants/api-config";
import { Input, Button, Form } from "antd";

const index = () => {
  const [apodData, setApodData] = useState(null);
  useEffect(async () => {
    const apodData = await axios.get(
      `${API_ROOT}planetary/apod?api_key=${API_KEY}`
    );
    const { data } = apodData;
    setApodData(data);
  }, []);

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
            <Input style={{ width: "20rem" }} />
            <Button>Search</Button>
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
