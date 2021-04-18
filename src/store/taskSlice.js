import { createSlice } from '@reduxjs/toolkit';

// { tasks: [...] }

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasksReducer: (state, { payload }) => {
      state.tasks = payload;
    },
    addTaskReducer: (state, { payload }) => {
      state.tasks.push(payload);
    },
    deleteTaskReducer: (state, { payload }) => {
      state.tasks = state.tasks.filter((t) => t.id !== payload);
    },
    toggleReminderReducer: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? { ...task, reminder: payload.reminder } : task
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTasksReducer,
  deleteTaskReducer,
  addTaskReducer,
  toggleReminderReducer,
} = taskSlice.actions;

export default taskSlice.reducer;
