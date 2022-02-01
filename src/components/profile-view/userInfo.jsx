// userInfo.jsx

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Card, CardGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setMovies } from "../../actions/actions";

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

class UserInfo extends React.Component {
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
  deleteAccount() {
    axios
      .delete(
        `https://fathomless-plains-90381.herokuapp.com/deregistrate/${this.props.userData.user.Username}`,
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        this.props.setUser({});
        this.props.setMovies({});

        alert("Your Account Has Been Deleted!");
      })
      .catch((response) => {
        console.error(response);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    /* Send a request to the server for authentication */
    let user = this.props.userData.user.Username; // Contains information about the logged user
    let token = this.props.userData.token;
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
        let updateUserData = {
          ...this.props.userData,
        };
        updateUserData.user.Username = this.state.username;
        updateUserData.user.Email = this.state.email;
        updateUserData.user.Birthday = this.state.birthday;
        this.props.setUser(updateUserData);

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
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Delete Account</Popover.Header>
        <Popover.Body>
          This action will <strong>DELETE</strong> completely your account. Do you want to continue?
          <br />
          <Link to={"/"}>
            <Button
              className="mt-3"
              variant="danger"
              type="button"
              onClick={() => this.deleteAccount()}
            >
              DELETE
            </Button>
          </Link>
          <Button
            className="mt-3 ml-2"
            variant="secondary"
            type="button"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            CANCEL
          </Button>
        </Popover.Body>
      </Popover>
    );
    if (userData == null) return <div className="main-view" />;
    return (
      <Card>
        <Card.Body>
          <Card.Title>Hi {userData.user.Username} </Card.Title>
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
                  placeholder={userData.user.Username}
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
                  placeholder={userData.user.Email}
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
                  placeholder={userData.user.Birthday}
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
              <div className="text-secondary">
                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                  <Button className="mb-3" variant="outline-danger" type="button">
                    Delete Account
                  </Button>
                </OverlayTrigger>
              </div>
            </Form>
          </Card.Body>
        </CardGroup>
      </Card>
    );
  }
}

UserInfo.propTypes = {
  userData: PropTypes.shape({
    User: PropTypes.shape({
      _id: PropTypes.string,
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.array,
    }),
    token: PropTypes.string,
  }),
  setUser: PropTypes.func,
  setMovies: PropTypes.func,
};

export default connect(mapStateToProps, { setUser, setMovies })(UserInfo);
