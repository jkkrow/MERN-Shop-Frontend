import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [fetchedProduct, setFetchedProduct] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/${productId}`
      );
      setFetchedProduct(response.data.product);
      setSelectedImage(response.data.product.images[0]);
    };
    fetchProduct();
  }, [sendRequest, productId]);

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
            <Button>Add To Cart</Button>
            <Button>Buy Now</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
