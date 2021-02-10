import { actionTypes } from '../actions/action-types';

const initialStates = {
  basics: null,
  scrollbarTop: 0
}

const pageActionTypes = { ...actionTypes.page };

const pageReducer = (states = initialStates, action) => {
  switch (action.type) {
    case pageActionTypes.SET_PAGE_BASICS:
      return { ...states, basics: action.payload };

    case pageActionTypes.SET_SCROLLBAR_TOP:
      return { ...states, scrollbarTop: action.payload };

    default:
      return states;
  }
}

export default pageReducer;