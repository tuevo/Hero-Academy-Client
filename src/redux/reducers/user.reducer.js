import { actionTypes } from '../actions/action-types';

const initialStates = {
  authUser: {
    role: 2
  }
}

const userActionTypes = { ...actionTypes.user };

const userReducer = (states = initialStates, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN:
      return { ...states, authUser: action.payload };

    case userActionTypes.SIGN_OUT:
      return { ...states, authUser: null }

    default:
      return states;
  }
}

export default userReducer;