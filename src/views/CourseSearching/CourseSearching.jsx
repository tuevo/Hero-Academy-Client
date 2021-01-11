import { Box, Button, Divider, GridList, GridListTile, Typography, Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Course from 'components/Course/Course';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 10),
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  courses: {
    ...theme.palette.card,
    borderRadius: '2.5rem',
    "boxShadow": "rgba(0, 0, 0, 0.4) 0px 1.875rem 5.625rem"
  },
  btnLoadMoreCourse: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '12.5rem',
  },
  sencondaryText: {
    color: theme.palette.text.secondary
  }
}));

const CourseSearching = () => {
  const classes = useStyles();
  const [filterValue, setFilterValue] = React.useState(1);

  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

  const courses = [
    {
      _id: 1,
      thumbnail: 'https://miro.medium.com/max/3798/1*eOE7VhXBlqdIJ9weEdHbQQ.jpeg',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
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

  for (let c of courses)
    c['href'] = '/course-details';

  return (
    <div className={classes.root}>
      <Box p={4} className={`${classes.courses} animate__animated animate__slideInUp`}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" className={classes.sencondaryText} gutterBottom>
              Từ khóa "lập trình web"
            </Typography>
            <Typography variant="body1">
              Tìm thấy <b><NumberFormat value={courses.length} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></b> khóa học liên quan
            </Typography>
          </Box>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Lọc khóa học theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterValue}
              onChange={handleChange}
            >
              <MenuItem value={1}>Điểm đánh giá giảm dần</MenuItem>
              <MenuItem value={2}>Điểm đánh giá tăng dần</MenuItem>
              <MenuItem value={3}>Giá tăng dần</MenuItem>
              <MenuItem value={4}>Giá giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={3} mb={2} >
          <Divider />
        </Box>
        <Box ml={-2}>
          <GridList cellHeight="auto" cols={4}>
            {courses.map((c, i) => (
              <GridListTile key={c._id}>
                <Box p={2} className="animate__animated animate__zoomIn" style={{ animationDelay: `${0.2 * i}s` }}>
                  <Course data={c} type="minimal" />
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </Box>
        <Button fullWidth className={classes.btnLoadMoreCourse} variant="contained" color="primary">Xem thêm khóa học</Button>
      </Box>
    </div >
  );
};

export default CourseSearching;