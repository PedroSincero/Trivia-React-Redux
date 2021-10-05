import React, { Component } from "react";
import { Link } from "react-router-dom";
import triviaBigodesLogo from "../assets/images/headerBigodes.png";
import { getFromLocalStorage } from "../services/helpers/localStorage";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.handlesort = this.handlesort.bind(this);
  }

  handlesort() {
    const scoreRanking = getFromLocalStorage("ranking");
    return scoreRanking.sort((a, b) => b.score - a.score);
  }

  render() {
    return (
      <div className="bg-light_gray_color flex h-screen flex-col items-center ">
        <div className="w-full h-24 flex justify-center align-end">
          <Link to="/">
            <button
              className="transition duration-300 hover:bg-orange_color mt-12 text-2xl bg-primary_color px-4 py-1 shadow-md rounded"
              type="button"
              data-testid="btn-go-home"
            >
              Home
            </button>
          </Link>
        </div>
        <div
          className="flex flex-col items-center bg-primary_color
          shadow-lg min-w-1/4 min-h-1/4 max-h-3/5 rounded-lg overflow-y-auto"
        >
          <img className="w-40 mt-8" src={triviaBigodesLogo} alt="Logo trivia Bigodes" />
          <section className="mt-4 text-2xl font-semibold	underline" data-testid="ranking-title">
            Ranking
          </section>
          <table className="min-w-3/4 my-8 ml-8 mr-8">
            <thead>
              <tr className="">
                <th className="py-4">Avatar</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.handlesort().map((element, index) => {
                const { name, score, picture } = element;
                return (
                  <tr key={index} className="">
                    <td className="py-2">
                      <img className="rounded-3xl" src={picture} alt={name} />
                    </td>
                    <td className="text-center" data-testid={`player-name-${index}`}>
                      {name}
                    </td>
                    <td className="text-center" data-testid={`player-score-${index}`}>
                      {score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Ranking;
