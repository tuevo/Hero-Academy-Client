import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles(theme => ({
  root: {
    height: '30rem'
  },
  icon: {
    fontSize: '4.375rem',
    color: theme.palette.icon
  }
}));

export default function CourseListEmpty() {
  const classes = useStyles();

  return (
    <Box className={classes.root} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box mb={1}>
        <SchoolIcon className={classes.icon} />
      </Box>
      <Typography variant="subtitle2">Chưa có khóa học nào.</Typography>
    </Box>
  )
}