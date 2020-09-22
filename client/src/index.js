import React from "react";
import ReactDOM from "react-dom";

//redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//css
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
// import Playground from "./Playground";

//scss
import "./scss/main.scss";
ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         {/* <Playground /> */}
         <PersistGate persistor={persistor}>
            <App />
         </PersistGate>
         <ToastContainer />
      </BrowserRouter>
   </Provider>,

   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
