// main-view.jsx

import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import "./main-view.scss";

import { setMovies, setUser } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

import LoginView from "../login-view/login-view"; // this view is used to let users log in to thier account
import MovieView from "../movie-view/movie-view"; // this view returns a list of all movies in the database
import GenreView from "../genre-view/genre-view"; // this view returns the genres Name and Dercription in the database
import DirectorView from "../director-view/director-view"; // this view returns the directors Name and Dercription in the database
import Menuebar from "../navbar/navbar"; // this will import the Navbar for all views
import { RegistrationView } from "../registration-view/registration-view"; // this view is used to create new user account
import { ProfileView } from "../profile-view/profile-view"; // this view is used to give the users access in to thier account
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

let mapStateToProps = (state) => {
  return { movies: state.movies, userData: state.userData };
};
/* The MainView class is used to manage all the other views and 
   load the right component based on the previous conditions*/
class MainView extends React.Component {
  /* This method is gnerated after the component is rendered */
  componentDidMount() {
    /* The list of movies will be loaded only if we have the right JWT */
    if (Object.keys(this.props.userData).length !== 0) {
      this.getMovies(this.props.userData.token);
    }
  }

  /* This method is used to update the `user` property in state to that particular user,
     when a user successfully logs in */
  onLoggedIn() {
    if (Object.keys(this.props.userData).length !== 0) this.getMovies(this.props.userData.token);
  }

  /* This method is used to get the List of Movies  */
  getMovies(token) {
    axios
      .get("https://fathomless-plains-90381.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* This method is used to logout and remove local storage data (userData) */
  onLoggedOut() {
    this.props.setUser({});
  }

  /* For Singel Page Appliction "SPA": The component that full fill the required conditions will be loaded */
  render() {
    let { userData, movies } = this.props; // this.props.userData --> userData

    return (
      <Router>
        <Menuebar />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
                if (Object.keys(userData).length === 0)
                  return (
                    <Col>
                      <LoginView onLoggedIn={() => this.onLoggedIn()} />
                    </Col>
                  );

                if (movies.length === 0)
                  return <div className="main-view">The list is loading!</div>;
                return <MoviesList />;
              }}
            />

            <Route
              path="/registration"
              render={() => {
                // User registration to create a new user account
                if (Object.keys(userData).length !== 0) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:username"
              render={() => {
                return (
                  <Col lg={8} md={8}>
                    <ProfileView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <MovieView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />

            <Route
              path="/director/:name"
              render={({ history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <DirectorView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />

            <Route
              path="/genre/:name"
              render={({ history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={6} sm={8} xs={12}>
                    <GenreView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
