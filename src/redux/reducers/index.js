import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { login } from './loginReducer';

const rootReducer = combineReducers({
  login,
  userReducer,
});

export default rootReducer;
