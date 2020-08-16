import { GET_PRODUCT } from "../action/types";
const initialState = {
   loading: true,
   product: null,
};
const productDetailReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case GET_PRODUCT:
         return {
            ...state,
            loading: false,
            product: payload,
         };

      default:
         return state;
   }
};
export default productDetailReducer;
