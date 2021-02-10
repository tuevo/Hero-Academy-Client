import { Box, Button, Divider, GridList, GridListTile, Typography, Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Course from 'components/Course/Course';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'recompose';
import { apiMessage } from 'constants/api-message.constant';
import { showNotification } from 'redux/actions/app.action';
import { courseApi } from 'api';
import { availablePages } from 'constants/global.constant';
import { setScrollbarTop } from 'redux/actions/page.action';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 10),
    "backgroundColor": "#280738",
    "backgroundImage": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23341048' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23411959' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%234e226b' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%235c2b7d' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%236a358f' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23773ba4' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%238440ba' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%239146d1' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%239e4ce8' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ab52ff' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E\")",
    "backgroundAttachment": "fixed",
    "backgroundSize": "cover"
  },
  courses: {
    ...theme.palette.card,
    borderRadius: '1.5rem',
    "boxShadow": "rgba(0, 0, 0, 0.4) 0px 1.875rem 5.625rem",
    animationDuration: '0.75s'
  },
  btnLoadMoreCourse: {
    marginTop: theme.spacing(2),
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '12.5rem',
  },
  sencondaryText: {
    color: theme.palette.text.secondary
  },
  divider: {
    backgroundColor: theme.palette.border.color
  },
  input: {
    ...theme.palette.input
  },
  icon: {
    color: theme.palette.icon
  }
}));

const CourseSearching = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 8;
  const courseListFilterCriterias = [
    {
      text: 'Điểm đánh giá giảm dần',
      values: [false, 'averageRating']
    },
    {
      text: 'Điểm đánh giá tăng dần',
      values: [true, 'averageRating']
    },
    {
      text: 'Giá tăng dần',
      values: [true, 'tuition']
    },
    {
      text: 'Giá giảm dần',
      values: [false, 'tuition']
    }
  ]

  const appState = useSelector(states => ({
    ...states.app
  }), shallowEqual);

  const [courseList, setCourseList] = useState([]);
  const [courseListPage, setCourseListPage] = useState(1);
  const [courseListTotalItems, setCourseListTotalItems] = useState(0);
  const [btnLoadMoreCourseDisabled, setBtnLoadMoreCourseDisabled] = useState(false);
  const [courseListFilterCriteriaIndex, setCourseListFilterCriteriaIndex] = useState(0);

  const getAllCourses = async (page) => {
    setBtnLoadMoreCourseDisabled(true);
    try {
      const res = await courseApi.getAll(
        page,
        limit,
        appState.courseSearchingQuery,
        courseListFilterCriterias[courseListFilterCriteriaIndex].values[0],
        courseListFilterCriterias[courseListFilterCriteriaIndex].values[1],
      );
      const { totalItems } = res.data.meta;
      const { entries } = res.data;

      let newCourseList = [];
      if (page === 1) {
        newCourseList = entries;
      } else {
        newCourseList = courseList.concat(entries);
      }

      for (let c of newCourseList)
        c.href = `${availablePages.COURSE_DETAILS.path.replace(':courseId', c._id)}`;

      setCourseList(newCourseList);

      if (newCourseList.length < totalItems) {
        setBtnLoadMoreCourseDisabled(false);
      }

      setCourseList(newCourseList);
      setCourseListTotalItems(totalItems);

    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  useEffect(() => {
    if (courseListPage !== 1) {
      getAllCourses(courseListPage);
    }
  }, [courseListPage]);

  useEffect(() => {
    getAllCourses(1);
    setCourseListPage(1);
    dispatch(setScrollbarTop(0));
  }, [appState.courseSearchingQuery, courseListFilterCriteriaIndex]);

  const handleChange = (event) => {
    setCourseListFilterCriteriaIndex(event.target.value);
  };

  const handleClickBtnLoadMoreCourse = () => {
    setCourseListPage(courseListPage + 1);
  }

  return (
    <div className={classes.root}>
      <Box p={4} className={classes.courses}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" className={classes.sencondaryText} gutterBottom>
              {appState.courseSearchingQuery ? (
                <span><b>Từ khóa "{appState.courseSearchingQuery}"</b></span>
              ) : (
                  <span><b>Tất cả khóa học</b></span>
                )}
            </Typography>
            <Typography variant="body1">
              {appState.courseSearchingQuery ? (
                <span>Có <b><NumberFormat value={courseListTotalItems} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></b> khóa học liên quan</span>
              ) : (
                  <span>Tổng cộng <b><NumberFormat value={courseListTotalItems} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></b> khóa học</span>
                )}
            </Typography>
          </Box>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Lọc khóa học theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={courseListFilterCriteriaIndex}
              onChange={handleChange}
              className={classes.input}
              inputProps={{
                classes: {
                  icon: classes.icon
                }
              }}
            >
              {courseListFilterCriterias.map((c, i) => (
                <MenuItem key={i} value={i}>{c.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={3} mb={2} >
          <Divider className={classes.divider} />
        </Box>
        <Box ml={-2}>
          <GridList cellHeight="auto" cols={4}>
            {courseList.map((c, i) => (
              <GridListTile key={c._id}>
                <Box p={2} className="animate__animated animate__zoomIn" style={{ animationDelay: `${0.1 * i}s` }}>
                  <Course data={c} type="minimal" />
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </Box>
        <Button
          fullWidth
          className={classes.btnLoadMoreCourse}
          variant="contained"
          color="primary"
          size="large"
          disabled={btnLoadMoreCourseDisabled}
          onClick={handleClickBtnLoadMoreCourse}
        >
          Xem thêm khóa học
        </Button>
      </Box>
    </div >
  );
};

export default CourseSearching;