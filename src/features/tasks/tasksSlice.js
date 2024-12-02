import { createSlice } from "@reduxjs/toolkit";
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: "all", // can be 'all', 'completed', 'pending', 'overdue'
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, updateTask, toggleTask, deleteTask, setFilter } =
  tasksSlice.actions;

export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  switch (filter) {
    case "COMPLETED":
      return tasks.filter((task) => task.completed);
    case "PENDING":
      return tasks.filter((task) => !task.completed);
    case "OVERDUE":
      return tasks.filter(
        (task) => new Date(task.dueDate) < new Date() && !task.completed
      );
    default:
      return tasks;
  }
};

export default tasksSlice.reducer;
