import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/helpers/getAvatar';
import { addImage } from '../redux/actions';
import triviaBigodesLogo from '../assets/images/headerBigodes.png';
import '../style/Header.css';

class Header extends Component {
  // Recebe um email como props do estado global e pega o avatar desse email
  componentDidMount() {
    const { email, updateUrlImg } = this.props;
    const imgUrl = getAvatar(email);
    updateUrlImg(imgUrl);
  }

  render() {
    const { username, imgUrl, updatedScore } = this.props;

    return (
      <div className="flex bg-primary_color justify-around py-5">
        <img
          data-testid="header-profile-picture"
          className="header__avatar w-30 rounded-lg"
          src={ imgUrl }
          alt={ `avatar of ${username}` }
        />
        <img
          className="w-60"
          src={ triviaBigodesLogo }
          alt="Logo trivia Bigodes"
        />

        <div className="flex flex-col justify-center items-center bg-primary_color">
          <p
            data-testid="header-player-name"
            className="header__username py-2 text-2xl"
          > 
            {username}
          </p>
          <p className="text-2xl">Score:{' '}<span data-testid="header-score"><strong>{updatedScore}</strong></span> </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  imgUrl: PropTypes.string,
  updateUrlImg: PropTypes.func.isRequired,
  updatedScore: PropTypes.number,
};

Header.defaultProps = {
  email: 'pessoa@email.com',
  username: 'pessoa',
  imgUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  updatedScore: 0,
};

const mapStateToProps = (state) => ({
  imgUrl: state.userReducer.picture,
  username: state.userReducer.user,
  email: state.userReducer.email,
  updatedScore: state.questReducer.totalScore,
});

const mapDispatchToProps = (dispatch) => ({
  updateUrlImg: (url) => dispatch(addImage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
