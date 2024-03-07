import axios from "axios";
import { Host } from "../../constantVariables.js";

const API_URL = `${Host}/api/todo`;

//register user
const fetchTasks = async (authToken) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    };
    const response = await axios.get(API_URL + "/getTasks", config);

    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};
const markAsComplete = async ({ todoId, authToken }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    };
    const response = await axios.put(
      API_URL + "/markComplete",
      { todoId },
      config
    );
    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};
const deleteTask = async ({ todoId, authToken }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
        todoId,
      },
    };
    const response = await axios.delete(API_URL + "/deleteTodo", config);
    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};

const addNewTask = async ({ authToken, newTask }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    };
    console.log("new todo = ", newTask, authToken);
    const response = await axios.post(API_URL + "/create", newTask, config);
    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};
const editTask = async ({ authToken, todoId, editedTask }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
        todoId: todoId,
      },
    };
    // console.log("new todo = ", newTask, authToken);
    const response = await axios.put(API_URL + "/editTodo", editedTask, config);
    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};

const authService = {
  fetchTasks,
  markAsComplete,
  addNewTask,
  deleteTask,
  editTask
};

export default authService;
