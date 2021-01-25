import { actionTypes } from './action-types';

const pageActionTypes = { ...actionTypes.page };

export const setPageBasics = (basics) => {
  return {
    type: pageActionTypes.SET_PAGE_BASICS,
    payload: basics
  }
}