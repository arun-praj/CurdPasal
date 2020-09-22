import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("./components/pages/Home/Home"));
const Login = lazy(() => import("./components/pages/Login/Login"));
const Signup = lazy(() => import("./components/pages/Signup/Signup"));
const Error = lazy(() => import("./components/pages/Error/Error"));
const ProductDetails = lazy(() => import("./components/pages/ProductDetails/ProductDetails"));
const CartDetails = lazy(() => import("./components/pages/CartDetails/CartDetails"));
const UserProfile = lazy(() => import("./components/pages/UserProfile/UserProfile"));

// import Login from "./components/pages/Login/Login";
// import Signup from "./components/pages/Signup/Signup";
// import Error from "./components/pages/Error/Error";
// import Footer from "./components/Footer/FooterAccordion";
// import Footer from "./components/Footer/Footer";
// import CartDetails from "./components/pages/CartDetails/CartDetails";

// import ProductDetails from "./components/pages/ProductDetails/ProductDetails";

const Routes = () => {
   return (
      <Switch>
         <Route exact path='/' component={Home} />
         <Route exact path='/login' component={Login} />
         <Route exact path='/signup' component={Signup} />
         <Route exact path='/products/:id' component={ProductDetails} />
         <Route exact path='/cart' component={CartDetails} />
         <Route exact path='/profile' component={UserProfile} />

         <Route component={Error} />
      </Switch>
   );
};

export default Routes;
