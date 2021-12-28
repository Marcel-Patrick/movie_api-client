// registration-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegistration = () => {
    console.log(false + " register view");
    props.userRegistration(false);
  };

  return (
    <form>
      <h1>Create an Account:</h1>
      <div>
        <label>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <p>Repeat-Password:</p>
          <input
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
      <div>
        <p>Already registrated?</p>
        <button type="button" onClick={handleRegistration}>
          Than: Log In
        </button>
      </div>
    </form>
  );
}

RegistrationView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  RepeatPassword: PropTypes.string,
  Email: PropTypes.string,
  onClick: PropTypes.func,
};
