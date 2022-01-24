// movie-view.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDirectorDetails, getGenreDetails } from "../../actions/actions";

import "./movie-view.scss";

let mapStateToProps = (state) => {
  return { movieDetails: state.movieDetails };
};

class MovieView extends React.Component {
  render() {
    const { movieDetails, onBackClick } = this.props;
    return (
      <Card>
        <Card.Img
          className="movie-poster"
          variant="top"
          src={movieDetails.ImagePath}
          crossOrigin="anonymous"
        />
        <Card.Body>
          <Card.Title>{movieDetails.Title}</Card.Title>
          <Card.Text>{movieDetails.Description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Genre:
            <Link to={`/genre/${movieDetails.Genre.Name}`}>
              <Button
                variant="link"
                onClick={() => {
                  this.props.getGenreDetails(movieDetails.Genre);
                }}
              >
                {movieDetails.Genre.Name}
              </Button>
            </Link>
          </ListGroupItem>
          <ListGroupItem>
            Director:
            <Link to={`/director/${movieDetails.Director.Name}`}>
              <Button
                variant="link"
                onClick={() => {
                  this.props.getDirectorDetails(movieDetails.Director);
                }}
              >
                {movieDetails.Director.Name}
              </Button>
            </Link>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button
            className="button-block "
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movieDetails: PropTypes.shape({
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
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps, { getDirectorDetails, getGenreDetails })(MovieView);
