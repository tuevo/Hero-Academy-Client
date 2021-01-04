import { actionTypes } from '../actions/action-types';

const initialStates = {
  isLoading: false,
  notification: {
    type: '',
    message: ''
  },
  isNotificationOpened: false
}

const appActionTypes = { ...actionTypes.app };

const appReducer = (states = initialStates, action) => {
  switch (action.type) {
    case appActionTypes.SET_LOADING:
      return { ...states, isLoading: action.payload };

    case appActionTypes.SHOW_NOTIFICATION:
      return { ...states, notification: action.payload, isNotificationOpened: true };

    case appActionTypes.HIDE_NOTIFICATION:
      return { ...states, isNotificationOpened: false }

    default:
      return states;
  }
}

export default appReducer;