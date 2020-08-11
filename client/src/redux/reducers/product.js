import { PRODUCTS_LOADED, PRODUCTS_LOAD_FAIL } from "../action/types";
const initialState = {
   loading: true,
   products: null,
};
const productReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case PRODUCTS_LOADED:
         return {
            ...state,
            loading: false,
            products: payload,
         };
      case PRODUCTS_LOAD_FAIL:
         return {
            ...state,
            loading: false,
            products: null,
         };
      default:
         return state;
   }
};
export default productReducer;
