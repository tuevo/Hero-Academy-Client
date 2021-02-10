import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { availablePages } from 'constants/global.constant';
import { setCourseSearchingQuery } from 'redux/actions/app.action';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'recompose';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '3.125rem',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    width: '18.75rem',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.searchInput
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.icon
  },
  input: {
    flexGrow: 1,
    fontSize: '0.875rem',
    lineHeight: '1rem',
    letterSpacing: '-0.05px'
  }
}));

const SearchInput = props => {
  const { className, style, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const appState = useSelector(states => ({
    ...states.app
  }), shallowEqual);

  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(appState.courseSearchingQuery);
  }, [appState.courseSearchingQuery]);

  const handleChange = e => {
    setQuery(e.target.value);
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      if (query) {
        history.push(`${availablePages.COURSE_SEARCHING.path}?q=${query}`);
      } else {
        history.push(`${availablePages.COURSE_SEARCHING.path}`);
      }
      dispatch(setCourseSearchingQuery(query));
    }
  }

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        value={query || ''}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Tìm kiếm khóa học"
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
