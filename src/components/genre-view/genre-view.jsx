// genre-view.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./genre-view.scss";

export class MovieView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{Genre.Name}</Card.Title>
          <Card.Text>{Genre.Descriprtion}</Card.Text>
        </Card.Body>
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
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
