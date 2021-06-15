import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.randomArray = this.randomArray.bind(this);
  }

  async componentDidMount() {
    const { questTrivia } = this.props;
    await questTrivia();
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

  handleCorrectAnswer(correct) {
    return (
      <p data-testid="correct-answer">
        {correct}
      </p>
    );
  }

  handleIncorrectAnswer(incorrects) {
    return incorrects.map((incorrect, index) => (
      <p key={ index } data-testid={ `wrong-answer-${index}` }>
        {incorrect}
      </p>
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
