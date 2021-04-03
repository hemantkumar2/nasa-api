/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "antd";

import "./index.scss";

const Navbar = (props) => {
  return (
    <Row className="navbar">
      <Col span={24}>{props.children}</Col>
    </Row>
  );
};

export default Navbar;
