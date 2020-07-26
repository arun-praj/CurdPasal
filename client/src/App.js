import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

import NavBar from "./components/NavBar/NavBar";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Signup from "./components/pages/Signup/Signup";
import Error from "./components/pages/Error/Error";
import Footer from "./components/Footer/Footer";

class App extends Component {
   state = {
      isSideDrawerOpen: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
   };
   drawerToggleClickHandler = () => {
      this.setState((prevState) => {
         return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
      });
   };
   render() {
      let backdrop = null;
      if (this.state.isSideDrawerOpen) {
         backdrop = <Backdrop zIndex="100" drawerToggle={this.drawerToggleClickHandler} />;
      }
      return (
         <Provider store={store}>
            <Fragment>
               {backdrop}
               <NavBar drawerToggle={this.drawerToggleClickHandler} />
               <SideDrawer
                  isOpen={this.state.isSideDrawerOpen}
                  onLoginBtnClick={this.loginModalClickHandler}
                  onSignupBtnClick={this.signupModalClickHandler}
               />
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route component={Error} />
               </Switch>
               <Footer />
            </Fragment>
         </Provider>
      );
   }
}

export default App;