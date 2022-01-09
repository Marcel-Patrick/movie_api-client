// director-view.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./director-view.scss";

export class MovieView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{Director.Name}</Card.Title>
          <Card.Text>{Director.Bio}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Birth: {Director.Birth}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button
            className="button-block "
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
