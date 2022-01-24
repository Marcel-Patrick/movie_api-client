// navbar.jsx

import React from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { connect } from "react-redux";

import "./navbar.scss";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter, userData: state.userData };
};

function Menuebar(props) {
  const { userData, visibilityFilter } = props;

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  isAuth = () => {
    if (typeof window == "undefinded") {
      return false;
    }
    if (Object.keys(userData).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          MovieFlex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${userData.user.Username}`}>
                {userData.user.Username}
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link
                className="handCursor"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Logout
              </Nav.Link>
            )}
            {isAuth() && <VisibilityFilterInput visibilityFilter={visibilityFilter} />}
            {!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
            {!isAuth() && <Nav.Link href="/registration">Create Account</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Menuebar.propTypes = {
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
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(Menuebar);
