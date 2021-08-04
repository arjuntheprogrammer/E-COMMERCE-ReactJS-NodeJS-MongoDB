import axios from "axios";
import Cookie from "js-cookie";

import {
  CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    dispatch({
      type: ORDER_CREATE_REQUEST,
      payload: order,
    });

    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });

    dispatch({ type: CART_EMPTY });

    Cookie.remove("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.message && error.response.data.msg
        ? error.response.data.msg
        : error.message;

    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export { createOrder, detailsOrder };
