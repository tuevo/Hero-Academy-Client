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
        const lecturerCourses = res.data.entries;
        const { totalItems } = res.data.meta;

        const newLecturerCourseList = [...lecturerCourseList, ...lecturerCourses]
        setLecturerCourseList(newLecturerCourseList);

        if (newLecturerCourseList.length < totalItems) {
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

  const courses = [
    {
      _id: 1,
      thumbnailUrl: 'https://miro.medium.com/max/3798/1*eOE7VhXBlqdIJ9weEdHbQQ.jpeg',
      title: 'Angular Cho Người Mới Bắt Đầu',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 5.0,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 650000,
      discountPercent: 0.3,
      updatedAt: new Date(),
    },
    {
      _id: 2,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 3,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 4,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 5,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 6,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 7,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
    {
      _id: 8,
      thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
      averageRating: 4.5,
      numberOfRatings: 1500,
      numberOfStudents: 2500,
      lecturer: {
        name: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date(),
    },
  ]

  for (let c of lecturerCourseList)
    c['href'] = `/courses/${c._id}`;

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