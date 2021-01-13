import { actionTypes } from './action-types';

const appActionTypes = { ...actionTypes.app };

export const setLoading = (isLoading) => {
  return {
    type: appActionTypes.SET_LOADING,
    payload: isLoading
  }
}

export const showNotification = (type, message) => {
  return {
    type: appActionTypes.SHOW_NOTIFICATION,
    payload: { type, message }
  }
}

export const hideNotification = () => {
  return {
    type: appActionTypes.HIDE_NOTIFICATION
  }
}

export const setActivePage = (page) => {
  return {
    type: appActionTypes.SET_ACTIVE_PAGE,
    payload: page
  }
}