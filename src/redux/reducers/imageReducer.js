import { ADD_IMG_URL } from '../actions/image';

const INITIAL_STATE = {
  picture: 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png',
};

const imageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_IMG_URL:
    return { picture: action.payload };
  default:
    return { ...state };
  }
};

export default imageReducer;
