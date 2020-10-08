import React from "react";

import AddressItem from "./AddressItem";
import "./AddressList.css";

const AddressList = (props) => {
  return (
    <ul className="address-list">
      <div
        className="address-list__add-address"
        onClick={() => props.onAdd()}
      >
        <i className="fas fa-plus"></i>
        <h4>Add a new address</h4>
      </div>
      {props.items.map((item) => (
        <AddressItem
          key={item._id}
          _id={item._id}
          address={item.address}
          city={item.city}
          postalCode={item.postalCode}
          country={item.country}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default AddressList;
