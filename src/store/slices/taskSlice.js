import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    getTasks() {},
    setTasksReducer: (state, { payload }) => {
      state.tasks = payload;
    },
    addTaskServer() {},
    addTaskReducer: (state, { payload }) => {
      state.tasks.push(payload);
    },
    deleteTaskHandler() {},
    deleteTaskReducer: (state, { payload }) => {
      state.tasks = state.tasks.filter((t) => t.id !== payload);
    },
    toggleReminderReducer: {
      reducer: (state, { payload }) => {
        state.tasks = state.tasks.map((task) =>
          task.id === payload.id
            ? { ...task, reminder: payload.reminder }
            : task
        );
      },
      prepare: (value) => {
        return {
          payload: {
            ...value,
            reminder: !value.reminder,
          },
        };
      },
    },
  },
});

export const {
  taskToToggleReducer,
  deleteTaskHandler,
  addTaskServer,
  getTasks,
  setTasksReducer,
  deleteTaskReducer,
  addTaskReducer,
  toggleReminderReducer,
} = taskSlice.actions;

export default taskSlice.reducer;
