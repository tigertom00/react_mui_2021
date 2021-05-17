import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { clearNotify } from '../../store/slices/notifySlice';
import { Snackbar } from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

function Alerts(props) {
  return <MuiAlert elevation={6} variant='standard' {...props} />;
}

const Alert = () => {
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearNotify());
    setOpen(false);
  };

  const severity = () => {
    console.log(notify.statusFirst);
    if (notify.statusFirst === '2') {
      return 'success';
    } else if (notify.statusFirst === '4') {
      return 'warning';
    } else if (notify.statusFirst === '5') {
      return 'error';
    } else {
      return 'info';
    }
  };

  useEffect(() => {
    if (notify.msg.length > 0) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(clearNotify());
      }, 3000);
    }
  }, [notify, dispatch]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        style={{ height: '100%' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alerts onClose={handleClose} severity={severity()}>
          <AlertTitle>{notify.statusText}</AlertTitle>
          {notify.msg}
        </Alerts>
      </Snackbar>
    </>
  );
};

export default Alert;
