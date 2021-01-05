import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI/Card";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./EditUser.css";

const EditUser = () => {
  const auth = useContext(AuthContext);
  const [fetchedUser, setFetchedUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
    },
    false
  );
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/admin/user/${userId}`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      const user = response.data.user;
      setFormData(
        {
          name: { value: user.name, isValid: true },
          email: { value: user.email, isValid: true },
        },
        true
      );
      setFetchedUser(user);
      setIsAdmin(user.isAdmin);
    };
    fetchUser();
  }, [auth, sendRequest, userId, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/admin/update-user/${fetchedUser._id}`,
      method: "patch",
      data: {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        isAdmin: isAdmin,
      },
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    setSubmitLoading(true);
    history.goBack();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      {fetchedUser && (
        <Card className="edit-user">
          <form onSubmit={submitHandler}>
            <h1>Edit User</h1>
            <Input
              id="name"
              type="text"
              label="User Name"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={fetchedUser.name}
              initialValid={!!fetchedUser.name}
              onInput={inputHandler}
            />
            <Input
              id="email"
              type="email"
              label="Email Address"
              validators={[VALIDATOR_EMAIL()]}
              initialValue={fetchedUser.email}
              initialValid={!!fetchedUser.email}
              onInput={inputHandler}
            />
            <div className="edit-user__checkbox">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={() => setIsAdmin((prev) => !prev)}
              />
              <label
                htmlFor="admin"
                onClick={() => setIsAdmin((prev) => !prev)}
              >
                <strong>Switch to Administrator</strong>
              </label>
            </div>
            <Button
              type="submit"
              disabled={!formState.isValid}
              loading={submitLoading}
            >
              Update
            </Button>
          </form>
        </Card>
      )}
    </React.Fragment>
  );
};

export default EditUser;
