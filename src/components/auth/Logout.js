import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from '@material-ui/core';
import { logoutHandler } from '../../store/slices/authSlice';

// const useStyles = makeStyles({});

const Logout = () => {
  const dispatch = useDispatch();

  // const classes = useStyles();
  return (
    <>
      <Card>
        <Button
          variant='contained'
          color='default'
          onClick={() => dispatch(logoutHandler())}
        >
          logout
        </Button>
      </Card>
    </>
  );
};

export default Logout;
