import React from 'react';
import { Typography } from '@material-ui/core';
import TaskTracker from './components/TaskTracker';

const App = () => {
  return (
    <div>
      <Typography variant='h5'>Hello from App.js</Typography>
      <TaskTracker />
    </div>
  );
};

export default App;
