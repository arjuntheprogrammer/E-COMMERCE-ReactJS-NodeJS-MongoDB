import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.location.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // crete an order
  };
  useEffect(() => {
    return () => {
      //   cleanup;
    };
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            {cart.shipping.address}, {cart.shipping.city},
            {cart.shipping.postalCode}, {cart.shipping.country},
          </div>

          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>

          <div>
            <ul className="cart-list-container">
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product-img" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">Rs.{item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                {" "}
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
