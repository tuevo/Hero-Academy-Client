import { actionTypes } from '../actions/action-types';

const initialStates = {
  authUser: {
    fullName: 'Tue Vo',
    avatarUrl: 'images/avatars/tuevo.jpg',
    email: 'tuevo.it@gmail.com',
    introduction: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
    role: 3,
    averageRating: 5,
    numberOfRatings: 1200,
    numberOfStudents: 2500,
    numberOfCourses: 10
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