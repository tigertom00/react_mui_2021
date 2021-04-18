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
import DateFnsUtils from '@date-io/date-fns';
import React, { useState } from 'react';
import useStyles from '../styles/styles';
import moment from 'moment';

const AddTask = ({ onAdd }) => {
  const classes = useStyles();

  const [text, setText] = useState('');

  const [day, setDay] = React.useState(
    new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate()
  );
  const handleDateChange = (date) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    setDay(newDate);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please Add Task');
      return;
    }

    onAdd({ text, day, reminder });

    setText('');
    setReminder(false);
  };

  const [reminder, setReminder] = useState(false);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              //   InputLabelProps={{
              //     shrink: true,
              //   }}
            />
            {/* <TextField
            id='day'
            label='Day'
            type='datetime-local'
            defaultValue={'24-05-2021T10:30'}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
            <KeyboardDatePicker
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
