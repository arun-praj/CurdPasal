import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";
import reviews from "./review";
import productDetail from "./productDetail";
import cart from "./cart";
import userCart from "./userCart";

export default combineReducers({ alert, auth, product, productDetail, reviews, cart, userCart });
