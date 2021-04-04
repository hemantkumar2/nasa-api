/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "antd";
import NasaSvg from "Assets/svgs/nasa.svg";

import "./index.scss";

const Navbar = (props) => {
  return (
    <Row className="navbar">
      <Col span={24}>
        <div className="navbar-logo">
          <object data={NasaSvg} width="50" height="50"></object>
        </div>
        {props.children}
      </Col>
    </Row>
  );
};

export default Navbar;
