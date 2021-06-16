import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { subtractTimer } from '../redux/actions';

class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30 };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    // const { timer } = this.state;
    this.cronometerInterval = setInterval(() => {
      const { timerSubtract, timer: globalTimer } = this.props;
      this.setState((teste) => ({ seconds: teste.seconds - 1 }));
      timerSubtract(globalTimer - 1);
    }, ONE_SECOND);
  }

  // if o answer for false
  componentDidUpdate() {
    const { disabled, checkAnswer, timer, answered } = this.props;
    if (answered) {
      clearInterval(this.globalCronometerInterval);
      clearInterval(this.cronometerInterval);
    }

    const MAX_SECONDS = 0;
    if (timer === MAX_SECONDS) {
      checkAnswer();
      disabled();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <p>
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
};

const mapStateToProps = (state) => ({
  timer: state.questReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timerSubtract: (timer) => dispatch(subtractTimer(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
