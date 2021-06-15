import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { questTrivia } = this.props;
    questTrivia();
  }

  render() {
    const { questAPI } = this.props;
    console.log(questAPI);
    return (
      <div>
        <Header />
        {/* {questAPI} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questAPI: state.questReducer.question,
});

const mapDispatchToProps = (dispatch) => ({
  questTrivia: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  questAPI: PropTypes.func.isRequired,
  questTrivia: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
