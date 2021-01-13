import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { Notification } from 'components/Notification';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { hideNotification } from 'redux/actions/app.action';
import Loading from 'components/Loading/Loading';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const App = () => {
  const notificationState = useSelector(state => ({
    open: state.app.isNotificationOpened,
    type: state.app.notification.type,
    message: state.app.notification.message,
  }), shallowEqual);

  const loadingState = useSelector(state => ({
    isLoading: state.app.isLoading
  }), shallowEqual);

  const dispatch = useDispatch();

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  }

  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
      <Loading open={loadingState.isLoading} />
      <Notification
        open={notificationState.open}
        type={notificationState.type}
        message={notificationState.message}
        onClose={handleCloseNotification}
      />
    </ThemeProvider>
  );
}

export default App;
