// main-view.jsx

import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view"; // this view is used to create new user account
import { LoginView } from "../login-view/login-view"; // this view is used to let users log in to thier account
import { MovieCard } from "../movie-card/movie-card"; // this view is showing up infirmation about a single movie
import { MovieView } from "../movie-view/movie-view"; // this view returns a list of all movies in the database
import { GenreView } from "../genre-view/genre-view"; // this view returns the genres Name and Dercription in the database
import { DirectorView } from "../director-view/director-view"; // this view returns the directors Name and Dercription in the database

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// to show up the all movies from database
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registerNewUser: false,
      user: null,
    };
  }

  // use of Axios Library to fetch movies list
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // When anonymus create a new user account
  userRegistration(registerNewUser) {
    console.log(registerNewUser + " main view");

    this.setState({
      registerNewUser, // it s the short form of registerNewUser: registerNewUser,
    });
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // To get the List of Movies or the a single movie returned from the database
  getMovies(token) {
    axios
      .get("https://fathomless-plains-90381.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Logout and remove local storage data (username and JWT-token)
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  // to make the view of a single movie
  render() {
    const { movies, registerNewUser, user } = this.state;

    // User registration to create a new user account
    if (registerNewUser)
      return (
        <RegistrationView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          userRegistration={(newUser) => this.userRegistration(newUser)}
        />
      );

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          userRegistration={(newUser) => this.userRegistration(newUser)}
        />
      );

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    // to show up all movies or a selected single movie in the DOM
    return (
      <Router>
        <div className="main-view">
          <Navbar bg="dark" variant="dark" className="mb-3">
            <Container fluid>
              <Navbar.Brand>MovieFlex</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    this.onLoggedOut();
                  }}
                >
                  Logout
                </Nav.Link>
                <Nav.Link>Contact</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                return movies.map((m) => (
                  <Col md={3} sm={6} xs={12} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                return (
                  <Col md={6} sm={8} xs={12}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/director/:name"
              render={({ match }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genre/:name"
              render={({ match }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                    />
                  </Col>
                );
              }}
            />
          </Row>

          {/* <Row className="justify-content-center">
          {selectedMovie ? (
            <Col md={6} sm={8} xs={12}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3} sm={6} xs={12} key={movie._id}>
                <CardGroup className="cardStyle">
                  <MovieCard
                    movie={movie}
                    onMovieClick={(movie) => {
                      this.setSelectedMovie(movie);
                    }}
                  />
                </CardGroup>
              </Col>
            ))
          )}
        </Row> */}
        </div>
      </Router>
    );
  }
}
