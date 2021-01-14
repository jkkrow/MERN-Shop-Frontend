import React, { useState } from "react";

import defaultImage from "../../assets/images/default-profile.png";
import Rating from "./Rating";
import ReviewImage from "./ReviewImage";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageHandler = (image) => {
    // console.log(props.images.indexOf(image));
    setSelectedImage(image);
  };

  const closeImageHandler = () => {
    setSelectedImage(null);
  };

  return (
    <li className="review-item" key={props._id}>
      <ReviewImage
        images={props.images}
        image={selectedImage}
        onCancel={closeImageHandler}
      />
      <div className="review-item__user">
        <img src={props.user.image || defaultImage} alt="" />
        <p> {props.user.name}</p>
      </div>
      <Rating value={props.rating} />
      <p className="review-item__date">
        Reviewed on {props.createdAt.substring(0, 10).replaceAll("-", ".")}
      </p>
      <div className="review-item__images">
        {props.images.map((image) => (
          <img
            key={image}
            src={image}
            onClick={() => openImageHandler(image)}
            alt="review"
          />
        ))}
      </div>
      <p className="review-item__comment">{props.comment}</p>
    </li>
  );
};

export default ReviewItem;
