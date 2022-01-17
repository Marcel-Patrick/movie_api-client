// movie-card.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      add: " ",
      delete: "d-none",
    };
  }
  addMovieToFavoriteList(user, movie) {
    let token = localStorage.getItem("token");
    this.setState({
      add: "d-none",
      delete: " ",
    });
    axios
      .post(
        `https://fathomless-plains-90381.herokuapp.com/users/${user}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((response) => {
        console.error(response);
      });
  }

  removeMoviefromFavoriteList(user, movie) {
    let token = localStorage.getItem("token");
    this.setState({
      add: " ",
      delete: "d-none",
    });
    axios
      .delete(
        `https://fathomless-plains-90381.herokuapp.com/users/${user}/FavoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((response) => {
        console.error(response);
      });
  }
  render() {
    const { movie, user } = this.props;

    return (
      <Card>
        <Card.Img
          className="imgCardStyle"
          variant="top"
          src={movie.ImagePath}
          crossOrigin="anonymous"
        />
        <Card.Body className="cardStyle">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="mb-2" variant="info">
              Show Movie
            </Button>
          </Link>{" "}
          <Button
            className={`mb-2  ${this.state.add}`}
            variant="outline-success"
            onClick={() => this.addMovieToFavoriteList(user, movie)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bookmark-plus-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"
              />
            </svg>
          </Button>
          <Button
            className={`mb-2  ${this.state.delete}`}
            variant="outline-danger"
            onClick={() => this.removeMoviefromFavoriteList(user, movie)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bookmark-dash-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"
              />
            </svg>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
