import { Avatar, Box, Card, CardActionArea, CardContent, Dialog, Grid, Typography, DialogTitle, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import * as moment from 'moment';
import Rating from '@material-ui/lab/Rating';
import NumberFormat from 'react-number-format';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.user,
    boxShadow: 'none'
  },
  avatar: {
    width: '80px',
    height: '80px'
  },
  details: {
    minWidth: '25rem'
  },
  details__avatar: {
    width: '7.5rem',
    height: '7.5rem'
  },
  details__numberOfRatings: {
    position: 'absolute',
    bottom: 0,
    right: '20%',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
    color: theme.palette.primary.contrastText,
    padding: '0.1563rem 0.3125rem',
    borderRadius: '0.625rem'
  }
}))

function Details(props) {
  const classes = useStyles();
  const { onClose, data, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle>Thông tin giảng viên</DialogTitle>
      <Box p={6} className={classes.details}>
        <Box display="flex" justifyContent="center">
          <Avatar src={data.avatarUrl} className={classes.details__avatar} />
        </Box>
        <Box py={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom><b>{data.fullName}</b></Typography>
          <Typography variant="body2">{data.email}</Typography>
          <Box pt={2} display="flex" alignItems="center">
            <Typography variant="body2" style={{ marginRight: 3 }}>{`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}</Typography>
            <Box style={{ marginBottom: 1 }}>
              <Rating name="read-only" value={data.averageRating} size="small" precision={0.5} readOnly />
            </Box>
          </Box>
          <Box>
            <Typography variant="body2">
              <span>(</span>
              <NumberFormat value={data.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
              <span>)</span>
            </Typography>
          </Box>
        </Box>
        <Box py={4}>
          <Box pb={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Ngày tham gia</Typography>
            <Typography variant="h6">{moment(data.createdAt).format('DD/MM/YYYY')}</Typography>
          </Box>
          <Box pb={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Số khóa học đã đăng tải</Typography>
            <Typography variant="h6">
              <NumberFormat value={data.numberOfCourses} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
            </Typography>
          </Box>
          <Box pb={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Số học viên đã theo học</Typography>
            <Typography variant="h6">
              <NumberFormat value={data.numberOfStudents} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
            </Typography>
          </Box>
        </Box>
        <Box pt={6}>
          <Button variant="outlined" fullWidth color="secondary">Xóa tài khoản</Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default function Lecturer({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.card} onClick={handleClickOpen}>
        <CardActionArea>
          <CardContent style={{ padding: 0 }}>
            <Box p={2}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Box position="relative">
                    <Avatar src={data.avatarUrl} className={classes.avatar} />
                    <Box display="flex" justifyContent="center" alignItems="center" className={classes.details__numberOfRatings}>
                      <StarIcon style={{ color: '#ffb600', fontSize: '0.875rem' }} />
                      <Typography variant="body2" color="inherit" style={{ marginLeft: 3 }}>
                        {`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5" gutterBottom><b>{data.fullName}</b></Typography>
                  <Typography variant="body2">{data.email}</Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Details
        onClose={handleClose}
        data={data}
        open={open}
      />
    </div>
  )
}