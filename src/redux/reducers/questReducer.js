import { ADD_QUESTION, REQUEST_API } from '../actions';

export const INITIAL_STATE = {
  question: '',
  loading: true,
  id: 0,
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
  default:
    return state;
  }
}
