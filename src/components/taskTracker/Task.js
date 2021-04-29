import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Card } from '@material-ui/core';
import useStyles from '../../styles/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  deleteTaskHandler,
  toggleReminderReducer,
} from '../../store/slices/taskSlice';

const Task = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card
      className={`${classes.task} ${task.reminder ? classes.reminder : ''}`}
    >
      <Typography
        variant='h6'
        className={classes.flexSb}
        onDoubleClick={() => dispatch(toggleReminderReducer(task))}
      >
        {task.text}
        <IconButton
          aria-label='delete'
          onClick={() => dispatch(deleteTaskHandler(task.id))}
        >
          <DeleteForeverIcon color='error' />
        </IconButton>
      </Typography>
      <Typography variant='subtitle2'>{task.day}</Typography>
    </Card>
  );
};

export default Task;
