import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password are not matched!");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h1>User Profile</h1>
          </li>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger"></MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Update Successfully
                </MessageBox>
              )}
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </li>

              <li>
                <label />
                <button className="primary" type="submit">
                  Update
                </button>
              </li>
            </>
          )}
        </ul>
      </form>
    </div>
  );
}
