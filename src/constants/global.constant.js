import SchoolIcon from '@material-ui/icons/School';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const availablePages = {
  HOME: {
    _id: 1,
    title: 'Trang chủ',
    path: '/',
    auth: false
  },
  COURSE_DETAILS: {
    _id: 2,
    title: 'Chi tiết khóa học',
    path: '/course-details',
    auth: false
  },
  CATEGORY_COURSES: {
    _id: 3,
    title: 'Danh sách khóa học',
    path: '/category-courses',
    auth: false
  },
  COURSE_SEARCHING: {
    _id: 4,
    title: 'Tìm kiếm khóa học',
    path: '/course-searching',
    auth: false
  },
  SIGN_UP: {
    _id: 5,
    title: 'Đăng ký tài khoản học viên',
    path: '/sign-up',
    auth: false
  },
  SIGN_IN: {
    _id: 6,
    title: 'Đăng nhập tài khoản',
    path: '/sign-in',
    auth: false
  },
  NOT_FOUND: {
    _id: 7,
    title: 'Not Found',
    path: '/not-found',
    auth: false
  },
  IN_CHARGE_COURSES: {
    _id: 8,
    title: 'Khóa học phụ trách',
    path: '/in-charge-courses',
    auth: true,
    role: 3,
    icon: SchoolIcon
  },
  PROFILE: {
    _id: 9,
    title: 'Hồ sơ cá nhân',
    path: '/profile',
    auth: true,
    role: 0,
    icon: AccountCircleIcon
  }
};

export const APP_NAME = 'Hero Academy';