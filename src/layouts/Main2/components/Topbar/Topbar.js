import { AppBar, Box, Button, Grid, Hidden, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { SearchInput } from 'components';
import AccountMenu from 'components/AccountMenu/AccountMenu';
import { availablePages } from 'constants/global.constant';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { shallowEqual } from 'recompose';
import { switchDarkMode } from 'redux/actions/app.action';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.palette.topbar
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    minWidth: '12.5rem'
  },
  logoImage: {
    width: '2.8125rem'
  },
  logoTitle: {
    color: theme.palette.text.topbar,
    marginLeft: theme.spacing(0.5),
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 'bold',
  },
  btnSignIn: {
  },
  btnSignUp: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  searchInput: {
  },
  btnBrightness: {
    color: theme.palette.icon
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const appState = useSelector(state => ({
    ...state.app
  }), shallowEqual);

  const userState = useSelector(state => ({
    ...state.user
  }));

  const dispatch = useDispatch();

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
          <Box display="flex" alignItems="center" className={classes.logo}>
            <img
              alt="Logo"
              src="images/logos/logo.png"
              className={classes.logoImage}
            />
            <Typography variant="h5" className={classes.logoTitle}>Hero Academy</Typography>
          </Box>
        </RouterLink>
        <Grid container justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <div className={classes.searchInput}>
              <SearchInput
                onChange={handleSearchInputChange}
                onKeyUp={handleSearchInputKeyUp}
              />
            </div>
          </Grid>
          {!userState.authUser && (
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <div className="animate__animated animate__fadeIn">
                    <RouterLink to={availablePages.SIGN_IN.path} className={classes.btnSignIn}>
                      <Button variant="outlined" color="primary">ĐĂNG NHẬP</Button>
                    </RouterLink>
                  </div>
                </Grid>
                <Grid item>
                  <div className="animate__animated animate__fadeIn">
                    <RouterLink to={availablePages.SIGN_UP.path}>
                      <Button variant="contained" color="primary" className={classes.btnSignUp}>ĐĂNG KÝ</Button>
                    </RouterLink>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}
          {userState.authUser && <AccountMenu authUser={userState.authUser} />}
          <Grid item>
            <Tooltip title={appState.darkMode ? 'Bật chế độ sáng' : 'Bật chế độ tối'}>
              <IconButton onClick={() => dispatch(switchDarkMode())} className={classes.btnBrightness}>
                {appState.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

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
