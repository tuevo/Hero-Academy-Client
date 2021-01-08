import { Box, ButtonBase, colors, Grid, List, ListItem, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from 'components';
import Course from 'components/Course/Course';
import CourseMultiCarousel from 'components/CourseMultiCarousel/CourseMultiCarousel';
import * as moment from 'moment';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link as RouterLink } from 'react-router-dom';
import './Home.style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  banner: {
    position: 'relative',
    height: '28.125rem',
    "backgroundColor": "#10b0e5",
    "backgroundImage": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23289eeb' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%232f8cf0' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%232f7af5' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%232867fa' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%231453ff' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%233567ff' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23457bff' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23508fff' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%2358a2ff' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%235cb6ff' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E\")",
    "backgroundAttachment": "fixed",
    "backgroundSize": "cover"
  },
  bannerCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 136, 243, 0.7)',
  },
  bannerText: {
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  bannerSubTitle: {
    marginTop: theme.spacing(2)
  },
  logoImage: {
    width: '2.8125rem',
    marginRight: theme.spacing(1.5),
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
  },
  searchInputContainer: {
    marginTop: theme.spacing(4)
  },
  main: {
    position: 'absolute',
    zIndex: 10,
    top: '80%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
  },
  featuredCourses: {
    padding: theme.spacing(4),
    ...theme.palette.card
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
    borderRadius: '1.875rem'
  },
  featuredCoursesCarouselItem: {
    height: '30rem',
    position: 'relative'
  },
  featuredCoursesCarouselItemLegend: {
    textAlign: 'left !important',
    opacity: '1 !important',
    background: 'none !important'
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
    boxShadow: 'inset 0 -14rem 6.25rem rgba(3, 155, 229, 0.7)'
  },
  featuredCoursesCarouselItem__courseText: {
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  featuredCoursesCarouselItem__ratingDetails: {
    margin: theme.spacing(2, 0, 2, 0)
  },
  featuredCoursesCarouselItem__price: {
    marginBottom: theme.spacing(1)
  },
  section: {
    marginTop: theme.spacing(2)
  },
  highestViewCourses: {
    ...theme.palette.card,
    // backgroundColor: theme.palette.primary.main,
    "backgroundImage": "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
    padding: theme.spacing(4),
  },
  highestViewCourses__title: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
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
    padding: theme.spacing(0, 2, 2, 4)
  },
  popularCategories__item: {
    color: colors.blueGrey[800],
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
    marginBottom: theme.spacing(3)
  },
  newCourses__item: {
    marginTop: theme.spacing(1.5)
  },
  label: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    color: '#fff',
    fontSize: '0.8125rem',
    borderRadius: 5,
    fontWeight: 'bold'
  },
  label__hot: {
    backgroundColor: 'crimson',
  },
  label__new: {
    backgroundColor: '#44b543',
  },
  label__saleOff: {
    backgroundColor: 'crimson',
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

  const courses = [
    {
      _id: 1,
      thumbnail: 'https://miro.medium.com/max/3798/1*eOE7VhXBlqdIJ9weEdHbQQ.jpeg',
      title: 'Angular Cho Người Mới Bắt Đầu',
      description: '',
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
      description: '',
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
      description: '',
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
      description: '',
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
      description: '',
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
      description: '',
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
      description: '',
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
      description: '',
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
      _id: 9,
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: '',
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
      _id: 10,
      thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
      title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
      description: '',
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
  ];

  for (let c of courses)
    c['href'] = '/dashboard';

  const categories = [
    {
      _id: 1,
      name: 'Lập trình web',
      href: '/dashboard'
    },
    {
      _id: 2,
      name: 'Lập trình di động',
      href: '/dashboard'
    },
    {
      _id: 3,
      name: 'Lập trình game',
      href: '/dashboard'
    },
    {
      _id: 4,
      name: 'Đồ họa',
      href: '/dashboard'
    },
    {
      _id: 5,
      name: 'Nội thất',
      href: '/dashboard'
    },
    {
      _id: 6,
      name: 'Thời trang',
      href: '/dashboard'
    },
    {
      _id: 7,
      name: 'Tiếng Anh',
      href: '/dashboard'
    },
    {
      _id: 8,
      name: 'Tiếng Trung',
      href: '/dashboard'
    },
    {
      _id: 9,
      name: 'Tiếng Nhật',
      href: '/dashboard'
    },
    {
      _id: 10,
      name: 'Tiếng Pháp',
      href: '/dashboard'
    }
  ]

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.bannerCover}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="Logo"
              src="/images/logos/logo.png"
              className={classes.logoImage}
            />
            <Typography className={classes.bannerText} variant="h1">Hero Academy</Typography>
          </Box>
          <Typography className={`${classes.bannerText} ${classes.bannerSubTitle}`} variant="h5">Nơi cung cấp khóa học online chất lượng cao</Typography>
          <div className={classes.searchInputContainer}>
            <SearchInput />
          </div>
        </Box>
      </div>

      <main className={classes.main}>
        <div className={classes.featuredCourses}>
          <Box display="flex" alignItems="center">
            <StarIcon color="primary" className={`${classes.starIcon} ${classes.featuredCoursesCarouselTitleIcon}`} />
            <Typography variant="h4">Khóa học nổi bật trong tuần qua</Typography>
          </Box>
          <div className={classes.featuredCoursesCarousel}>
            <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true} showStatus={false}>
              {/* <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}> */}

              {(courses || []).map(c => (
                <RouterLink key={c._id} to={c.href}>
                  <ButtonBase>
                    <div className={classes.featuredCoursesCarouselItem}>
                      <img className={classes.featuredCoursesCarouselItem__courseThumbnail} src={c.thumbnail} alt="" />
                      <div className={classes.featuredCoursesCarouselItem__courseThumbnailCover}></div>
                      <div className={`legend ${classes.featuredCoursesCarouselItemLegend}`}>
                        <Grid container alignItems="flex-end">
                          <Grid item xs={8}>
                            <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginBottom: 9 }}>{c.categoryCluster.categories[0].name.toUpperCase()}</Typography>
                            <Typography variant="h4" className={classes.featuredCoursesCarouselItem__courseText}><b>{c.title}</b></Typography>

                            <Box display="flex" alignItems="flex-end" className={classes.featuredCoursesCarouselItem__ratingDetails}>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginRight: 3 }}>
                                <span className={`${classes.label} ${classes.label__bestSeller}`} style={{ marginLeft: 0 }}>Best Seller</span>
                                <span style={{ marginLeft: 9 }}>{c.averageRating}</span>
                              </Typography>
                              <Rating name="read-only" value={c.averageRating} size="small" precision={0.5} readOnly />
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 3 }}>
                                <span>(</span>
                                <NumberFormat value={c.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                                <span>)</span>
                              </Typography>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>
                                <NumberFormat value={c.numberOfStudents} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText}>Giảng viên: <b>{c.lecturer.name}</b></Typography>
                              <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>Cập nhật lần cuối: {moment(c.updatedAt).format('DD/MM HH:mm')}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                              <Typography variant="h4" className={`${classes.featuredCoursesCarouselItem__courseText} ${classes.featuredCoursesCarouselItem__price}`}>
                                <NumberFormat value={c.tuition - c.tuition * c.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={c.discountPercent > 0 ? 'Chỉ còn ' : ''} suffix={'đ'} />
                              </Typography>

                              {c.discountPercent > 0 && (
                                <Typography variant="body1" className={classes.featuredCoursesCarouselItem__courseText}>
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
          <Typography variant="h4" className={classes.highestViewCourses__title}>Khóa học được xem nhiều <span className={`${classes.label} ${classes.label__hot}`}>HOT</span></Typography>
          <div className={classes.highestViewCoursesCarousel}>
            <CourseMultiCarousel courses={courses || []} />
          </div>
        </div>

        <div className={classes.section}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <div className={classes.newCourses}>
                <Typography variant="h4" className={classes.newCourses__title}>Khóa học mới nhất <span className={`${classes.label} ${classes.label__new}`}>NEW</span></Typography>
                {(courses || []).map(c => (
                  <div key={c._id} className={classes.newCourses__item}>
                    <Course data={c} style={`stretch`} />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.popularCategories}>
                <Typography variant="h5" className={classes.popularCategories__title}>Lĩnh vực được đăng ký nhiều</Typography>
                <List component="div" disablePadding>
                  {(categories || []).map(c => (
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