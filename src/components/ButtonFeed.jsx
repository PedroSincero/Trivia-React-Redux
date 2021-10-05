import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
class ButtonFeed extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  redirectLogin() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={this.redirectLogin}
          className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
        >
          Play Again
        </button>
        {redirect && <Redirect />}
      </div>
    );
  }
}

ButtonFeed.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ButtonFeed;
