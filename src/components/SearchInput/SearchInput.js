import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '1.5rem',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    width: '25rem'
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  input: {
    flexGrow: 1,
    fontSize: '0.875rem',
    lineHeight: '1rem',
    letterSpacing: '-0.05px'
  }
}));

const SearchInput = props => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

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
        onChange={onChange}
        placeholder="Tìm kiếm khóa học"
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
