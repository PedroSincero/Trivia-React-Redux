import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BtnRanking from '../components/Buttons';
import ButtonFeed from '../components/ButtonFeed';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>
        <ButtonFeed />
        <BtnRanking />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
