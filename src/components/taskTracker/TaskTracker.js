import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography, IconButton } from '@material-ui/core';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { green } from '@material-ui/core/colors';
import useStyles from '../../styles/styles';
import Task from './Task';
import AddTask from './AddTask';
import { getTasks } from '../../store/slices/taskSlice';

const TaskTracker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  const [showAddTask, setShowAddTask] = useState(false);

  //* Fetch task with redux saga

  useEffect(() => dispatch(getTasks()), [dispatch]);

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
              <AddTask />
            </Grid>
          )}
          {tasks.length > 0 ? (
            <Grid item xs>
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
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
