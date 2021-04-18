import React from 'react';
import { Typography, IconButton, Card } from '@material-ui/core';
import useStyles from '../styles/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Task = ({ task, onDelete, onToggle }) => {
  const classes = useStyles();
  return (
    <Card
      className={`${classes.task} ${task.reminder ? classes.reminder : ''}`}
    >
      <Typography
        variant='h6'
        className={classes.flexSb}
        onDoubleClick={() => onToggle(task.id)}
      >
        {task.text}
        <IconButton aria-label='delete' onClick={() => onDelete(task.id)}>
          <DeleteForeverIcon color='error' />
        </IconButton>
      </Typography>
      <Typography variant='subtitle2'>{task.day}</Typography>
    </Card>
  );
};

export default Task;
