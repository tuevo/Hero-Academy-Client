import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, Box, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { availablePages } from 'constants/global.constant';
import { SearchInput } from 'components';
import { useHistory } from 'react-router-dom';

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
  btnSignUp: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  searchInput: {
    marginRight: theme.spacing(2)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearchInputKeyUp = (e) => {
    if (e.keyCode === 13 && searchTerm) {
      history.push(availablePages.COURSE_SEARCHING.path);
    }
  }

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
            <SearchInput
              onChange={handleSearchInputChange}
              onKeyUp={handleSearchInputKeyUp}
            />
          </div>
          <RouterLink to={availablePages.SIGN_IN.path} className={classes.btnSignIn}>
            <Button variant="outlined" color="primary">ĐĂNG NHẬP</Button>
          </RouterLink>
          <RouterLink to={availablePages.SIGN_UP.path}>
            <Button variant="contained" color="primary" className={classes.btnSignUp}>ĐĂNG KÝ</Button>
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
