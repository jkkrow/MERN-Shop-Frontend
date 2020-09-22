import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NumberInput from "../../shared/components/FormElements/NumberInput";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { CartContext } from "../../shared/context/cart-context";
import "./ProductDetail.css";

const ProductDetail = () => {
  const cart = useContext(CartContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [fetchedProduct, setFetchedProduct] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
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

  const addToCartHandler = () => {
    cart.addItem(fetchedProduct, quantity);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && fetchedProduct && (
        <div className="product-detail">
          <div className="product-detail__section-1">
            <img src={selectedImage} alt={fetchedProduct.title} />
            <div className="product-detail__image-selector">
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
          <div className="product-detail__section-2">
            <h1>{fetchedProduct.title}</h1>
            <h2>${fetchedProduct.price}</h2>
            <p>{fetchedProduct.description}</p>
          </div>
          <div className="product-detail__section-3">
            <NumberInput value={setQuantity} />
            <Button onClick={addToCartHandler}>Add To Cart</Button>
            <Button>Buy Now</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
