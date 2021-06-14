export const ADD_TOKEN = 'GET_TOKEN';
export const ADD_IMG_URL = 'ADD_IMG_URL';
export const ADD_USER_INFO = 'ADD_USER_INFO';

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
