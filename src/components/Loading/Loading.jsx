import React from 'react';
import { Backdrop, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  logoImage: {
    width: '6.25rem',
    height: '6.25rem',
    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))'
  }
}));

const Loading = (props) => {
  const { open } = props;
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" mb={2}>
          <img
            alt="Logo"
            src="https://icons-for-free.com/iconfiles/png/128/hero+marvel+character+super+hero+icon-1320166754459520952.png"
            className={classes.logoImage}
          />
        </Box>
        <CircularProgress color="inherit" size={24} />
      </Box>
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool
}

export default Loading;