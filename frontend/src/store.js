import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import { cartReducer } from "./reducers/cartReducer";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from "./reducers/productReducer";
import {
  UserDetailsReducer,
  UserRegisterReducer,
  UserSignInReducer,
  UserUpdateProfileReducer,
} from "./reducers/userReducer";
import {
  OrderCreateReducer,
  OrderDetailsReducer,
  OrderMineListReducer,
  OrderPayReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const shippingAddress = Cookie.getJSON("shippingAddress") || {};

const initialState = {
  cart: {
    cartItems,
    shippingAddress: { shippingAddress },
    payment: "PayPal",
  },
  userSignIn: { userInfo },
};

const reducer = combineReducers({
  userUpdateProfile: UserUpdateProfileReducer,
  userDetails: UserDetailsReducer,
  orderMineList: OrderMineListReducer,
  orderPay: OrderPayReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userSignIn: UserSignInReducer,
  userRegister: UserRegisterReducer,
  orderCreate: OrderCreateReducer,
  orderDetails: OrderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
