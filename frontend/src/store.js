import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import { cartReducer } from "./reducers/cartReducer";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducer";

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = { cart: { cartItems } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
