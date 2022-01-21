// movies-list.jsx

import React from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CardGroup from "react-bootstrap/CardGroup";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, user, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((movie) => (
        <Col md={3} sm={6} xs={12} key={movie._id}>
          <CardGroup className="cardStyle">
            <MovieCard movie={movie} user={user} />
          </CardGroup>
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
