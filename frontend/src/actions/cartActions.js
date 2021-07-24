import axios from "axios";
import Cookie from "js-cookie";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export { addToCart, removeFromCart };
