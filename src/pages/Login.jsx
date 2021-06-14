import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';

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
    const { token } = this.props;
    const response = token.token;
    localStorage.setItem('token', response);
    // console.log(response);
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
            onClick={ () => this.saveInLocalStorage() }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.tokenUser,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
