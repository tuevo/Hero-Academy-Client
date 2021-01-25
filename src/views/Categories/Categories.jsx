import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '33rem',
  }
}));

export default function Categories() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Content
    </div>
  )
}
