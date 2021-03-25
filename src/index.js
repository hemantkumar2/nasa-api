import React from "react";
import ReactDOM from "react-dom";
import Routes from "routes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "antd/dist/antd.css";
import "./scss/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
