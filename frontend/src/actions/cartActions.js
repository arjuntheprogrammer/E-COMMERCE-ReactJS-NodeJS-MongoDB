import axios from "axios";
import Cookie from "js-cookie";

import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });
  Cookie.set("shippingAddress", JSON.stringify(data));
};

const savePayment = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
