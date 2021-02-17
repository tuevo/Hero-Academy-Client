import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import * as moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Link as RouterLink } from 'react-router-dom';
import './Course.style.scss';

const styles = {
  "display": "-webkit-box",
  "maxWidth": "100%",
  "WebkitLineClamp": "2",
  "WebkitBoxOrient": "vertical",
  "overflow": "hidden"
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.course,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
  },
  card__minimal: {
    width: '15.625rem'
  },
  card__stretch: {
    width: '100%'
  },
  media__minimal: {
    height: '7.8125rem',
  },
  media__stretch: {
    height: '100%'
  },
  titleContainer: {
    height: '2.5rem',
  },
  title: {
    textTransform: 'uppercase',
    ...styles,
    "WebkitLineClamp": "2",
  },
  description: {
    margin: theme.spacing(1, 0),
    ...styles,
    "WebkitLineClamp": "2"
  },
  cardContent: {
    padding: '1rem !important'
  },
  price: {
    height: '2.5rem'
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
              <Box display="flex" alignItems="center" className={classes.titleContainer}>
                <Typography gutterBottom variant="h5" className={classes.title}>
                  <b>{data.title}</b>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" style={{ marginRight: 3 }}>{`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}</Typography>
                <Box>
                  <Rating name="read-only" value={data.averageRating} size="small" precision={0.5} readOnly />
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">
                  <span>(</span>
                  <NumberFormat value={data.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                  <span>)</span>
                </Typography>
                <Typography variant="body2" style={{ marginLeft: 9 }}>
                  <NumberFormat value={data.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                {data.description}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end" className={classes.price}>
                <Typography variant="h5">
                  <b><NumberFormat value={data.tuition - data.tuition * data.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={data.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} /></b>
                </Typography>

                {data.discountPercent > 0 && (
                  <Typography variant="body2">
                    <strike>
                      <NumberFormat value={data.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                    </strike>
                    <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{data.discountPercent * 100}%</span>
                  </Typography>
                )}
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
                  <Box display="flex" alignItems="center" className={classes.titleContainer}>
                    <Typography gutterBottom variant="h5" className={classes.title}>
                      <b>{data.title}</b>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" style={{ marginRight: 3 }}>{`${Math.floor(data.averageRating)}.${(data.averageRating - Math.floor(data.averageRating)) * 10}`}</Typography>
                    <Box>
                      <Rating name="read-only" value={data.averageRating} size="small" precision={0.5} readOnly />
                    </Box>
                    <Typography variant="body2" style={{ marginLeft: 3 }}>
                      <span>(</span>
                      <NumberFormat value={data.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                      <span>)</span>
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: 9 }}>
                      <NumberFormat value={data.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">Giảng viên: <b>{data.lecturer.fullName}</b></Typography>
                    <Typography variant="body2" style={{ marginLeft: 9 }}>Cập nhật lần cuối: {moment(data.updatedAt).format('DD/MM HH:mm')}</Typography>
                    <Typography variant="body2" style={{ marginLeft: 9 }}>{data.categoryCluster.categories[0].name.toUpperCase()}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                    {data.description}
                  </Typography>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end" className={classes.price}>
                    <Typography variant="h5">
                      <b><NumberFormat value={data.tuition - data.tuition * data.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={data.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} /></b>
                    </Typography>

                    {data.discountPercent > 0 && (
                      <Typography variant="body2">
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