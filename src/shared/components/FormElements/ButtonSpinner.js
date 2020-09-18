import React from "react";

import "./ButtonSpinner.css";

const ButtonSpinner = (props) => (
  <div className={`${props.overlay && "button-spinner__overlay"}`}>
    <div className="btns-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default ButtonSpinner;
