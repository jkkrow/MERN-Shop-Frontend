import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ProductList from "../components/ProductList";
import Pagination from "../../shared/components/UI/Pagination";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Products.css";

const Products = ({ match }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const keyword = match.params.keyword || "";
  const currentPage = match.params.currentPage || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/products?keyword=${keyword}&page=${currentPage}`
      );
      setFetchedProducts(response.data.products);
      setTotalPage(response.data.pages)
      setPageLoaded(true);
    };
    fetchProducts();
  }, [sendRequest, keyword, currentPage]);

  return (
    <div className="products">
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && pageLoaded && !fetchedProducts.length && (
        <h2 style={{ fontSize: "3rem" }}>No Product Found.</h2>
      )}
      <ProductList items={fetchedProducts} />
      <Pagination totalPage={totalPage} currentPage={currentPage} keyword={keyword} />
    </div>
  );
};

export default Products;
