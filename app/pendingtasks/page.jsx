"use client";
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import styles from "../components/Navbar/Showdetails.module.css";
import BaseLayout from "../../components/BaseLayout";
//import { useSelector } from "react-redux/es/hooks/useSelector";
import { markTaskAsCompleted } from "../../store/reduxstore";
import { ImCross } from "react-icons/im";
import { AiOutlineClear } from "react-icons/ai";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";

function pendingtasksPage() {
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState("");
  const tasks = useSelector((state) => state.InputData.data);
  const [sorting, setSorting] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [sortby, setsortby] = useState("");

  const pickinItems = [
    {
      name: "High",
      icon: ImCross,
    },
    {
      name: "Medium",
      icon: ImCross,
    },
    {
      name: "Low",
      icon: ImCross,
    },
    {
      name: "None",
      icon: ImCross,
    },
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}${month}${year}`;
  }
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
  const[markcomplete,setmarkcomplete] = useState(false);
  const handleTaskCompletion = (taskId) => {
    dispatch(markTaskAsCompleted(taskId));
    setmarkcomplete(true)
    setTimeout(() => {
      setmarkcomplete(false);
    }, 3000); 
  };

  const toggleBadge = (name) => {
    if (selectedBadges.includes(name)) {
      setSelectedBadges(selectedBadges.filter((badge) => badge !== name));
    } else {
      setSelectedBadges([...selectedBadges, name]);
    }
  };

  const handleClear = () => {
    setdueDate("");
    setSelectedBadges([]);
  };

  const handelsortby = (event) => {
    setsortby(event.target.value);
    setSorting(true);
  };

  const filteredTasks = tasks.filter((task) => {
    return selectedBadges.includes(task.priority);
  });

  const filtertasks = filteredTasks.length > 0 ? filteredTasks : tasks;

  const filteredTasksByDueDate = filtertasks.filter((task) => {
    return dueDate === "" || task.dueDate === dueDate;
  });

  const sortTasks = (tasks, sortby) =>
    filteredTasksByDueDate.slice().sort((taskA, taskB) => {
      const priorityA = prioritySorting(taskA.priority, sortby);
      const priorityB = prioritySorting(taskB.priority, sortby);
      return priorityA !== priorityB
        ? priorityB - priorityA
        : taskA.createdDate - taskB.createdDate;
    });

  const sortedTasks = sortTasks(tasks, sortby);

  const renderTasks = sorting ? sortedTasks : filteredTasksByDueDate;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [calender, setcalender] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglecalender = (event) => {
    setdueDate(event.target.value);
    setcalender(!calender);
  };

  return (
    <BaseLayout>
      <div>
      {markcomplete && (
          <div className="toast tost-end fade-in alert w-32 alert-success text-white font-semibold text-lg m-4">
            Added to completed Tasks
          </div>
        )}
        <br></br>
        <div className="flex justify-between">
        <div className="">
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
        <div className="mr-32">
          <div className="flex flex-row">
          <div className="ml-6 ">
              {selectedBadges.length > 0 && (
                <div className="flex flex-row justify-evenly">
                  <div className="alert">
                    <div>
                      {selectedBadges.map((item, index) => (
                        <p className="badge badge-error mr-2" key={index}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="tooltip" data-tip="Filter your Tasks Easily">
              <button onClick={toggleDropdown}>
                <AiFillFilter size={40} color="white" />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="completecard">
                <div className="flex flex-row">
                <div className="tooltip" data-tip="Clear Filters">
                    <button className="mr-4" onClick={handleClear}>
                      <AiOutlineClear size={30} color="black" />
                    </button>
                  </div>
                  <div>
                    <div className="tooltip" data-tip="Filter by DueDate">
                      <button onClick={() => setcalender(!calender)}>
                        <BsFillCalendarCheckFill size={30} color="black" />
                      </button>
                    </div>
                    {calender && (
                      <input
                        type="date"
                        placeholder="Due date"
                        className="input input-ghost text-black pendinginput "
                        value={dueDate}
                        onChange={togglecalender}
                      />
                    )}
                  </div>
                  
                  <div className="dropdown ">
                    <label tabIndex={0} className="buttonStylesdropdown ">
                      <div className="tooltip" data-tip="Filter by Priority">
                        <BsFillFilterSquareFill size={30} color="black" />
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] card card-compact w-32 p-2 shadow bg-primary text-primary-content"
                    >
                      <div className="card-body">
                        <div>
                          <p>Filter by Priority</p>
                          {pickinItems.map(({ name, icon: Icon }) => {
                            const isSelected = selectedBadges.includes(name);
                            return (
                              <div className=" mr-1 mb-2">
                                <button
                                  className="badge gap-4"
                                  onClick={() => toggleBadge(name)}
                                >
                                  {name}
                                </button>
                                {isSelected && (
                                  <button className="remove-badge">
                                    <Icon />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
         
          </div>
           </div>
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
                        onChange={() => handleTaskCompletion(item.id)}
                        className={styles.button}
                      /> */}
                      <input
                          type="checkbox"
                          checked={false}
                          className="checkbox checkbox-success"
                          onClick={() => handleTaskCompletion(item.id)}
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

export default pendingtasksPage;
