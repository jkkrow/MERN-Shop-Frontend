import React from "react";

import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = (props) => {
  return (
    <ul className="product-list">
      {props.items.map((item) => (
        <ProductItem
          key={item._id}
          _id={item._id}
          title={item.title}
          price={item.price}
          images={item.images}
          description={item.description}
        />
      ))}
    </ul>
  );
};

export default ProductList;
