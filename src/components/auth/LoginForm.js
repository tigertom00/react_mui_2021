import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import useStyles from '../../styles/styles';
import {
  Typography,
  makeStyles,
  Card,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { loginHandler } from '../../store/slices/authSlice';

const useLocalStyles = makeStyles({
  card: {
    maxWidth: '300px',
    margin: 'auto',
    background: '#FFE7E7',
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const LocalCls = useLocalStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // * Handle Submit
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Card className={LocalCls.card}>
        <form
          onSubmit={handleSubmit((data) => {
            dispatch(loginHandler(data));
          })}
        >
          <Grid container spacing={2} justify='center'>
            <Grid item xs={12}>
              <Typography
                className={classes.trackerTitle}
                variant='h5'
                align='center'
              >
                Login Form{' '}
                {auth.user === null
                  ? ''
                  : auth.user.username.charAt(0).toUpperCase() +
                    auth.user.username.slice(1)}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id='username'
                label='Username'
                placeholder='Username'
                style={{ marginTop: 0 }}
                fullWidth
                margin='normal'
                {...register('username')}
              />
            </Grid>
            <Grid item>
              <TextField
                id='password'
                label='Password'
                style={{ marginTop: 0 }}
                placeholder='Password'
                fullWidth
                margin='normal'
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: 20 }}
                type='submit'
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
