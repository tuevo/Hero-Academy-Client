import { Box, ButtonBase, Grid, List, ListItem, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import Course from 'components/Course/Course';
import CourseMultiCarousel from 'components/CourseMultiCarousel/CourseMultiCarousel';
import * as moment from 'moment';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link as RouterLink } from 'react-router-dom';
import { APP_NAME, availablePages } from 'constants/global.constant';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiMessage } from 'constants/api-message.constant';
import { showNotification, setLoading } from 'redux/actions/app.action';
import { homeApi } from 'api';
import * as _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  banner: {
    position: 'relative',
    height: '16rem'
  },
  bannerCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5,
    width: '100%',
    height: '100%'
  },
  bannerText: {
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  bannerTitle: {
    fontFamily: "'Share Tech Mono', monospace",
    fontWeight: 'bold',
    marginTop: theme.spacing(1)
  },
  bannerSubTitle: {
    marginTop: theme.spacing(2)
  },
  logoImage: {
    width: '4.5rem',
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(2),
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
  },
  main: {
    // position: 'absolute',
    position: 'relative',
    zIndex: 10,
    // top: '80%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
    // padding: theme.spacing(5, 0)
    paddingBottom: theme.spacing(4)
  },
  featuredCourses: {
    padding: theme.spacing(4),
    ...theme.palette.card
  },
  featuredCourses__title: {
    color: theme.palette.text.secondary
  },
  starIcon: {
    color: '#ffb600'
  },
  featuredCoursesCarouselTitleIcon: {
    marginRight: theme.spacing(1)
  },
  featuredCoursesCarousel: {
    ...theme.palette.card,
    marginTop: theme.spacing(3),
    overflow: 'hidden',
    borderRadius: '1.875rem',
    boxShadow: 'none'
  },
  featuredCoursesCarouselItem: {
    height: '30rem',
    position: 'relative'
  },
  featuredCoursesCarouselItemLegend: {
    textAlign: 'left !important',
    opacity: '1 !important',
    background: 'rgba(0,0,0,0.5) !important'
  },
  featuredCoursesCarouselItem__courseThumbnail: {
    width: '100%',
    height: '100%'
  },
  featuredCoursesCarouselItem__courseThumbnailCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxShadow: 'inset 0 -14rem 6.25rem rgba(0, 0, 0, 0.6)'
  },
  featuredCoursesCarouselItem__courseText: {
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  featuredCoursesCarouselItem__ratingDetails: {
    margin: theme.spacing(1, 0)
  },
  featuredCoursesCarouselItem__price: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold'
  },
  section: {
    marginTop: theme.spacing(2)
  },
  highestViewCourses: {
    ...theme.palette.card,
    padding: theme.spacing(4),
  },
  highestViewCourses__title: {
    color: theme.palette.text.secondary
  },
  highestViewCoursesCarousel: {
    marginTop: theme.spacing(3)
  },
  popularCategories: {
    minHeight: '37.5rem',
    width: '100%',
    padding: theme.spacing(4, 0, 4, 0),
    ...theme.palette.card
  },
  popularCategories__title: {
    padding: theme.spacing(0, 2, 2, 4),
    color: theme.palette.text.secondary
  },
  popularCategories__item: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 4),
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  newCourses: {
    minHeight: '37.5rem',
    width: '100%',
    padding: theme.spacing(4),
    ...theme.palette.card
  },
  newCourses__title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  newCourses__item: {
    marginTop: theme.spacing(1.5),
  },
  label: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    color: '#fff',
    fontSize: '0.8125rem',
    borderRadius: 5,
    fontWeight: 'bold',
    textShadow: 'none'
  },
  label__hot: {
    backgroundColor: 'crimson',
  },
  label__new: {
    backgroundColor: theme.palette.success.main,
  },
  label__saleOff: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  label__bestSeller: {
    backgroundColor: '#e68a00'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));


