import { ADD_TOKEN } from '../actions';

export const INITIAL_STATE = {
  tokenUser: '',
};

export function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TOKEN:
    return {
      ...state,
      tokenUser: action.token,
    };
  default:
    return state;
  }
}
