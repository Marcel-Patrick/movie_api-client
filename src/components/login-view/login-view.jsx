// login-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
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
          console.log(data);
        })
        .catch((e) => {
          console.log("no such user");
          console.log(username);
          console.log(password);
          console.log(e);
        });
    }
  };

  const handleRegistration = () => {
    console.log(true + " log view");
    props.userRegistration(true);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand>MovieFlex</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleRegistration}>Create Account</Nav.Link>
            <Nav.Link>Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
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
                        placeholder="Ernter your Username"
                      />
                      {/* code added here to display validation error */}
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // required
                        placeholder="Ernter your Password"
                      />
                      {/* code added here to display validation error */}
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <Button
                      className="mt-3"
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Log In
                    </Button>
                    {"   "}
                    <Button
                      className="mt-3"
                      variant="secondary"
                      type="button"
                      onClick={handleRegistration}
                    >
                      Create an Account
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onLoggedIn: PropTypes.func.isRequired,
  userRegistration: PropTypes.func.isRequired,
};
