// movie-card.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import FavoriteList from "../favoriteList-view/favorite-list";
import { connect } from "react-redux";
import { getMovieDetails } from "../../actions/actions";

import "./movie-card.scss";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img
          className="imgCardStyle"
          variant="top"
          src={movie.ImagePath}
          crossOrigin="anonymous"
        />
        <Card.Body className="cardStyle">
          <Card.Title className="titleHeight">{movie.Title}</Card.Title>
          <Card.Text className="truncate">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button
              className="mb-2"
              variant="info"
              onClick={() => {
                this.props.getMovieDetails(movie);
              }}
            >
              Show Movie
            </Button>
          </Link>
          <FavoriteList movie={movie} />
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
};

export default connect(null, { getMovieDetails })(MovieCard);
