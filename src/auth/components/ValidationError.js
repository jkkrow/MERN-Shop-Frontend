import React from "react";

import "./ValidationError.css";

const ValidationError = (props) => (
  <div className="validation-error">
    <p>{props.message}</p>
  </div>
);

export default ValidationError;
