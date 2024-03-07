import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeAddModal,
  closeEditModal,
  editTask,
  fetchTasks,
} from "../store/todo/todoSlice";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import convertISOtoDate from "../utils/convertISOtoDate";
import "./AddTaskModal.css";

function convertDatesToISO(date) {
  let isoDate = new Date(date);
  return isoDate.toISOString();
}
const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <input
        type="radio"
        checked={checked === value}
        onChange={() => setter(value)}
      />
      <span>{label}</span>
    </label>
  );
};

const EditTaskModal = (props) => {
  const oldData = props.taskData;
  const [editedTask, setEditedTask] = useState({
    title: oldData.title,
    description: oldData.description,
    priority: oldData.priority,
    dueDate: convertISOtoDate(oldData.dueDate),
  });
  const { isLoading, showEditModal } = useSelector((state) => state.todo);
  const { authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const task = props.task;
  const [priority, setPriority] = useState(oldData.priority);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (editedTask.title.trim() === "") {
      toast.warn("Please enter a valid title");
      return;
    } else if (!priority) {
      toast.warn("Please select a priority");
      return;
    } else if (editedTask.dueDate === "") {
      toast.warn("Please select a date");
      return;
    }
    dispatch(editTask({ authToken, editedTask, todoId: oldData._id }));
    dispatch(closeEditModal());
    toast.success("task edited successfully");
    setTimeout(() => {
      dispatch(fetchTasks(authToken));
    }, 5000);
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal">
        <i
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(closeEditModal());
          }}
          className=" fa-solid fa-xmark"
        ></i>
        <h3 style={{ color: "white" }}>Edit Task</h3>
        <form>
          <input
            className="input-field2"
            type="text"
            placeholder="Title"
            name="title"
            value={editedTask.title}
            onChange={onChangeHandler}
          />
          <textarea
            className="input-field2"
            placeholder="Description"
            name="description"
            value={editedTask.description}
            onChange={onChangeHandler}
          />
          <div
            className="input-field2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label>Priority: </label>
            <RadioInput
              className=" priority-radio"
              label="Low"
              value={3}
              checked={priority}
              setter={setPriority}
            />
            <RadioInput
              className="priority-radio"
              label="Medium"
              value={2}
              checked={priority}
              setter={setPriority}
            />
            <RadioInput
              className="priority-radio"
              label="High"
              value={1}
              checked={priority}
              setter={setPriority}
            />
          </div>
          <input
            className="input-field2"
            type="date"
            onChange={onChangeHandler}
            name="dueDate"
            defaultValue={"2023-11-24"}
            value={editedTask.dueDate}
          />
          <button
            onClick={submitHandler}
            type="submit"
            className="add-task-button"
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
              <span>Edit Task</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
