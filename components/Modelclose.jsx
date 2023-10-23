import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { closeModal, updateTask } from "../store/reduxstore";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Modelclose() {
  const edittask_details = useSelector((state) => {
    return state.InputData.editableTask;
  });
  const isopen = useSelector((state) => {
    return state.InputData.isOpen;
  });
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    id: edittask_details[0].id,
    taskText: edittask_details[0].taskText,
    dueDate: edittask_details[0].dueDate,
    priority: edittask_details[0].priority,
  });

  const closing = () => {
    dispatch(closeModal());
  };

  const handleSubmitNewTodo = (event) => {
    event.preventDefault();
    const { id, taskText, dueDate, priority } = taskData;

    if (taskText !== "" && dueDate !== "" && priority !== "") {
      const taskObject = {
        id: id,
        taskText,
        dueDate,
        priority,
        createdDate: new Date().toISOString(),
      };
      dispatch(updateTask(taskObject));
      dispatch(closeModal());
    } else {
      console.log("Please fill in all the fields.");
    }
  };

  return (
    <div className={`modal ${isopen ? "modal-open" : ""}`}>
      <div className="modal-card">
        <div className="cardstyle">
          <div className="flex flex-row justify-between">
          <h3 className="edittask">Edit Task</h3>
        <label onClick={closing} className="crossbutton">
          ✕
        </label>
        
        </div>
        <form onSubmit={handleSubmitNewTodo}>
          
          <div className="modal-action flex flex-col">
            <input
              value={taskData.taskText}
              onChange={(e) => setTaskData({ ...taskData, taskText: e.target.value })}
              type="text"
              placeholder="Type here"
              className="input  addinput input-bordered w-full mb-3"
            />
            <input
              type="date"
              placeholder="Due date"
              className="input addinput input-ghost text-white w-full max-w-xs mb-3"
              value={taskData.dueDate}
              onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            />
            <select
              className="select   select-lg text-white w-full mb-3 max-w-xs"
              value={taskData.priority}
              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
            >
              <option value={""} disabled>
                Priority
              </option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>NO Priority</option>
            </select>
            <button type="submit" className="buttonsubmit">
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Modelclose;
