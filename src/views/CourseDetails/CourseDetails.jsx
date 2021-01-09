import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, colors, Fab, Grid, Tab, Tabs, Typography, Tooltip } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HistoryIcon from '@material-ui/icons/History';
import SchoolIcon from '@material-ui/icons/School';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import CourseMultiCarousel from 'components/CourseMultiCarousel/CourseMultiCarousel';
import * as moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactPlayer from 'react-player';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AddChapter } from './components';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  banner: {
    position: 'relative',
    height: '250px',
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
    boxShadow: 'inset 0 14rem 6.25rem rgba(0,0,0,0.6)'
  },
  bannerContent: {
    position: 'absolute',
    zIndex: 6,
    top: '15%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
    height: '100%',
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
    // position: 'absolute',
    position: 'relative',
    zIndex: 10,
    // top: '60%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
    margin: theme.spacing(5, 0)
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
    marginBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  section: {
    marginTop: theme.spacing(2)
  },
  highestViewCourses: {
    ...theme.palette.card,
    // backgroundColor: theme.palette.primary.main,
    // "backgroundImage": "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
    padding: theme.spacing(4),
  },
  highestViewCourses__title: {
    // color: theme.palette.primary.contrastText,
    // fontWeight: 'bold',
    // textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
    fontWeight: 'bold',
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
    backgroundColor: 'crimson',
  },
  label__bestSeller: {
    backgroundColor: '#e68a00'
  },
  label__unfinished: {
    color: 'rgba(0,0,0,0.7)',
    backgroundColor: '#d9d9d9'
  },
  panel: {
    ...theme.palette.card,
    minHeight: '37.5rem',
    overflow: 'hidden'
  },
  description: {
    margin: theme.spacing(1, 0)
  },
  btnRegister: {
    minWidth: '12.5rem',
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main
    }
  },
  chapters: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  videoPlayer: {
    ...theme.palette.card,
    padding: theme.spacing(2),
    border: '1px solid #d9d9d9',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
  },
  videoPlayer__video: {
    width: '100% !important'
  },
  videoListItem: {
    width: '100%',
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    backgroundColor: '#f8f8f8'
  },
  videoListItem__thumbnailContainer: {
    position: 'relative',
    height: '5.625rem',
  },
  videoListItem__thumbnail: {
    height: '100%'
  },
  videoListItem__duration: {
    position: 'absolute',
    bottom: '5%',
    right: '3%',
    padding: theme.spacing(0.25, 0.5),
    color: '#fff',
    backgroundColor: '#1d1d1d',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    fontSize: '0.6875rem'
  },
  videoListItem__details: {
    padding: theme.spacing(1)
  },
  videoListContainer: {
    position: 'relative',
    padding: theme.spacing(2),
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    borderRadius: theme.palette.card.borderRadius
  },
  videoList__title: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
  },
  videoList: {
    height: '21.875rem',
    overflow: 'scroll',
    margin: theme.spacing(1, 0)
  },
  btnAddVideo: {
    position: 'absolute',
    right: '7%',
    top: '-5%',
  },
  btnOpenWatchHistory: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.light1,
    }
  }
}));

