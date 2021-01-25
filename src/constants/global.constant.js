import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
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
    path: '/dang-ky-tai-khoan-hoc-vien',
    auth: false,
    role: userRole.GUEST.value
  },
  SIGN_IN: {
    _id: 3,
    title: 'Đăng nhập tài khoản',
    path: '/dang-nhap',
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
    path: '/chi-tiet-khoa-hoc',
    auth: false,
    role: userRole.GUEST.value
  },
  CATEGORY_COURSES: {
    _id: 5,
    title: 'Danh sách khóa học',
    path: '/khoa-hoc-thuoc-linh-vuc',
    auth: false,
    role: userRole.GUEST.value
  },
  COURSE_SEARCHING: {
    _id: 6,
    title: 'Tìm kiếm khóa học',
    path: '/tim-kiem-khoa-hoc',
    auth: false,
    role: userRole.GUEST.value
  },
  REGISTRATION_COURSES: {
    _id: 7,
    title: 'Khóa học đăng ký',
    path: '/khoa-hoc-dang-ky',
    auth: true,
    role: userRole.STUDENT.value,
    icon: SchoolIcon
  },
  FAVORITE_COURSES: {
    _id: 8,
    title: 'Khóa học yêu thích',
    path: '/khoa-hoc-yeu-thich',
    auth: true,
    role: userRole.STUDENT.value,
    icon: FavoriteIcon
  },
  IN_CHARGE_COURSES: {
    _id: 9,
    title: 'Khóa học phụ trách',
    path: '/khoa-hoc-phu-trach',
    auth: true,
    role: userRole.LECTURER.value,
    icon: SchoolIcon
  },
  CATEGORIES: {
    _id: 10,
    title: 'Lĩnh vực',
    path: '/linh-vuc',
    auth: true,
    role: userRole.ADMIN.value,
    icon: CategoryIcon
  },
  COURSES: {
    _id: 11,
    title: 'Khóa học',
    path: '/khoa-hoc',
    auth: true,
    role: userRole.ADMIN.value,
    icon: SchoolIcon
  },
  USERS: {
    _id: 12,
    title: 'Thành viên',
    path: '/thanh-vien',
    auth: true,
    role: userRole.ADMIN.value,
    icon: PeopleIcon
  },
  PROFILE: {
    _id: 99,
    title: 'Tài khoản',
    path: '/tai-khoan',
    auth: true,
    role: userRole.GUEST.value,
    icon: AccountCircleIcon
  }
};

export const APP_NAME = 'Hero Academy';