import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/auth/authTypes";
// import { logoutAction } from "../redux/auth/authAction";

const api = axios.create({
  withCredentials: true,
  baseURL: "https://dev.confemy.com/api/",
  headers: {
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "https://dev.confemy.com",
    "Content-Type": "application/json",
  },
});

/**
 interceptor funciton is run async by default after then and cath.
 following interceptor function runs after a response is received. 
 there is a seperate interceptor function if one wants do something before making a request. 
 in the folliwing function, if one gets a response, we will return the response.
 if one gets an error, we will.
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("api error data", err.response.data);
    // if (err.response.data.msg === "Invalid Credentials") {
    //   store.dispatch({ type: LOGOUT });
    if (err.response.data.message === "Please login") {
      store.dispatch({ type: LOGOUT });
      console.log("should cick in logout action", store);
      // store.dispatch(logoutAction());
    }
    return Promise.reject(err);
  }
);

export default api;
