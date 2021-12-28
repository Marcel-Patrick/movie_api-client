// main-view.jsx

import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { RegistrationView } from "../registration-view/registration-view"; // this view is used to create new user account
import { LoginView } from "../login-view/login-view"; // this view is used to let users log in to thier account
import { MovieCard } from "../movie-card/movie-card"; // this view is showing up infirmation about a single movie
import { MovieView } from "../movie-view/movie-view"; // this view returns a list of all movies in the database

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
    axios
      .get("https://fathomless-plains-90381.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
  onLoggedIn(user) {
    this.setState({
      user, // it s the short form of user: user,
    });
  }

  // to make the view of a single movie
  render() {
    const { movies, selectedMovie, registerNewUser, user } = this.state;

    // User registration to create a new user account
    if (registerNewUser)
      return (
        <RegistrationView
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
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
