import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import BtnRanking from '../components/Buttons';
import ButtonFeed from '../components/ButtonFeed';
// import { connect } from 'react-redux';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderFinalMessage = this.renderFinalMessage.bind(this);
  }

  renderFinalMessage() {
    const { score } = this.props;
    const minimumScore = 3;
    return (score >= minimumScore)
      ? 'Mandou bem!'
      : 'Podia ser melhor';
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <h1 data-testid="feedback-text">
            {this.renderFinalMessage()}
          </h1>
          <BtnRanking />
          <ButtonFeed />
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
};

Feedback.defaultProps = {
  score: 0,
};

// Esperando o estado existir
// const mapStateToProps = (state) => ({
//   score: state.algumReducer.score,
// });

// const mapDispatchToProps = {

// };

// Esperando o estado existir
// export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

export default Feedback;
