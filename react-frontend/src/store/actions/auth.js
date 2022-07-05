import * as actionTypes from "./actionTypes";

import axios from "axios";
import axiosUni from "../../axios-Uni";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (response, signup) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    response: response,
    signup: signup,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (data, signup) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      let response;
      if (signup) {
        await axiosUni.post("/signup", data);
        response = await axiosUni.post("/auth", {
          username: data.username,
          password: data.password,
        });
      } else {
        response = await axiosUni.post("/auth", data);
      }
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);
      setTimeout(() => {
        logout();
      }, 3600000);
      dispatch(authSuccess(response, signup));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const confirmFirstLogin = () => {
  return {
    type: actionTypes.CONFIRM_FIRST_LOGIN,
  };
};

export const fetchByToken = (token) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/${localStorage.getItem("username")}`,
        {"dreamschool": "Harvard University"},
        {
          headers: {
            Authorization: `JWT ${token}`
          }
        });
      dispatch(fetchByTokenSuccess(response));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

const fetchByTokenSuccess = (data) => {
  return {
    type: actionTypes.FETCH_BY_TOKEN,
    data: data,
  };
};

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      const response = await axiosUni.post("/auth", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
      });
      dispatch(authSuccess(response, false));
    } catch (error) {}
  };
};

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  return {
    type: actionTypes.LOGOUT,
  };
};
