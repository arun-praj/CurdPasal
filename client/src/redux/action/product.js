import axios from "axios";

import { PRODUCTS_LOADED, GET_PRODUCT, PRODUCTS_LOAD_FAIL } from "./types";

import { setAlert } from "./alert";

export const loadProducts = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/products");
      console.log(res);
      dispatch({
         type: PRODUCTS_LOADED,
         payload: res.data.data,
      });
   } catch (e) {
      dispatch(setAlert(e, "error"));
      dispatch({
         type: PRODUCTS_LOAD_FAIL,
      });
   }
};

export const getProduct = (id) => async (dispatch) => {
   try {
      console.log(id);
      const res = await axios.get(`/api/products/${id}`);
      dispatch({
         type: GET_PRODUCT,
         payload: res.data.data,
      });
   } catch (e) {
      dispatch(setAlert(e, "error"));
      dispatch({
         type: PRODUCTS_LOAD_FAIL,
      });
   }
};
