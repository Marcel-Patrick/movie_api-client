//  favoritMovies

import React from "react";
import PropTypes from "prop-types";
import { CardGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { userData: state.userData, movies: state.movies };
};

class FavoriteMovies extends React.Component {
  render() {
    const { userData } = this.props;
    const { movies } = this.props;

    if (movies.length === 0) return <div>The list is loading!</div>;
    if (userData.user.FavoriteMovies.length === 0)
      return <div>Your favorite movies list is empty!</div>;

    return (
      <Row className="main-view justify-content-center">
        {userData.user.FavoriteMovies.length > 0 &&
          movies.map((movie) => {
            if (movie._id === userData.user.FavoriteMovies.find((fav) => fav === movie._id)) {
              return (
                <Col sm={6} xs={12} key={movie._id}>
                  <CardGroup className="cardStyle">
                    <MovieCard movie={movie} user={userData.user.Username} />
                  </CardGroup>
                </Col>
              );
            }
          })}
      </Row>
    );
  }
}

FavoriteMovies.propTypes = {
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
};

export default connect(mapStateToProps)(FavoriteMovies);
