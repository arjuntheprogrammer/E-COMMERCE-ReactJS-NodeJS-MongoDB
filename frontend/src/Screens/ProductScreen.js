import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

function ProductScreen(props) {
  console.log(props.match.params.id);
  const product = data.products.find((x) => x._id === props.match.params.id);

  return (
    <div>
      <div>
        <Link className="back-to-result" to="/">
          Back to Results
        </Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product-img" />
        </div>

        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>Rs. {product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>

        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </li>
            <li>
              <button className="button">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
