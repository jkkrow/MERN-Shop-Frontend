import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AuthContext } from "../../context/auth-context";
import "./Dropdown.css";

const DropdownItem = (props) => (
  <div className="dropdown-menu__item" onClick={props.onClick}>
    {props.children}
  </div>
);

const Dropdown = (props) => {
  const auth = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState();
  const dropdownRef = useRef();
  const history = useHistory();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = (element) => {
    const height = element.offsetHeight;
    setMenuHeight(height);
  };

  const toAccountMenu = () => setActiveMenu("account");
  const toMainMenu = () => setActiveMenu("main");
  const myProductsHandler = () => {
    history.push("/my-products");
    props.close();
  };
  const addressHandler = () => {
    history.push("/address");
    props.close();
  };
  const logoutHandler = () => {
    auth.logout();
    props.close();
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        classNames="menu-main"
        timeout={300}
        mountOnEnter
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="dropdown-menu">
          <DropdownItem onClick={toAccountMenu}>My Account</DropdownItem>
          <DropdownItem onClick={logoutHandler}>Log out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "account"}
        classNames="menu-account"
        timeout={300}
        mountOnEnter
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="dropdown-menu">
          <DropdownItem onClick={toMainMenu}>
            <h3>My Account</h3>
          </DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem onClick={myProductsHandler}>Products</DropdownItem>
          <DropdownItem onClick={addressHandler}>Address</DropdownItem>
          <DropdownItem>Order History</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
