import React from "react";
import { createPortal } from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) =>
  props.show
    ? createPortal(
        <div className="backdrop" onClick={props.onClick}></div>,
        document.getElementById("backdrop-hook")
      )
    : null;

export default Backdrop;
