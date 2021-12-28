// login-view.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegistration = () => {
    console.log(true + " log view");
    props.userRegistration(true);
  };

  return (
    <div>
      <form>
        <h1>User Log In:</h1>
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
          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </div>
        <div>
          <p>Or:</p>
          <button type="button" onClick={handleRegistration}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

LoginView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  onClick: PropTypes.func,
};
