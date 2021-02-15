import { actionTypes } from './action-types';

const pageActionTypes = { ...actionTypes.page };

export const setPageBasics = (basics) => {
  return {
    type: pageActionTypes.SET_PAGE_BASICS,
    payload: basics
  }
}

export const setScrollbarTop = (top) => {
  return {
    type: pageActionTypes.SET_SCROLLBAR_TOP,
    payload: top
  }
}

export const setPageLoading = (isLoading) => {
  return {
    type: pageActionTypes.SET_PAGE_LOADING,
    payload: isLoading
  }
}