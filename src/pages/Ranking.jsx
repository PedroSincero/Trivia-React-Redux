import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setOnLocalStorage } from '../services/helpers/localStorage';

class Ranking extends Component {

  // handlesort = () => {
  //   const { listUsers } = this.props;
  //   this.setState({
  //     users: listUsers.sort((a, b) => {
  //       if (a.nome < b.nome) return -1;
  //       if (a.nome > b.nome) return 1;
  //       return 0;
  //     })
  //   })
  // }

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
