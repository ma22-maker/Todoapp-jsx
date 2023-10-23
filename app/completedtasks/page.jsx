"use client";
import React from "react";
import { useState } from "react";
//import {  useSelector } from "react-redux/es/hooks/useSelector";
import BaseLayout from "../../components/BaseLayout";
// import styles from "../components/Navbar/Showdetails.module.css";
import { useDispatch,useSelector } from "react-redux";
import {markTaskAsunCompleted} from "../../store/reduxstore"

function completedtasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.InputData.completedTasks);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}${month}${year}`;
  }

  const [sorting, setSorting] = useState(false);
  const [sortby, setsortby] = useState("");
  const handleuntaskCompletion = (taskId) => {
    dispatch(markTaskAsunCompleted(taskId));
  };

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
  const renderTasks = sorting ? sortedTasks : tasks;
  console.log("tasks:",tasks)
  return (
    <BaseLayout>
         <div >
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
        {renderTasks.map(
          (
            item, index
          ) => (
            <ul key={item.id}>
              <div className="cardonetwo">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    {/* <input
                      type="radio"
                      onChange={() => handleuntaskCompletion(item.id)}
                      className={styles.button}
                    /> */}
                     <input
                          type="checkbox"
                          checked="checked"
                          className="checkbox checkbox-success"
                          onClick={() => handleuntaskCompletion(item.id)}
                        />
                    <p className="text-white text-lg ml-3">{item.taskText}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-white ml-3">{item.priority}</p>
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
    </BaseLayout>
  );
}

export default completedtasksPage;
