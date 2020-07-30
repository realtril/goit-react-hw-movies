import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Reviews from "../Reviews/Reviews";
import Cast from "../Cast/Cast";
import axios from "axios";

import "./MovieDetailsPage.css";

class MovieDetailsPage extends Component {
  state = {
    movie: null,
  };

  getDetails = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/3/movie/${this.props.match.params.movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      this.setState({ movie: result.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleGoBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
    } else {
      this.props.history.push("/");
    }
  };

  componentDidMount = () => {
    this.getDetails();
  };

  render() {
    return (
      <>
        <button type="button" onClick={this.handleGoBack}>
          &#x2190; Go back
        </button>
        {this.state.movie && (
          <div className="main">
            <div className="col-xs-4 bg-img">
              <img
                src={`https://image.tmdb.org/t/p/original/${this.state.movie.poster_path}`}
                alt=""
                className="poster"
              />
            </div>
            <div className="col-xs-8 text">
              <div className="containt">
                <h2>
                  {`${this.state.movie.title}  `}
                  {`(${this.state.movie.release_date.slice(0, 4)})`}
                </h2>
                <h4>
                  Popularity: {Number(this.state.movie.popularity).toFixed(0)}%
                </h4>
                <h4>Overview</h4>
                <p>{this.state.movie.overview}</p>
                <h4>Genres</h4>
                <ul className="genres">
                  {this.state.movie.genres.map((movie) => (
                    <li key={movie.id}>{movie.name}</li>
                  ))}
                </ul>
                <h4>Additional information</h4>
                <ul className="reviews-menu">
                  <li>
                    <NavLink
                      to={`${this.props.match.url}/reviews`}
                      className="additional"
                    >
                      Reviews
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${this.props.match.url}/cast`}
                      className="additional"
                    >
                      Cast
                    </NavLink>
                  </li>
                </ul>

                <Switch>
                  <Route
                    path={`${this.props.match.path}/cast`}
                    component={Cast}
                  />
                  <Route
                    path={`${this.props.match.path}/reviews`}
                    component={Reviews}
                  />
                </Switch>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
