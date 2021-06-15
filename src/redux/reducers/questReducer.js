import { ADD_QUESTION } from '../actions';

export const INITIAL_STATE = {
  question: '',
};

export function questReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTION:
    return {
      ...state,
      question: action.question,
    };
  default:
    return state;
  }
}
