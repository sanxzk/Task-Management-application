import React, { useState } from "react";
import "./TaskComponent.css";
import { useDispatch, useSelector } from "react-redux";
import EditTaskModal from "./EditTaskModal";
import {
  deleteTodo,
  fetchTasks,
  markAsComplete,
  openDescModal,
  openEditModal,
} from "../store/todo/todoSlice";
import { toast } from "react-toastify";
import ShowDescriptionModal from "./ShowDescriptionModal";

// const convertISOtoDate = require("../utils/convertISOtoDate");
const convertISOtoDate = (isoString) => {
  let date = new Date(isoString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
};
const TaskComponent = (props) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { showEditModal, showDesc } = useSelector((state) => state.todo);
  const task = props.task;
  const completed = props.completed;
  const [more, setMore] = useState(false);
  const getBoxShadow = (priority) => {
    if (priority === 3)
      return "0.3rem 0.3rem 0.3rem 0.15rem rgba(8, 179, 79, 0.2)";
    else if (priority === 2)
      return "0.3rem 0.3rem 0.3rem 0.15rem rgba(245, 225, 43, 0.2";
    else if (priority === 1)
      return "0.3rem 0.3rem 0.3rem 0.15rem rgba(253, 21, 13, 0.2)";
  };
  const markAsCompleteHandler = () => {
    const todoId = task._id;
    dispatch(markAsComplete({ todoId, authToken }));
    toast.success(`task with title "${task.title}" marked as complete.`);
    setTimeout(() => {
      dispatch(fetchTasks(authToken));
    }, 5000);
  };

  const deleteTaskHandler = () => {
    const todoId = task._id;
    dispatch(deleteTodo({ authToken, todoId }));
    toast.success(`task with title "${task.title}" has been deleted.`);
    setTimeout(() => {
      dispatch(fetchTasks(authToken));
    }, 5000);
  };

  const editTaskHandler = () => {
    const todoId = task._id;
    dispatch(openEditModal(todoId));
  };

  const descriptionTaskHandler = () => {
    dispatch(openDescModal(task._id));
  };
  return (
    <div
      style={{ boxShadow: getBoxShadow(task.priority) }}
      className="task-container"
    >
      <div className="title-container">
        <p className="task-title">{task.title}</p>
        <p className="task-due">Due on: {convertISOtoDate(task.dueDate)}</p>
      </div>
      <div className="task-buttons">
        <i
          onClick={descriptionTaskHandler}
          className="task-icon fa-solid fa-info"
        >
          {" "}
          more{" "}
        </i>
        <i
          onClick={editTaskHandler}
          className=" task-icon fa-regular fa-pen-to-square"
        >
          {" "}
          Edit
        </i>
        <i onClick={deleteTaskHandler} className=" task-icon fa-solid fa-trash">
          {" "}
          Delete
        </i>
        <i
          style={{ display: `${completed ? "none" : "block"}` }}
          onClick={markAsCompleteHandler}
          className=" task-icon fa-solid fa-check"
        >
          {" "}
          mark as complete
        </i>
      </div>
      {task._id === showEditModal && (
        <div>
          <EditTaskModal taskData={task} />
        </div>
      )}
      {task._id === showDesc && (
        <div>
          <ShowDescriptionModal task={task} />
        </div>
      )}
    </div>
  );
};

export default TaskComponent;
