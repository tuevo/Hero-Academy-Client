import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, Box, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { availablePages } from 'constants/global.constant';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logoImage: {
    width: '1.875rem'
  },
  logoTitle: {
    color: theme.palette.primary.dark,
    marginLeft: theme.spacing(1),
    fontWeight: 'bold'
  },
  btnSignIn: {
    marginRight: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      position="fixed"
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="Logo"
              src="https://image.flaticon.com/icons/png/128/3050/3050298.png"
              className={classes.logoImage}
            />
            <Typography variant="h5" className={classes.logoTitle}>Hero Academy</Typography>
          </Box>
        </RouterLink>
        <Box display="flex">
          <RouterLink to={availablePages.SIGN_IN.path} className={classes.btnSignIn}>
            <Button variant="outlined" color="primary">ĐĂNG NHẬP</Button>
          </RouterLink>
          <RouterLink to={availablePages.SIGN_UP.path}>
            <Button variant="contained" color="primary">ĐĂNG KÝ</Button>
          </RouterLink>
        </Box>

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

export default Topbar;
