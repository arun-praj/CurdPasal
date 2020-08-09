import {
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
   LOGOUT,
} from "../action/types";
// import Cookies from "js-cookie";
const initialState = {
   token: localStorage.getItem("token"),
   isAuthenticated: false,
   loading: true,
   user: null,
   //    token: localStorage.getItem("token"),
};
const authReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload,
         };
      case LOGOUT:
      case LOGIN_FAILED:
      case REGISTER_FAILED:
      case AUTH_ERROR:
         // Cookies.remove("token");
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
         };

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem("token", payload.token);
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false,
         };
      default:
         return state;
   }
};

export default authReducer;
