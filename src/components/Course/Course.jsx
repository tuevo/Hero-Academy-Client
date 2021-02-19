import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'timeago.js';
import './Course.style.scss';

const styles = {
  "display": "-webkit-box",
  "maxWidth": "100%",
  "WebkitBoxOrient": "vertical",
  "overflow": "hidden"
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.course,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
  },
  card__minimal: {
    width: '16.5rem'
  },
  card__stretch: {
    width: '100%'
  },
  media__minimal: {
    height: '8.75rem',
  },
  media__stretch: {
    height: '100%'
  },
  titleContainer: {

  },
  title: {
    textTransform: 'uppercase',
    ...styles,
    "WebkitLineClamp": "2",
  },
  description: {
    margin: theme.spacing(1, 0),
    ...styles,
  },
  description__minimal: {
    "WebkitLineClamp": "2"
  },
  description__stretch: {
    "WebkitLineClamp": "2"
  },
  cardContent: {
    padding: '1rem !important'
  },
  price: {
    height: '3rem'
  },
  icon: {
    color: theme.palette.icon
  }
}));

const Course = ({ data, type }) => {
  const classes = useStyles();

  return (
    <RouterLink to={data.href}>
      {type === 'minimal' && (
        <Card className={`${classes.card} ${classes.card__minimal}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media__minimal}
              image={data.thumbnailUrl}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.cardContent}>
              <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ height: '15rem' }}>
                <Box>
                  <Box display="flex" flexDirection="column" className={classes.titleContainer}>
                    <Typography variant="body2" gutterBottom>{data.categoryCluster.categories[0].name.toUpperCase()}</Typography>
                    <Typography gutterBottom variant="h5" className={classes.title}>
                      <b>{data.title}</b>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Avatar src={data.lecturer.avatarUrl} style={{ width: 24, height: 24, marginRight: 7 }} />
                    <Typography variant="body2" color="textPrimary"><b>{data.lecturer.fullName}</b></Typography>
                    <Box mx={0.5}><Typography variant="body2">•</Typography></Box>
                    <Typography variant="body2">{format(data.updatedAt, 'vi')}</Typography>
                    <Box mx={0.5}><Typography variant="body2"></Typography></Box>
                  </Box>

                  <Box display="flex" alignItems="center" mt={1} flexWrap="wrap">
                    <Typography variant="body2" style={{ marginRight: 3 }} color="textPrimary">
                      <b>{`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}</b>
                    </Typography>
                    <Box style={{ marginBottom: -1, marginRight: 3 }}>
                      <Rating name="read-only" value={data.averageRating} size="small" precision={0.5} readOnly />
                    </Box>
                    <Typography variant="body2">
                      <NumberFormat value={data.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'('} suffix={' lượt đánh giá)'} />
                    </Typography>
                    <Box mx={0.5}><Typography variant="body2">•</Typography></Box>
                    <Typography variant="body2">
                      <NumberFormat value={data.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} suffix={' học viên'} />
                    </Typography>
                    <Box mx={0.5}><Typography variant="body2">•</Typography></Box>
                    <Typography variant="body2">
                      <NumberFormat value={data.numberOfViews} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} suffix={' lượt xem'} />
                    </Typography>
                  </Box>

                  {/* <Box mt={1} display="flex" alignItems="center" flexWrap="wrap">
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <SchoolIcon className={classes.icon} style={{ fontSize: 16, marginRight: 5 }} />
                      <Typography variant="body2" color="textPrimary">
                        <NumberFormat value={data.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                      </Typography>
                    </Box>
                    <Box mx={2}></Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <VisibilityIcon className={classes.icon} style={{ fontSize: 16, marginRight: 5 }} />
                      <Typography variant="body2" color="textPrimary">
                        <NumberFormat value={data.numberOfViews} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt xem'} />
                      </Typography>
                    </Box>
                  </Box> */}

                  <Typography variant="body2" color="textSecondary" component="p" className={`${classes.description} ${classes.description__minimal}`}>
                    {data.description}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end" className={classes.price}>
                  <Typography variant="h5">
                    <b><NumberFormat value={data.tuition - data.tuition * data.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={data.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} /></b>
                  </Typography>

                  {data.discountPercent > 0 && (
                    <Typography variant="body1">
                      <strike>
                        <NumberFormat value={data.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                      </strike>
                      <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{data.discountPercent * 100}%</span>
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {type === 'stretch' && (
        <Card className={`${classes.card} ${classes.card__stretch} animate__animated animate_fadeIn`}>
          <CardActionArea>
            <Grid container>
              <Grid item xs={5}>
                <CardMedia
                  className={classes.media__stretch}
                  image={data.thumbnailUrl}
                  title="Contemplative Reptile"
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent className={classes.cardContent}>
                  <Box display="flex" flexDirection="column" className={classes.titleContainer}>
                    <Typography variant="body2" gutterBottom>{data.categoryCluster.categories[0].name.toUpperCase()}</Typography>
                    <Typography gutterBottom variant="h5" className={classes.title}>
                      <b>{data.title}</b>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Avatar src={data.lecturer.avatarUrl} style={{ width: 24, height: 24, marginRight: 7 }} />
                    <Typography variant="body2" color="textPrimary"><b>{data.lecturer.fullName}</b></Typography>
                    <Box mx={0.5}><Typography variant="body2">•</Typography></Box>
                    <Typography variant="body2">{format(data.updatedAt, 'vi')}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mt={1}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" style={{ marginRight: 3 }} color="textPrimary">
                        <b>{`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}</b>
                      </Typography>
                      <Box style={{ marginBottom: -1 }}>
                        <Rating name="read-only" value={data.averageRating} size="small" precision={0.5} readOnly />
                      </Box>
                      <Typography variant="body2" style={{ marginLeft: 3 }}>
                        <NumberFormat value={data.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'('} suffix={' lượt đánh giá)'} />
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <Box mx={1}></Box>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <SchoolIcon className={classes.icon} style={{ fontSize: 16, marginRight: 5 }} />
                        <Typography variant="body2" color="textPrimary">
                          <NumberFormat value={data.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                        </Typography>
                      </Box>
                      <Box mx={1}></Box>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <VisibilityIcon className={classes.icon} style={{ fontSize: 16, marginRight: 5 }} />
                        <Typography variant="body2" color="textPrimary">
                          <NumberFormat value={data.numberOfViews} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt xem'} />
                        </Typography>
                      </Box>
                    </Box>

                  </Box>
                  <Typography variant="body2" color="textSecondary" component="p" className={`${classes.description} ${classes.description__stretch}`}>
                    {data.description}
                  </Typography>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end" className={classes.price}>
                    <Typography variant="h5">
                      <b><NumberFormat value={data.tuition - data.tuition * data.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={data.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} /></b>
                    </Typography>

                    {data.discountPercent > 0 && (
                      <Typography variant="body1">
                        <strike>
                          <NumberFormat value={data.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                        </strike>
                        <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{data.discountPercent * 100}%</span>
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
    </RouterLink>
  );
};

export default Course;