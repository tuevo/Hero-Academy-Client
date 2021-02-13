import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, GridList, GridListTile, Tooltip, Fab } from '@material-ui/core';
import Course from 'components/Course/Course';
import AddIcon from '@material-ui/icons/Add';
import AddCourse from './components/AddCourse/AddCourse';
import { useState } from 'react';
import { lecturerApi } from 'api';
import { apiMessage } from 'constants/api-message.constant';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import { availablePages } from 'constants/global.constant';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 5,
    padding: theme.spacing(4),
    minHeight: '33rem',
    width: '100%'
  },
  btnAddCourse: {
    position: 'absolute',
    zIndex: 10,
    right: '5%',
    top: '-3%',
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
  const [lecturerCourseListPage, setlecturerCourseListPage] = useState(1);

  const [disableBtnLoadMoreCourse, setDisableBtnLoadMoreCourse] = useState(false);

  const toggleAddCourse = (event, open) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenAddCourse(open);
  };

  useEffect(() => {
    const getAllLecturerCourses = async () => {
      setDisableBtnLoadMoreCourse(true);
      try {
        const res = await lecturerApi.getCourses(lecturerCourseListPage, limit);
        const lecturerCourses = res.data.entries.map(item => ({
          ...item,
          href: availablePages.COURSE_DETAILS.path.replace(':courseId', item._id)
        }));

        const newLecturerCourseList = lecturerCourseList.concat(lecturerCourses);
        setLecturerCourseList(newLecturerCourseList);

        if (newLecturerCourseList.length < res.data.meta.totalItems) {
          setDisableBtnLoadMoreCourse(false);
        }
      } catch (error) {
        if (error.messages && error.messages.length > 0) {
          dispatch(showNotification('error', apiMessage[error.messages[0]]));
        }
      }
    }

    getAllLecturerCourses();

  }, [lecturerCourseListPage]);

  const handleClickBtnLoadMoreCourse = () => {
    const newPage = lecturerCourseListPage + 1;
    setlecturerCourseListPage(newPage);
  }

  return (
    <div className={classes.root}>
      <AddCourse open={openAddCouse} onClose={(e) => toggleAddCourse(e, false)} />
      <Tooltip title="Tạo khóa học mới" className="animate__animated animate__bounceIn">
        <Fab size="large" color="primary" aria-label="add" className={classes.btnAddCourse} onClick={(e) => toggleAddCourse(e, true)}>
          <AddIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Box display="flex" justifyContent="center">
        <GridList cellHeight="auto" cols={4}>
          {lecturerCourseList.map((c, i) => (
            <GridListTile key={c._id}>
              <Box p={2} className="animate__animated animate__zoomIn" style={{ animationDelay: `${0.1 * i}s` }}>
                <Course data={c} type="minimal" />
              </Box>
            </GridListTile>
          ))}
        </GridList>
      </Box>
      <Box p={2}>
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
    </div >
  );
};

export default InChargeCourses;