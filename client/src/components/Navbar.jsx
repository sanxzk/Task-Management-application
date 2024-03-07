import React from "react";
import { useDispatch } from "react-redux";
import {logout} from "../store/auth/authSlice"
import "./Navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const logoutHandler =()=>{
    dispatch(logout());
  }
  return (
    <div className="navbar-container">
      <div className="brand-heading">NotesKey</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <button onClick={logoutHandler} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
