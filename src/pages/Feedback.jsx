import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import BtnRanking from '../components/Buttons';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderFinalMessage = this.renderFinalMessage.bind(this);
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
          <BtnRanking />
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
