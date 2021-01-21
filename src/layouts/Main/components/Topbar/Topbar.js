import { AppBar, Box, Hidden, IconButton, Toolbar, Typography, Grid, Tooltip } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { availablePages } from 'constants/global.constant';
import { localStorageItems } from 'constants/local-storage.constant';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'recompose';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { switchDarkMode } from 'redux/actions/app.action';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.palette.topbar
  },
  flexGrow: {
    flexGrow: 1
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
    color: theme.palette.primary.dark,
    marginLeft: theme.spacing(0.5),
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 'bold',
  },
  btnBrightness: {
    color: theme.palette.icon
  },
  signOutButton: {
    color: theme.palette.icon
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, history } = props;

  const classes = useStyles();

  const appState = useSelector(state => ({
    ...state.app
  }), shallowEqual);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearchInputKeyUp = (e) => {
    if (e.keyCode === 13 && searchTerm) {
      history.push(availablePages.COURSE_SEARCHING.path);
    }
  }

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
          <Box display="flex" alignItems="center" className={classes.logo}>
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
          <Grid container justify="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <div className={classes.searchInput}>
                <SearchInput
                  onChange={handleSearchInputChange}
                  onKeyUp={handleSearchInputKeyUp}
                />
              </div>
            </Grid>
            <Grid item>
              <Tooltip title={appState.darkMode ? 'Bật chế độ sáng' : 'Bật chế độ tối'}>
                <IconButton onClick={() => dispatch(switchDarkMode())} className={classes.btnBrightness}>
                  {appState.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Đăng xuất">
                <IconButton
                  className={classes.signOutButton}
                  color="inherit"
                  onClick={handleSignOut}
                >
                  <InputIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
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
    </AppBar >
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
