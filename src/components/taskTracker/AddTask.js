import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import useStyles from '../../styles/styles';
import { addTaskServer } from '../../store/slices/taskSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // * Set Inputs
  const [text, setText] = useState('');
  const [day, setDay] = useState(
    new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate()
  );
  const [reminder, setReminder] = useState(false);

  const handleDateChange = (date) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    setDay(newDate);
  };

  // * Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    // if (!text) {
    //   alert('Please Add Task');
    //   return;
    // }
    dispatch(addTaskServer({ text, day, reminder }));
    setText('');
    setReminder(false);
  };

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      disableStrictModeCompat='true'
    >
      <Card className={classes.addTask}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <TextField
              id='text'
              label='Task'
              style={{ margin: 8 }}
              placeholder='Add Task'
              fullWidth
              margin='normal'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <KeyboardDatePicker
              id='day'
              margin='normal'
              label='Day'
              style={{ margin: 8 }}
              value={day}
              onChange={handleDateChange}
              fullWidth
              placeholder='Add Day'
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            <FormControlLabel
              control={<Checkbox color='primary' />}
              label='Set Reminder:'
              labelPlacement='start'
              style={{ margin: '0 8px' }}
              value={reminder}
              checked={reminder}
              onChange={(e) => setReminder(e.currentTarget.checked)}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              style={{ margin: '8px', marginBottom: '20px' }}
            >
              Save Task
            </Button>
          </Grid>
        </form>
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default AddTask;
