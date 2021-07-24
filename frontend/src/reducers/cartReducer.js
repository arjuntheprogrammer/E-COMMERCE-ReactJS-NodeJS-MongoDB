import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
}

export { cartReducer };
