import React, { useEffect, useContext, useState } from "react";

import ProductList from "../../products/components/ProductList";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MyProducts = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/seller/my-products",
        "get",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setFetchedProducts(response.data.products);
    };
    fetchProducts();
  }, [sendRequest, auth.token]);

  const deleteProductHandler = (deletedProductId) => {
    setFetchedProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  return (
    <div className="my-products">
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && !fetchedProducts.length && (
        <h2 style={{ fontSize: "3rem" }}>No Product Found.</h2>
      )}
      <ProductList items={fetchedProducts} onDelete={deleteProductHandler} />
    </div>
  );
};

export default MyProducts;
