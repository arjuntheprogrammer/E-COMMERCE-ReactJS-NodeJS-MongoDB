import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <span>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="Paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paypal">Paypal</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value="Stripe"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="stripe">Stripe</label>
              </span>
            </li>
            <li>
              <button className="button primary">Continue</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default PaymentScreen;
