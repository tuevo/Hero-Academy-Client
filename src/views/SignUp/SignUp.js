import {
  Button, Grid,



  Link, TextField,



  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { useDispatch } from 'react-redux';
import { availablePages } from 'constants/global.constant';

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    backgroundImage: 'url(https://cdn.dribbble.com/users/2260983/screenshots/5875334/_______1-8.png)',
    backgroundSize: 'cover'
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.paper,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.paper
  },
  bio: {
    color: theme.palette.paper
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.signUp,
  },
  contentHeader: {
    // display: 'flex',
    // alignItems: 'center',
    // paddingTop: theme.spacing(5),
    // paddingBototm: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    padding: '6.25rem',
    flexBasis: '40.625rem',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(4, 0, 2, 0),
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  cover: {
    width: '25rem'
  },
  input: {
    ...theme.palette.input
  }
}));

const SignUp = props => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const params = { ...formState.values };
    console.log(params);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
            </div>
            <div className={classes.contentBody}>
              <form
                className={`${classes.form} animate__animated animate__fadeIn`}
                onSubmit={handleSubmit}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  gutterBottom
                >
                  Đăng ký tài khoản học viên
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Hãy sử dụng địa chỉ email của bạn để đăng ký
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('fullName')}
                  fullWidth
                  helperText={
                    hasError('fullName') ? formState.errors.fullName[0] : null
                  }
                  label="Họ và tên"
                  name="fullName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.fullName || ''}
                  variant="standard"
                  InputProps={{
                    classes: {
                      underline: classes.input
                    }
                  }}
                  autoFocus
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Địa chỉ email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="standard"
                  InputProps={{
                    classes: {
                      underline: classes.input
                    }
                  }}
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Mật khẩu"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="standard"
                  InputProps={{
                    classes: {
                      underline: classes.input
                    }
                  }}
                />
                <TextField
                  className={classes.textField}
                  error={hasError('confirmPassword')}
                  fullWidth
                  helperText={
                    hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null
                  }
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.confirmPassword || ''}
                  variant="standard"
                  InputProps={{
                    classes: {
                      underline: classes.input
                    }
                  }}
                />
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                >
                  Đăng ký
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Đã có tài khoản?{' '}
                  <Link
                    component={RouterLink}
                    to={availablePages.SIGN_IN.path}
                    variant="h6"
                  >
                    Đăng nhập
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
