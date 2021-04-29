// import React, { createRef, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import { useAlert } from 'react-alert';
// import { Snackbar } from '@material-ui/core';
// import { Alert } from '@material-ui/lab';

// // const useStyles = makeStyles({});

// const Notification = () => {
//   const alert = useAlert();
//   const notify = useSelector((state) => state.notify);

//   // useEffect(() => alert.show('Oh look, an alert!'), []);
//   // const classes = useStyles();
//   // const dispatch = useDispatch();
//   return (
//     // <div>
//     //   <Snackbar
//     //     open={notify.show}
//     //     autoHideDuration={3000}
//     //     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//     //   >
//     //     <Alert severity='error'>{notify.msg}</Alert>
//     //   </Snackbar>
//     // </div>
//     <div>
//       <Button
//         variant='contained'
//         color='default'
//         onClick={() => {
//           alert.show('Oh look, an alert!');
//         }}
//       >
//         {notify.msg}
//       </Button>
//     </div>
//   );
// };

// export default Notification;
