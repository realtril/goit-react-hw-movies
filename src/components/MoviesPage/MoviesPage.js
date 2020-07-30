import React, { Component } from "react";
import axios from "axios";
import MoviesList from "../MoviesList/MoviesList";
import "./MovieStyles.css";

export default class MoviesPage extends Component {
  state = {
    movies: [],
    searchText: "",
  };

  async componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        searchText: this.props.location.state.search,
      });
      if (this.props.location.state.search) {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${this.props.location.state.search}`
          );
          this.props.history.push({
            pathname: this.props.location.pathname,
            search: `query=${this.state.searchText}`,
            state: { search: this.state.searchText },
          });
          this.setState({ movies: result.data.results });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${this.state.searchText}`
      );
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${this.state.searchText}`,
        state: { search: this.state.searchText },
      });
      this.setState({ movies: result.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <form className="wrap" onSubmit={this.handleSubmit}>
          <div className="search">
            <input
              name="searchText"
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={this.handleChange}
            />
            <button type="submit" className="searchButton">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
        <MoviesList movies={this.state.movies} location={this.props.location} />
      </>
    );
  }
}
