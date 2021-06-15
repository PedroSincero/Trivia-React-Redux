// Recebe um email, trata ele com MD5, cria um hash e devolve a url do avatar do usuario
async function getTriviaQuestions() {
  const localToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
  const data = await response.json();
  return data;
}

export default getTriviaQuestions;
