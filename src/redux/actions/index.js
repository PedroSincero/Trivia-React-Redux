export const ADD_TOKEN = 'GET_TOKEN';
export const ADD_IMG_URL = 'ADD_IMG_URL';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REQUEST_API = 'REQUEST_API';
export const RESET_TIMER = 'RESET_TIMER';
export const SUBTRACT_TIMER = 'SUBTRACT_TIMER';
export const UPDATE_ID = 'UPDATE_ID';
export const UPDATE_POINTS = 'UPDATE_POINTS';
export const TOTAL_SCORE = 'TOTAL_SCORE';
export const RESET_SOMETHING = 'RESET_SOMETHING';

export const getToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const subtractTimer = (timer) => ({
  type: SUBTRACT_TIMER,
  timer,
});

export const resetSomething = (something) => ({
  type: RESET_SOMETHING,
  payload: something,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getToken(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateId = (id) => ({
  type: UPDATE_ID,
  id,
});

// Recebe uma url de imagem para o avatar
export const addImage = (img) => ({
  type: ADD_IMG_URL,
  payload: img,
});

// Recebe um nome de usuário e email e passa para o redux.
export const addUserInfo = (username, email) => ({
  type: ADD_USER_INFO,
  payload: { username, email },
});
// ----- REQ 5
export const getQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
  loading: false,
});

export const requestAPI = () => ({
  type: REQUEST_API,
  loading: true,
});

export const updatePoints = (score) => ({
  type: UPDATE_POINTS,
  score,
});

export const totalScore = (score) => ({
  type: TOTAL_SCORE,
  score,
});

export function fetchQuestions() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const localToken = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
      const data = await response.json();
      dispatch(getQuestion(data.results));
    } catch (error) {
      console.log(error);
    }
  };
}
