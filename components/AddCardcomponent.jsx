"use client";
import { inputData_SUCCESS } from "../store/reduxstore"
import React from "react";
import { RiAddFill } from "react-icons/ri";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Showdetails from "./Showdetails";

function AddCardcomponent() {
  const [taskData, setTaskData] = useState({
    taskText: "",
    description: "",
    dueDate: "",
    priority: "",
    checkboxchecked: false,
  });

  const tasks = useSelector((state) => {
    return state.InputData.data;
  });
  const dispatch = useDispatch();
  const [warning, setWarning] = useState("");
  const [addbutton, setaddbutton] = useState(true);

  const handlecancel = () => {
    setaddbutton(true);
    setWarning("");
    setTaskData({
      taskText: "",
      description: "",
      dueDate: "",
      priority: "",
      checkboxchecked: false,
    });
  };

  const handleAddTask = () => {
    const { taskText, description, dueDate, priority,checkboxchecked } = taskData;
    setWarning("");
    if (taskText !== "" && dueDate !== "" && priority !== "") {
      setaddbutton(true);
      const taskObject = {
        id: uuidv4(),
        taskText,
        description,
        dueDate,
        priority,
        checkboxchecked,
        createdDate: new Date().toISOString(),
      };
      console.log(taskObject);
      dispatch(inputData_SUCCESS({ taskObject }));

      console.log(taskObject);
      setTaskData({
        taskText: "",
        description: "",
        dueDate: "",
        priority: "",
        checkboxchecked: false,
      });
    } else {
      setWarning("Please fill in all Details");
    }
  };

  const handleDueDateChange = (e) => {
    const selectedDueDate = new Date(e.target.value);
    const today = new Date();
    if (selectedDueDate < today) {
      alert("Due date cannot be in the past");
    } else {
      setTaskData({ ...taskData, dueDate: e.target.value });
    }
  };
  return (
    <>
         <div>
        {warning && (
          <div className="toast  z-10 toast-top toast-center w-auto fade-in alert alert-success text-white font-semibold text-lg m-4">
            {warning}
          </div>
        )}
      </div>
      <div className="">
        {addbutton ? (
          <button onClick={() => setaddbutton(false)} >
            <div className="flex flex-row items-center hobutton">
              <RiAddFill  size={40} />
              <span className="text-center text-2xl "> Add Task</span>
            </div>
          </button>
        ) : (
          <div className="card-body flex flex-col addtocard">
            <input
              type="text"
              placeholder="Add Title"
              className="input  addinput input-ghost text-white w-full  "
              value={taskData.taskText}
              onChange={(e) =>
                setTaskData({ ...taskData, taskText: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Add Description"
              className="input  addinput input-ghost text-white w-full  "
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
            <div className=" flex flex-row">
              <input
                type="date"
                placeholder="Due date"
                className="input  addinput input-ghost w-full max-w-xs "
                value={taskData.dueDate}
                onChange={handleDueDateChange}
              />
              <select
                className=" addselect select  w-full max-w-xs border border-gray-400 rounded-md"
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
              >
                <option value={""} disabled selected>
                  Priority
                </option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
                <option>None</option>
              </select>
            </div>
            <br className="divider"></br>
            <div className="divAdd">
              <div className="button-containeradd">
                <button onClick={handlecancel} className="animated-button">
                  Cancel
                </button>
                <button onClick={handleAddTask} className="animated-button">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {tasks.length === 0 ? (
          <div className="text-white font-semibold text-lg m-4">
            Oops!! No Task Added
          </div>
        ) : (
          <Showdetails />
        )}
      </div>
    </>
  );
}

export default AddCardcomponent;
