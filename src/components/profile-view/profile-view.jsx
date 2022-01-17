// profile-view.jsx

import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import axios from "axios";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      userData: "",
    };
  }
  getUser() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user"); // Contains information about the logged user
    console.log(user);

    axios
      .get(`https://fathomless-plains-90381.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.Email);
        this.state.userData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUser();
  }
  render() {
    console.log("this the user value: ");
    return (
      <Card>
        {/* <Card.Img className="" variant="" src={user.ImagePath} crossOrigin="anonymous" /> */}

        <Card.Body>
          <Card.Title>Hello and welcome: {this.state.userData.Username}</Card.Title>
          <Card.Text>User ID: {this.state.userData._id}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Username: {this.state.userData.Username}</ListGroupItem>
          <ListGroupItem>Password: {this.state.userData.Password}</ListGroupItem>
          <ListGroupItem>Email: {this.state.userData.Email}</ListGroupItem>
          <ListGroupItem>FavoriteMovies: {this.state.userData.FavoriteMovies}</ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
