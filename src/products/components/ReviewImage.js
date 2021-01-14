import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../../shared/components/UI/Backdrop";
import "./ReviewImage.css";

const ImageOverlay = (props) => {
  const [currentImage, setCurrentImage] = useState(props.image);

  const index = props.images.indexOf(currentImage);

  const content = (
    <div className="review-image">
      <div className="review-image__layout">
        {index > 0 && (
          <i
            className="fas fa-chevron-left review-image__arrow left"
            onClick={() => setCurrentImage(props.images[index - 1])}
          ></i>
        )}
        <img src={currentImage} alt="" />
        {index < props.images.length - 1 && (
          <i
            className="fas fa-chevron-right review-image__arrow right"
            onClick={() => setCurrentImage(props.images[index + 1])}
          ></i>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.getElementById("modal-hook"));
};

const ReviewImage = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.image} onClick={props.onCancel} />
      <CSSTransition
        in={!!props.image}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="image"
      >
        <ImageOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default ReviewImage;
