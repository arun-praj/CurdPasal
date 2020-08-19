import {
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGOUT,
} from "./types";
import axios from "axios";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loginWithGoogle = (response) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   const { sW, yu, sU, PK, OU } = response.Ot;

   const body = JSON.stringify({ sW, yu, sU, PK, OU });
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

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
   } catch (e) {
      // dispatch(setAlert("SERVER ERROR", "error"));
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
      console.log("res", res.data.data);
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
