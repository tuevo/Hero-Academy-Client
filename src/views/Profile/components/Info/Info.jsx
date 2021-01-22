import { Avatar, Box, Button, Grid, TextField, Typography, ButtonBase } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import { userRoles } from 'constants/user-roles.constant';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import validate from 'validate.js';

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: 'is required' },
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: '7.5rem',
    height: '7.5rem'
  },
  btnUpdate: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: '50%'
  },
  avatarUploading: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: theme.palette.primary.contrastText,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  input: {
    ...theme.palette.input
  },
  disabledInput: {
    ...theme.palette.input,
    color: theme.palette.text.disabled,
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

  const [showUploadingAvatar, setShowUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(userState.authUser.avatarUrl);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

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

  const handleAvatarChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      setUploadedAvatar(image);
      setAvatarPreview(reader.result)
    }

    reader.readAsDataURL(image)
  }

  const handleAvatarMouseOver = () => {
    if (showUploadingAvatar)
      return;

    setShowUploadingAvatar(true);
  }

  const handleAvatarMouseOut = () => {
    setShowUploadingAvatar(false);
  }

  const handleBtnUpdateClick = () => {
    let data = {
      ...formState.values
    };

    if (uploadedAvatar)
      data.avatar = uploadedAvatar;

    console.log(data);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ButtonBase
              className={classes.avatarContainer}
              onMouseOver={handleAvatarMouseOver}
              onMouseOut={handleAvatarMouseOut}
            >
              <Box>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={handleAvatarChange}
                  hidden
                />
                <Avatar alt={userState.authUser.fullName} src={avatarPreview} className={classes.avatar} />
                <label
                  htmlFor="contained-button-file"
                  style={{ opacity: showUploadingAvatar ? 1 : 0 }}
                >
                  <Box display="flex" justifyContent="center" alignItems="center" className={classes.avatarUploading}>
                    <EditOutlinedIcon color="inherit" fontSize="large" />
                  </Box>
                </label>
              </Box>
            </ButtonBase>
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
            <Box mb={4}>
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
                InputProps={{
                  classes: {
                    underline: classes.input
                  }
                }}
              />
            </Box>
            <Box mb={4}>
              <TextField
                fullWidth
                label="Địa chỉ email"
                type="text"
                value={userState.authUser.email}
                variant="standard"
                InputProps={{
                  classes: {
                    underline: classes.input,
                    disabled: classes.disabledInput
                  }
                }}
                disabled
              />
            </Box>
            <Box mb={4}>
              <TextField
                fullWidth
                label="Tự giới thiệu"
                type="text"
                value={formState.values.introduction}
                multiline
                variant="standard"
                InputProps={{
                  classes: {
                    underline: classes.input
                  }
                }}
              />
            </Box>
            <Box mt={4}>
              <Button
                color="primary"
                size="large"
                variant="contained"
                className={classes.btnUpdate}
                onClick={handleBtnUpdateClick}
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
