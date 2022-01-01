// registration-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "username: " + username,
      "password: " + password,
      "passwordRepeat: " + passwordRepeat,
      "email:" + email
    );
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegistration = () => {
    console.log(false + " register view");
    props.userRegistration(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Create your Account:</Card.Title>

                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      // required
                      placeholder="Ernter a Username"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // required
                      // minLength="6"
                      placeholder="Ernter a Password (6 or more Characrets)"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Repeat Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      // required
                      placeholder="Repeat your Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your Email"
                    />
                  </Form.Group>
                  <Button className="mb-5" type="submit" onClick={handleSubmit}>
                    Create Account
                  </Button>

                  <p>You already have an account?</p>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleRegistration}
                  >
                    Go on and Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  RepeatPassword: PropTypes.string,
  Email: PropTypes.string,
  onClick: PropTypes.func,
};
