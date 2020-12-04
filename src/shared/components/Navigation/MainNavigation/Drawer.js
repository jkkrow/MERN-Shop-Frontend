import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../../UI/Backdrop";
import DrawerToggle from "../NavigationItems/DrawerToggle";
import Logo from "../NavigationItems/Logo";
import NavLinks from "../NavigationItems/NavLinks";
import "./Drawer.css";

const Drawer = (props) =>
  createPortal(
    <React.Fragment>
      <Backdrop show={props.show} onClick={props.onClick} />
      <CSSTransition
        in={props.show}
        classNames="drawer"
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <aside className="drawer" onClick={props.onClick}>
          <div className="drawer__header">
            <DrawerToggle />
            <Logo />
          </div>
          <hr />
          <nav className="drawer__nav">
            <NavLinks />
          </nav>
        </aside>
      </CSSTransition>
    </React.Fragment>,
    document.getElementById("drawer-hook")
  );

export default Drawer;
