import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
}));

const InChargeCourses = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Khóa học phụ trách
    </div>
  );
};

export default InChargeCourses;
