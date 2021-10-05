import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserInfo, fetchToken, resetSomething } from '../redux/actions';
import { setOnLocalStorage } from '../services/helpers/localStorage';
import triviaBigodesLogo from '../assets/images/headerBigodes.png';
import "../style/Login.css"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
  }

  componentDidMount() {
    const { tokenAPI } = this.props;
    tokenAPI();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  verifyLogin() {
    const { name, email } = this.state;
    return !(name && email);
  }

  saveInLocalStorage() {
    const { email, name } = this.state;
    const { setUserInfo, history, tokenUser, somethingReset } = this.props;

    setUserInfo(name, email);
    const userInfo = { player: { name, gravatarEmail: email } };
    setOnLocalStorage('state', userInfo);

    somethingReset({ id: 0,
      timer: 30,
      score: 0,
      totalScore: 0,
      assertions: 0,
    });

    history.push('/game');

    const response = tokenUser.token;
    localStorage.setItem('token', response);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div
        className="flex justify-center items-center w-screen
        h-screen bg-light_gray_color"
      >
        <form
          className="flex flex-col items-center bg-primary_color
          shadow-lg min-w-1/4 min-h-1/4 rounded-lg"
        >
          <img
            className="w-40 mt-8 mb-10"
            src={ triviaBigodesLogo }
            alt="Logo trivia Bigodes"
          />
          <div className="flex flex-col mb-4 w-2/3 login__control">
            <input
              data-testid="input-player-name"
              className="rounded pl-2 border border-light_gray_color login__input"
              name="name"
              id="name"
              value={ name }
              placeholder="."
              onChange={ this.handleChange }
            />
            <label className="login__label" htmlFor="name">Your Name</label>
          </div>
          <div className="flex flex-col mb-4 w-2/3 login__control">
          <input
            data-testid="input-gravatar-email"
            type="email"
            className="rounded pl-2 border border-light_gray_color login__input"
            name="email"
            id="email"
            value={ email }
            placeholder="."
            onChange={ this.handleChange }
          />
          <label className="login__label" htmlFor="email">Your Email</label>
          </div>
          
          <div className="w-2/3 flex justify-between mb-10">
          <button
            type="button"
            className="bg-secundary_color text-white px-4 py-1 rounded login__button-effects"
            data-testid="btn-play"
            disabled={ this.verifyLogin() }
            onClick={ () => this.saveInLocalStorage() }
          >
            Play
          </button>
          <Link to="/config">
            <button
              type="button"
              className="bg-secundary_color text-white px-4 py-1 rounded login__button-effects"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenUser: state.loginReducer.tokenUser,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
  setUserInfo: (username, email) => dispatch(addUserInfo(username, email)),
  somethingReset: (something) => dispatch(resetSomething(something)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,
  tokenUser: PropTypes.string.isRequired,
  tokenAPI: PropTypes.func.isRequired,
  somethingReset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
