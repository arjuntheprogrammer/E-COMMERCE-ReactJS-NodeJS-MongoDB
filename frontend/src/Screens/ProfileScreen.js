import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfileScreen() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
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
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={user.name}
                />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  value={user.email}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                />
              </li>
              <li>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter Confirm Password"
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
