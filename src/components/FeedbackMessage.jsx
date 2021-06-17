import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  messageFeedback(assertions) {
    switch (assertions) {
    case (assertions === 1):
      return 'Você acertou 1 pergunta!';

    case (assertions > 1):
      return `Você acertou ${assertions} perguntas!`;

    default:
      return 'Você não acertou nenhuma pergunta!';
    }
  }

  messageScore(score) {
    if (score > 1) {
      return `Um total de ${score} pontos`;
    }
    return `Um total de ${score} ponto`;
  }

  RenderFeedbackMessage() {
    const { assertions, score } = this.props;
    const scoreMessage = this.messageScore(score);
    const assertionMessage = this.messageFeedback(assertions);
    return (
      <>
        <p data-testid="feedback-total-question">{assertionMessage}</p>
        <p data-testid="feedback-total-score">{scoreMessage}</p>
      </>
    );
  }

  render() {
    return (
      <div>
        {this.RenderFeedbackMessage()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.requestReducer.score,
  assertions: state.requestReducer.assertions,
});

FeedbackMessage.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
};

FeedbackMessage.defaultProps = {
  score: 0,
  assertions: 0,
};

// Esperando existir
// const mapDispatchToProps = (dispatch) => ({
//   algo: () => dispatch(algo())
// })

// Esperando existir
export default connect(mapStateToProps)(FeedbackMessage);
