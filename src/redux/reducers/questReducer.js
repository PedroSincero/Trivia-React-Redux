import { ADD_QUESTION, REQUEST_API, SUBTRACT_TIMER, RESET_TIMER } from '../actions';

export const INITIAL_STATE = {
  question: '',
  loading: true,
  id: 0,
  timer: 30,
};

export function questReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state,
      loading: action.loading,
    };
  case ADD_QUESTION:
    return {
      ...state,
      question: action.question,
      loading: action.loading,
    };
  case SUBTRACT_TIMER:
    return { ...state,
      timer: action.timer,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: 30,
    };
  default:
    return state;
  }
}
