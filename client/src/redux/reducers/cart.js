import {
   CART_ADD_FAILED,
   ADDED_TO_CART,
   PRODUCT_ALREADY_IN_CART,
   PRODUCT_NOT_IN_CART,
} from "../action/types";
const initialState = {
   cart: null,
   alreadyInCart: false,
   loading: true,
};
const authReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case ADDED_TO_CART:
         return {
            ...state,
            loading: false,
            cart: payload,
         };

      case CART_ADD_FAILED:
         return {
            ...state,
            loading: false,
            cart: null,
         };
      case PRODUCT_ALREADY_IN_CART:
         return {
            ...state,
            alreadyInCart: true,
            loading: false,
         };
      case PRODUCT_NOT_IN_CART:
         return {
            ...state,
            alreadyInCart: false,
            loading: false,
         };

      default:
         return state;
   }
};

export default authReducer;
