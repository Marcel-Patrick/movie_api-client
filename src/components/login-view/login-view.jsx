// login-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Please enter your Username!");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Please enter your Password!");
      isReq = false;
    } else if (password.length < 2) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    // if all required fields are correctly set, start conneting to the server
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://fathomless-plains-90381.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          alert("Something went wrong: Please check Username or Password!");
          console.log(e);
        });
    }
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>Welcome to your Log In:</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
                placeholder="Enter your Username"
              />
              {/* code added here to display validation error */}
              {usernameErr && <Alert variant="danger">{usernameErr}</Alert>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                placeholder="Enter your Password"
              />
              {/* code added here to display validation error */}
              {passwordErr && <Alert variant="danger">{passwordErr}</Alert>}
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit" onClick={handleSubmit}>
              Log In
            </Button>
            {"   "}
            <Link to={`/registration`}>
              <Button className="mt-3" variant="secondary" type="button">
                Create an Account
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
