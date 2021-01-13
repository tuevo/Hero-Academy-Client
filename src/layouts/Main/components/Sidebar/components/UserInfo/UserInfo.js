import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { shallowEqual } from 'recompose';
import { userRoles } from 'constants/user-roles.constant';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '3.375rem',
    height: '3.375rem',
    marginTop: theme.spacing(2)
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const UserInfo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const userState = useSelector(state => ({
    authUser: state.user.authUser
  }), shallowEqual);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={userState.authUser.avatarUrl}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h5"
      >
        {userState.authUser.fullName}
      </Typography>
      <Typography variant="body2">{userRoles[userState.authUser.role]}</Typography>
    </div>
  );
};

UserInfo.propTypes = {
  className: PropTypes.string
};

export default UserInfo;
