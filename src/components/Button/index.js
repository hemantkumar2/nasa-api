import React from "react";
import { Button as AntdButton } from "antd";

import "./index.scss";

const Button = (props) => {
  return (
    <div>
      <AntdButton className="button-primary" {...props} />
    </div>
  );
};

export default Button;