const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const res = await homeApi.getAll();
        const newData = res.data;

        for (const key in newData) {
          newData[key] = newData[key].map(item => ({
            ...item,
            href: key !== 'mostRegisteredCategory'
              ? availablePages.COURSE_DETAILS.path.replace(':courseId', item._id)
              : availablePages.CATEGORY_COURSES.path.replace(':categoryId', item._id),
            lecturer: { name: 'Tue Vo' }, //test
            category: { name: 'Lập trình web' },  //test
            discountPercent: 0.5  //test
          }));
        }

        setData(newData);
        dispatch(setLoading(false));
      } catch (error) {
        if (error.messages && error.messages.length > 0) {
          dispatch(showNotification('error', apiMessage[error.messages[0]]));
        }
      }
    };

    fetchData();
  }, []);

  if (!data)
    return <></>;

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.bannerCover}>
          <Box ml={-2} display="flex" justifyContent="center" alignItems="center" className={`animate__animated animate__fadeInRight`}>
            <img
              alt="Logo"
              src="https://cdn.iconscout.com/icon/free/png-256/graduation-cap-1519981-1287612.png"
              className={classes.logoImage}
            />
            <Typography className={`${classes.bannerText} ${classes.bannerTitle}`} variant="h1">{APP_NAME}</Typography>
          </Box>
          <Typography className={`${classes.bannerText} ${classes.bannerSubTitle} animate__animated animate__fadeInLeft`} variant="h4">Cung cấp khóa học online chất lượng cao</Typography>
        </Box>
      </div>

      <main className={`${classes.main} animate__animated animate__fadeIn`}>
        <div className={classes.featuredCourses}>
          <Box display="flex" alignItems="center">
            <StarIcon color="primary" className={`${classes.starIcon} ${classes.featuredCoursesCarouselTitleIcon}`} />
            <Typography variant="h4" className={classes.featuredCourses__title}><b>Khóa học nổi bật trong tuần qua</b></Typography>
          </Box>
          <div className={classes.featuredCoursesCarousel}>
            <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true} showStatus={false}>
              {(data.outstandingCourseList || []).map(c => (
                <RouterLink key={c._id} to={c.href}>
                  <ButtonBase>
                    <div className={classes.featuredCoursesCarouselItem}>
                      <img className={classes.featuredCoursesCarouselItem__courseThumbnail} src={c.thumbnailUrl} alt="" />
                      <div className={classes.featuredCoursesCarouselItem__courseThumbnailCover}></div>
                      <div className={`legend ${classes.featuredCoursesCarouselItemLegend}`}>
                        <Grid container alignItems="flex-end">
                          <Grid item xs={8}>
                            <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} gutterBottom>{c.category.name.toUpperCase()}</Typography>
                            <Typography variant="h4" className={classes.featuredCoursesCarouselItem__courseText} style={{ textTransform: 'uppercase' }}><b>{c.title}</b></Typography>

                            <Box display="flex" alignItems="center" className={classes.featuredCoursesCarouselItem__ratingDetails}>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginRight: 3 }}>
                                {/* <span className={`${classes.label} ${classes.label__bestSeller}`} style={{ marginLeft: 0, marginRight: 9 }}>Best Seller</span> */}
                                <span>{`${Math.floor(c.averageRating)}.${(c.averageRating - Math.floor(c.averageRating)) * 10}`}</span>
                              </Typography>
                              <Box>
                                <Rating name="read-only" value={c.averageRating} size="small" precision={0.5} readOnly />
                              </Box>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 3 }}>
                                <span>(</span>
                                <NumberFormat value={c.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                                <span>)</span>
                              </Typography>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>
                                <NumberFormat value={c.numberOfRegistrations} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText}>Giảng viên: <b>{c.lecturer.name}</b></Typography>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>Cập nhật lần cuối: {moment(c.updatedAt).format('DD/MM HH:mm')}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                              <Typography variant="h3" className={`${classes.featuredCoursesCarouselItem__courseText} ${classes.featuredCoursesCarouselItem__price}`}>
                                <NumberFormat value={c.tuition - c.tuition * c.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={c.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} />
                              </Typography>

                              {c.discountPercent > 0 && (
                                <Typography variant="h5" className={classes.featuredCoursesCarouselItem__courseText}>
                                  <strike>
                                    <NumberFormat value={c.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                                  </strike>
                                  <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{c.discountPercent * 100}%</span>
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </ButtonBase>
                </RouterLink>
              ))}

            </Carousel>
          </div>
        </div>

        <div className={`${classes.section} ${classes.highestViewCourses}`}>
          <Typography variant="h4" className={classes.highestViewCourses__title}><b>Khóa học được xem nhiều <span className={`${classes.label} ${classes.label__hot}`}>HOT</span></b></Typography>
          <div className={classes.highestViewCoursesCarousel}>
            <CourseMultiCarousel courses={data.coursesListWithTheMostViews || []} />
          </div>
        </div>

        <div className={classes.section}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <div className={classes.newCourses}>
                <Typography variant="h4" className={classes.newCourses__title}><b>Khóa học mới <span className={`${classes.label} ${classes.label__new}`}>NEW</span></b></Typography>
                {(data.ListOfLatestCourses || []).map(c => (
                  <div key={c._id} className={classes.newCourses__item}>
                    <Course data={c} type="stretch" />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.popularCategories}>
                <Typography variant="h5" className={classes.popularCategories__title}><b>Lĩnh vực được đăng ký nhiều</b></Typography>
                <List component="div" disablePadding>
                  {(data.mostRegisteredCategory || []).map(c => (
                    <ListItem
                      disableGutters
                      key={c._id}
                    >
                      <ButtonBase
                        className={classes.popularCategories__item}
                        component={CustomRouterLink}
                        to={c.href}
                      >
                        <Typography
                          variant="body2"
                          color="inherit"
                        >
                          {c.name}
                        </Typography>
                      </ButtonBase>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
};

export default Home;