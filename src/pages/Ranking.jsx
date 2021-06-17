import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <section data-testid="ranking-title">
          Titulo
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-ranking">
            Inicio
          </button>
        </Link>
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
