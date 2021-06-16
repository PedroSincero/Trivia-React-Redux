import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/helpers/getAvatar';
import { addImage } from '../redux/actions';

class Header extends Component {
  // Recebe um email como props do estado global e pega o avatar desse email
  componentDidMount() {
    const { email, updateUrlImg } = this.props;
    const imgUrl = getAvatar(email);
    updateUrlImg(imgUrl);
  }

  render() {
    const { username, imgUrl } = this.props;
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
        <p data-testid="header-score">0</p>
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
