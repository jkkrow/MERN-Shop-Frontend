import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./AddressItem.css";

const AddressItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const editHandler = () => {
    props.onEdit({
      _id: props._id,
      address: props.address,
      city: props.city,
      postalCode: props.postalCode,
      country: props.country,
    });
  };
  
  const deleteHandler = async () => {
    const response = await sendRequest(
      `http://localhost:5000/api/user/delete-address/${props._id}`,
      "delete",
      null,
      { Authorization: "Bearer " + auth.token }
    );
    props.onDelete(response.data.addresses);
  };

  return (
    <li className="address-item">
      <div className="address-item__info">
        <p>{props.address}</p>
        <p>{props.city}</p>
        <p>{props.postalCode}</p>
        <p>{props.country}</p>
      </div>
      <div className="address-item__button">
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler} loading={isLoading}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default AddressItem;
