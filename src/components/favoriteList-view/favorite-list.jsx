// favorite-list.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";

import "./favorite-list.scss";

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    // Define the initial state:
    this.state = {
      add: " ",
      delete: "d-none",
    };
  }

  checkFavoriteList() {
    const foundMovie = this.props.userData.user.FavoriteMovies.find(
      (element) => element === this.props.movie._id
    );
    if (foundMovie) {
      this.setState({
        add: "d-none",
        delete: " ",
      });
    }
  }

  addMovieToFavoriteList() {
    this.setState({
      add: "d-none",
      delete: " ",
    });
    axios
      .post(
        `https://fathomless-plains-90381.herokuapp.com/users/${this.props.userData.user.Username}/FavoriteMovies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        let addFavoriteMovie = { user: response.data, token: this.props.userData.token };
        this.props.setUser(addFavoriteMovie);
      })
      .catch((response) => {
        console.error(response);
      });
  }

  removeMoviefromFavoriteList() {
    this.setState({
      add: " ",
      delete: "d-none",
    });
    axios
      .delete(
        `https://fathomless-plains-90381.herokuapp.com/users/${this.props.userData.user.Username}/FavoriteMovies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        let removeFavoriteMovie = { user: response.data, token: this.props.userData.token };
        this.props.setUser(removeFavoriteMovie);
      })
      .catch((response) => {
        console.error(response);
      });
  }
  componentDidMount() {
    this.checkFavoriteList();
  }

  render() {
    return (
      <>
        {" "}
        <Button
          className={`mb-2  ${this.state.add}`}
          variant="outline-success"
          onClick={() => this.addMovieToFavoriteList()}
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
          onClick={() => this.removeMoviefromFavoriteList()}
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
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
  }),
  userData: PropTypes.shape({
    User: PropTypes.shape({
      _id: PropTypes.string,
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.array,
    }),
    token: PropTypes.string,
  }),
};

export default connect(mapStateToProps, { setUser })(FavoriteList);
