import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

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
          onClick={ this.redirectLogin }
        >
          Jogar novamente
        </button>
        { redirect && <Redirect /> }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

ButtonFeed.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ButtonFeed;
