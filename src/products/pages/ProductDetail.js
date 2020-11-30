import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductReviews from "../components/ProductReviews";
import NumberInput from "../../shared/components/FormElements/NumberInput";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { CartContext } from "../../shared/context/cart-context";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProductDetail.css";

const ProductDetail = ({ history }) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [fetchedProduct, setFetchedProduct] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/detail/${productId}`
      );
      setFetchedProduct(response.data.product);
      setSelectedImage(response.data.product.images[0]);
    };
    fetchProduct();
  }, [sendRequest, productId]);

  const addToCartHandler = async () => {
    if (auth.isLoggedIn) {
      setAddToCartLoading(true);
      const response = await axios({
        url: "http://localhost:5000/api/user/add-to-cart",
        method: "post",
        data: { item: fetchedProduct, quantity },
        headers: { Authorization: "Bearer " + auth.token },
      });
      setAddToCartLoading(false);
      cart.addItem(response.data.cart);
    } else {
      cart.addItem(fetchedProduct, quantity);
    }
    history.push("/cart");
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner overlay />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && fetchedProduct && (
        <div className="product-detail">
          <div className="product-detail__main">
            <div className="product-detail__main-images">
              <img
                className="product-detail__main-images__preview"
                src={selectedImage}
                alt={fetchedProduct.title}
              />
              <div className="product-detail__main-images__selector">
                {fetchedProduct.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    onFocus={() => setSelectedImage(image)}
                    alt={fetchedProduct.alt}
                    tabIndex="0"
                  />
                ))}
              </div>
            </div>
            <div className="product-detail__main-info">
              <h2>{fetchedProduct.title}</h2>
              <h3>${fetchedProduct.price}</h3>
              <p style={{whiteSpace: "pre-line"}}>{fetchedProduct.description}</p>
            </div>
            <div className="product-detail__main-action">
              <NumberInput onValue={setQuantity} />
              <Button onClick={addToCartHandler} loading={addToCartLoading}>
                Add To Cart
              </Button>
            </div>
          </div>
          <ProductReviews fetchedProduct={fetchedProduct} />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
