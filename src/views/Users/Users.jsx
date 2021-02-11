import { AppBar, Box, Button, Fab, GridList, GridListTile, Tab, Tabs, Tooltip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/styles';
import Lecturer from 'components/Lecturer/Lecturer';
import Student from 'components/Student/Student';
import { apiMessage } from 'constants/api-message.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import { studentApi } from 'api';
import NumberFormat from 'react-number-format';
import AddLecturer from './components/AddLecturer/AddLecturer';
import lecturerApi from 'api/lecturer.api';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '35rem',
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme.palette.card.borderRadius
  },
  tabs: {
    boxShadow: 'none',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  btnAddLecturerContainer: {
    position: 'absolute',
    zIndex: 10,
    right: '5%',
    top: '-5%'
  },
  btnAddLecturer: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  btnLoadMore: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 3;

  const [tabValue, setTabValue] = useState(0);

  const [studentList, setStudentList] = useState([]);
  const [studentListPage, setStudentListPage] = useState(1);
  const [studentListTotalItems, setStudentListTotalItems] = useState(0);
  const [disableBtnLoadMoreStudent, setDisableBtnLoadMoreStudent] = useState(false);

  const [lecturerList, setLecturerList] = useState([]);
  const [lecturerListPage, setLecturerListPage] = useState(1);
  const [lecturerListTotalItems, setLecturerListTotalItems] = useState(0);
  const [disableBtnLoadMoreLecturer, setDisableBtnLoadMoreLecturer] = useState(false);

  const [openAddLecturer, setOpenAddLecturer] = useState(false);

  const getAllStudents = async (page) => {
    setDisableBtnLoadMoreStudent(true);
    try {
      const res = await studentApi.getAll(page, limit);
      const students = res.data.entries;

      const { totalItems } = res.data.meta;
      setStudentListTotalItems(totalItems);

      let newStudentList = [];

      if(page === 1){
        newStudentList = students
      }
      else{
        newStudentList = studentList.concat(students);
      }

      setStudentList(newStudentList);

      if (newStudentList.length < totalItems) {
        setDisableBtnLoadMoreStudent(false);
      }

    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  };

  const getAllLecturers = async (page) => {
    setDisableBtnLoadMoreLecturer(true);
    try {
      const res = await lecturerApi.getAll(page, limit);
      const lecturers = res.data.entries;

      const { totalItems } = res.data.meta;
      setLecturerListTotalItems(totalItems);

      let newLecturerList = [];

      if(page === 1){
        newLecturerList = lecturers;
      }
      else{
        newLecturerList = lecturerList.concat(lecturers);
      }

      setLecturerList(newLecturerList);

      if (newLecturerList.length < totalItems) {
        setDisableBtnLoadMoreLecturer(false);
      }

    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  };

  useEffect(() => {
    getAllStudents(studentListPage);
  }, [studentListPage]);

  useEffect(() => {
    getAllLecturers(lecturerListPage);
  }, [lecturerListPage]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClickBtnLoadMore = (type) => {
    switch (type) {
      case 1:
        const newPage = studentListPage + 1;
        setStudentListPage(newPage);
        break;
      case 2:
        const newLecturerPage = lecturerListPage + 1;
        setLecturerListPage(newLecturerPage);
        break;

      default:
        break;
    }
  }

  const handleClickBtnAddLecturer = () => {
    setOpenAddLecturer(true);
  }

  const handleCloseAddLecturer = (accepted, data) => {
    setOpenAddLecturer(false);

    if (accepted) {
      console.log(data);
    }
  }

  const handleRemoveUser = (type, userId) => {
    switch (type) {
      case 1:
        setStudentListPage(1);
        getAllStudents(1);
        break;
      case 2:
        setLecturerListPage(1);
        getAllLecturers(1);
        break;

      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.tabs} color="primary">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab
            icon={<PersonIcon />}
            label={
              <span>
                Học viên (<NumberFormat value={studentListTotalItems} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />)
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={<FaceIcon />}
            label={
              <span>
                Giảng viên (<NumberFormat value={lecturerListTotalItems} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />)
              </span>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>

      {tabValue === 0 && (
        <Box p={4}>
          <GridList cellHeight="auto" cols={3}>
            {studentList.map((s, i) => (
              <GridListTile key={s._id}>
                <Box m={1} className="animate__animated animate__fadeIn" style={{ animationDelay: `${0.1 * i}s` }}>
                  <Student
                    data={s}
                    onRemove={(studentId) => handleRemoveUser(1, studentId)}
                  />
                </Box>
              </GridListTile>
            ))}
          </GridList>
          <Box px={1} pt={3}>
            <Button
              fullWidth
              className={classes.btnLoadMore}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleClickBtnLoadMore(1)}
              disabled={disableBtnLoadMoreStudent}
            >
              Xem thêm học viên
            </Button>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box p={4} position="relative">
          <AddLecturer open={openAddLecturer} onClose={handleCloseAddLecturer} />
          <Box className={`${classes.btnAddLecturerContainer} animate__animated animate__bounceIn`}>
            <Tooltip title="Thêm giảng viên mới">
              <Fab size="large" color="primary" aria-label="add" className={classes.btnAddLecturer} onClick={handleClickBtnAddLecturer}>
                <PersonAddIcon fontSize="large" />
              </Fab>
            </Tooltip>
          </Box>
          <GridList cellHeight="auto" cols={3}>
            {lecturerList.map((s, i) => (
              <GridListTile key={s._id}>
                <Box m={1} className="animate__animated animate__fadeIn" style={{ animationDelay: `${0.1 * i}s` }}>
                  <Lecturer 
                    data={s}
                    onRemove={(lecturerId) => handleRemoveUser(2, lecturerId)} 
                  />
                </Box>
              </GridListTile>
            ))}
          </GridList>
          <Box px={1} pt={3}>
            <Button
              fullWidth
              className={classes.btnLoadMore}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleClickBtnLoadMore(2)}
              disabled={disableBtnLoadMoreLecturer}
            >
              Xem thêm giảng viên
            </Button>
          </Box>
        </Box>
      )}

    </div>
  );
};

export default Users;
