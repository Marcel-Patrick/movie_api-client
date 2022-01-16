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

/* The MainView class is used to manage all the other views and 
   load the right component based on the previous conditions*/
export class MainView extends React.Component {
  /* The constructor is used to initialize the status variables */
  constructor() {
    super();
    this.state = {
      movies: [], //Contains the list of movies loaded from the server side
      selectedMovie: null, // Contains the selectd movie by the logged user
      registerNewUser: false, // Check if the user is requesting a new registration
      user: null, // Contains information about the logged user
    };
  }

  /* Use of Axios Library to fetch movies list */
  /* This method is gnerated after the component is rendered */
  componentDidMount() {
    /* Read the local saved token and user to connect to certain views */
    let accessToken = localStorage.getItem("token");

    /* The list of movies will be loaded only if we have the right JWT */
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /* This method is used to set the new value for a selected movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* This method will be used to set the new values of New User */
  userRegistration(registerNewUser) {
    console.log(registerNewUser + " main view");

    this.setState({
      registerNewUser, // it s the short form of registerNewUser: registerNewUser,
    });
  }

  /* This method is used to update the `user` property in state to that particular user,
     when a user successfully logs in */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  /* This method is used to get the List of Movies or a single movie returned from the database */
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

  /* This method is used to logout and remove local storage data (username and JWT-token) */
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  /* For Singel Page Appliction "SPA": The component that full fill the required conditions will be loaded */
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

    if (movies.length === 0) return <div className="main-view">The list is loading!</div>;

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
                    <CardGroup className="cardStyle">
                      <MovieCard movie={m} />
                    </CardGroup>
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col md={6} sm={8} xs={12}>
                    <MovieView
                      movie={movies.find((movie) => movie._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/director/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <DirectorView
                      director={
                        movies.find((movie) => movie.Director.Name === match.params.name).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genre/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <GenreView
                      genre={movies.find((movie) => movie.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </div>
      </Router>
    );
  }
}
