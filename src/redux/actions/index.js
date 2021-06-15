// import getTriviaQuestions from '/src/services/api/getTriviaQuestions';

export const ADD_TOKEN = 'GET_TOKEN';
export const ADD_IMG_URL = 'ADD_IMG_URL';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_QUESTION = 'ADD_QUESTION';

export const getToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export function fetchToken() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(getToken(data));
    } catch (error) {
      console.log(error);
    }
  };
}

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
});
// -----
async function getTriviaQuestions() {
  const localToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
  const data = await response.json();
  return data;
}
// ----
export function fetchQuestions() {
  return async (dispatch) => {
    try {
      const data = getTriviaQuestions();
      dispatch(getQuestion(data));
    } catch (error) {
      console.log(error);
    }
  };
}
