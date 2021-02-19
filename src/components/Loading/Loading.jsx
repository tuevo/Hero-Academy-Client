import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { APP_LOGO_IMAGE } from 'constants/global.constant';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  },
  logoImage: {
    width: '4.5rem',
    height: '4.5rem',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))',
    position: 'absolute',
    top: '49.5%',
    left: '50%',
    transform: 'translate(-50%,-49.5%)'
  },
  wave: {
    position: 'absolute',
    width: '100%',
    bottom: '-1rem'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
}));

const Loading = (props) => {
  const { open } = props;
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <img
        alt="Logo"
        src={APP_LOGO_IMAGE}
        className={classes.logoImage}
      />
      <div className={classes.progress}>
        <CircularProgress color="inherit" size={100} thickness={1} />
      </div>
      {/* <div className={classes.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="url(#my-cool-gradient)" fillOpacity={1} d="M0,224L40,234.7C80,245,160,267,240,240C320,213,400,139,480,133.3C560,128,640,192,720,218.7C800,245,880,235,960,202.7C1040,171,1120,117,1200,90.7C1280,64,1360,64,1400,64L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
          <linearGradient id="my-cool-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor="#a4508b" />
            <stop offset="100%" stopColor="#5f0a87" />
          </linearGradient>
        </svg>
      </div> */}
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool
}

export default Loading;