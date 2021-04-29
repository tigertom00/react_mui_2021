import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { signUpHandler } from '../../store/slices/authSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}));

const SignUpForm = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  //   const intl = useIntl();
  // const history = useHistory();

  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [userEmail, setUserEmail] = useState('');
  //   const [confirmPassword, setConfirmPassword] = useState('');
  //   const { toggleThis } = useMenu();
  //   const { setAuth } = useAuth();

  // const authenticate = (user) => {
  // setAuth({ isAuthenticated: true, ...user });
  // toggleThis('isAuthMenuOpen', false);
  // let _location = history.location;
  // let _route = '/home';
  // if (_location.state && _location.state.from) {
  //   _route = _location.state.from.pathname;
  //   history.push(_route);
  // } else {
  //   history.push(_route);
  // }
  // };

  return (
    // <Page
    //   pageTitle={intl.formatMessage({
    //     id: 'sign_up',
    //     defaultMessage: ' Sign up',
    //   })}
    //   onBackClick={() => {
    //     history.goBack();
    //   }}
    // >
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component='h1' variant='h5'>
          {/* {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })} */}
          sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => {
            console.log('registration data: ', data);
            dispatch(signUpHandler(data));
          })}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            // label={intl.formatMessage({
            //   id: 'username',
            //   defaultMessage: 'Username',
            // })}
            label='username'
            {...register('username')}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='email'
            // label={intl.formatMessage({
            //   id: 'email',
            //   defaultMessage: 'E-Mail',
            // })}
            label='email'
            {...register('email')}
            autoComplete='email'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            {...register('password1')}
            // label={intl.formatMessage({
            //   id: 'password',
            //   defaultMessage: 'Password',
            // })}
            label='password'
            type='password'
            autoComplete='current-password'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            {...register('password2')}
            // label={intl.formatMessage({
            //   id: 'password_confirm',
            //   defaultMessage: 'Confirm Password',
            // })}
            label='Confirm Password'
            type='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign up
            {/* {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })} */}
          </Button>
        </form>
      </div>
    </Paper>
    // </Page>
  );
};

export default SignUpForm;
