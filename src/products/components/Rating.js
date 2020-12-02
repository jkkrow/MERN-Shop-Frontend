import React, { useEffect, useState } from "react";
import "./Rating.css";

const Rating = (props) => {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();

  const { onValue, button } = props;

  useEffect(() => {
    if (button) {
      onValue(rating);
    }
  }, [onValue, rating, button]);

  if (button) {
    return (
      <div className="rating-button">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <span key={ratingValue}>
              <input type="hidden" name="rating" value={ratingValue} hidden />
              <i
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                style={{ color: props.color, fontSize: props.fontSize }}
                className={
                  (hover || rating) >= ratingValue
                    ? "fa fa-star"
                    : "far fa-star"
                }
              ></i>
            </span>
          );
        })}
      </div>
    );
  } else
    return (
      <div className="rating">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <span key={ratingValue}>
              <i
                style={{ color: props.color, fontSize: props.fontSize }}
                className={
                  props.value >= ratingValue
                    ? "fa fa-star"
                    : props.value >= ratingValue - 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
              ></i>
            </span>
          );
        })}
        <span>{props.text && props.text}</span>
      </div>
    );
};

Rating.defaultProps = {
  color: "#f9ea35",
};

export default Rating;
