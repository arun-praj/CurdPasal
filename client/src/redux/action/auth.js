import {
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGOUT,
} from "../action/types";
import axios from "axios";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

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
      const res = await axios.post("http://localhost:8000/api/auth/login", body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
   } catch (e) {
      const err = e.response.data.error;
      //   console.log(err);
      dispatch(setAlert(err, "error"));
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
   const body = JSON.stringify(state);
   //    console.log(body);
   try {
      const res = await axios.post("http://localhost:8000/api/auth/register", body, config);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
   } catch (e) {
      const err = e.response.data.error;
      //   console.log(err);
      dispatch(setAlert(err, "error"));
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

      console.log(localStorage.getItem("token"));
      // if (Cookies.get("token")) {

      // }
      // console.log(Cookies.get("token"));
      const res = await axios.get("http://localhost:8000/api/auth/me");
      console.log("res", res);
      dispatch({
         type: USER_LOADED,
         payload: res.data,
      });
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
