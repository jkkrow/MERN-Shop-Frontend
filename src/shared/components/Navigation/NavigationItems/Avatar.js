import React, { useContext, useState } from "react";

import defaultImage from "../../../../assets/images/default-profile.png";
import Dropdown from "../../UI/Dropdown";
import { AuthContext } from "../../../context/auth-context";
import "./Avatar.css";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdownHandler = () =>
    setShowDropdown((prevState) => !prevState);
  const closeDropdownHandler = () => setShowDropdown(false);

  return (
    <React.Fragment>
      <div className="avatar" onBlur={closeDropdownHandler} tabIndex="0">
        <div onClick={toggleDropdownHandler}>
          <img src={auth.image || defaultImage} alt="avatar" />
          {auth.isAdmin && <div className="avatar-admin">admin</div>}
        </div>
        {showDropdown && <Dropdown close={closeDropdownHandler} />}
      </div>
    </React.Fragment>
  );
};

export default Profile;
