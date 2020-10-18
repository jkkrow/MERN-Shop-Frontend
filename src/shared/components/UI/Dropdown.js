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
  const navigateHandler = (route) => {
    history.push(route);
    props.close();
  };
  const logoutHandler = () => {
    auth.logout();
    props.close();
  };

  let accountMenuTitle = auth.isAdmin ? "Administrator" : "My Account";
  let accountMenu = auth.isAdmin ? (
    <div className="dropdown-menu">
      <DropdownItem onClick={toMainMenu}>
        <h3>{accountMenuTitle}</h3>
      </DropdownItem>
      <DropdownItem onClick={() => navigateHandler("/admin-products")}>
        Products
      </DropdownItem>
      <DropdownItem onClick={() => navigateHandler("/admin-users")}>
        Users
      </DropdownItem>
      <DropdownItem onClick={() => navigateHandler("/admin-orders")}>
        Orders
      </DropdownItem>
    </div>
  ) : (
    <div className="dropdown-menu">
      <DropdownItem onClick={toMainMenu}>
        <h3>{accountMenuTitle}</h3>
      </DropdownItem>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem onClick={() => navigateHandler("/address")}>
        Address
      </DropdownItem>
      <DropdownItem onClick={() => navigateHandler("/orders")}>
        Order History
      </DropdownItem>
    </div>
  );

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
          <DropdownItem onClick={toAccountMenu}>
            {accountMenuTitle}
          </DropdownItem>
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
        {accountMenu}
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
