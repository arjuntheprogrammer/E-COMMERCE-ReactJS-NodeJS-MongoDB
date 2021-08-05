import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    const { data } = await axios.post("/api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error.message", error.message);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  Cookie.remove("userInfo");
  Cookie.remove("cartItems");
  Cookie.remove("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: userId,
    });

    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: user,
    });

    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export { signIn, register };
