import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";

import defaultImage from "../../assets/images/default-profile.png";
import Rating from "./Rating";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProductReviews.css";

const ProductReview = (props) => {
  const auth = useContext(AuthContext);
  const [writeMode, setWriteMode] = useState(false);

  return (
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
            <i className="fas fa-times-circle product-reviews__toggler"></i>
          </CSSTransition>
          <CSSTransition
            in={!writeMode}
            classNames="spin-left"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <i className="fas fa-plus-circle product-reviews__toggler"></i>
          </CSSTransition>
        </div>
      )}
      <CSSTransition
        in={writeMode}
        classNames="write-review"
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div className="product-reviews__write-form">
          <form>
            <textarea />
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
  );
};

export default ProductReview;
