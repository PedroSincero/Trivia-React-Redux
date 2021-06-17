import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../style/Game.css';
import {
  fetchQuestions,
  updateId, resetTimer, updatePoints, totalScore } from '../redux/actions';
import { updateLocalStorage } from '../services/helpers/localStorage';
import Cronometer from '../components/Cronometer';

const INITIAL_STATE = {
  answered: false,
  assertions: 0,
  score: 0,
  isDisabled: false,
  nextButton: false,
};
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.randomArray = this.randomArray.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.checkDisabled = this.checkDisabled.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.teste = this.teste.bind(this);
  }

  async componentDidMount() {
    // const { questTrivia } = this.props;
    // const { score, assertions } = this.state;
    // await questTrivia();
    // updateLocalStorage('state', { player: { score, assertions } });
    this.teste();
  }

  async teste() {
    const { questTrivia } = this.props;
    const { score, assertions } = this.state;
    await questTrivia();
    updateLocalStorage('state', { player: { score, assertions } });
  }

  nextQuestion() {
    const { idAPI, setNextQuestion, timerReset, history } = this.props;
    const FOUR = 4;
    if (idAPI < FOUR) {
      setNextQuestion(idAPI + 1);
      this.setState({ answered: false });
      timerReset();
      this.setState({ isDisabled: false, nextButton: false });
    } else {
      history.push('/feedback');
    }
  }

  randomArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  checkAnswer(isCorrect) {
    const { answered } = this.state;
    if (answered) return;
    console.log(isCorrect);
    if (isCorrect) {
      const { updtPoints, addScore } = this.props;
      const score = this.doCalculation();
      updateLocalStorage('state', { player: { score } });
      updtPoints(score);
      addScore(score);
    }
    this.setState({ answered: true, nextButton: true });
  }

  checkDisabled() {
    this.setState({ isDisabled: true });
  }

  // Calculo: 10 pontos estaticos
  // valor do timer
  // Difficulty: hard = 3, med = 2, easy =1
  doCalculation() {
    const { questAPI, idAPI, timer } = this.props;
    const { difficulty } = questAPI[idAPI];
    const staticPoint = 10;
    let points = 1;
    const TRES = 3;
    switch (difficulty) {
    case 'hard':
      points = TRES;
      break;
    case 'medium':
      points = 2;
      break;
    default:
      points = 1;
    }
    return staticPoint + (points * timer);
  }

  handleCorrectAnswer(correct) {
    const { answered, isDisabled } = this.state;
    return (
      <button
        type="button"
        onClick={ () => this.checkAnswer(true) }
        data-testid="correct-answer"
        className={ answered && 'correctAnswer' }
        disabled={ isDisabled }
      >
        {correct}
      </button>
    );
  }

  handleIncorrectAnswer(incorrects) {
    const { answered, isDisabled } = this.state;
    return incorrects.map((incorrect, index) => (
      <button
        type="button"
        onClick={ () => this.checkAnswer() }
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        className={ answered && 'incorrectAnswer' }
        disabled={ isDisabled }
      >
        {incorrect}
      </button>
    ));
  }

  handleButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.nextQuestion();
        } }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { isLoading } = this.props;
    const { nextButton } = this.state;
    if (!isLoading) {
      const { questAPI, idAPI } = this.props;
      const { answered } = this.state;
      const {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questAPI[idAPI];
      const correct = this.handleCorrectAnswer(correctAnswer);
      const incorrect = this.handleIncorrectAnswer(incorrectAnswers);
      const answers = [correct, ...incorrect];
      const randomAnswers = this.randomArray(answers);
      return (
        <div>
          <Header />
          <h2 data-testid="question-category">{category}</h2>
          <h3 data-testid="question-text">{question}</h3>
          <section>{randomAnswers}</section>
          <Cronometer
            answered={ answered }
            disabled={ this.checkDisabled }
            checkAnswer={ this.checkAnswer }
          />
          {nextButton && this.handleButton()}
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

const mapStateToProps = (state) => ({
  questAPI: state.questReducer.question,
  isLoading: state.questReducer.loading,
  idAPI: state.questReducer.id,
  timer: state.questReducer.timer,
  // nameUser: state.userReducer.user,
  // email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  questTrivia: () => dispatch(fetchQuestions()),
  setNextQuestion: (newId) => dispatch(updateId(newId)),
  timerReset: () => dispatch(resetTimer()),
  updtPoints: (score) => dispatch(updatePoints(score)),
  addScore: (score) => dispatch(totalScore(score)),
});

Game.propTypes = {
  questAPI: PropTypes.func.isRequired,
  questTrivia: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  idAPI: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  setNextQuestion: PropTypes.func.isRequired,
  timerReset: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  updtPoints: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

// Agradecimentos ao Site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
