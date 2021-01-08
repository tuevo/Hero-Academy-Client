import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CategorySidebar, Topbar } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '3.5rem',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '4rem'
    }
  },
  shiftContent: {
    paddingLeft: '15.9375rem',
  },
  content: {
    height: '500vh'
  }
}));

const Main2 = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <CategorySidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

Main2.propTypes = {
  children: PropTypes.node
};

export default Main2;