import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { changeConfig } from "../redux/actions";
import triviaBigodesLogo from "../assets/images/headerBigodes.png";
import "../style/Moustache.css";

const INITIAL_STATE = {
  categories: [],
};

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.renderCategories = this.renderCategories.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.renderDifficulty = this.renderDifficulty.bind(this);
    this.renderType = this.renderType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const res = await (await fetch("https://opentdb.com/api_category.php")).json();
    this.updateCategories(res.trivia_categories);
  }

  updateCategories(categories) {
    this.setState({ categories });
  }

  handleChange({ target: { value, name } }) {
    const { handleChangeConfig } = this.props;
    handleChangeConfig(value, name);
  }

  renderCategories() {
    const { categories } = this.state;
    const { category } = this.props;
    return (
      <div className="w-100 mb-5 flex flex-col items-center">
        <div className="flex mb-3 justify-center items-center font-medium">
          <label htmlFor="categoryId">Select Category</label>
        </div>
        <select
          className="w-3/4 h-8 pl-3 pr-6 text-base placeholder-secundary_color border rounded-lg appearance-none focus:shadow-outline"
          value={category}
          onChange={this.handleChange}
          name="category"
          id="categoryId"
        >
          <option className="" value="any">
            Any Category
          </option>
          {categories.map((currentCategory) => {
            const { name, id } = currentCategory;
            return (
              <option key={name} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  renderDifficulty() {
    const { difficulty } = this.props;
    return (
      <div className="w-100 my-2 mr-3">
        <div className="flex justify-center items-center mb-3 font-medium">
          <label htmlFor="difficulty">Select Difficulty</label>
        </div>
        <select
          className="w-full h-8 pl-3 pr-6 text-base placeholder-secundary_color border rounded-lg appearance-none focus:shadow-outline"
          value={difficulty}
          onChange={this.handleChange}
          name="difficulty"
          id="difficulty"
        >
          <option name="difficulty" value="any">
            Any Difficulty
          </option>
          <option name="difficulty" value="easy">
            easy
          </option>
          <option name="difficulty" value="medium">
            medium
          </option>
          <option name="difficulty" value="hard">
            hard
          </option>
        </select>
      </div>
    );
  }

  renderType() {
    const { type } = this.props;
    return (
      <div className="w-100 my-2 ml-3">
        <div className="flex justify-center items-center mb-3 font-medium">
          <label htmlFor="type">Select Type</label>
        </div>
        <select
          className="w-full h-8 pl-3 pr-6 text-base placeholder-secundary_color border rounded-lg appearance-none focus:shadow-outline"
          value={type}
          onChange={this.handleChange}
          name="type"
          id="type"
        >
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True or False</option>
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-secundary_color">
        <section className="flex flex-col items-center bg-primary_color min-w-800 min-h-1/4 rounded-2xl">
          <img className="w-60 my-3" src={triviaBigodesLogo} alt="Logo trivia Bigodes" />
          <h1 className="text-2xl my-8" data-testid="settings-title">
            <strong>SETTINGS</strong>
          </h1>
          {this.renderCategories()}
          <div className="flex flex-row">
            {this.renderDifficulty()}
            {this.renderType()}
          </div>
          <button className="text-1xl text-white mt-8 mb-8 bg-secundary_color px-4 py-1 rounded ">
            <Link to="/">SAVE</Link>
          </button>
        </section>
      </div>
    );
  }
}

Config.propTypes = {
  handleChangeConfig: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.configReducer.category,
  difficulty: state.configReducer.difficulty,
  type: state.configReducer.type,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeConfig: (value, name) => dispatch(changeConfig(value, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
