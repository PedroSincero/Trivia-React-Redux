import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { loginReducer } from './loginReducer';
import { questReducer } from './questReducer';

const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  questReducer,
});

export default rootReducer;
