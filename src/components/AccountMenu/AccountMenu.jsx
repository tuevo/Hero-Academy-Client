import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Popover, Box, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { userRole } from 'constants/user-role.constant';
import * as _ from 'lodash';
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { availablePages } from 'constants/global.constant';
import { localStorageItems } from 'constants/local-storage.constant';
import { useDispatch } from 'react-redux';
import { signOut } from 'redux/actions/user.action';

const useStyles = makeStyles((theme) => ({
  account: {
    textTransform: 'none',
    borderRadius: '3.125rem'
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  list__icon: {
    minWidth: 35,
    color: theme.palette.icon
  }
}));

function AccountMenu({ authUser }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickListItem = index => {
    switch (index) {
      case 1:
        const firstPage = _.find(availablePages, page => page.auth && page.role === authUser.role);
        history.push(firstPage.path);
        break;

      case 2:
        localStorage.removeItem(localStorageItems.ACCESS_TOKEN.name);
        localStorage.removeItem(localStorageItems.AUTH_USER.name);
        dispatch(signOut());
        break;

      default:
        break;
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} className={classes.account}>
        <Box display="flex" alignItems="center" mx={2}>
          <Avatar src={authUser.avatarUrl} />
          <Box ml={1.5} display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h5" style={{ textAlign: 'left' }}><b>{authUser.fullName}</b></Typography>
            <Typography variant="body2" style={{ textAlign: 'left' }}>{_.find(userRole, role => role.value === authUser.role).name}</Typography>
          </Box>
        </Box>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.list}
        >
          <ListItem button onClick={() => handleClickListItem(1)}>
            <ListItemIcon className={classes.list__icon}>
              <AppsIcon color="inherit" />
            </ListItemIcon>
            <ListItemText primary="Bảng điều khiển" />
          </ListItem>
          <ListItem button onClick={() => handleClickListItem(2)}>
            <ListItemIcon className={classes.list__icon}>
              <ExitToAppIcon color="inherit" />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      </Popover>
    </div >

  )
}

export default React.memo(AccountMenu);
