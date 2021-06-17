import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Feedback extends Component {
  constructor() {
    super();
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  redirectLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin() }
        >
          Jogar novamente
        </button>
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
