import React from 'react';
import { Backdrop, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  },
  logoImage: {
    width: '4rem',
    height: '4rem',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
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
        src="https://cdn.iconscout.com/icon/free/png-256/graduation-cap-1519981-1287612.png"
        className={classes.logoImage}
      />
      <div className={classes.progress}>
        <CircularProgress color="inherit" size={100} thickness={1} />
      </div>
      <div className={classes.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="url(#my-cool-gradient)" fillOpacity={1} d="M0,64L48,106.7C96,149,192,235,288,272C384,309,480,299,576,277.3C672,256,768,224,864,197.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <linearGradient id="my-cool-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor="#a4508b" />
            <stop offset="100%" stopColor="#5f0a87" />
          </linearGradient>
        </svg>
      </div>
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool
}

export default Loading;