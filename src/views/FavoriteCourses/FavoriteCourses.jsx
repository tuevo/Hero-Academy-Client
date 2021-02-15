import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { favoriteApi } from 'api';
import Course from 'components/Course/Course';
import { apiMessage } from 'constants/api-message.constant';
import { availablePages } from 'constants/global.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4),
    minHeight: '33rem',
    width: '100%'
  },
  btnLoadMoreCourse: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

const FavoriteCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 8;

  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteListPage, setFavoriteListPage] = useState(1);

  const [disableBtnLoadMoreCourse, setDisableBtnLoadMoreCourse] = useState(false);

  useEffect(() => {
    const getAllFavorites = async () => {
      setDisableBtnLoadMoreCourse(true);
      try {
        const res = await favoriteApi.getAll(favoriteListPage, limit);
        const courses = res.data.entries.map(item => ({
          ...item.course,
          href: availablePages.COURSE_DETAILS.path.replace(':courseId', item.course._id)
        }));

        const newCourseList = favoriteList.concat(courses);
        setFavoriteList(newCourseList);

        if (newCourseList.length < res.data.meta.totalItems) {
          setDisableBtnLoadMoreCourse(false);
        }
      } catch (error) {
        if (error.messages && error.messages.length > 0) {
          dispatch(showNotification('error', apiMessage[error.messages[0]]));
        }
      }
    }

    getAllFavorites();
  }, [favoriteListPage])

  const handleClickBtnLoadMoreCourse = () => {
    const newPage = favoriteListPage + 1;
    setFavoriteListPage(newPage);
  }

  return (
    <div className={classes.root}>
      <Box display="flex" flexWrap="wrap" m={-1}>
        {favoriteList.map((c, i) => (
          <Box key={c._id} m={1} className="animate__animated animate__zoomIn" style={{ animationDelay: `${0.1 * i}s` }}>
            <Course data={c} type="minimal" />
          </Box>
        ))}
      </Box>
      <Box mt={2}>
        <Button
          fullWidth
          className={classes.btnLoadMoreCourse}
          variant="contained"
          size="large"
          color="primary"
          onClick={handleClickBtnLoadMoreCourse}
          disabled={disableBtnLoadMoreCourse}
        >
          Xem thêm khóa học
          </Button>
      </Box>
    </div>
  );
};

export default FavoriteCourses;
