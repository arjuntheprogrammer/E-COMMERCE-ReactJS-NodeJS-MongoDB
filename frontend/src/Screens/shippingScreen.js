import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label for="address">Address</label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label for="city">City</label>
              <input
                type="city"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label for="postalCode">Postal Code</label>
              <input
                type="postalCode"
                name="postalCode"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <label for="country">Country</label>
              <input
                type="country"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
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

export default ShippingScreen;
