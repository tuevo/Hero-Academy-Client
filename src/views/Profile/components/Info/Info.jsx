import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Avatar, TextField, Button, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import validate from 'validate.js';
import { userRoles } from 'constants/user-roles.constant';
import Rating from '@material-ui/lab/Rating';
import NumberFormat from 'react-number-format';

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: 'is required' },
  }
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: '7.5rem',
    height: '7.5rem'
  },
  btnUpdate: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

export default function Info() {
  const classes = useStyles();

  const userState = useSelector(state => ({
    authUser: state.user.authUser
  }));

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      fullName: userState.authUser.fullName,
      introduction: userState.authUser.introduction || ''
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar alt={userState.authUser.fullName} src={userState.authUser.avatarUrl} className={classes.avatar} />
            <Box mt={2} mb={1}>
              <Typography variant="body1">{userRoles[userState.authUser.role]}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ marginRight: 3 }}>{`${Math.floor(userState.authUser.averageRating)}.${(userState.authUser.averageRating - Math.floor(userState.authUser.averageRating)) * 10}`}</Typography>
              <Box style={{ marginBottom: 1 }}>
                <Rating name="read-only" value={userState.authUser.averageRating} size="small" precision={0.5} readOnly />
              </Box>
            </Box>
            <Typography variant="body2" gutterBottom>
              <span>(</span>
              <NumberFormat value={userState.authUser.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
              <span>)</span>
            </Typography>
            <Typography variant="body2">
              <NumberFormat value={userState.authUser.numberOfStudents} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <form
          >
            <Box mb={2}>
              <TextField
                fullWidth
                error={hasError('fullName')}
                helperText={
                  hasError('fullName') ? formState.errors.fullName[0] : null
                }
                label="Họ vả tên"
                name="fullName"
                onChange={handleChange}
                type="text"
                value={formState.values.fullName || ''}
                variant="standard"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Địa chỉ email"
                type="text"
                value={userState.authUser.email}
                variant="standard"
                disabled
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Tự giới thiệu"
                type="text"
                value={userState.authUser.introduction}
                variant="standard"
                multiline
              />
            </Box>
            <Box mt={4}>
              <Button
                color="primary"
                size="large"
                variant="contained"
                className={classes.btnUpdate}
              >
                Cập nhật thông tin
            </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div >
  )
}
