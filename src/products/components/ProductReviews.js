import React, { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import ReviewItem from "./ReviewItem";
import Button from "../../shared/components/FormElements/Button";
import Rating from "./Rating";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ProductReviews.css";

const ProductReview = (props) => {
  const auth = useContext(AuthContext);
  const [writeMode, setWriteMode] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [isFileValid, setIsFileValid] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { productId } = useParams();
  const filePickerRef = useRef();

  const writeReviewHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    for (const image of images) {
      formData.append("images", image);
    }
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/user/review/${productId}`,
      "post",
      formData,
      { Authorization: "Bearer " + auth.token }
    );

    setWriteMode(false);
    props.onReviewed(response.data.product);
  };

  const filePickerHandler = (event) => {
    const currentFiles = [...event.target.files];
    setImages(currentFiles);
    if (currentFiles.length > 5) {
      setIsFileValid(false);
    } else {
      setIsFileValid(true);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} header="Review Failed!" />
      <div className="product-reviews">
        {auth.isLoggedIn && (
          <div onClick={() => setWriteMode((prevMode) => !prevMode)}>
            <CSSTransition
              in={writeMode}
              classNames="spin-right"
              timeout={200}
              mountOnEnter
              unmountOnExit
            >
              <i className="fas fa-times-circle product-reviews__toggle"></i>
            </CSSTransition>
            <CSSTransition
              in={!writeMode}
              classNames="spin-left"
              timeout={200}
              mountOnEnter
              unmountOnExit
            >
              <i className="fas fa-plus-circle product-reviews__toggle"></i>
            </CSSTransition>
          </div>
        )}
        <CSSTransition
          in={writeMode}
          classNames="fade-in"
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          <div className="product-reviews__write-form">
            <form className="form-control" onSubmit={writeReviewHandler}>
              <div className="product-reviews__space"></div>
              <Rating button onValue={setRating} fontSize="3.5rem" />
              <div className="product-reviews__optional">
                <textarea
                  style={{ height: "15rem" }}
                  placeholder="Please leave a comment to this product (optional)."
                  cols="40"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <input
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  ref={filePickerRef}
                  accept=".jpg, .png, .jpeg"
                  onChange={filePickerHandler}
                />
                <div
                  className="product-reviews__image-upload"
                  style={!isFileValid ? { color: "red" } : null}
                  onClick={() => filePickerRef.current.click()}
                >
                  <i className="fas fa-paperclip"></i>
                  {images.length ? (
                    <div className="product-reviews__image-number">
                      {images.length + "/5"}
                    </div>
                  ) : null}
                </div>
              </div>
              <Button
                type="submit"
                loading={isLoading}
                disabled={!rating || !isFileValid}
              >
                Write Review
              </Button>
            </form>
          </div>
        </CSSTransition>

        <div className="product-reviews__main">
          <div className="product-reviews__space"></div>
          <div className="product-reviews__header">
            <h3>Reviews</h3>
            <Rating
              value={props.fetchedProduct.rating}
              text={` (${props.fetchedProduct.reviews.length})`}
              fontSize="2rem"
            />
          </div>
          <div className="product-reviews__list">
            {!props.fetchedProduct.reviews.length ? (
              <p>No Review yet.</p>
            ) : (
              <ul>
                {props.fetchedProduct.reviews.map((review) => (
                  <ReviewItem
                    key={review._id}
                    _id={review._id}
                    user={review.user}
                    rating={review.rating}
                    images={review.images}
                    comment={review.comment}
                    createdAt={review.createdAt}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductReview;
