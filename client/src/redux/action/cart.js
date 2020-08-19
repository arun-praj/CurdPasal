import axios from "axios";
import {
   ADDED_TO_CART,
   CART_ADD_FAILED,
   PRODUCT_ALREADY_IN_CART,
   PRODUCT_NOT_IN_CART,
} from "./types";
import { setAlert } from "./alert";

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

   try {
      const res = await axios.post("http://localhost:8000/api/cart", JSON.stringify(data), config);
      dispatch({
         type: ADDED_TO_CART,
         payload: res.data,
      });
      dispatch({
         type: PRODUCT_ALREADY_IN_CART,
      });
      dispatch(setAlert("Successfully added to cart", "success"));
   } catch (e) {
      console.log(e);
      dispatch(setAlert("Login to add product to cart", "error"));
      dispatch({
         type: CART_ADD_FAILED,
      });
   }
};

export const getProductFromCart = (productId) => async (dispatch) => {
   try {
      const res = await axios.get(`http://localhost:8000/api/cart/${productId}`);
      console.log();

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
   }
};
