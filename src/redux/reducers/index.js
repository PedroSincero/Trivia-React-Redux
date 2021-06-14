import { combineReducers } from 'redux';
import imageReducer from './imageReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  login,
  imageReducer,
});

export default rootReducer;
