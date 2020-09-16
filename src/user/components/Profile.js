import React from "react";

const Profile = (props) => (
  <div className="profile" style={props.style}>
    <img
      src={props.image}
      alt={props.alt}
      style={{ width: props.height, height: props.height }}
    />
  </div>
);

export default Profile;
