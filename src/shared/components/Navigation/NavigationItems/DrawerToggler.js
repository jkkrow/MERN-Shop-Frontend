import React from "react";

import './DrawerToggler.css'

const DrawerToggler = (props) => (
  <div className="drawer-toggler" onClick={props.onClick}>
    <span className="drawer-toggler__bar"></span>
    <span className="drawer-toggler__bar"></span>
    <span className="drawer-toggler__bar"></span>
  </div>
);

export default DrawerToggler;
