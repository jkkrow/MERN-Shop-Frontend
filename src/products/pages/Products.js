import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ProductList from "../components/ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Products.css";

const Products = ({ match }) => {
  const keyword = match.params.keyword || "";
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/products?keyword=${keyword}`
      );
      setFetchedProducts(response.data.products);
    };
    fetchProducts();
  }, [sendRequest, keyword]);

  return (
    <div className="products">
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && !fetchedProducts.length && (
        <h2 style={{ fontSize: "3rem" }}>No Product Found.</h2>
      )}
      <ProductList items={fetchedProducts} />
    </div>
  );
};

export default Products;
