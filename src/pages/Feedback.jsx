import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../components/Header";
import BtnRanking from "../components/Buttons";
import FeedbackMessage from "../components/FeedbackMessage";
import ButtonFeed from "../components/ButtonFeed";
import "../style/Feedback.css";
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderFinalMessage = this.renderFinalMessage.bind(this);
  }

  renderFinalMessage() {
    const { assertions } = this.props;
    const minimumScore = 3;
    return assertions >= minimumScore ? "Very Well!" : "Could be better...";
  }

  render() {
    return (
      <>
        <Header />
        <div className="flex justify-center bg-light_gray_color h-screen feedback__body">
          <div className="flex flex-col items-center mt-36 text-white bg-secundary_color min-w-600 max-h-80 rounded-2xl shadow-lg ">
            <h1 data-testid="feedback-text" className="mt-8 font-bold text-xl">
              {this.renderFinalMessage()}
            </h1>
            <FeedbackMessage />
            <div className="flex justify-center">
              <BtnRanking />
              <ButtonFeed />
            </div>
          </div>
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

export default connect(mapStateToProps)(Feedback);
