import React, { Component } from 'react';

class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { disabled, checkAnswer } = this.props;
    const MAX_SECONDS = 0;
    if (prevState.seconds === MAX_SECONDS) {
      checkAnswer();
      disabled();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        {seconds}
      </div>
    );
  }
}

export default Cronometer;
