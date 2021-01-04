import { actionTypes } from '../actions/action-types';

const initialStates = {
  currentUser: null
}

const userActionTypes = { ...actionTypes.user };

const userReducer = (states = initialStates, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN:
      return { ...states, currentUser: action.payload };

    case userActionTypes.SIGN_OUT:
      return { ...states, currentUser: null }

    default:
      return states;
  }
}

export default userReducer;