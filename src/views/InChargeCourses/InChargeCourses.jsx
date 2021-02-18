import { Box, Button, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import { lecturerApi } from 'api';
import Course from 'components/Course/Course';
import { apiMessage } from 'constants/api-message.constant';
import { availablePages } from 'constants/global.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import { setScrollbarTop } from 'redux/actions/page.action';
import AddCourse from './components/AddCourse/AddCourse';
import CourseListLoading from 'components/CourseListLoading/CourseListLoading';
import CourseListEmpty from 'components/CourseListEmpty/CourseListEmpty';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 5,
    padding: theme.spacing(4),
    width: '100%'
  },
  btnAddCourse: {
    position: 'absolute',
    zIndex: 10,
    right: '5%',
    top: '-1.5625rem',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  btnLoadMoreCourse: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

const InChargeCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 8;

  const [openAddCouse, setOpenAddCourse] = useState(false);

  const [lecturerCourseList, setLecturerCourseList] = useState([]);
  const [lecturerCourseListPage, setLecturerCourseListPage] = useState(1);
  const [lecturerCourseListLoading, setLecturerCourseListLoading] = useState(true);

  const [disableBtnLoadMoreCourse, setDisableBtnLoadMoreCourse] = useState(false);

  const getAllLecturerCourses = async (page) => {
    setDisableBtnLoadMoreCourse(true);
    try {
      const res = await lecturerApi.getCourses(page, limit);
      const lecturerCourses = res.data.entries.map(item => ({
        ...item,
        href: availablePages.COURSE_DETAILS.path.replace(':courseId', item._id)
      }));

      const newLecturerCourseList = page === 1 ? lecturerCourses : lecturerCourseList.concat(lecturerCourses);
      setLecturerCourseList(newLecturerCourseList);

      if (newLecturerCourseList.length < res.data.meta.totalItems) {
        setDisableBtnLoadMoreCourse(false);
      }

      setLecturerCourseListLoading(false);
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
        setLecturerCourseListLoading(false);
      }
    }
  }

  const toggleAddCourse = (event, open, message) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (message === apiMessage.COURSE_ADDED_SUCCESSFULLY) {
      setLecturerCourseListPage(1);
      getAllLecturerCourses(1);
      dispatch(setScrollbarTop(0));
    }

    setOpenAddCourse(open);
  };

  useEffect(() => {
    getAllLecturerCourses(lecturerCourseListPage);
  }, [lecturerCourseListPage]);

  const handleClickBtnLoadMoreCourse = () => {
    const newPage = lecturerCourseListPage + 1;
    setLecturerCourseListPage(newPage);
  }

  return (
    <div className={classes.root}>
      {lecturerCourseListLoading && <CourseListLoading />}
      {!lecturerCourseListLoading && lecturerCourseList.length === 0 && <CourseListEmpty />}
      {!lecturerCourseListLoading && lecturerCourseList.length > 0 && (
        <div>
          <AddCourse
            open={openAddCouse}
            onClose={(e, message) => toggleAddCourse(e, false, message)}
          />
          <Tooltip title="Tạo khóa học mới" className="animate__animated animate__bounceIn">
            <Fab size="large" color="primary" aria-label="add" className={classes.btnAddCourse} onClick={(e) => toggleAddCourse(e, true)}>
              <AddIcon fontSize="large" />
            </Fab>
          </Tooltip>
          <Box display="flex" flexWrap="wrap" m={-1} pt={2}>
            {lecturerCourseList.map((c, i) => (
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
    </div>
  );
};

export default InChargeCourses;