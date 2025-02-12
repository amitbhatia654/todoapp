import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Task 1",
      status: "pending",
      description: "Create a task app in Mern",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Create a Mobile App",
      status: "completed",
      assignDate: new Date(),
    },
    {
      id: 3,
      title: "React Project",
      description: "Create WebApp using React ",
      status: "progress",
      assignDate: new Date(),
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
      const { id, status, title, description } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        (task.status = status ? status : task.status),
          (task.title = title ? title : task.title),
          (task.description = description ? description : task.description);
      }
    },
  },
});

// Export actions
export const { addTask, updateTaskStatus } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
