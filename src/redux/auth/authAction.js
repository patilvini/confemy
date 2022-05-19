import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./authTypes";
import { REMOVE_PROFILE } from "../profile/profileTypes";
import axios from "axios";
import { alertAction } from "../alert/alertAction";
import { messageAction } from "../message/messageAction";
import api from "../../utility/api";

// loaduser

export const loadUserAction = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "https://dev.confemy.com/api/user",
    });
    console.log("Response LoadUser:", response);
    dispatch({
      type: USER_LOADED,
      payload: response?.data.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register;

export const registerAction = (formData, history) => async (dispatch) => {
  try {
    // const response = await axios({
    //   method: "POST",
    //   data: formData,
    //   withCredentials: true,
    //   url: "http://localhost:5000/api/register",
    // });
    const response = await api.post("register", formData);
    dispatch({
      type: REGISTER_SUCCESS,
    });
    const { msg } = response.data;
    dispatch(messageAction(msg));
    //redirecting to message component
    // history.push('/message');
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(alertAction(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login

export const loginAction = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: userData,
  });
};

// logout

export const logoutAction = () => async (dispatch) => {
  // dispatch({
  //   type: REMOVE_PROFILE,
  // });
  dispatch({
    type: LOGOUT,
  });
};
