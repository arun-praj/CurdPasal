import React, { Component, Fragment, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

//REDUX
import { store } from "./redux/store";
import { loadUser } from "./redux/action/auth";
import { getCart } from "./redux/action/cart";
import MoonLoader from "react-spinners/MoonLoader";

// import Home from "./components/pages/Home/Home";

import NavBar from "./components/NavBar/NavBar";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import SideDrawer from "./components/SideDrawer/SideDrawer";

import Routes from "./Routes";
const Footer = lazy(() => import("./components/Footer/FooterAccordion"));

class App extends Component {
   state = {
      isSideDrawerOpen: false,
   };
   componentDidMount() {
      store.dispatch(loadUser());
      store.dispatch(getCart());
   }

   drawerToggleClickHandler = () => {
      this.setState((prevState) => {
         return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
      });
   };
   render() {
      let backdrop = null;
      if (this.state.isSideDrawerOpen) {
         backdrop = <Backdrop zIndex='100' drawerToggle={this.drawerToggleClickHandler} />;
      }
      return (
         <Suspense
            fallback={
               <div
                  style={{
                     position: "absolute",
                     left: "50%",
                     top: "50%",
                     transform: "translate(-50%,-50%)",
                     textAlign: "center",
                  }}>
                  <MoonLoader size={35} color={"#123abc"} />;
               </div>
            }>
            <Fragment>
               {backdrop}
               <NavBar drawerToggle={this.drawerToggleClickHandler} />

               <SideDrawer
                  isOpen={this.state.isSideDrawerOpen}
                  onClick={this.drawerToggleClickHandler}
               />

               <Routes />

               <Footer />
            </Fragment>
         </Suspense>
      );
   }
}

export default App;
