import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { subtractTimer } from '../redux/actions';

class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30 };
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  // if o answer for false
  componentDidUpdate(prevProps) {
    const { disabled, checkAnswer, timer, answered, idAPI } = this.props;
    if (idAPI !== prevProps.idAPI) {
      this.startTimer();
    }
    if (answered) {
      clearInterval(this.cronometerInterval);
    }

    const MAX_SECONDS = 0;
    if (timer === MAX_SECONDS) {
      checkAnswer();
      disabled();
      clearInterval(this.cronometerInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      const { timerSubtract, timer: globalTimer } = this.props;
      this.setState((teste) => ({ seconds: teste.seconds - 1 }));
      timerSubtract(globalTimer - 1);
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <p className="text-5xl text-gray-50">
          {timer}
        </p>
      </div>
    );
  }
}

Cronometer.propTypes = {
  disabled: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  timerSubtract: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  idAPI: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.questReducer.timer,
  idAPI: state.questReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  timerSubtract: (timer) => dispatch(subtractTimer(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
