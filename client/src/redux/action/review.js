import { REVIEWS_LOADED, REVIEWS_LOAD_FAILED } from "./types";
import axios from "axios";
export const loadReviews = (productId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/reviews/${productId}`);
      console.log(res);
      dispatch({
         type: REVIEWS_LOADED,
         payload: res.data.data,
      });
   } catch (e) {
      dispatch({
         type: REVIEWS_LOAD_FAILED,
      });
   }
};
