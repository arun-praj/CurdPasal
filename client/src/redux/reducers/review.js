import { REVIEWS_LOADED, REVIEWS_LOAD_FAILED } from "../action/types";
const initialState = {
   loading: true,
   reviews: null,
};
const reviewReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case REVIEWS_LOADED:
         return {
            ...state,
            loading: false,
            reviews: payload,
         };

      case REVIEWS_LOAD_FAILED:
         return {
            ...state,
            loading: false,
            reviews: null,
         };
      default:
         return state;
   }
};
export default reviewReducer;
