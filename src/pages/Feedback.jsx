import React, { Component } from 'react';
import BtnRanking from '../components/Buttons';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>

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
export default Feedback;
