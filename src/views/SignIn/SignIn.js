import {
  Button, Grid,



  Link, TextField,

  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import userApi from 'api/user.api';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { setLoading, showNotification } from 'redux/actions/app.action';
import validate from 'validate.js';
import { localStorageItems } from '../../constants/local-storage.constant';
import { signIn } from '../../redux/actions/user.action';



const schema = {
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
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.white
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '37.5rem'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
    paddingRight: 200,
    paddingBottom: 125,
    flexBasis: 600,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  cover: {
    width: '28rem'
  }
}));

const SignIn = props => {
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

  const handleSignIn = event => {
    event.preventDefault();
    const params = {
      email: formState.values.email,
      password: formState.values.password
    }

    const postSignIn = async () => {
      dispatch(setLoading(true));
      try {
        const res = await userApi.signIn(params);

        const { user, meta: { accessToken } } = res.data;
        if (!user || !accessToken) {
          console.log("Sign In Component: user or accessToken is not defined");
          return;
        }

        localStorage.setItem(localStorageItems.ACCESS_TOKEN.name, accessToken);
        dispatch(signIn(user));
        dispatch(setLoading(false));

        history.push('/');
      } catch (error) {
        if (error.errors && error.errors.length > 0) {
          dispatch(setLoading(false));
          dispatch(showNotification('error', error.errors[0]));
        }
      }
    }

    postSignIn();
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
          <div className={classes.quote}>
            <img className={`${classes.cover} animate__animated animate__fadeInLeft`} src="https://image.freepik.com/free-vector/lock-security-by-password-key-computer-web-internet-protection-information-safety-illustration-online-data-secure-technology-concept-digital-network-system-access_109722-2433.jpg" alt="" />
          </div>
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
                className={`${classes.form} animate__animated animate__fadeInRight`}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  gutterBottom
                >
                  Đăng nhập tài khoản
                </Typography>
                {/* <Typography
                  className={classes.constrastText}
                  gutterBottom
                >
                  Sign in with social media
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                      style={{ backgroundColor: '#2957f3' }}
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={`${classes.sugestion} ${classes.constrastText}`}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography> */}
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
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Đăng nhập
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Chưa có tài khoản?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Đăng ký
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

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
