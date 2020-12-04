import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import defaultImage from "../../assets/images/default-profile.png";
import Button from "../../shared/components/FormElements/Button";
import Rating from "./Rating";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ProductReviews.css";

const ProductReview = (props) => {
  const auth = useContext(AuthContext);
  const reviewRef = useRef();
  const [writeMode, setWriteMode] = useState(false);
  const [reviewHeight, setReviewHeight] = useState(
    reviewRef.current?.offsetHeight
  );
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { productId } = useParams();

  let reviewListHeight;

  const onEnterWriteMode = () => {
    reviewListHeight = reviewRef.current?.offsetHeight;
    setReviewHeight("30rem");
  };

  const onExitWriteMode = () => {
    setReviewHeight(reviewListHeight);
  };

  const writeReviewHandler = async (event) => {
    event.preventDefault();
    const response = await sendRequest(
      `http://localhost:5000/api/user/review/${productId}`,
      "post",
      { rating, comment },
      { Authorization: "Bearer " + auth.token }
    );

    setWriteMode(false);
    props.onReviewed(response.data.product);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} header="Review Failed!" />
      <div
        className="product-reviews"
        style={{ height: reviewHeight }}
        ref={reviewRef}
      >
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
          onEnter={onEnterWriteMode}
          onExit={onExitWriteMode}
        >
          <div className="product-reviews__write-form">
            <form className="form-control" onSubmit={writeReviewHandler}>
              <Rating button onValue={setRating} fontSize="4rem" />
              <textarea
                style={{ height: "15rem" }}
                placeholder="Please leave a comment to this product (optional)."
                cols="50"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" loading={isLoading} disabled={!rating}>
                Write Review
              </Button>
            </form>
          </div>
        </CSSTransition>

        <div className="product-reviews__main">
          <div className="product-reviews__header">
            <h2>Reviews</h2>
            <Rating
              value={props.fetchedProduct.rating}
              text={` (${props.fetchedProduct.reviews.length})`}
              fontSize="2rem"
            />
          </div>
          <div className="product-reviews__list">
            {!props.fetchedProduct.reviews.length ? (
              <h3>No Review yet.</h3>
            ) : (
              <ul>
                {props.fetchedProduct.reviews.map((review) => (
                  <li className="product-reviews__list-item" key={review._id}>
                    <div className="product-reviews__list-item__user">
                      <img
                        src={review.user.image || defaultImage}
                        alt={review.user.name}
                      />
                      <p> {review.user.name}</p>
                    </div>
                    <Rating value={review.rating} />
                    <p className="product-reviews__list-item__date">
                      Reviewed on {review.createdAt.substring(0, 10)}
                    </p>
                    <p className="product-reviews__list-item__comment">
                      {review.comment}
                    </p>
                  </li>
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
