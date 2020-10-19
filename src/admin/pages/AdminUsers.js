import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import Modal from "../../shared/components/UI/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_EQUAL } from "../../shared/util/validators";
import "./AdminUsers.css";

const AdminUsers = () => {
  const auth = useContext(AuthContext);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [targetUser, setTargetUser] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    { user: { value: "", isValid: false } },
    false
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/admin/users",
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setFetchedUsers(response.data.users);
    };
    fetchUsers();
  }, [auth, sendRequest]);

  const openWarninigHandler = (userId) => {
    const selectedUser = fetchedUsers.find((user) => user._id === userId);
    setTargetUser(selectedUser);
    setShowConfirmModal(true);
  };

  const closeWarningHandler = () => {
    setTargetUser({});
    setShowConfirmModal(false);
  };

  const deleteUserHandler = async () => {
    setDeleteLoading(true);
    await axios({
      url: `http://localhost:5000/api/admin/delete-user/${targetUser._id}`,
      method: "delete",
      headers: { Authorization: "Bearer " + auth.token },
    });
    setFetchedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== targetUser._id)
    );
    setDeleteLoading(false);
    closeWarningHandler();
  };

  return (
    <div className="admin-users">
      {isLoading && <LoadingSpinner overlay />}
      <Modal
        show={showConfirmModal}
        onCancel={closeWarningHandler}
        header="Delete User"
        footer={
          <React.Fragment>
            <Button onClick={closeWarningHandler}>Cancel</Button>
            <Button
              danger
              onClick={deleteUserHandler}
              loading={deleteLoading}
              disabled={!formState.isValid}
            >
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          To proceed type the user name <strong>{targetUser.name}</strong>.
        </p>
        <Input
          id="user"
          type="text"
          validators={[VALIDATOR_EQUAL(targetUser.name)]}
          onInput={inputHandler}
        />
      </Modal>
      <h1>Users</h1>
      <div className="admin-users__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetchedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <div className="admin-users__table__button">
                    <Button to={`/edit-user/${user._id}`}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      danger
                      onClick={() => openWarninigHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
