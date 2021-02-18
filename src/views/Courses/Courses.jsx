import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { courseApi } from 'api';
import Course from 'components/Course/Course';
import { apiMessage } from 'constants/api-message.constant';
import { availablePages } from 'constants/global.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import CourseListLoading from 'components/CourseListLoading/CourseListLoading';
import CourseListEmpty from 'components/CourseListEmpty/CourseListEmpty';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4),
    width: '100%'
  },
  btnLoadMoreCourse: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

const Courses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 8;

  const [courseList, setCourseList] = useState([]);
  const [courseListPage, setCourseListPage] = useState(1);
  const [courseListLoading, setCourseListLoading] = useState(true);

  const [disableBtnLoadMoreCourse, setDisableBtnLoadMoreCourse] = useState(false)

  useEffect(() => {
    const getAllCourses = async () => {
      setDisableBtnLoadMoreCourse(true);
      try {
        const res = await courseApi.getAll(courseListPage, limit);
        const courses = res.data.entries.map(item => ({
          ...item,
          href: availablePages.COURSE_DETAILS.path.replace(':courseId', item._id)
        }));

        const newCourseList = courseList.concat(courses);
        setCourseList(newCourseList);

        if (newCourseList.length < res.data.meta.totalItems) {
          setDisableBtnLoadMoreCourse(false);
        }

        setCourseListLoading(false);
      } catch (error) {
        if (error.messages && error.messages.length > 0) {
          dispatch(showNotification('error', apiMessage[error.messages[0]]));
          setCourseListLoading(false);
        }
      }
    }

    getAllCourses();
  }, [courseListPage]);

  const handleClickBtnLoadMoreCourse = () => {
    const newPage = courseListPage + 1;
    setCourseListPage(newPage);
  }

  return (
    <div className={classes.root}>
      {courseListLoading && <CourseListLoading />}
      {!courseListLoading && courseList.length === 0 && <CourseListEmpty />}
      {!courseListLoading && courseList.length > 0 && (
        <div>
          <Box display="flex" flexWrap="wrap" m={-1}>
            {courseList.map((c, i) => (
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
      )}
    </div >
  );
};

export default Courses;
