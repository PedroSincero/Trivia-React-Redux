import React, { Component } from 'react';

class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30 };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const MAX_SECONDS = 0;
    if (prevState.seconds === MAX_SECONDS) {
      this.setState({ seconds: 30 });
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
