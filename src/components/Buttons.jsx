import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BtnRanking extends Component {
  render() {
    return (
      <Link
        to="/ranking"
        className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
      >
        <button type="button" data-testid="btn-ranking">
          Show Ranking
        </button>
      </Link>
    );
  }
}
