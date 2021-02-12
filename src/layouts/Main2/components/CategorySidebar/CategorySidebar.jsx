import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import CategorySidebarNav from './CategorySidebarNav/CategorySidebarNav';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import { apiMessage } from 'constants/api-message.constant';
import { categoryClusterApi } from 'api';
import { availablePages } from 'constants/global.constant';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '15rem',
    [theme.breakpoints.up('lg')]: {
      marginTop: '4rem',
      height: 'calc(100% - 4rem)'
    },
    border: 0,
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
    boxShadow: theme.palette.sidebar.boxShadow
  },
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    paddingRight: 0,
  },
  darkCover: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '15rem',
    height: '100vh',
    background: theme.palette.sidebar.background,
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  title: {
    color: theme.palette.text.secondary
  },
}));

const CategorySidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [categoryClusterList, setCategoryClusterList] = useState([]);

  useEffect(() => {
    const getAllCategoryClusters = async () => {
      try {
        const res = await categoryClusterApi.getAll();
        const newCategoryClusterList = res.data.entries.map(cc => ({
          ...cc,
          categories: cc.categories.map(c => ({ ...c, href: availablePages.CATEGORY_COURSES.path.replace(':categoryId', c._id) }))
        }));
        setCategoryClusterList(newCategoryClusterList);
      } catch (error) {
        if (error.messages && error.messages.length > 0) {
          dispatch(showNotification('error', apiMessage[error.messages[0]]));
        }
      }
    }
    getAllCategoryClusters();
  }, []);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <PerfectScrollbar
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.darkCover}></div>
        <CategorySidebarNav
          className={classes.nav}
          categoryClusters={categoryClusterList}
        />
      </PerfectScrollbar>
    </Drawer>
  );
};

CategorySidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default CategorySidebar;