const CourseDetails = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const course = {
    _id: 2,
    thumbnail: 'https://damminhtien.com/assets/images/reactjs.png',
    title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`,
    content: `<p>
    <span style="font-size: large;">Chương 1: Giới thiệu tổng quan</span>
</p>
<p>
    <br>
</p>
<p>Quill is a free,
    <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
    <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
    <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
<p>
    <br>
</p>
<ul>
    <li>Fast and lightweight</li>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>
<p>
    <br>
</p>
<p>
    <span style="font-size: large;">Chương 2: Component, Prop, State</span>
</p>
<p>
    <br>
</p>
<p>Quill is a free,
    <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
    <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
    <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
<p>
    <br>
</p>
<ul>
    <li>Fast and lightweight</li>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>
<p>
    <br>
</p>
<p>
    <span style="font-size: large;">Chương 3: React Hooks</span>
</p>
<p>
    <br>
</p>
<p>Quill is a free,
    <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
    <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
    <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
<p>
    <br>
</p>
<ul>
    <li>Fast and lightweight</li>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>`,
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
    isFinished: true
  };

  const chapters = [
    {
      _id: 1,
      index: 1,
      title: 'Giới thiệu tổng quan',
      videos: [
        {
          _id: 1,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 2,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 3,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 4,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 5,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 6,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 7,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 8,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 9,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 10,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 11,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 12,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        }
      ]
    },
    {
      _id: 2,
      index: 2,
      title: 'Component, Prop, State',
      videos: [
        {
          _id: 1,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 2,
          title: 'Title',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 3,
          title: 'Title',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        }
      ]
    },
    {
      _id: 3,
      index: 3,
      title: 'React Hooks',
      videos: [
        {
          _id: 1,
          title: 'Title',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 2,
          title: 'Title',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 3,
          title: 'Title',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date(),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        }
      ]
    }
  ]

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
      updatedAt: new Date()
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
  ];

  for (let c of courses)
    c['href'] = '/courses';

  return (
    <div className={classes.root}>
      <div className={classes.banner} style={{ backgroundImage: `url(${course.thumbnail})` }}>
        <div className={classes.bannerCover}></div>
        <Box display="flex" flexDirection="column" className={`${classes.bannerContent} animate__animated animate__fadeIn`}>
          <Grid container alignItems="flex-end">
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" style={{ marginBottom: 9 }}>
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} >
                  {course.categoryCluster.name.toUpperCase()}
                </Typography>
                <ArrowRightIcon className={classes.featuredCoursesCarouselItem__courseText} />
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText}>
                  {course.categoryCluster.categories[0].name.toUpperCase()}
                </Typography>
              </Box>

              <Typography variant="h3" className={classes.featuredCoursesCarouselItem__courseText}><b>{course.title}</b></Typography>
              <Typography variant="body1" className={`${classes.featuredCoursesCarouselItem__courseText} ${classes.description}`}>{course.description}</Typography>

              <Box display="flex" alignItems="flex-end" className={classes.featuredCoursesCarouselItem__ratingDetails}>
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginRight: 3 }}>
                  <span className={`${classes.label} ${classes.label__bestSeller}`} style={{ marginLeft: 0 }}>Best Seller</span>
                  {course.isFinished ? (
                    <span className={`${classes.label} ${classes.label__new}`} style={{ marginLeft: 9 }}>Đã hoàn thành</span>
                  ) : (<span className={`${classes.label} ${classes.label__unfinished}`} style={{ marginLeft: 9 }}>Chưa hoàn thành</span>)}
                  <span style={{ marginLeft: 9 }}>{`${Math.floor(course.averageRating)}.${(course.averageRating - Math.floor(course.averageRating)) * 10}`}</span>
                </Typography>
                <Rating name="read-only" value={course.averageRating} size="small" precision={0.5} readOnly />
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 3 }}>
                  <span>(</span>
                  <NumberFormat value={course.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                  <span>)</span>
                </Typography>
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>
                  <NumberFormat value={course.numberOfStudents} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText}>Giảng viên: <b>{course.lecturer.name}</b></Typography>
                <Typography variant="body2" className={classes.featuredCoursesCarouselItem__courseText} style={{ marginLeft: 9 }}>Cập nhật lần cuối: {moment(course.updatedAt).format('DD/MM HH:mm')}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="h3" className={`${classes.featuredCoursesCarouselItem__courseText} ${classes.featuredCoursesCarouselItem__price}`}>
                  <NumberFormat value={course.tuition - course.tuition * course.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={course.discountPercent > 0 ? 'Chỉ còn ' : `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`} suffix={'đ'} />
                </Typography>

                {course.discountPercent > 0 && (
                  <Typography variant="h4" className={classes.featuredCoursesCarouselItem__courseText}>
                    <strike>
                      <NumberFormat value={course.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                    </strike>
                    <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{course.discountPercent * 100}%</span>
                  </Typography>
                )}

                <Button variant="contained" className={classes.btnRegister} color="primary">ĐĂNG KÝ KHÓA HỌC</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>

      <main className={classes.main}>
        <div className={`${classes.panel} animate__animated animate__slideInUp`}>
          <AppBar position="static" style={{ boxShadow: 'none' }} color="primary">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab icon={<FormatListBulletedIcon />} label="Nội dung khóa học" {...a11yProps(0)} />
              <Tab icon={<VideoLibraryIcon />} label="Video khóa học" {...a11yProps(1)} />
              <Tab icon={<SchoolIcon />} label="Phản hồi khóa học" {...a11yProps(2)} />
              <Tab icon={<AssignmentIndIcon />} label="Thông tin giảng viên" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <span dangerouslySetInnerHTML={{ __html: course.content }} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddChapter />
            {chapters.map(chapter => (
              <Accordion key={chapter._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{`Chương ${chapter.index}: ${chapter.title}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className={classes.videoPlayer}>
                        <ReactPlayer url='https://www.youtube.com/watch?v=MOms7uWpmT0' className={classes.videoPlayer__video} />
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.videoListContainer}>
                        <Tooltip title="Đăng tải video">
                          <Fab size="medium" color="primary" aria-label="add" className={classes.btnAddVideo}>
                            <AddIcon />
                          </Fab>
                        </Tooltip>
                        <Typography gutterBottom variant="body1" className={classes.videoList__title}>Danh sách video khóa học</Typography>
                        <PerfectScrollbar className={classes.videoList}>
                          {chapter.videos.map(video => (
                            <Card key={video._id} className={classes.videoListItem}>
                              <CardActionArea>
                                <Grid container>
                                  <Grid item xs={5}>
                                    <div className={classes.videoListItem__thumbnailContainer}>
                                      <CardMedia
                                        className={classes.videoListItem__thumbnail}
                                        image={video.thumbnailUrl}
                                        title="Contemplative Reptile"
                                      />
                                      <Typography variant="body2" className={classes.videoListItem__duration}>
                                        {moment.utc(video.duration).format('mm:ss')}
                                      </Typography>
                                    </div>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <CardContent className={classes.videoListItem__details}>
                                      <Typography gutterBottom variant="h6">{video.title}</Typography>
                                      <Typography variant="body2">{`Đăng lúc ${moment(video.updatedAt).format('DD/MM HH:mm')}`}</Typography>
                                    </CardContent>
                                  </Grid>
                                </Grid>
                              </CardActionArea>
                            </Card>
                          ))}
                        </PerfectScrollbar>
                        <Button className={classes.btnOpenWatchHistory}><HistoryIcon /><span style={{ marginLeft: 5 }}>Lịch sử theo dõi video</span></Button>
                      </div>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel>
        </div>
        <div className={`${classes.section} ${classes.highestViewCourses}`}>
          <Typography variant="h5" className={classes.highestViewCourses__title}>Khóa học liên quan được đăng ký nhiều</Typography>
          <div className={classes.highestViewCoursesCarousel}>
            <CourseMultiCarousel courses={courses || []} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;