import {
  ADD_QUESTION,
  REQUEST_API,
  SUBTRACT_TIMER,
  UPDATE_ID,
  UPDATE_POINTS,
  TOTAL_SCORE,
  RESET_SOMETHING } from '../actions';

export const INITIAL_STATE = {
  question: '',
  loading: true,
  id: 0,
  timer: 30,
  score: 0,
  totalScore: 0,
  assertions: 0,
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
  case RESET_SOMETHING:
    return {
      ...state,
      ...action.payload,
    };
  case UPDATE_ID:
    return { ...state, id: action.id };

  case UPDATE_POINTS:
    return {
      ...state,
      score: action.score,
      assertions: state.assertions + 1,
    };
  case TOTAL_SCORE:
    return {
      ...state,
      totalScore: state.totalScore + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}
