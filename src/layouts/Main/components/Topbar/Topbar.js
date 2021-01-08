import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Box, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { availablePages } from 'constants/global.constant';
import { localStorageItems } from 'constants/local-storage.constant';

const useStyles = makeStyles(theme => ({
  root: {
  },
  flexGrow: {
    flexGrow: 1
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logoImage: {
    width: '1.875rem'
  },
  logoTitle: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1),
    fontWeight: 'bold'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, history } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem(localStorageItems.ACCESS_TOKEN.name);
    history.length = 0;
    history.push(availablePages.SIGN_IN.path);
  }

  return (
    <AppBar
      // {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="Logo"
              src="/images/logos/logo.png"
              className={classes.logoImage}
            />
            <Typography variant="h5" className={classes.logoTitle}>Hero Academy</Typography>
          </Box>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
