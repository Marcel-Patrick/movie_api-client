// movies-list.jsx

import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CardGroup from "react-bootstrap/CardGroup";
import MovieCard from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter, movies: state.movies };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      {filteredMovies.map((movie) => (
        <Col md={3} sm={6} xs={12} key={movie._id}>
          <CardGroup className="cardStyle">
            <MovieCard movie={movie} />
          </CardGroup>
        </Col>
      ))}
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(MoviesList);
