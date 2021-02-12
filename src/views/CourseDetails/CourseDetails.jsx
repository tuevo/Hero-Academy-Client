import { AppBar, Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, colors, Fab, Grid, IconButton, Tab, Tabs, Tooltip, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HistoryIcon from '@material-ui/icons/History';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import SchoolIcon from '@material-ui/icons/School';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import CourseMultiCarousel from 'components/CourseMultiCarousel/CourseMultiCarousel';
import { VideoPlayer } from 'components/VideoPlayer';
import { userRole } from 'constants/user-role.constant';
import * as moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { format } from 'timeago.js';
import { AddChapter } from './components';
import AddFeedback from './components/AddFeedback/AddFeedback';
import UpdateCourse from './components/UpdateCourse/UpdateCourse';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import AddVideo from './components/AddVideo/AddVideo';
import WatchHistory from './components/WatchHistory/WatchHistory';
import clsx from 'clsx';

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
    height: '92vh',
    "backgroundAttachment": "fixed",
    "backgroundSize": "cover",
    color: theme.palette.primary.contrastText
  },
  bannerCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5,
    width: '100%',
    height: '100%',
    boxShadow: 'inset 0 18.75rem 9.375rem rgba(0,0,0,0.6)'
  },
  bannerContent: {
    position: 'absolute',
    zIndex: 6,
    top: '4%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
    height: '100%',
  },
  btnContrast: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    color: theme.palette.primary.contrastText,
    backgroundColor: 'rgba(255,255,255,0.15)',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)'
    }
  },
  main: {
    position: 'absolute',
    // position: 'relative',
    zIndex: 10,
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '85%',
    padding: theme.spacing(5, 0)
  },
  featuredCourses: {
    padding: theme.spacing(4),
    ...theme.palette.card
  },
  starIcon: {
    color: '#ffb600'
  },
  contrastText: {
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
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main
    }
  },
  tabs: {
    boxShadow: 'none',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  chapters: {
    width: '100%',
  },
  videoPlayer: {
    // ...theme.palette.card,
    width: '100%',
    overflow: 'hidden',
    // boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.5rem'
  },
  videoPlayer__video: {
  },
  videoListItem: {
    width: '100%',
    height: '5.625rem',
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5
  },
  videoListItemActive: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark
  },
  videoListItem__thumbnailContainer: {
    position: 'relative',
    height: '5.625rem'
  },
  videoListItem__thumbnail: {
    height: '100%'
  },
  videoListItem__duration: {
    position: 'absolute',
    bottom: '6%',
    right: '4%',
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
    height: '29.25rem',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.color}`,
    borderRadius: theme.palette.card.borderRadius
  },
  videoList: {
    height: '90%',
    overflow: 'scroll',
    marginTop: theme.spacing(2)
  },
  videoList__title: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary
  },
  btnAddVideo: {
    position: 'absolute',
    right: '7%',
    top: '-5%',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  feedbackListContainer: {
    boxShadow: 'none',
    background: theme.palette.background.course,
    borderRadius: 5
  },
  feedbackList: {
    maxHeight: '22rem',
    overflow: 'scroll',
    marginTop: theme.spacing(2),
    // background: theme.palette.background.course,
  },
  feedbackItem: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  feedbackItem__avatar: {
    marginRight: theme.spacing(1)
  },
  feedbackItem__comment: {
    width: '100%',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.625rem'
  },
  lecturer__avatar: {
    width: '4.25rem',
    height: '4.25rem',
    marginRight: theme.spacing(2)
  },
  secondaryText: {
    color: theme.palette.text.secondary
  },
  icon: {
    color: theme.palette.icon
  },
  chapter: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    marginTop: theme.spacing(1)
  },
  chapter__content: {

  }
}));

const CourseDetails = () => {
  const classes = useStyles();
  const history = useHistory();

  const userState = useSelector(state => ({
    authUser: state.user.authUser
  }));

  const ps = useRef();
  const chapterRefs = useRef();

  const { courseId } = useParams();

  const chapters = [
    {
      _id: 1,
      index: 1,
      title: 'Giới thiệu tổng quan',
      totalVideos: 12,
    },
    {
      _id: 2,
      index: 2,
      title: 'Component, Prop, State',
      totalVideos: 12,
    },
    {
      _id: 3,
      index: 3,
      title: 'React Hooks',
      totalVideos: 12,
    }
  ]

  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openRemovingCourseConfirmDialog, setOpenRemovingCourseConfirmDialog] = useState(false);
  const [expandedChapterIndex, setExpandedChapterIndex] = useState(null);
  const [expandedChapterVideoList, setExpandedChapterVideoList] = useState([]);
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const [openWatchHistory, setOpenWatchHistory] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (expandedChapterIndex !== null) {
      const chapter = chapters[expandedChapterIndex];
      scrollToChapter(chapter._id);

      const videos = [
        {
          _id: 1,
          title: 'JSX là gì?',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://i.morioh.com/200626/3c53255f.jpg',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 2,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 3,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 4,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 5,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 6,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 7,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 8,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 9,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 10,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 11,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        },
        {
          _id: 12,
          title: 'Khái niệm Single Page Application',
          url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
          thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
          updatedAt: new Date('2021-01-09T16:59:58.031Z'),
          numberOfView: 1500,
          duration: 1000 * 60 * 5 + 1000 * 30
        }
      ];

      setExpandedChapterVideoList(videos);

      if (!activeVideo) {
        setActiveVideo(videos[0]);
      }
    }
  }, [expandedChapterIndex]);

  const scrollToChapter = (_id) => {
    if (chapterRefs.current && chapterRefs.current.length > 0) {
      const ref = chapterRefs.current.find(r => r._id === _id);
      ps.current.scrollTop += ref.current.getBoundingClientRect().top - 120;
    }
  }

  const handleBack = () => {
    history.goBack();
  };

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const handleBtnFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  }

  const handleBtnOpenRemovingCourseDialogClick = () => {
    setOpenRemovingCourseConfirmDialog(true);
  }

  const handleRemovingCourseDialogClose = isAccepted => {
    console.log(isAccepted);
    setOpenRemovingCourseConfirmDialog(false);
  }

  const handleClickChapter = (index) => {
    if (index === expandedChapterIndex)
      setExpandedChapterIndex(null);
    else
      setExpandedChapterIndex(index);
  }

  const handleCloseAddVideo = (accepted) => {
    setOpenAddVideo(false);
    console.log(accepted);
  }

  const handleClickBtnAddVideo = () => {
    setOpenAddVideo(true);
  }

  const handleClickBtnShowWatchHistory = () => {
    setOpenWatchHistory(true);
  }

  const handleCloseWatchHistory = () => {
    setOpenWatchHistory(false);
  }

  const handleClickWatchHistoryVideo = (video) => {
    setOpenWatchHistory(false);

    const chapterIndex = chapters.findIndex(c => c._id === video.chapter._id);
    setActiveVideo(video);
    setExpandedChapterIndex(chapterIndex);
  }

  const course = {
    _id: 2,
    thumbnailUrl: 'https://damminhtien.com/assets/images/reactjs.png',
    title: 'ReactJS Từ Cơ Bản Đến Nâng Cao',
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.`,
    content: `<p>
    <span style="font-size: large;">Giới thiệu tổng quan</span>
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
    <span style="font-size: large;">Component, Prop, State</span>
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
    <span style="font-size: large;">React Hooks</span>
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
      fullName: 'Tue Vo'
    },
    categoryCluster: {
      _id: '1',
      name: 'Công nghệ thông tin',
      category: {
        _id: '1.1',
        name: 'Lập trình web',
        href: '/categories/1.1/courses'
      }
    },
    tuition: 350000,
    discountPercent: 0.5,
    updatedAt: new Date('2021-01-09T16:59:58.031Z'),
    isFinished: true
  };

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
        fullName: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 650000,
      discountPercent: 0.3,
      updatedAt: new Date('2021-01-09T16:59:58.031Z')
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
        fullName: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date('2021-01-09T16:59:58.031Z'),
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
        fullName: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date('2021-01-09T16:59:58.031Z'),
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
        fullName: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date('2021-01-09T16:59:58.031Z'),
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
        fullName: 'Tue Vo'
      },
      categoryCluster: {
        name: 'Công nghệ thông tin',
        categories: [{
          name: 'Lập trình web'
        }]
      },
      tuition: 350000,
      discountPercent: 0.5,
      updatedAt: new Date('2021-01-09T16:59:58.031Z'),
    },
  ];

  for (let c of courses)
    c['href'] = `/courses/${c._id}`;

  const feedbacks = [
    {
      _id: 1,
      user: {
        _id: 1,
        fullName: 'Lana',
        avatarUrl: 'images/avatars/avatar_6.png'
      },
      rating: 4,
      comment: 'Nice course! I am looking forward to a new course.',
      createdAt: new Date('2021-01-09T16:59:58.031Z')
    },
    {
      _id: 2,
      user: {
        _id: 1,
        fullName: 'Lee Wei Shuan',
        avatarUrl: 'images/avatars/avatar_5.png'
      },
      rating: 5,
      comment: 'Nice course! I am looking forward to a new course.',
      createdAt: new Date('2021-01-09T16:59:58.031Z')
    },
    {
      _id: 3,
      user: {
        _id: 1,
        fullName: 'Steve Jonathan',
        avatarUrl: 'images/avatars/avatar_4.png'
      },
      rating: 3,
      comment: 'Not bad! I still found something that needed for me from this course.',
      createdAt: new Date('2021-01-09T16:59:58.031Z')
    },
    {
      _id: 4,
      user: {
        _id: 1,
        fullName: 'Steve Jonathan',
        avatarUrl: 'images/avatars/avatar_4.png'
      },
      rating: 3,
      comment: 'Not bad! I still found something that needed for me from this course.',
      createdAt: new Date('2021-01-09T16:59:58.031Z')
    },
    {
      _id: 5,
      user: {
        _id: 1,
        fullName: 'Steve Jonathan',
        avatarUrl: 'images/avatars/avatar_4.png'
      },
      rating: 3,
      comment: 'Not bad! I still found something that needed for me from this course.',
      createdAt: new Date('2021-01-09T16:59:58.031Z')
    }
  ];

  const lecturer = {
    _id: 1,
    fullName: 'Tue Vo',
    avatarUrl: 'images/avatars/tuevo.jpg',
    averageRating: 4.5,
    numberOfRatings: 1200,
    numberOfCourses: 10,
    introduction: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
  }

  return (
    <PerfectScrollbar
      className={classes.root}
      containerRef={el => (ps.current = el)}
    >
      <div className={classes.banner} style={{ backgroundImage: `url(${course.thumbnailUrl})` }}>
        <div className={classes.bannerCover}></div>
        <Box display="flex" flexDirection="column" className={`${classes.bannerContent} animate__animated animate__fadeIn`}>
          <Box ml={-2} mb={1} display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleBack} color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Box display="flex" color="inherit">
              {userState.authUser && userState.authUser.role === userRole.STUDENT.value && (
                <Button
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleBtnFavoriteClick}
                  size="small"
                  className={classes.btnContrast}
                >
                  Yêu thích
                </Button>
              )}
              {userState.authUser && userState.authUser.role === userRole.LECTURER.value && (
                <Box ml={1}>
                  <UpdateCourse course={course} className={classes.btnContrast} />
                </Box>
              )}
              {userState.authUser && userState.authUser.role === userRole.ADMIN.value && (
                <Box ml={1}>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="inherit"
                    onClick={handleBtnOpenRemovingCourseDialogClick}
                    size="small"
                    className={classes.btnContrast}
                  >
                    Gỡ khóa học
                  </Button>
                  <ConfirmDialog
                    title="Xác nhận"
                    content="Bạn thật sự muốn gỡ bỏ khóa học này?"
                    open={openRemovingCourseConfirmDialog}
                    onClose={isAccepted => handleRemovingCourseDialogClose(isAccepted)}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body2" color="inherit" >
                  {course.categoryCluster.name.toUpperCase()}
                </Typography>
                <ArrowRightIcon color="inherit" />
                <RouterLink to={course.categoryCluster.category.href}>
                  <Button size="small" color="primary">
                    <Typography variant="body2" style={{ color: '#fff' }}>
                      {course.categoryCluster.category.name.toUpperCase()}
                    </Typography>
                  </Button>
                </RouterLink>
              </Box>

              <Typography variant="h3" color="inherit"><b>{course.title}</b></Typography>
              <Typography variant="body1" className={classes.description} color="inherit">{course.description}</Typography>

              <Box display="flex" alignItems="center" className={classes.featuredCoursesCarouselItem__ratingDetails}>
                <Typography variant="body2" color="inherit" style={{ marginRight: 3 }}>
                  <span className={`${classes.label} ${classes.label__bestSeller}`} style={{ marginLeft: 0 }}>Best Seller</span>
                  {course.isFinished ? (
                    <span className={`${classes.label} ${classes.label__new}`} style={{ marginLeft: 9 }}>Đã hoàn thành</span>
                  ) : (<span className={`${classes.label} ${classes.label__unfinished}`} style={{ marginLeft: 9 }}>Chưa hoàn thành</span>)}
                  <span style={{ marginLeft: 9 }}>{`${Math.floor(course.averageRating)}.${(course.averageRating - Math.floor(course.averageRating)) * 10}`}</span>
                </Typography>
                <Box>
                  <Rating name="read-only" value={course.averageRating} size="small" precision={0.5} readOnly />
                </Box>
                <Typography variant="body2" color="inherit" style={{ marginLeft: 3 }}>
                  <span>(</span>
                  <NumberFormat value={course.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                  <span>)</span>
                </Typography>
                <Typography variant="body2" color="inherit" style={{ marginLeft: 9 }}>
                  <NumberFormat value={course.numberOfStudents} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' học viên'} />
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography variant="body2" color="inherit">Giảng viên: <b>{course.lecturer.fullName}</b></Typography>
                <Typography variant="body2" color="inherit" style={{ marginLeft: 9 }}>Cập nhật lần cuối: {moment(course.updatedAt).format('DD/MM HH:mm')}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="h3" className={classes.featuredCoursesCarouselItem__price} color="inherit">
                  <NumberFormat value={course.tuition - course.tuition * course.discountPercent} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={course.discountPercent > 0 ? 'Chỉ còn ' : `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica.`} suffix={'đ'} />
                </Typography>

                {course.discountPercent > 0 && (
                  <Typography variant="h4" color="inherit">
                    <strike>
                      <NumberFormat value={course.tuition} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={'đ'} />
                    </strike>
                    <span className={`${classes.label} ${classes.label__saleOff}`} style={{ marginLeft: 9 }}>Sale Off -{course.discountPercent * 100}%</span>
                  </Typography>
                )}

                {(userState.authUser && userState.authUser.role !== userRole.LECTURER.value && userState.authUser.role !== userRole.ADMIN.value) || !userState.authUser ? (
                  <Button
                    variant="contained"
                    className={classes.btnRegister}
                    color="primary"
                    size="large"
                  >
                    ĐĂNG KÝ KHÓA HỌC
                  </Button>
                ) : <></>}

              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>

      <main className={classes.main}>
        <div className={`${classes.panel} animate__animated animate__slideInUp`}>
          <AppBar position="static" className={classes.tabs} color="primary">
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" centered>
              <Tab icon={<SchoolIcon />} label="Nội dung khóa học" {...a11yProps(0)} />
              <Tab icon={<VideoLibraryIcon />} label="Video bài giảng" {...a11yProps(1)} />
              <Tab icon={<FeedbackIcon />} label="Đánh giá & phản hồi" {...a11yProps(2)} />
              <Tab icon={<PersonPinIcon />} label="Thông tin giảng viên" {...a11yProps(3)} />
            </Tabs>
          </AppBar>

          {tabValue === 0 && (
            <Box p={6}>
              <Typography variant="body1">
                <span dangerouslySetInnerHTML={{ __html: course.content }} />
              </Typography>
            </Box>
          )}

          {tabValue === 1 && (
            <Box p={6}>
              {userState.authUser && userState.authUser.role !== userRole.ADMIN.value && (
                <Box mb={4} display="flex" alignItems="center" style={{ width: '100%' }}>
                  {userState.authUser.role === userRole.LECTURER.value && (
                    <Box style={{ flexGrow: 2 }}>
                      <AddChapter />
                    </Box>
                  )}
                  {userState.authUser.role === userRole.STUDENT.value && (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={(<HistoryIcon />)}
                      size="large"
                      fullWidth
                      onClick={handleClickBtnShowWatchHistory}
                    >
                      Lịch sử theo dõi video
                    </Button>
                  )}
                </Box>
              )}
              <Box>
                {chapters.map((chapter, index) => (
                  <Accordion
                    key={index}
                    expanded={index === expandedChapterIndex}
                    className={classes.chapter}
                    ref={el => {
                      if (chapterRefs.current) {
                        chapterRefs.current = [
                          ...chapterRefs.current,
                          {
                            _id: chapter._id,
                            current: el
                          }
                        ]
                      } else {
                        chapterRefs.current = [
                          {
                            _id: chapter._id,
                            current: el
                          }
                        ]
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={classes.icon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => handleClickChapter(index)}
                    >
                      <Box display="flex" flexDirection="column">
                        <Typography variant="h5" gutterBottom><b>{chapter.title}</b></Typography>
                        <Typography variant="body1">
                          <NumberFormat value={chapter.totalVideos} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' video'} />
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {expandedChapterIndex === index && (
                        <Box className={classes.chapter__content}>
                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              {activeVideo && (
                                <div className={classes.videoPlayer}>
                                  <div className={classes.videoPlayer__video}>
                                    <VideoPlayer data={activeVideo} />
                                  </div>
                                  <Box px={2} pt={2} pb={1}>
                                    <Typography variant="h4" gutterBottom><b>{activeVideo.title}</b></Typography>
                                    <Typography variant="body2" gutterBottom>
                                      <span>Đăng lúc {moment(activeVideo.updatedAt).format('DD/MM HH:mm')} </span>
                                    </Typography>
                                  </Box>
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={4}>
                              <div className={classes.videoListContainer}>
                                {userState.authUser && userState.authUser.role === userRole.LECTURER.value && (
                                  <Tooltip title="Đăng tải video" className="animate__animated animate__bounceIn">
                                    <Fab
                                      size="medium"
                                      color="primary"
                                      aria-label="add"
                                      className={classes.btnAddVideo}
                                      onClick={handleClickBtnAddVideo}
                                    >
                                      <AddIcon />
                                    </Fab>
                                  </Tooltip>
                                )}
                                <Typography gutterBottom variant="body1" className={classes.videoList__title}>
                                  <PlaylistPlayIcon />
                                  <span style={{ marginLeft: 3 }}><b>Danh sách phát</b></span>
                                </Typography>
                                <PerfectScrollbar className={classes.videoList}>
                                  {expandedChapterVideoList.map(video => (
                                    <Card key={video._id} className={clsx(classes.videoListItem, {
                                      [classes.videoListItemActive]: video._id === activeVideo._id
                                    })}>
                                      <CardActionArea style={{ height: '100%' }}>
                                        <Grid container style={{ height: '100%' }}>
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
                                              <Typography gutterBottom variant="h6" color="inherit"><b>{video.title}</b></Typography>
                                              <Typography variant="body2" color="inherit">{`Đăng lúc ${moment(video.updatedAt).format('DD/MM HH:mm')}`}</Typography>
                                            </CardContent>
                                          </Grid>
                                        </Grid>
                                      </CardActionArea>
                                    </Card>
                                  ))}
                                </PerfectScrollbar>
                              </div>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          )}

          {tabValue === 2 && (
            <Box p={6}>
              {userState.authUser && userState.authUser.role !== userRole.LECTURER.value && userState.authUser.role !== userRole.ADMIN.value && (
                <AddFeedback />
              )}
              <Card className={classes.feedbackListContainer}>
                <CardContent>
                  <Typography variant="h5" className={classes.secondaryText} gutterBottom>
                    <b><NumberFormat value={2500} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' bình luận'} /></b>
                  </Typography>
                  <PerfectScrollbar className={classes.feedbackList}>
                    {feedbacks.map(f => (
                      <Box key={f._id} display="flex" className={classes.feedbackItem}>
                        <Avatar alt={f.user.fullName} src={f.user.avatarUrl} className={classes.feedbackItem__avatar} />
                        <Box display="flex" flexDirection="column" className={classes.feedbackItem__comment}>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body1"><b>{f.user.fullName}</b></Typography>
                            <Typography variant="body2" style={{ marginLeft: 9 }}>{format(f.createdAt, 'vi')}</Typography>
                          </Box>
                          <Rating name="read-only" value={f.rating} size="small" precision={0.5} readOnly />
                          <Box pt={1}>
                            <Typography variant="body1">{f.comment}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </PerfectScrollbar>
                </CardContent>
              </Card>
            </Box>
          )}

          {tabValue === 3 && (
            <Box p={6}>
              <Box display="flex">
                <Avatar alt={lecturer.name} src={lecturer.avatarUrl} className={classes.lecturer__avatar} />
                <Box display="flex" flexDirection="column" pt={1}>
                  <Typography variant="h4" className={classes.secondaryText} gutterBottom><b>{lecturer.fullName}</b></Typography>
                  <Box display="flex">
                    <Typography variant="body1" style={{ marginRight: 3 }}>
                      {`${Math.floor(lecturer.averageRating)}.${(lecturer.averageRating - Math.floor(lecturer.averageRating)) * 10}`}
                    </Typography>
                    <Rating name="read-only" value={lecturer.averageRating} size="small" precision={0.5} readOnly />
                    <Typography variant="body1" style={{ marginLeft: 3 }}>
                      <span>(</span>
                      <NumberFormat value={lecturer.numberOfRatings} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lượt đánh giá'} />
                      <span>)</span>
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: 9 }}>
                      <NumberFormat value={lecturer.numberOfCourses} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' khóa học'} />
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box pt={2}>
                <Typography variant="body1">{lecturer.introduction}</Typography>
              </Box>
            </Box>
          )}

        </div>
        <div className={`${classes.section} ${classes.highestViewCourses} animate__animated animate__fadeInUp`}>
          <Typography variant="h5" className={classes.highestViewCourses__title}><b>Các khóa học liên quan</b></Typography>
          <div className={classes.highestViewCoursesCarousel}>
            <CourseMultiCarousel courses={courses || []} />
          </div>
        </div>

        {userState.authUser && userState.authUser.role === userRole.LECTURER.value && (
          <AddVideo
            open={openAddVideo}
            onClose={handleCloseAddVideo}
          />
        )}

        {userState.authUser && userState.authUser.role === userRole.STUDENT.value && (
          <WatchHistory
            data={{ course }}
            open={openWatchHistory}
            onClose={handleCloseWatchHistory}
            onClickVideo={handleClickWatchHistoryVideo}
          />
        )}

      </main>
    </PerfectScrollbar>
  );
};

export default CourseDetails;