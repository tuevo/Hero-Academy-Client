import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton, Tooltip } from '@material-ui/core';
import { availablePages } from 'constants/global.constant';
import { SearchInput } from 'components';
import { useHistory } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'recompose';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { switchDarkMode } from 'redux/actions/app.action';
import { localStorageItems } from 'constants/local-storage.constant';
import * as _ from 'lodash';
import { signOut } from 'redux/actions/user.action';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import AccountMenu from 'components/AccountMenu/AccountMenu';

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
    color: theme.palette.primary.dark,
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
    marginRight: theme.spacing(2)
  },
  btnBrightness: {
    color: theme.palette.icon
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [openSignOutConfirmDialog, setOpenSignOutConfirmDialog] = useState(false);

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

  const handleClickAccountMenuItem = (index) => {
    switch (index) {
      case 1:
        const firstPage = _.find(availablePages, page => page.auth && page.role === userState.authUser.role);
        history.push(firstPage.path);
        break;

      case 2:
        setOpenSignOutConfirmDialog(true);
        break;

      default:
        break;
    }
  }

  const handleCloseSignOutConfirmDialog = (accepted) => {
    setOpenSignOutConfirmDialog(false);
    if (accepted) {
      localStorage.removeItem(localStorageItems.ACCESS_TOKEN.name);
      localStorage.removeItem(localStorageItems.AUTH_USER.name);
      dispatch(signOut());
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
          {userState.authUser && <AccountMenu authUser={userState.authUser} onClickItem={handleClickAccountMenuItem} />}
          <Grid item>
            <Tooltip title={appState.darkMode ? 'Bật chế độ sáng' : 'Bật chế độ tối'}>
              <IconButton onClick={() => dispatch(switchDarkMode())} className={classes.btnBrightness}>
                {appState.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <ConfirmDialog
        title="Xác nhận"
        content="Bạn thật sự muốn đăng xuất?"
        open={openSignOutConfirmDialog}
        onClose={handleCloseSignOutConfirmDialog}
      />
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
