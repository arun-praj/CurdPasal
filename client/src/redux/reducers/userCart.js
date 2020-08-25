import { USER_CART_LOADED, USER_CART_LOAD_FAIL } from "../action/types";
const initialState = {
   cart: {},
   empty: true,
   loading: true,
};
const userCartReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_CART_LOADED:
         return {
            ...state,
            loading: false,
            cart: payload,
            empty: false,
         };
      case USER_CART_LOAD_FAIL:
         return {
            ...state,
            loading: false,
         };

      //   case CART_ADD_FAILED:
      //      return {
      //         ...state,
      //         loading: false,
      //         cart: null,
      //      };
      //   case PRODUCT_ALREADY_IN_CART:
      //      return {
      //         ...state,
      //         alreadyInCart: true,
      //         loading: false,
      //      };
      //   case PRODUCT_NOT_IN_CART:
      //      return {
      //         ...state,
      //         alreadyInCart: false,
      //         loading: false,
      //      };

      default:
         return state;
   }
};

export default userCartReducer;
