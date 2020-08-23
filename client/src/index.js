import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";
import "./utilities.scss";
import App from "./App";
import Playground from "./Playground";

ReactDOM.render(
   <BrowserRouter>
      {/* <Playground /> */}
      <App />
      <ToastContainer />
   </BrowserRouter>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
