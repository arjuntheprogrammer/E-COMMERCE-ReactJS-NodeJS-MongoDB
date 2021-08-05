import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";

import "./App.css";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ProductScreen from "./Screens/ProductScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import SigninScreen from "./Screens/SigninScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";

import { signout } from "./actions/userActions";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderList">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userList">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>

            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>

        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
