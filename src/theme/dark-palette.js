import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.purple['A700'],
    main: colors.purple['A700'],
    light: 'rgba(123, 31, 162, 0.1)',
    light1: 'rgba(123, 31, 162, 0.15)'
  },
  secondary: {
    contrastText: white,
    dark: colors.amber[900],
    main: colors.amber[800],
    light: colors.amber['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: white,
    secondary: colors.grey[400],
    link: colors.orange['A400'],
  },
  background: {
    default: '#212121',
    paper: '#313131',
    course: '#212121',
    signIn: 'rgba(0,0,0,0.4)',
    signUp: 'rgba(0,0,0,0.4)'
  },
  border: {
    color: '#414141'
  },
  card: {
    backgroundColor: '#313131',
    borderRadius: '0.625rem'
  },
  icon: colors.grey[400],
  divider: colors.grey[200]
};
