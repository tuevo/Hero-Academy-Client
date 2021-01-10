import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { availablePages } from 'constants/global.constant';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
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
  btnSignIn: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(4)
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

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
              src="https://icons-for-free.com/iconfiles/png/128/hero+marvel+character+super+hero+icon-1320166754459520952.png"
              className={classes.logoImage}
            />
            <Typography variant="h5" className={classes.logoTitle}>Hero Academy</Typography>
          </Box>
        </RouterLink>
        <Box display="flex" alignItems="center">
          <div className={classes.searchInput}>
            <SearchInput />
          </div>
          <RouterLink to={availablePages.SIGN_IN.path} className={classes.btnSignIn}>
            <Button variant="outlined" color="primary">ĐĂNG NHẬP</Button>
          </RouterLink>
          <RouterLink to={availablePages.SIGN_UP.path}>
            <Button variant="contained" color="primary">ĐĂNG KÝ</Button>
          </RouterLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
