import axios from "axios";
import {
   ADDED_TO_CART,
   CART_ADD_FAILED,
   PRODUCT_ALREADY_IN_CART,
   PRODUCT_NOT_IN_CART,
   USER_CART_LOADED,
   USER_CART_LOAD_FAIL,
} from "./types";

import { store } from "../store";
import { setAlert } from "./alert";
import { trackPromise } from "react-promise-tracker";

export const addToCart = (body) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   const data = {
      products: {
         ...body,
      },
   };

   trackPromise(
      axios
         .post("/api/cart", JSON.stringify(data), config)
         .then((res) => {
            dispatch({
               type: ADDED_TO_CART,
               payload: res.data,
            });
            dispatch({
               type: PRODUCT_ALREADY_IN_CART,
            });
            store.dispatch(getCart());

            dispatch(setAlert("Successfully added to cart", "success"));
         })
         .catch((e) => {
            console.log(e);
            dispatch(setAlert("Login to add product to cart", "error"));
            dispatch({
               type: CART_ADD_FAILED,
            });
         })
   );
   // try {
   // dispatch({
   //    type: ADDED_TO_CART,
   //    payload: res.data,
   // });
   // dispatch({
   //    type: PRODUCT_ALREADY_IN_CART,
   // });
   // dispatch(setAlert("Successfully added to cart", "success"));
   // } catch (e) {
   //    console.log(e);
   //    dispatch(setAlert("Login to add product to cart", "error"));
   //    dispatch({
   //       type: CART_ADD_FAILED,
   //    });
   // }
};

//find of the item is already in cart
export const getProductFromCart = (productId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/cart/${productId}`);

      if (res.data.data.length > 0) {
         dispatch({
            type: PRODUCT_ALREADY_IN_CART,
         });
      } else {
         dispatch({
            type: PRODUCT_NOT_IN_CART,
         });
      }
   } catch (e) {
      console.log(e);
      dispatch({
         type: PRODUCT_NOT_IN_CART,
      });
   }
};

export const getCart = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/cart");
      console.log(res);
      dispatch({
         type: USER_CART_LOADED,
         payload: res.data,
      });
   } catch (e) {
      console.log(e);
      dispatch({
         type: USER_CART_LOAD_FAIL,
      });
   }
};
