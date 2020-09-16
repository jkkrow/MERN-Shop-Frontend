import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "./Dropdown.css";

const mainMenu = ["My Profile", "Log out"];
const accountMenu = ["My Products", "My Orders", "My Address"];

const Dropdown = (props) => {
  const [activeMenu, setActiveMenu] = useState();
  const history = useHistory();

  const DropdownItem = (props) => (
    <div
      className="dropdown__item"
      onClick={() =>
        props.goToMenu
          ? setActiveMenu(props.goToMenu)
          : history.push(props.goToLink)
      }
    >
      {props.children}
    </div>
  );

  return (
    <CSSTransition
      in={props.show}
      classNames="dropdown"
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div className="dropdown">
        <DropdownItem>My Account</DropdownItem>
        <DropdownItem goToLink="/my-products">My Products</DropdownItem>
        <DropdownItem>Log out</DropdownItem>
      </div>
    </CSSTransition>
  );
};

export default Dropdown;
