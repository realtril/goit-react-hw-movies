import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";

export default class Homepage extends Component {
  state = {
    trendingMovies: [],
  };

  getTrendingMovies = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/3/trending/all/day?api_key=${process.env.REACT_APP_API}`
      );
      this.setState({ trendingMovies: result.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    this.getTrendingMovies();
  };

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {this.state.trendingMovies
            .filter((movie) => movie.title)
            .map((movie) => (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`} className="movie-link">
                  {movie.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
