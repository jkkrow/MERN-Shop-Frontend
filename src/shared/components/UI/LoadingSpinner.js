import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => (
  <div className={`${props.overlay && "loading-spinner__overlay"}`}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingSpinner;
