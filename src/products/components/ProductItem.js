import React from "react";
import { Link } from "react-router-dom";

import Rating from "./Rating";
import "./ProductItem.css";

const ProductItem = (props) => (
  <li className="product-item">
    <div className="product-item__image">
      <Link to={`/detail/${props._id}`}>
        <img src={props.images[0]} alt={props.title} />
      </Link>
    </div>
    <div className="product-item__info">
      <Link to={`/detail/${props._id}`}>
        <h3>{props.title}</h3>
        <h4>${props.price.toFixed(2)}</h4>
        <Rating value={props.rating} text={` (${props.numReviews})`} />
      </Link>
    </div>
  </li>
);

export default ProductItem;
