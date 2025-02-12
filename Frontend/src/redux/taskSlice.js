import { createSlice } from "@reduxjs/toolkit";
import { getAllTask } from "../Api";

const initialState = {
  tasks: await getAllTask(),
};

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { _id, status, title, description } = action.payload;
      const task = state.tasks.find((task) => task._id == _id);
      if (task) {
        (task.status = status ? status : task.status),
          (task.title = title ? title : task.title),
          (task.description = description ? description : task.description);
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id != action.payload);
    },
  },
});

// Export actions
export const { addTask, updateTaskStatus, removeTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
