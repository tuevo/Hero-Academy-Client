import { Button, Drawer, FormControl, Grid, Input, InputAdornment, InputLabel, Select, TextField, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '37.5rem',
    padding: theme.spacing(4)
  },
  formControl: {
    marginBottom: theme.spacing(2)
  }
}));

export default function UpdateCourse({ course }) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      title: course.title,
      catgegoryId: course.categoryCluster.category._id,
      tuition: course.tuition,
      discountPercent: course.discountPercent,
      isFinished: course.isFinished,
      description: course.description
    },
    touched: {},
    errors: {}
  });

  const categoryClusters = [
    {
      _id: 1,
      name: 'Công nghệ thông tin',
      categories: [
        {
          _id: 1,
          name: 'Lập trình web',
          href: '/category-courses'
        },
        {
          _id: 2,
          name: 'Lập trình di động',
          href: '/category-courses'
        },
        {
          _id: 3,
          name: 'Lập trình game',
          href: '/category-courses'
        }
      ]
    },
    {
      _id: 2,
      name: 'Thiết kế',
      categories: [
        {
          _id: 1,
          name: 'Đồ họa',
          href: '/category-courses'
        },
        {
          _id: 2,
          name: 'Nội thất',
          href: '/category-courses'
        },
        {
          _id: 3,
          name: 'Thời trang',
          href: '/category-courses'
        }
      ]
    },
    {
      _id: 3,
      name: 'Quản trị kinh doanh',
      categories: [
        {
          _id: 1,
          name: 'Lập trình web',
          href: '/category-courses'
        },
        {
          _id: 2,
          name: 'Lập trình di động',
          href: '/category-courses'
        },
        {
          _id: 3,
          name: 'Lập trình game',
          href: '/category-courses'
        }
      ]
    },
    {
      _id: 4,
      name: 'Digital Marketing',
      categories: [
        {
          _id: 1,
          name: 'Lập trình web',
          href: '/category-courses'
        },
        {
          _id: 2,
          name: 'Lập trình di động',
          href: '/category-courses'
        },
        {
          _id: 3,
          name: 'Lập trình game',
          href: '/category-courses'
        }
      ]
    },
    {
      _id: 5,
      name: 'Ngoại ngữ',
      categories: [
        {
          _id: 1,
          name: 'Tiếng Anh',
          href: '/category-courses'
        },
        {
          _id: 2,
          name: 'Tiếng Trung',
          href: '/category-courses'
        },
        {
          _id: 3,
          name: 'Tiếng Nhật',
          href: '/category-courses'
        },
        {
          _id: 4,
          name: 'Tiếng Pháp',
          href: '/category-courses'
        }
      ]
    },
  ];

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const content = (anchor) => (
    <div
      className={classes.content}
      role="presentation"
    >
      <form>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            error={hasError('title')}
            helperText={
              hasError('title') ? formState.errors.title[0] : null
            }
            label="Tên khóa học"
            name="title"
            onChange={handleChange}
            type="text"
            value={formState.values.title || ''}
            variant="standard"
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="grouped-native-select">Lĩnh vực</InputLabel>
          <Select native defaultValue={formState.values.catgegoryId}>
            {categoryClusters.map(cc => (
              <optgroup key={cc._id} label={cc.name}>
                {cc.categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </optgroup>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">Học phí</InputLabel>
              <Input
                error={hasError('tuition')}
                name="tuition"
                onChange={handleChange}
                type="number"
                value={formState.values.tuition || ''}
                variant="standard"
                endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                inputProps={{ min: 0, max: 99999999 }}
              />
              <FormHelperText>{hasError('tuition') ? formState.errors.tuition[0] : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">Khuyễn mãi</InputLabel>
              <Input
                error={hasError('discountPercent')}
                name="discountPercent"
                onChange={handleChange}
                type="number"
                value={formState.values.discountPercent * 100 || ''}
                variant="standard"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                inputProps={{ min: 0, max: 100 }}
              />
              <FormHelperText>{hasError('discountPercent') ? formState.errors.discountPercent[0] : null}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl className={classes.formControl} component="fieldset" fullWidth>
          <Box display="flex" alignItems="center">
            <Box mr={4}>
              <FormLabel component="legend">Trạng thái khóa học</FormLabel>
            </Box>
            <RadioGroup row aria-label="position" name="position" defaultValue={+formState.values.isFinished}>
              <FormControlLabel value={+true} control={<Radio color="primary" />} label="Đã hoàn thành" />
              <FormControlLabel value={+false} control={<Radio color="primary" />} label="Chưa hoàn thành" />
            </RadioGroup>
          </Box>
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <TextField
            className={classes.formControl}
            error={hasError('description')}
            fullWidth
            helperText={
              hasError('description') ? formState.errors.description[0] : null
            }
            label="Mô tả khóa học"
            name="description"
            onChange={handleChange}
            type="text"
            value={formState.values.description || ''}
            variant="standard"
            multiline
          />
        </FormControl>

        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
        >
          Cập nhật
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            size="small"
          >
            Chỉnh sửa
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {content(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}