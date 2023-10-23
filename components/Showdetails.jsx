"use client";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/reduxstore";
import {
  editTask,
  openModal,
  markTaskAsCompleted,
} from "../store/reduxstore";
import Modelclose from "./Modelclose";
import {  useState } from "react";

function Showdetails() {
  const [sorting, setSorting] = useState(false);
  const [sortby, setsortby] = useState("");
  const[markcomplete,setmarkcomplete] = useState(false);
  const dispatch = useDispatch();
  const isModelOpen = useSelector((state) => state.InputData.isOpen);
  const tasks = useSelector((state) => {
    return state.InputData.data;
  });

  const handelsortby = (event) => {
    setsortby(event.target.value);
    setSorting(true);
  };
  function prioritySorting(priority, sortby) {
    if (sortby === "highToLow") {
      switch (priority) {
        case "High":
          return 3;
        case "Medium":
          return 2;
        case "Low":
          return 1;
        case "None":
          return 0;
        default:
          return 0;
      }
    } else if (sortby === "lowToHigh") {
      switch (priority) {
        case "High":
          return 0;
        case "Medium":
          return 1;
        case "Low":
          return 2;
        case "None":
          return 3;
        default:
          return 0;
      }
    }
  }

  const sortTasks = (tasks, sortby) =>
    tasks.slice().sort((taskA, taskB) => {
      const priorityA = prioritySorting(taskA.priority, sortby);
      const priorityB = prioritySorting(taskB.priority, sortby);
      return priorityA !== priorityB
        ? priorityB - priorityA
        : taskA.createdDate - taskB.createdDate;
    });

  const sortedTasks = sortTasks(tasks, sortby);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}${month}${year}`;
  }

  const renderTasks = sorting ? sortedTasks : tasks;

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (taskId) => {
    dispatch(editTask(taskId));
    dispatch(openModal());
  };

  const handleTaskCompletion = (taskId) => {
    dispatch(markTaskAsCompleted(taskId));
    setmarkcomplete(true)
    setTimeout(() => {
      setmarkcomplete(false);
    }, 3000); 
  };

console.log("showdetails",tasks)
  return (
    <>
      <div>
      {markcomplete && (
          <div className="toast tost-end fade-in alert w-32 alert-success text-white font-semibold text-lg m-4">
            Added to completed Tasks
          </div>
        )}
        <br></br>
        <div className="flex justify-end">
          <select
            className=" addselect select widthselect max-w-xs"
            value={sortby}
            onChange={handelsortby}
          >
            <option value={""} disabled selected>
              Sort by Priority
            </option>
            <option value="none">Sort by : Featured</option>
            <option value="highToLow">Sort by : High to None</option>
            <option value="lowToHigh">Sort by : None to High</option>
          </select>
        </div>
        <div className="divborder">
          {isModelOpen && <Modelclose />}

          {renderTasks.map(
            (
              item,index
            ) => (
              <ul key={item.id}>
                <div className="cardonetwo">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        {/* <input
                        type="radio"
                        onChange={() => handleTaskCompletion(item.id)}
                        className={styles.button}
                      /> */}
                        <input
                          type="checkbox"
                          checked={false}
                          className="checkbox checkbox-success"
                          onClick={() => handleTaskCompletion(item.id)}
                        />
                        <p className="text-white text-lg ml-3">
                          {item.taskText}
                        </p>
                      </div>
                      <p className="text-zinc-50 font-normal text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-white mt-3 ml-3">{item.priority}</p>
                      <button
                        className="ml-4"
                        onClick={() => handleEdit(item.id)}
                      >
                        <AiFillEdit size={30} color="black" />
                      </button>
                      <button
                        className="ml-4"
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        <AiFillDelete size={30} color="black" />
                      </button>
                    </div>
                  </div>
                  <div className=" flex flex-row ">
                    <p className="text-white mr-4">
                      <span className="text-grey-800 font-extralight text-sm">
                        Due Date:
                      </span>{" "}
                      {formatDate(item.dueDate)}
                    </p>
                    <p className="text-white">
                      <span className="text-grey-800 font-extralight text-sm">
                        Created Date:
                      </span>
                      {formatDate(item.createdDate)}
                    </p>
                  </div>
                </div>
              </ul>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Showdetails;

