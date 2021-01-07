import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import "./Profile.css";

const Profile = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      name: { value: auth.userData.name, isValid: true },
      password: { value: "", isValid: false },
    },
    false
  );

  return (
    <div className="profile">
      <h2 className="page-title">My Profile</h2>
      <form>
        <div>
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
            label="Password"
            placeholder="At least 7 characters"
            validators={[VALIDATOR_MINLENGTH(7)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
