import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  Paper,
  ButtonBase,
  Button,
  TextField,
  makeStyles,
  Input,
  SvgIcon,
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from '../../styles/styles';
import { useForm, Controller } from 'react-hook-form';
import {
  getUserHandler,
  updateProfilePictureHandler,
  UpdateUserHandler,
} from '../../store/slices/authSlice';

const localUseStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  floatRight: {
    float: 'right',
  },
  fieldWidth: {
    maxWidth: '600px',
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const localClasses = localUseStyles();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const { register: registerFile, handleSubmit: handleFileSubmit } = useForm();

  const onFileChange = (e) => {
    console.log(e.target.files);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={6}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant='text'
              color='inherit'
              component={RouterLink}
              to={'/user/profile'}
            >
              Profile
            </Button>
          </Grid>
          <Grid item>
            <Button variant='text' color='inherit'>
              Settings
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='text'
              color='inherit'
              onClick={() => dispatch(getUserHandler())}
            >
              Get user Info
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper} elevation={6}>
        <Grid container spacing={2}>
          <form
            onSubmit={handleFileSubmit((data) => {
              console.log('data: ', data);
              console.log('data: ', data.file);
              dispatch(UpdateUserHandler({ ...data, id: auth.user.id }));
            })}
          >
            <Grid item className={localClasses.margin}>
              <ButtonBase className={classes.image}>
                <img
                  src={auth.user.profile_picture}
                  alt='my profile'
                  className={classes.img}
                />
              </ButtonBase>
            </Grid>
            <input
              accept='image/*'
              type='file'
              id='fileUploadButton'
              hidden
              onChange={onFileChange}
              // {...registerFile('profile_picture')}
            />
            <label htmlFor={'fileUploadButton'}>
              <Button
                color='primary'
                variant='contained'
                component='span'
                startIcon={
                  <SvgIcon fontSize='small'>
                    <PublishIcon />
                  </SvgIcon>
                }
              >
                Upload
              </Button>
            </label>
            <Button type='submit' variant='contained' color='primary'>
              Upload Picture
            </Button>
          </form>
          <form
            onSubmit={handleSubmit((data) => {
              dispatch(UpdateUserHandler({ ...data, id: auth.user.id }));
            })}
          >
            <Grid item xs={12} sm container>
              <Grid
                item
                xs
                container
                direction='column'
                spacing={2}
                alignItems='center'
                className={localClasses.margin}
              >
                <Grid item xs>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={localClasses.floatRight}
                  >
                    Save
                  </Button>
                  <Typography gutterBottom variant='h3'>
                    My Profile
                  </Typography>

                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    label='Display Name'
                    defaultValue={auth.user.username}
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
                    label='Email Address'
                    defaultValue={auth.user.email}
                    {...register('email')}
                    autoComplete='email'
                  />
                </Grid>
              </Grid>
              {/* <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt='complex'
                  src='http://127.0.0.1:8000/media/default/profile.png'
                />
              </ButtonBase>
            </Grid> */}
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} sm container className={localClasses.fieldWidth}>
          <Grid
            item
            xs
            container
            direction='column'
            spacing={2}
            className={localClasses.margin}
            alignItems='center'
          >
            <form
              onSubmit={handleSubmit((data) => {
                dispatch(UpdateUserHandler({ ...data, id: auth.user.id }));
              })}
            >
              <Grid item xs>
                <Typography gutterBottom variant='h3'>
                  Personal Info
                </Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  label='First Name'
                  defaultValue={auth.user.first_name}
                  {...register('first_name')}
                  autoFocus
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  label='Last Name'
                  defaultValue={auth.user.last_name}
                  {...register('last_name')}
                  autoFocus
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={localClasses.floatRight}
                >
                  Save
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
