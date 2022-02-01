// registration-view.jsx

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Alert from "react-bootstrap/Alert";

import axios from "axios";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordRepeatErr, setPasswordRepeatErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Please enter a Username!");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must contain at least 5 charaters!");
      isReq = false;
    } else {
      setUsernameErr("");
    }

    if (!password) {
      setPasswordErr("Please enter a Password!");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must contain at least 6 charaters!");
      isReq = false;
    } else {
      setPasswordErr("");
    }

    if (!passwordRepeat) {
      setPasswordRepeatErr("Repeat your Password!");
      isReq = false;
    } else if (passwordRepeat !== password) {
      setPasswordRepeatErr("Please enter the same Password!");
      isReq = false;
    } else {
      setPasswordRepeatErr("");
    }

    if (!email) {
      setEmailErr("Please enter your Email Address!");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please enter a valid Email Address!");
      isReq = false;
    } else {
      setEmailErr("");
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
        .post("https://fathomless-plains-90381.herokuapp.com/registration", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          alert("You are successfully registrated, please login!");
          window.open("/", "_self"); // the "_self" argument is necessary that page opens in current tab
        })
        .catch((response) => {
          console.error(response);
          alert("Registration not possible, Usermame already exist!");
        });
    }
  };

  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>Create your Account:</Card.Title>

          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
                placeholder="Enter a Username"
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
                required
                minLength="6"
                placeholder="Enter a Password (6 or more Characrets)"
              />
              {/* code added here to display validation error */}
              {passwordErr && <Alert variant="danger">{passwordErr}</Alert>}
            </Form.Group>

            <Form.Group controlId="formPasswordRepeat">
              <Form.Label>Repeat Password:</Form.Label>
              <Form.Control
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                required
                placeholder="Repeat your Password"
              />
              {/* code added here to display validation error */}
              {passwordRepeatErr && <Alert variant="danger">{passwordRepeatErr}</Alert>}
            </Form.Group>

            <Form.Group controlId="Email" className="mb-3">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your Email"
              />
              {/* code added here to display validation error */}
              {emailErr && <Alert variant="danger">{emailErr}</Alert>}
            </Form.Group>

            <Form.Group controlId="updateBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                className="mb-3"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button className="mb-5" type="submit" onClick={handleSubmit}>
              Create Account
            </Button>

            <p>You already have an account?</p>
            <Link to={"/"}>
              <Button variant="secondary" type="button">
                Go on and Log In
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}
