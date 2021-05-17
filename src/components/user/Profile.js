import React, { useState } from 'react';
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
  SvgIcon,
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from '../../styles/styles';
import { useForm } from 'react-hook-form';
import {
  getUserHandler,
  UpdateUserHandler,
  UpdateUserReducer,
  birthdayUpdateHandler,
} from '../../store/slices/authSlice';
import axiosInstance from '../../axios';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import AdapterDateFns from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

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
  halfWidth: {
    width: '48%',
  },
  halfWidthLeft: {
    width: '48%',
    marginRight: theme.spacing(2),
  },
  halfWidthRight: {
    width: '48%',
    marginLeft: theme.spacing(1),
  },
  smallBox: {
    width: '13%',
  },
  myProfile: {
    justifyContent: 'center',
  },
}));

const Profile = () => {
  const localClasses = localUseStyles();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const [profilePicture, setProfilePicture] = useState(null);

  const handleBirthday = (newBirthdayValue) => {
    const formatNewBirthdayValue =
      moment(newBirthdayValue).format('YYYY-MM-DD');
    setValue('date_of_birth', formatNewBirthdayValue);
    dispatch(birthdayUpdateHandler(formatNewBirthdayValue));
  };

  const onFileSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('profile_picture', profilePicture);
    axiosInstance
      .patch(`api/users/${auth.user.id}/`, formData)
      .then((res) => {
        localStorage.setItem('user_data', JSON.stringify(res.data));
        dispatch(UpdateUserReducer(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Grid container spacing={2} justify='center'>
          <form onSubmit={onFileSubmit}>
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
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
              }}
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
                    defaultValue={auth.user.display_name}
                    {...register('display_name')}
                    autoFocus
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    type='email'
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
                console.log('submit data: ', data);
                dispatch(UpdateUserHandler({ ...data, id: auth.user.id }));
              })}
            >
              <Grid item container justify='space-between' xs>
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
                  // autoFocus
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  label='Last Name'
                  defaultValue={auth.user.last_name}
                  {...register('last_name')}
                />
                <MuiPickersUtilsProvider utils={AdapterDateFns}>
                  <KeyboardDatePicker
                    className={localClasses.halfWidth}
                    margin='normal'
                    inputVariant='outlined'
                    // minDate={new Date('1900-01-01')}
                    // maxDate={new Date('2020-01-01')}
                    openTo='year'
                    views={['year', 'month', 'date']}
                    label='Birthday'
                    format='dd . MM . yyyy'
                    value={auth.user.date_of_birth}
                    onChange={handleBirthday}
                  />
                </MuiPickersUtilsProvider>

                <MaterialUiPhoneNumber
                  className={localClasses.halfWidth}
                  variant='outlined'
                  margin='normal'
                  label='Phone'
                  name='phone'
                  value={auth.user.phone}
                  defaultCountry={'no'}
                  onChange={(e) => {
                    setValue('phone', e, { shouldValidate: true });
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  label='Address'
                  defaultValue={auth.user.address}
                  {...register('address')}
                />
                <TextField
                  className={localClasses.halfWidth}
                  variant='outlined'
                  margin='normal'
                  label='City'
                  defaultValue={auth.user.city}
                  {...register('city')}
                />
                <TextField
                  className={localClasses.halfWidth}
                  variant='outlined'
                  margin='normal'
                  label='Country'
                  defaultValue={auth.user.country}
                  {...register('country')}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  label='Website'
                  defaultValue={auth.user.website}
                  {...register('website')}
                />
              </Grid>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={localClasses.floatRight}
              >
                Save
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
