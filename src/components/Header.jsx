import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/helpers/getAvatar';
import { addImage } from '../redux/actions';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const INITIAL_STATE = {
  score: 0,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // Recebe um email como props do estado global e pega o avatar desse email
  componentDidMount() {
    const { email, updateUrlImg } = this.props;
    const imgUrl = getAvatar(email);
    updateUrlImg(imgUrl);
  }

  componentDidUpdate() {
    const returnedData = getFromLocalStorage('state');

    if (returnedData) {
      const { player: { score } } = returnedData;
      this.updateScore(score);
    }
  }

  updateScore(score) {
    this.setState({ score });
  }

  render() {
    const { username, imgUrl } = this.props;
    const { score } = this.state;
    return (
      <div className="header">
        <img
          data-testid="header-profile-picture"
          className="header__avatar"
          src={ imgUrl }
          alt="avatar of xxx"
        />
        <p
          data-testid="header-player-name"
          className="header__username"
        >
          {username}
        </p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  imgUrl: PropTypes.string,
  updateUrlImg: PropTypes.func.isRequired,
};

Header.defaultProps = {
  email: 'pessoa@email.com',
  username: 'pessoa',
  imgUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
};

const mapStateToProps = (state) => ({
  imgUrl: state.userReducer.picture,
  username: state.userReducer.user,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  updateUrlImg: (url) => dispatch(addImage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
