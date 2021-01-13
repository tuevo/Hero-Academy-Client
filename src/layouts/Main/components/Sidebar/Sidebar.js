import { Divider, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { availablePages } from 'constants/global.constant';
import PropTypes from 'prop-types';
import React from 'react';
import { UserInfo, SidebarNav } from './components';
import { useSelector } from 'react-redux';
import { shallowEqual } from 'recompose';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '15rem',
    [theme.breakpoints.up('lg')]: {
      marginTop: '4rem',
      height: 'calc(100% - 4rem)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const userState = useSelector(state => ({
    authUser: state.user.authUser
  }), shallowEqual)

  const classes = useStyles();

  let pages = [];

  if (userState.authUser) {
    pages = Object.keys(availablePages).map(key => ({
      ...availablePages[key],
      href: availablePages[key].path
    })).filter(page => page.auth && (page.role === 0 || page.role === userState.authUser.role));
  }

  return (
    userState.authUser && (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          <UserInfo />
          <Divider className={classes.divider} />
          <SidebarNav
            className={classes.nav}
            pages={pages}
          />
        </div>
      </Drawer>
    )
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
