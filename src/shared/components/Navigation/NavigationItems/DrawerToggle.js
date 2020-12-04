import React from "react";

import './DrawerToggle.css'

const DrawerToggle = (props) => (
  <div className="drawer-toggle" onClick={props.onClick}>
    <span className="drawer-toggle__bar"></span>
    <span className="drawer-toggle__bar"></span>
    <span className="drawer-toggle__bar"></span>
  </div>
);

export default DrawerToggle;
