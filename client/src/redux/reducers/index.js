import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import alert from "./alert";
import auth from "./auth";
import product from "./product";
import reviews from "./review";
import productDetail from "./productDetail";
import cart from "./cart";
import userCart from "./userCart";

const persistConfig = {
   key: "root",
   storage,
   whitelist: ["product"],
};

const rootReducer = combineReducers({
   alert,
   auth,
   product,
   productDetail,
   reviews,
   cart,
   userCart,
});

export default persistReducer(persistConfig, rootReducer);
