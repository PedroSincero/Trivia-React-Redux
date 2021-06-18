const randomArray = (arr) => {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
};

const randomize = (data) => data.results.map((question) => {
  const correctAnswer = question.correct_answer;
  const incorretAnswer = question.incorrect_answers;
  const newArray = randomArray([correctAnswer, ...incorretAnswer]);
  question.randomAnswers = newArray;
  return question;
});

export default randomize;
