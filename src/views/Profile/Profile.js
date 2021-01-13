import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Hồ sơ cá nhân
    </div>
  );
};

export default Profile;
