import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { availablePages } from 'constants/global.constant';
import * as _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'recompose';
import { setPageBasics, setScrollbarTop } from 'redux/actions/page.action';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 14.5)
  },
  title: {
    color: theme.palette.primary.contrastText
  },
  content: {
    ...theme.palette.card,
    position: 'relative',
    width: '100%',
    borderRadius: '1.5rem'
  }
}));

export default function Content({ inner }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ps = useRef();

  const pageState = useSelector(state => ({
    ...state.page
  }), shallowEqual);

  if (!pageState.basics) {
    const { pathname } = window.location;
    const page = _.find(availablePages, page => page.path === pathname);
    dispatch(setPageBasics(page));
  }


  useEffect(() => {
    if (ps.current) {
      ps.current.scrollTop = pageState.scrollbarTop;
    }
  }, [pageState.scrollbarTop])

  const handleScrollY = e => {
    dispatch(setScrollbarTop(e.scrollTop))
  }

  return (
    pageState.basics && (
      <div>
        <PerfectScrollbar
          className={classes.root}
          onScrollY={handleScrollY}
          containerRef={el => (ps.current = el)}
        >
          <Box pl={2} pb={4} className={classes.title}>
            <Typography variant="h3" color="inherit"><b>{pageState.basics.title}</b></Typography>
          </Box>
          <Box display="flex" justifyContent="center" className={`${classes.content}`}>
            {inner}
          </Box>
        </PerfectScrollbar>
      </div>
    )
  )
}
