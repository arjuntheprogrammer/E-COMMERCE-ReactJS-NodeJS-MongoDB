import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/registerScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";

function App() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

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
            <Link to="/cart">Cart</Link>

            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {/* <Link to="/signin">Sign In</Link> */}
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
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>

        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
