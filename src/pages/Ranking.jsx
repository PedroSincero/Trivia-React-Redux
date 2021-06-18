import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { getFromLocalStorage } from '../services/helpers/localStorage';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.handlesort = this.handlesort.bind(this);
  }

  handlesort() {
    const scoreRanking = getFromLocalStorage('ranking');
    return scoreRanking
      .sort((a, b) => (b.score - a.score));
  }

  render() {
    return (
      <div>
        <section data-testid="ranking-title">
          Titulo
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Inicio
          </button>
        </Link>
        <ul>
          {this.handlesort().map((element, index) => {
            const { name, score, picture } = element;
            return (
              <li key={ index }>
                <span data-testid={ `player-score-${index}` }>{score}</span>
                {' '}
                <span data-testid={ `player-name-${index}` }>{name}</span>
                {' '}
                <img src={ picture } alt={ name } />
              </li>);
          })}
        </ul>

      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
export default Ranking;
