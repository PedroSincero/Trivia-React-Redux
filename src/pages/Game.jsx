import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../components/Header";
import "../style/Game.css";
import {
  fetchQuestions,
  updateId,
  updatePoints,
  totalScore,
  resetSomething,
} from "../redux/actions";
import {
  updateLocalStorage,
  setOnLocalStorage,
  getFromLocalStorage,
} from "../services/helpers/localStorage";
import Cronometer from "../components/Cronometer";
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
    const { questTrivia, category, difficulty, type } = this.props;
    const { score, assertions } = this.state;
    await questTrivia({ category, difficulty, type });
    updateLocalStorage("state", { player: { score, assertions } });
  }

  nextQuestion() {
    const { idAPI, setNextQuestion, somethingReset, history, nameUser, picture, summedScore } =
      this.props;
    const FOUR = 4;
    if (idAPI < FOUR) {
      setNextQuestion(idAPI + 1);
      this.setState({ answered: false });
      somethingReset({ timer: 30 });
      this.setState({ isDisabled: false, nextButton: false });
    } else {
      const infoRanking = [{ name: nameUser, score: summedScore, picture }];
      const arrayStorage = getFromLocalStorage("ranking");
      if (arrayStorage) {
        setOnLocalStorage("ranking", [...arrayStorage, ...infoRanking]);
      } else {
        setOnLocalStorage("ranking", infoRanking);
      }
      history.push("/feedback");
    }
  }

  checkAnswer(isCorrect) {
    const { answered } = this.state;
    if (answered) return;
    if (isCorrect) {
      const { addScore, assertions, summedScore } = this.props;
      const score = this.doCalculation();
      const updatedScore = score + summedScore;
      updateLocalStorage("state", { player: { score: updatedScore, assertions: assertions + 1 } });
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
      case "hard":
        points = TRES;
        break;
      case "medium":
        points = 2;
        break;
      default:
        points = 1;
    }
    return staticPoint + points * timer;
  }

  handleCorrectAnswer(correct) {
    const { answered, isDisabled } = this.state;
    return (
      <button
        type="button"
        onClick={() => this.checkAnswer(true)}
        data-testid="correct-answer"
        className={`w-1/3 m-2 bg-yellow_dead_color rounded focus:outline-none ${
          answered &&
          "border border-green-500 bg-green_color text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
        }`}
        disabled={isDisabled}
      >
        {atob(correct)}
      </button>
    );
  }

  handleIncorrectAnswer(incorrect, index) {
    const { answered, isDisabled } = this.state;
    return (
      <button
        type="button"
        onClick={() => this.checkAnswer()}
        data-testid={`wrong-answer-${index}`}
        className={`w-1/3 m-2 bg-yellow_dead_color rounded focus:outline-none ${
          answered &&
          "border border-red-500 bg-red_color text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        }`}
        disabled={isDisabled}
      >
        {atob(incorrect)}
      </button>
    );
  }

  handleButton() {
    return (
      <button
        className="text-5xl bg-primary_color px-6 py-1 rounded "
        type="button"
        data-testid="btn-next"
        onClick={() => {
          this.nextQuestion();
        }}
      >
        Next
      </button>
    );
  }

  renderAlternatives() {
    const { questAPI, idAPI } = this.props;
    const { randomAnswers, incorrect_answers: incorrectAnswers } = questAPI[idAPI];
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
        <div className="flex-col">
          <Header />
          <div
            className="flex-col grid justify-items-center bg-secundary_color w-screen
                 h-screen game__body"
          >
            <h3 className="pt-12 text-3xl text-gray-50" data-testid="question-text">
              {atob(question)}
            </h3>
            <section className="flex flex-wrap w-3/4 justify-center text-3xl text-gray-50">
              {this.renderAlternatives()}
            </section>
            <div className="flex w-screen justify-between">
              <div className="w-1/3">
                <h3 className="block	text-white mt-44 ml-20 text-lg">Category:</h3>
                <h4
                  className="items-center text-3xl text-gray-50 ml-20"
                  data-testid="question-category"
                >
                  {atob(category)}
                </h4>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <Cronometer
                  answered={answered}
                  disabled={this.checkDisabled}
                  checkAnswer={this.checkAnswer}
                />
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <p>.{nextButton && this.handleButton()}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="moustache__container">
        <div className="moustache__anim"></div>
      </div>
    );
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
  category: state.configReducer.category,
  difficulty: state.configReducer.difficulty,
  type: state.configReducer.type,
});

const mapDispatchToProps = (dispatch) => ({
  questTrivia: (config) => dispatch(fetchQuestions(config)),
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
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

// Agradecimentos ao Site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
