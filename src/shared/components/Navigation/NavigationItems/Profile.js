import React, { useState } from "react";

import Avatar from "../../UI/Avatar";
import Dropdown from "../../UI/Dropdown";
import "./Profile.css";

const Profile = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdownHandler = () =>
    setShowDropdown((prevState) => !prevState);
  const closeDropdownHandler = () => setShowDropdown(false);

  return (
    <React.Fragment>
      <div className="profile" onBlur={closeDropdownHandler} tabIndex="0">
        <Avatar onClick={toggleDropdownHandler} width="3rem" height="3rem" />
        <Dropdown show={showDropdown} />
      </div>
    </React.Fragment>
  );
};

export default Profile;
