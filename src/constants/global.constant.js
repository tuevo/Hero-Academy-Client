import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { userRole } from './user-role.constant';

export const availablePages = {
  HOME: {
    _id: 1,
    title: 'Trang chủ',
    path: '/',
    auth: false,
    role: userRole.GUEST.value
  },
  SIGN_UP: {
    _id: 2,
    title: 'Đăng ký tài khoản học viên',
    path: '/sign-up',
    auth: false,
    role: userRole.GUEST.value
  },
  SIGN_IN: {
    _id: 3,
    title: 'Đăng nhập tài khoản',
    path: '/sign-in',
    auth: false,
    role: userRole.GUEST.value
  },
  NOT_FOUND: {
    _id: 4,
    title: 'Not Found',
    path: '/not-found',
    auth: false,
    role: userRole.GUEST.value
  },
  COURSE_DETAILS: {
    _id: 2,
    title: 'Chi tiết khóa học',
    path: '/course-details',
    auth: false,
    role: userRole.GUEST.value
  },
  CATEGORY_COURSES: {
    _id: 5,
    title: 'Danh sách khóa học',
    path: '/category-courses',
    auth: false,
    role: userRole.GUEST.value
  },
  COURSE_SEARCHING: {
    _id: 6,
    title: 'Tìm kiếm khóa học',
    path: '/course-searching',
    auth: false,
    role: userRole.GUEST.value
  },
  REGISTRATION_COURSES: {
    _id: 7,
    title: 'Khóa học đăng ký',
    path: '/registration-courses',
    auth: true,
    role: userRole.STUDENT.value,
    icon: SchoolIcon
  },
  FAVORITE_COURSES: {
    _id: 8,
    title: 'Khóa học yêu thích',
    path: '/favorite-courses',
    auth: true,
    role: userRole.STUDENT.value,
    icon: FavoriteIcon
  },
  IN_CHARGE_COURSES: {
    _id: 9,
    title: 'Khóa học phụ trách',
    path: '/in-charge-courses',
    auth: true,
    role: userRole.LECTURER.value,
    icon: SchoolIcon
  },
  COURSES: {
    _id: 10,
    title: 'Tất cả khóa học',
    path: '/courses',
    auth: true,
    role: userRole.ADMIN.value,
    icon: SchoolIcon
  },
  USERS: {
    _id: 11,
    title: 'Học viên & Giảng viên',
    path: '/users',
    auth: true,
    role: userRole.ADMIN.value,
    icon: PeopleIcon
  },
  PROFILE: {
    _id: 99,
    title: 'Hồ sơ cá nhân',
    path: '/profile',
    auth: true,
    role: userRole.GUEST.value,
    icon: AssignmentIndIcon
  }
};

export const APP_NAME = 'Hero Academy';