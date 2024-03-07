import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, setErrorNull } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(creds));
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
    <div className="login">
      <div className="login-container">
        <div className="login-heading-container">
          <h2 className="login-heading">Welcome to NotesKey</h2>
          {
            // <h3 className="login-heading"> A platform for all your ToDos.</h3>
          }{" "}
        </div>
        <div className="login-form-container">
          <h3> Log in</h3>
          <form>
            <input
              className="input-field"
              type="email"
              placeholder="email"
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
            <button
              onClick={submitHandler}
              type="submit"
              className="login-button"
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
                  Login <i className="fas fa-sign-in"></i>
                </span>
              )}
            </button>
            <p>
              Don't have an account?{" "}
              <Link style={{ color: "#3636d5" }} to="/signup">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
