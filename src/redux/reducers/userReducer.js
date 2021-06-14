import { ADD_IMG_URL, ADD_USER_INFO } from '../actions';

const INITIAL_STATE = {
  picture: 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png',
  user: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_IMG_URL:
    return { ...state, picture: action.payload };
  case ADD_USER_INFO:
    return { ...state, user: action.payload.username, email: action.payload.email };
  default:
    return { ...state };
  }
};

export default userReducer;
