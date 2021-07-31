import axios from "axios";
import Cookie from "js-cookie";

import {
  CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { createOrder };
