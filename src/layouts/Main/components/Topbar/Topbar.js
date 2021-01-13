import { AppBar, Box, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { availablePages } from 'constants/global.constant';
import { localStorageItems } from 'constants/local-storage.constant';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

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
    width: '2.8125rem'
  },
  logoTitle: {
    color: theme.palette.primary.dark,
    marginLeft: theme.spacing(0.5),
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 'bold',
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, history } = props;

  const classes = useStyles();

  const handleSignOut = () => {
    localStorage.removeItem(localStorageItems.ACCESS_TOKEN.name);
    history.length = 0;
    history.push(availablePages.SIGN_IN.path);
  }

  return (
    <AppBar
      // {...rest}
      className={clsx(classes.root, className)}
      color="inherit"
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="Logo"
              src="https://icons-for-free.com/iconfiles/png/128/hero+marvel+character+super+hero+icon-1320166754459520952.png"
              className={classes.logoImage}
            />
            <Typography variant="h5" className={classes.logoTitle}>Hero Academy</Typography>
          </Box>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
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
