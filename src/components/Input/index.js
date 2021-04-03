import React from "react";
import { Input as AntdInput } from "antd";

import "./index.scss";

const Input = (props) => {
  return (
    <span className="input-search">
      <AntdInput {...props} />
    </span>
  );
};

export default Input;
