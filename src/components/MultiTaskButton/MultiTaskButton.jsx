import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: '1.5% !important',
    transition: '.35s ease all',
    zIndex: 100,
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  up: {
    bottom: '14% !important',
  },
  down: {
    bottom: '4% !important',
  }
}));

export default function MultiTaskButton({ position, actions }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickAction = action => {
    handleClose();
    history.push(action.path);
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={`${classes.root} animate__animated animate__bounceIn ${classes[position]}`}
      icon={<AppsIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={'up'}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action._id}
          icon={<action.icon />}
          tooltipTitle={action.title}
          onClick={() => handleClickAction(action)}
        />
      ))}
    </SpeedDial>
  );
}