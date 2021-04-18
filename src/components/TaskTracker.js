import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../axios';
import { Grid, Paper, Typography, IconButton } from '@material-ui/core';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { green } from '@material-ui/core/colors';
import useStyles from '../styles/styles';
import Task from './Task';
import AddTask from './AddTask';
import {
  setTasksReducer,
  addTaskReducer,
  deleteTaskReducer,
  toggleReminderReducer,
} from '../store/taskSlice';

const TaskTracker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const [loading, setLoading] = useState(false);

  const [showAddTask, setShowAddTask] = useState(false);

  //* Fetch task with redux

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/testing');
      const data = await res.json();
      dispatch(setTasksReducer(data));
      console.log('fetchTasks data ', data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => fetchTasks(), []);

  // // * Fetch task with redux and axios

  // const fetchTasks = () => {
  //   axiosInstance
  //     .get('api/testing')
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     })
  //     .then((res) => {
  //       dispatch(setTasksReducer(res.data));
  //     });
  // };
  // useEffect(() => fetchTasks(), []);

  // // FetchTask
  // const fetchTask = (id) => {
  //   axiosInstance
  //     .get(`api/testing/${id}`)
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       console.log('Fetch Task: ', res.data);
  //       return data;
  //     });
  // };

  //* Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:8000/api/testing/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    dispatch(addTaskReducer(data));
  };

  //* Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/api/testing/${id}`, {
      method: 'DELETE',
    });
    dispatch(deleteTaskReducer(id));
  };

  //*  Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/api/testing/${id}`);
    const data = await res.json();

    return data;
  };
  //* Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8000/api/testing/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    dispatch(toggleReminderReducer(data));
  };

  return (
    <div className={classes.taskTracker}>
      <Paper className={classes.taskPaper}>
        <Grid container spacing={3}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            className={classes.taskTitleGrid}
          >
            <Grid item>
              <Typography
                gutterBottom
                variant='h4'
                className={classes.trackerTitle}
              >
                Task Tracker
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                variant='contained'
                onClick={() => setShowAddTask(!showAddTask)}
              >
                {showAddTask ? (
                  <CancelPresentationIcon color='error' fontSize='large' />
                ) : (
                  <AddBoxIcon style={{ color: green[500] }} fontSize='large' />
                )}
              </IconButton>
            </Grid>
          </Grid>
          {showAddTask && (
            <Grid item>
              {' '}
              <AddTask onAdd={addTask} key={tasks.id} />
            </Grid>
          )}
          {tasks.length > 0 ? (
            <Grid item xs>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ))}
            </Grid>
          ) : (
            'No tasks'
          )}
        </Grid>
      </Paper>
    </div>
  );
};
export default TaskTracker;
