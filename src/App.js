import React, { useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch as RouterSwitch,
// } from 'react-router-dom';
import TaskTracker from './components/taskTracker/TaskTracker';
import Logout from './components/auth/Logout';
import LoginForm from './components/auth/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenHandler } from './store/slices/authSlice';
import SignUpForm from './components/auth/SignUpForm';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => dispatch(refreshTokenHandler()), [dispatch]);
  return (
    <>
      <Navbar />
      <SignUpForm />
      <LoginForm />
      <Logout />
      {auth.isAuthenticated ? <TaskTracker /> : 'Hello world'}
    </>
  );
};

export default App;
