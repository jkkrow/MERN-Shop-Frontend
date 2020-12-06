import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ProductList from "../components/ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Products.css";

const Products = ({ match }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/products?keyword=${keyword}&page=${pageNumber}`
      );
      setFetchedProducts(response.data.products);
      setPageLoaded(true);
    };
    fetchProducts();
  }, [sendRequest, keyword, pageNumber]);

  return (
    <div className="products">
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && pageLoaded && !fetchedProducts.length && (
        <h2 style={{ fontSize: "3rem" }}>No Product Found.</h2>
      )}
      <ProductList items={fetchedProducts} />
    </div>
  );
};

export default Products;
