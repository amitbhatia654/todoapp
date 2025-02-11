import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Task 1",
      status: "pending",
      desc: "Create a task app in Mern",
    },
    {
      id: 2,
      title: "Task 2",
      desc: "Create a Mobile App",
      status: "completed",
    },
    {
      id: 3,
      title: "React Project",
      desc: "Create WebApp using React ",
      status: "progress",
    },
  ],
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
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) task.status = status;
    },
  },
});

// Export actions
export const { addTask, updateTaskStatus } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
