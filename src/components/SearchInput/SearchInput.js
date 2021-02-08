import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { availablePages } from 'constants/global.constant';

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
  const query = new URLSearchParams(useLocation().search);

  const [term, setTerm] = useState(query.get('q') || '');

  const handleChange = e => {
    setTerm(e.target.value);
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      history.push(`${availablePages.COURSE_SEARCHING.path}?q=${term}`);
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
        value={term}
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
