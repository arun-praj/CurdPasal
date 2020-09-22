import {
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGOUT,
   USER_UPDATE_FAIL,
   USER_UPDATE_SUCCESS,
} from "./types";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { store } from "../store";
import { getCart } from "./cart";

export const updateCustomerProfile = (body) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   console.log(body);
   trackPromise(
      axios
         .patch("/api/auth/customer", body, config)
         .then((res) => {
            dispatch(setAlert(" ✔︎ User updated", "success"));
            dispatch({
               type: USER_UPDATE_SUCCESS,
               payload: res.data,
            });
         })
         .catch((e) => {
            setAlert(e, "error");
            dispatch({
               type: USER_UPDATE_FAIL,
               payload: e,
            });
         })
   );
};

export const loginWithGoogle = (response) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   console.log(response.profileObj);

   const { email, googleId, imageUrl, familyName, givenName } = response.profileObj;

   const body = JSON.stringify({ email, googleId, imageUrl, familyName, givenName });
   try {
      const res = await axios.post("/api/auth/google", body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
   } catch (e) {
      if (e.response) {
         dispatch(setAlert(e.response, "error"));
      } else {
         dispatch(setAlert("SERVER ERROR", "error"));
      }
      dispatch({
         type: LOGIN_FAILED,
      });
   }
};

export const login = ({ email, password }) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   //    console.log(state);
   const body = JSON.stringify({ email, password });
   //    console.log(body);
   try {
      const res = await axios.post("/api/auth/login", body, config);
      setAuthToken(res.data.token);
      // console.log(res.data);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
      store.dispatch(getCart());
   } catch (e) {
      // dispatch(setAlert("SERVER ERROR", "error"));`
      if (e.response.data.error) {
         dispatch(setAlert(e.response.data.error, "error"));
      } else {
         dispatch(setAlert("SERVER ERROR", "error"));
      }
      dispatch({
         type: LOGIN_FAILED,
      });
   }
};

export const register = (state) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   //    console.log(state);
   const { firstName, lastName, email, password, city, points, contact, photo } = state;
   const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      city,
      points,
      contact,
      photo,
   });
   console.log(body);
   try {
      const res = await axios.post("/api/auth/register", body, config);
      setAuthToken(res.data.token);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
   } catch (e) {
      // console.log(err);
      dispatch(setAlert(e, "error"));
      dispatch({
         type: REGISTER_FAILED,
      });
   }
};

export const loadUser = () => async (dispatch) => {
   try {
      if (localStorage.getItem("token")) {
         setAuthToken(localStorage.getItem("token"));
      }
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      // console.log(localStorage.getItem("token"));
      const res = await axios.get("/api/auth/me", config);
      if (res.data.data) {
         dispatch({
            type: USER_LOADED,
            payload: res.data,
         });
      } else {
         dispatch({
            type: AUTH_ERROR,
         });
      }

      // if(res)
   } catch (e) {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};

export const logout = () => (dispatch) => {
   dispatch({
      type: LOGOUT,
   });
};
