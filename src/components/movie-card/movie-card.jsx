// movie-card.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FavoriteList } from "../favoriteList-view/favorite-list";
import "./movie-card.scss";

export class MovieCard extends React.Component {
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
          </Link>
          <FavoriteList movie={movie} user={user} />
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
  user: PropTypes.string,
};
