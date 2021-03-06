import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

function ProductScreen(props) {
  // console.log(props.match.params.id);
  // const product = data.products.find((x) => x._id === props.match.params.id);

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // cleanup
    };
  }, [dispatch, props]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to Results</Link>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
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
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
