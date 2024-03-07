import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import isStrongPassword from "../utils/isStrongPassword";
import { useDispatch, useSelector } from "react-redux";
import validateEmail from "../utils/validateEmail";
import { setErrorNull, signup } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Bars } from "react-loader-spinner";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateEmail(creds.email) === false) {
      toast.error("Please enter a valid email");
      return;
    } else if (isStrongPassword(creds.password) === false) {
      toast.error(
        "Your password must be a minimum of 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character to ensure its strength and security."
      );
      return;
    } else if (creds.password !== creds.cPassword) {
      toast.error("Password and Confirm Password should be same");
      return;
    }
    dispatch(signup(creds));
  };

  useEffect(() => {
    if (isLoggedIn === true) navigate("/");
  });
  useEffect(() => {
    if (isError === true) {
      toast.error(errorMessage);
      dispatch(setErrorNull());
    }
  }, [errorMessage, isError,dispatch]);
  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-heading-container">
          <h2 className="signup-heading">Welcome to NotesKey</h2>
        </div>
        <div className="signup-form-container">
          <h3> Sign Up</h3>
          <form>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              name="name"
              value={creds.name}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={creds.email}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              name="password"
              value={creds.password}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="cPassword"
              value={creds.cPassword}
              onChange={onChangeHandler}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                marginLeft: "1rem",
              }}
            >
              <input
                className="cpassword-checkbox"
                type="checkbox"
                name="cpassword-checkbox"
                checked={showPassword}
                onClick={() => {
                  if (showPassword === false) setShowPassword(true);
                  else setShowPassword(false);
                }}
              />
              <span className="show-pass-label">Show Password</span>
            </div>
            <button
              onClick={submitHandler}
              type="submit"
              className="signup-button"
            >
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    margin: "auto",
                  }}
                >
                  <Bars
                    height="2rem"
                    width="2rem"
                    color="#000"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <span>
                  Signup<i className="fa-solid fa-right-to-bracket"></i>
                </span>
              )}
            </button>
            <p>
              Already have an account?{" "}
              <Link style={{ color: "#3636d5" }} to="/login">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
