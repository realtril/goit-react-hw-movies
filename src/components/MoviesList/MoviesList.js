import React from "react";
import { NavLink } from "react-router-dom";

const MoviesList = (props) => {
  return (
    <ul className="movie-list">
      {props.movies.map((movie) => (
        <li key={movie.id}>
          <NavLink
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: props.location },
            }}
            className="movie-link"
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
