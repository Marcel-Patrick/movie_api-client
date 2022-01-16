import React from "react";
import { Navbar, Container, Nav, Button, Link } from "react-bootstrap";
// import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
// import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

export function Menubar({ user }) {
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  isAuth = () => {
    if (typeof window == "undefinded") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
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
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Log out
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Log in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/registration">Create Account</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
