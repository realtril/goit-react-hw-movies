import React, { Component } from "react";
import axios from "axios";
import "./Reviews.css";

class Reviews extends Component {
  state = {
    apiUrl: "https://api.themoviedb.org",
    apiKey: "8535e43684b9a75ea1866a61e2ebaa0f",
    reviews: [],
  };
  getReviews = async () => {
    try {
      const result = await axios.get(
        `${this.state.apiUrl}/3/movie/${this.props.match.params.movieId}/reviews?api_key=${this.state.apiKey}&language=en-US`
      );
      this.setState({ reviews: result.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    this.getReviews();
  };

  render() {
    return (
      <ul className="review-list">
        {this.state.reviews.length > 0 ? (
          this.state.reviews.map((review) => (
            <li key={review.id}>
              <p className="review-author">Author: {review.author}</p>
              <p className="review-p">{review.content}</p>
            </li>
          ))
        ) : (
          <li>
            <p>Oops...There are no reviews yet.</p>
          </li>
        )}
      </ul>
    );
  }
}

export default Reviews;
