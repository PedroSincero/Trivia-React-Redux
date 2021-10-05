import { combineReducers } from 'redux';
import userReducer from './userReducer';
import configReducer from './configReducer';
import { loginReducer } from './loginReducer';
import { questReducer } from './questReducer';

const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  questReducer,
  configReducer,
});

export default rootReducer;
