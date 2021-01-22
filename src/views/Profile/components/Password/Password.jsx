import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';

const schema = {
  currentPassword: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  newPassword: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  confirmNewPassword: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  btnUpdate: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  input: {
    ...theme.palette.input
  }
}));

export default function Password() {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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

  const handleBtnUpdateClick = () => {
    let data = {
      ...formState.values
    };

    console.log(data);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form>
      <Box mb={2}>
        <TextField
          fullWidth
          error={hasError('currentPassword')}
          helperText={
            hasError('currentPassword') ? formState.errors.currentPassword[0] : null
          }
          label="Mật khẩu hiện tại"
          name="currentPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.currentPassword || ''}
          variant="standard"
          InputProps={{
            classes: {
              underline: classes.input
            }
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          error={hasError('newPassword')}
          helperText={
            hasError('newPassword') ? formState.errors.newPassword[0] : null
          }
          label="Mật khẩu mới"
          name="newPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.newPassword || ''}
          variant="standard"
          InputProps={{
            classes: {
              underline: classes.input
            }
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          error={hasError('confirmNewPassword')}
          helperText={
            hasError('confirmNewPassword') ? formState.errors.confirmNewPassword[0] : null
          }
          label="Nhập lại mật khẩu mới"
          name="confirmNewPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.confirmNewPassword || ''}
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
          Cập nhật mật khẩu
            </Button>
      </Box>
    </form>
  )
}
