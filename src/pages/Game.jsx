import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../style/Game.css';
import { fetchQuestions } from '../redux/actions';

const INITIAL_STATE = {
  answered: false,
};
class Game extends Component {
  constructor(props) {
    super(props);
    // this.state = { seconds: 0 };
    this.state = INITIAL_STATE;
    this.randomArray = this.randomArray.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  async componentDidMount() {
    const { questTrivia } = this.props;
    await questTrivia();
    // const ONE_SECOND = 100;
    // this.cronometerInterval = setInterval(() => {
    //   this.setState((state) => ({ seconds: state.seconds + 1 }));
    // }, ONE_SECOND);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const MAX_SECONDS = 3000;
  //   if (prevState.seconds === MAX_SECONDS) {
  //     this.setState({ seconds: 0 });
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval();
  // }

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

  checkAnswer() {
    this.setState({ answered: true });
  }

  handleCorrectAnswer(correct) {
    const { answered } = this.state;
    return (
      <button
        type="button"
        onClick={ () => this.checkAnswer() }
        data-testid="correct-answer"
        className={ `${(answered) ? 'correctAnswer' : ''}  game__button` }
      >
        {correct}
      </button>
    );
  }

  handleIncorrectAnswer(incorrects) {
    const { answered } = this.state;
    return incorrects.map((incorrect, index) => (
      <button
        type="button"
        onClick={ () => this.checkAnswer() }
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        className={ (answered) ? 'incorrectAnswer' : '' }
      >
        {incorrect}
      </button>
    ));
  }

  render() {
    const { isLoading } = this.props;
    if (!isLoading) {
      const { questAPI, idAPI } = this.props;
      console.log(idAPI);
      console.log(questAPI);
      const {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } = questAPI[idAPI];
      const correct = this.handleCorrectAnswer(correctAnswer);
      const incorrect = this.handleIncorrectAnswer(incorrectAnswers);

      const answers = [correct, ...incorrect];
      const randomAnswers = this.randomArray(answers);
      return (
        <div>
          <Header />
          <h2 data-testid="question-category">
            {category}
          </h2>
          <h3 data-testid="question-text">
            {question}
          </h3>
          <section>
            {randomAnswers}
          </section>
        </div>
      );
    }
    return (
      <h1>
        Loading...
      </h1>
    );
  }
}

const mapStateToProps = (state) => ({
  questAPI: state.questReducer.question,
  isLoading: state.questReducer.loading,
  idAPI: state.questReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  questTrivia: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  questAPI: PropTypes.func.isRequired,
  questTrivia: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  idAPI: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

// Agradecimentos ao Site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
