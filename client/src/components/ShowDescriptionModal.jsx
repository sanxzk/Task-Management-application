import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDescModal, openDescModal } from "../store/todo/todoSlice";
import "./showDescModal.css";

const ShowDescriptionModal = (props) => {
  const {} = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const task = props.task;

  return (
    <div className="show-modal-container">
      <div className="show-modal">
        <i
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(closeDescModal());
          }}
          className=" fa-solid fa-xmark"
        ></i>
        <div>
          <h3> {task.title} </h3>
          <br />
          <p> {task.description} </p>
        </div>
      </div>
    </div>
  );
};

export default ShowDescriptionModal;
