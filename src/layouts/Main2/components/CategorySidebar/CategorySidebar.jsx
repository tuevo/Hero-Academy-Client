import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import CategorySidebarNav from './CategorySidebarNav/CategorySidebarNav';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

  const categoryClusters = [
    {
      _id: '1',
      name: 'Công nghệ thông tin',
      categories: [
        {
          _id: '1.1',
          name: 'Lập trình web',
          href: '/categories/1.1/courses'
        },
        {
          _id: '1.2',
          name: 'Lập trình di động',
          href: '/categories/1.1/courses'
        },
        {
          _id: '1.3',
          name: 'Lập trình game',
          href: '/categories/1.1/courses'
        }
      ]
    },
    {
      _id: '2',
      name: 'Thiết kế',
      categories: [
        {
          _id: '2.1',
          name: 'Đồ họa',
          href: '/categories/1.1/courses'
        },
        {
          _id: '2.2',
          name: 'Nội thất',
          href: '/categories/1.1/courses'
        },
        {
          _id: '2.3',
          name: 'Thời trang',
          href: '/categories/1.1/courses'
        }
      ]
    },
    {
      _id: '3',
      name: 'Quản trị kinh doanh',
      categories: [
        {
          _id: '3.1',
          name: 'Lập trình web',
          href: '/categories/1.1/courses'
        },
        {
          _id: '3.2',
          name: 'Lập trình di động',
          href: '/categories/1.1/courses'
        },
        {
          _id: '3.3',
          name: 'Lập trình game',
          href: '/categories/1.1/courses'
        }
      ]
    },
    {
      _id: '4',
      name: 'Digital Marketing',
      categories: [
        {
          _id: '4.1',
          name: 'Lập trình web',
          href: '/categories/1.1/courses'
        },
        {
          _id: '4.2',
          name: 'Lập trình di động',
          href: '/categories/1.1/courses'
        },
        {
          _id: '4.3',
          name: 'Lập trình game',
          href: '/categories/1.1/courses'
        }
      ]
    },
    {
      _id: '5',
      name: 'Ngoại ngữ',
      categories: [
        {
          _id: '5.1',
          name: 'Tiếng Anh',
          href: '/categories/1.1/courses'
        },
        {
          _id: '5.2',
          name: 'Tiếng Trung',
          href: '/categories/1.1/courses'
        },
        {
          _id: '5.3',
          name: 'Tiếng Nhật',
          href: '/categories/1.1/courses'
        },
        {
          _id: '5.4',
          name: 'Tiếng Pháp',
          href: '/categories/1.1/courses'
        }
      ]
    },
  ];

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
          categoryClusters={categoryClusters}
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