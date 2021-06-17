import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import BtnRanking from '../components/Buttons';
import FeedbackMessage from '../components/FeedbackMessage';
import ButtonFeed from '../components/ButtonFeed';
// import { connect } from 'react-redux';
import { setOnLocalStorage } from '../services/helpers/localStorage';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderFinalMessage = this.renderFinalMessage.bind(this);
    this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
  }

  saveInLocalStorage(name, score, picture) {
    const infoRanking = [{ name, score, picture }];
    setOnLocalStorage('ranking', infoRanking);
  }

  renderFinalMessage() {
    const { assertions } = this.props;
    const minimumScore = 3;
    return (assertions >= minimumScore)
      ? 'Mandou bem!'
      : 'Podia ser melhor...';
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <h1 data-testid="feedback-text">
            {this.renderFinalMessage()}
          </h1>
          <FeedbackMessage />
          <BtnRanking />
          <ButtonFeed />
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
};

Feedback.defaultProps = {
  assertions: 0,
};

const mapStateToProps = (state) => ({
  assertions: state.questReducer.assertions,
});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(Feedback);
