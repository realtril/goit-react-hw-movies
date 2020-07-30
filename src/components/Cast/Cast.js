import React, { Component } from "react";
import axios from "axios";

class Cast extends Component {
  state = {
    cast: null,
  };
  getCast = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/3/movie/${this.props.match.params.movieId}/credits?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      this.setState({ cast: result.data.cast });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    this.getCast();
  };

  render() {
    return (
      <>
        {this.state.cast && (
          <ul className="cast-list">
            {this.state.cast.length > 0 ? (
              this.state.cast
                .filter((actor) => actor.profile_path)
                .map((actor) => (
                  <li key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt=""
                      className="poster"
                    />
                    <p className="cast-author">Actor: {actor.name}</p>
                    <p className="cast-p">Character: {actor.character}</p>
                  </li>
                ))
            ) : (
              <li>
                <p>Oops...There is no data yet..</p>
              </li>
            )}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
