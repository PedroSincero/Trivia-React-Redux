import { CHANGE_CONFIG } from '../actions';

const INITIAL_STATE = {
  category: 'any',
  difficulty: 'any',
  type: 'any',

};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CONFIG:
    return { ...state, [action.payload.name]: action.payload.value };
  default:
    return { ...state };
  }
};

export default configReducer;
