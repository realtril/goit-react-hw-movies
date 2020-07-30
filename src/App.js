import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <ul>
          <li className="nav-menu">
            <NavLink exact to="/" className="Navigation-link">
              Home
            </NavLink>
          </li>
          <li className="nav-menu">
            <NavLink to="/movies" className="Navigation-link">
              Movies
            </NavLink>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
        </Switch>
      </>
    );
  }
}

export default App;
