// favorite-list.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./favorite-list.scss";

export class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    // Define the initial state:
    this.state = {
      add: " ",
      delete: "d-none",
    };
  }
  checkFavoriteList(user, movieId) {
    let token = localStorage.getItem("token");
    axios
      .get(`https://fathomless-plains-90381.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const foundMovie = response.data.FavoriteMovies.find((element) => element === movieId);
        if (foundMovie) {
          this.setState({
            add: "d-none",
            delete: " ",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      })
      .catch((response) => {
        console.error(response);
      });
  }
  componentDidMount() {
    this.checkFavoriteList(this.props.user, this.props.movie._id);
  }

  render() {
    const { movie, user } = this.props;

    return (
      <>
        {" "}
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
      </>
    );
  }
}

FavoriteList.propTypes = {
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
  user: PropTypes.string,
};
