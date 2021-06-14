import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserInfo, fetchToken } from '../redux/actions';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // componentDidMount() {
  //   const { tokenAPI } = this.props;
  //   console.log(tokenAPI());
  // }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleLogin() {
    const { email, name } = this.state;
    const { setUserInfo, history } = this.props;
    setUserInfo(name, email);
    history.push('/game');
  }

  verifyLogin() {
    const { name, email } = this.state;
    return !(name && email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Seu Nome"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            placeholder="Seu Email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyLogin() }
            onClick={ this.handleLogin }
          >
            Jogar
          </button>
          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>

        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
  setUserInfo: (username, email) => dispatch(addUserInfo(username, email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
