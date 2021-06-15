import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
