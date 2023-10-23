import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  editableTask: {},
  isOpen: false,
  completedTasks: [],
  pendingTask: [],
};

const inputDataSlice = createSlice({
  name: "InputData",
  initialState,
  reducers: {
    inputData_SUCCESS: (state, action) => {
      state.data = [...state.data, action.payload.taskObject];
    },
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.data = state.data.filter((task) => task.id !== taskIdToDelete);
    },
    editTask: (state, action) => {
      const taskIdToEdit = action.payload;
      const editabletask = state.data.filter((task) => task.id == taskIdToEdit);
      state.editableTask = editabletask;
      state.modelopen = true;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    updateTask: (state, action) => {
      state.data = state.data.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    markTaskAsCompleted: (state, action) => {
      const taskIndex = state.data.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex !== -1) {
        const completedTask = state.data.splice(taskIndex, 1);
        console.log(completedTask[0].checkboxChecked)
        completedTask[0].checkboxChecked = true
        state.completedTasks = [...state.completedTasks, completedTask[0]];
      }
    },
    markTaskAsunCompleted: (state, action) => {
      const taskIndex = state.completedTasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex !== -1) {
        //state.data[taskIndex].checkboxChecked = false;
        const uncompletedTask = state.completedTasks.splice(taskIndex, 1);
        console.log(uncompletedTask[0].checkboxChecked)
        uncompletedTask[0].checkboxChecked = false
        state.data = [...state.data, uncompletedTask[0]];
      }
    },
  },
});

export const {
  inputData_SUCCESS,
  deleteTask,
  editTask,
  openModal,
  closeModal,
  updateTask,
  markTaskAsCompleted,
  markTaskAsunCompleted,
} = inputDataSlice.actions;

const store = configureStore({
  reducer: {
    InputData: inputDataSlice.reducer,
  },
});

export default store;
