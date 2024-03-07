import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Home.css";
import Navbar from "../components/Navbar";
import getGreeting from "../utils/getGreeting";
import AddTaskModal from "../components/AddTaskModal";
import {
  fetchTasks,
  openAddModal,
  sortByDueDate,
  sortByPriority,
} from "../store/todo/todoSlice";
import TaskComponent from "../components/TaskComponent";

const Home = () => {
  const [sort, setSort] = useState(0);
  const [show, setShow] = useState({
    incompleteTask: "hide",
    completedTask: "hide",
  });
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const { taskList, showAddModal } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTasks(authToken));
  }, [authToken, dispatch]);
  return (
    <div className="home-container">
      <Navbar />
      <div className="typewriter">
        <h1> {getGreeting() + ", " + user.name} </h1>
      </div>
      )
      <div className="todo-container">
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(openAddModal());
          }}
          className="add-button"
        >
          Add Task
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2vh 0vh",
          }}
        >
          <button
            style={{
              cursor: sort === 1 ? "default" : "pointer",
              transform: "scale(0.75)",
              opacity: sort === 1 ? "0.5" : "1",
            }}
            onClick={() => {
              dispatch(sortByPriority());
              setSort(1);
            }}
            className="add-button"
            disabled={sort === 1}
          >
            Sort by Priority
          </button>
          <button
            style={{
              cursor: sort === 2 ? "default" : "pointer",
              transform: "scale(0.75)",
              opacity: sort === 2 ? "0.5" : "1",
            }}
            onClick={() => {
              dispatch(sortByDueDate());
              setSort(2);
            }}
            className="add-button"
          >
            Sort by Deadline
          </button>
        </div>

        <div style={{margin:"5vh 0vh"}}>
          <h2 onClick={()=>{
            if(show.incompleteTask === "hide"){
              setShow({...show,incompleteTask:"show"})
            }
            else{
              setShow({...show,incompleteTask:"hide"})
            }
          }}
          style={{cursor:"pointer"}}
          >
          Incomplete Tasks {show.incompleteTask === "hide" ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>} 
          </h2>
          <div style={{display:show.incompleteTask === "hide" ? "none" : "block"}} className="incomplete-task-container">
            {taskList.map((task) => {
              if (task.isCompleted === false)
                return <TaskComponent completed={false} task={task} />;
              else return <></>;
            })}
          </div>
        </div>
        <hr style={{ width: "100vw", margin:"2rem 0rem"}} />
        <div>
          <h2  onClick={()=>{
            if(show.completedTask === "hide"){
              setShow({...show,completedTask:"show"})
            }
            else{
              setShow({...show,completedTask:"hide"})
            }
          }}
          style={{cursor:"pointer"}}> Completed Tasks {show.completedTask === "hide" ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>} </h2>
          <div  style={{display:show.completedTask === "hide" ? "none" : "block"}}  className="incomplete-task-container">
            {taskList.map((task) => {
              if (task.isCompleted === true)
                return <TaskComponent completed={true} task={task} />;
              else return <></>;
            })}
          </div>
        </div>
      </div>
      <div>{showAddModal && <AddTaskModal />}</div>
    </div>
  );
};

export default Home;
