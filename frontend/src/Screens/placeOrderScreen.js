import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    props.history.push("/shipping");
  } else if (!cart.payment) {
    props.location.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // crete an order
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <strong>Address: </strong> {cart.shippingAddress.address},
            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
            {cart.shippingAddress.country}
          </div>

          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>

          <div>
            <ul className="cart-list-container">
              {cart.cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cart.cartItems.map((item) => (
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
              <div>Rs.{cart.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>Rs.{cart.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>Rs.{cart.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>Rs.{cart.totalPrice}</div>
            </li>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
