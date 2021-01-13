import SchoolIcon from '@material-ui/icons/School';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const availablePages = {
  HOME: {
    title: 'Trang chủ',
    path: '/',
    auth: false
  },
  COURSE_DETAILS: {
    title: 'Chi tiết khóa học',
    path: '/course-details',
    auth: false
  },
  CATEGORY_COURSES: {
    title: 'Danh sách khóa học',
    path: '/category-courses',
    auth: false
  },
  COURSE_SEARCHING: {
    title: 'Tìm kiếm khóa học',
    path: '/course-searching',
    auth: false
  },
  SIGN_UP: {
    title: 'Đăng ký tài khoản học viên',
    path: '/sign-up',
    auth: false
  },
  SIGN_IN: {
    title: 'Đăng nhập tài khoản',
    path: '/sign-in',
    auth: false
  },
  NOT_FOUND: {
    title: 'Not Found',
    path: '/not-found',
    auth: false
  },
  IN_CHARGE_COURSES: {
    title: 'Khóa học phụ trách',
    path: '/in-charge-courses',
    auth: true,
    role: 3,
    icon: SchoolIcon
  },
  PROFILE: {
    title: 'Hồ sơ cá nhân',
    path: '/profile',
    auth: true,
    role: 0,
    icon: AccountCircleIcon
  }
};

export const APP_NAME = 'Hero Academy';