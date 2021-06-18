import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../style/Game.css';
import {
  fetchQuestions,
  updateId, updatePoints, totalScore, resetSomething } from '../redux/actions';
import { updateLocalStorage, setOnLocalStorage,
  getFromLocalStorage } from '../services/helpers/localStorage';
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
    this.checkAnswer = this.checkAnswer.bind(this);
    this.checkDisabled = this.checkDisabled.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
  }

  async componentDidMount() {
    this.getQuestion();
  }

  async getQuestion() {
    const { questTrivia } = this.props;
    const { score, assertions } = this.state;
    await questTrivia();
    updateLocalStorage('state', { player: { score, assertions } });
  }

  nextQuestion() {
    const { idAPI, setNextQuestion,
      somethingReset, history, nameUser, picture, summedScore } = this.props;
    const FOUR = 4;
    if (idAPI < FOUR) {
      setNextQuestion(idAPI + 1);
      this.setState({ answered: false });
      somethingReset({ timer: 30 });
      this.setState({ isDisabled: false, nextButton: false });
    } else {
      const infoRanking = [{ name: nameUser, score: summedScore, picture }];
      const arrayStorage = getFromLocalStorage('ranking');
      if (arrayStorage) {
        setOnLocalStorage('ranking', [...arrayStorage, ...infoRanking]);
      } else {
        setOnLocalStorage('ranking', infoRanking);
      }
      history.push('/feedback');
    }
  }

  checkAnswer(isCorrect) {
    const { answered } = this.state;
    if (answered) return;
    if (isCorrect) {
      const { addScore, assertions, summedScore } = this.props;
      const score = this.doCalculation();
      const updatedScore = score + summedScore;
      updateLocalStorage('state',
        { player: { score: updatedScore, assertions: assertions + 1 } });
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

  handleIncorrectAnswer(incorrect, index) {
    const { answered, isDisabled } = this.state;
    return (
      <button
        type="button"
        onClick={ () => this.checkAnswer() }
        data-testid={ `wrong-answer-${index}` }
        className={ answered && 'incorrectAnswer' }
        disabled={ isDisabled }
      >
        {incorrect}
      </button>
    );
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

  renderAlternatives() {
    const { questAPI, idAPI } = this.props;
    const {
      randomAnswers,
      incorrect_answers: incorrectAnswers,
    } = questAPI[idAPI];
    return randomAnswers.map((question, index) => {
      if (incorrectAnswers.includes(question)) {
        return this.handleIncorrectAnswer(question, index);
      }
      return this.handleCorrectAnswer(question);
    });
  }

  render() {
    const { isLoading } = this.props;
    const { nextButton } = this.state;
    if (!isLoading) {
      const { questAPI, idAPI } = this.props;
      const { answered } = this.state;
      const { category, question } = questAPI[idAPI];
      return (
        <div>
          <Header />
          <h2 data-testid="question-category">{category}</h2>
          <h3 data-testid="question-text">{question}</h3>
          <section>{this.renderAlternatives()}</section>
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
  assertions: state.questReducer.assertions,
  nameUser: state.userReducer.user,
  email: state.userReducer.email,
  picture: state.userReducer.picture,
  summedScore: state.questReducer.totalScore,
});

const mapDispatchToProps = (dispatch) => ({
  questTrivia: () => dispatch(fetchQuestions()),
  setNextQuestion: (newId) => dispatch(updateId(newId)),
  somethingReset: (something) => dispatch(resetSomething(something)),
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
  somethingReset: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  summedScore: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  addScore: PropTypes.func.isRequired,
  nameUser: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

// Agradecimentos ao Site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
