// userInfo.jsx

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Card, CardGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class UserInfo extends React.Component {
  // Define the initial state:
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    /* Send a request to the server for authentication */
    let user = localStorage.getItem("user"); // Contains information about the logged user
    let token = localStorage.getItem("token");
    axios
      .put(
        `https://fathomless-plains-90381.herokuapp.com/users/${user}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.removeItem("user");
        localStorage.setItem("user", this.state.username);
        alert(`Hi ${this.state.username}, changes were successfully update!`);
        window.open(`/users/${this.state.username}`, "_self"); // the "_self" argument is necessary that page opens in current tab
      })
      .catch((response) => {
        console.error(response);
        alert("Update not possible!");
      });
  }
  render() {
    const { username, password, email, birthday } = this.state;
    const { userData } = this.props;
    if (userData == null) return <div className="main-view" />;
    return (
      <Card>
        <Card.Body>
          <Card.Title>Hi {userData.Username} </Card.Title>
          <Card.Text>Welcome to your Profile </Card.Text>
        </Card.Body>
        <CardGroup>
          <Card.Body>
            <Form className="font-weight-bold">
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) =>
                    this.setState({
                      username: e.target.value,
                    })
                  }
                  placeholder={userData.Username}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                    })
                  }
                  minLength="6"
                  placeholder="********"
                />
              </Form.Group>
              <Form.Group controlId="Email" className="mb-3">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    this.setState({
                      email: e.target.value,
                    })
                  }
                  placeholder={userData.Email}
                />
              </Form.Group>
              <Form.Group controlId="updateBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="date"
                  value={birthday}
                  onChange={(e) =>
                    this.setState({
                      birthday: e.target.value,
                    })
                  }
                  placeholder={userData.Birthday}
                />
              </Form.Group>
              <Button className="mb-3" type="submit" onClick={(e) => this.handleSubmit(e)}>
                Save Changes
              </Button>{" "}
              <Link to={"/"}>
                <Button className="mb-3" variant="success" type="button">
                  Home Page
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </CardGroup>
      </Card>
    );
  }
}

UserInfo.propTypes = {
  userData: PropTypes.shape({
    Usermame: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
};
