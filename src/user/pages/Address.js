import React, { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Address.css";

const Address = (props) => {
  const auth = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [initialData, setInitialData] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/user/addresses",
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setAddresses(response.data.addresses);
    };
    fetchAddresses();
  }, [sendRequest, auth]);

  useEffect(() => {
    if (initialData) {
      setShowForm(true);
    }
  }, [initialData]);

  const addHandler = () => {
    setInitialData(null);
    setShowForm(true);
  };
  const editHandler = (formData) => {
    setInitialData(formData);
  };
  const deleteHandler = (newAddresses) => setAddresses(newAddresses);
  const saveHandler = (newAddresses) => {
    setAddresses(newAddresses);
    setShowForm(false);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && (
        <div className="address">
          <CSSTransition
            in={!showForm}
            classNames="address-list-move"
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <div className="address-list-section">
              <AddressList
                items={addresses}
                onAdd={addHandler}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            </div>
          </CSSTransition>

          <CSSTransition
            in={showForm}
            classNames="address-form-move"
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <div className="address-form-section">
              <AddressForm onSave={saveHandler} initialData={initialData} />
              <i
                className="fas fa-chevron-circle-up"
                onClick={() => setShowForm(false)}
              ></i>
            </div>
          </CSSTransition>
        </div>
      )}
    </React.Fragment>
  );
};

export default Address;
