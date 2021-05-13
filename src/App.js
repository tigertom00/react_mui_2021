import React, { useEffect } from 'react';
import { Route, Switch as RouterSwitch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenHandler } from './store/slices/authSlice';
import { createMuiTheme, Paper, CssBaseline } from '@material-ui/core';
import useStyles from './styles/styles';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/utils/PrivateRoute';
import LandingPage from './components/LandingPage';
import TaskTracker from './components/taskTracker/TaskTracker';
import Profile from './components/user/Profile';
import purple from '@material-ui/core/colors/purple';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const Theme = createMuiTheme({
    palette: {
      type: auth.user.dark_mode ? 'dark' : 'light',
      primary: {
        main: purple[600],
      },
    },
  });

  useEffect(() => dispatch(refreshTokenHandler()), [dispatch]);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <Paper elevation={0} square className={classes.paperFull}>
          <div className={classes.fullHeight}>
            <Navbar />
            <RouterSwitch>
              <PrivateRoute exact path='/' component={LandingPage} />
              <Route path='/login' component={LoginForm} />
              <Route path='/register' component={SignUpForm} />
              <PrivateRoute path='/user/profile' component={Profile} />
              <PrivateRoute path='/tasktracker' component={TaskTracker} />
            </RouterSwitch>
          </div>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default App;
