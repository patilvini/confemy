import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/auth/authTypes";

const api = axios.create({
  withCredentials: true,
  baseURL: "https://dev.confemy.com/api/",
  headers: {
    "Access-Control-Allow-Origin": "http://dev.confemy.com",
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
    if (err.response.data.msg === "Invalid Credentials") {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
