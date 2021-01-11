import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import DefaultImage from "../../assets/images/default-profile.png";
import "./Profile.css";

const Profile = ({ history }) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: { value: auth.userData.name, isValid: true },
      password: { value: "", isValid: true },
      image: { value: "", isValid: true },
    },
    true
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("image", formState.inputs.image.value[0]);
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/user/change-profile`,
      "patch",
      formData,
      { Authorization: "Bearer " + auth.token }
    );
    auth.login(auth.token, response.data.user);
    history.push("/profile");
  };

  return (
    <div className="profile">
      <ErrorModal error={error} onClear={clearError} />
      <h2 className="page-title">My Profile</h2>
      <form onSubmit={submitHandler}>
        <div className="profile__form-block">
          <Input
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={auth.userData.name}
            initialValid={!!auth.userData.name}
            onInput={inputHandler}
          />
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            E-mail
          </p>
          <p>{auth.userData.email}</p>
          <Input
            id="password"
            type="password"
            label="Change Password"
            placeholder="At least 7 characters"
            validators={[VALIDATOR_MINLENGTH(7)]}
            onInput={inputHandler}
            initialValid={true}
          />
        </div>
        <div className="profile__form-block">
          <ImageUpload
            id="image"
            label="Profile Image"
            type="profile"
            initialImage={auth.userData.image || DefaultImage}
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            loading={isLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
