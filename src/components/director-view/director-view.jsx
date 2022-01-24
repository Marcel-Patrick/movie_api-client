// director-view.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { connect } from "react-redux";

import "./director-view.scss";

let mapStateToProps = (state) => {
  return { directorDetails: state.directorDetails };
};

class DirectorView extends React.Component {
  render() {
    const { directorDetails, onBackClick } = this.props;
    return (
      <Card>
        <Card.Body>
          <Card.Title>{directorDetails.Name}</Card.Title>
          <Card.Text>{directorDetails.Bio}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Birth: {directorDetails.Birth}</ListGroupItem>
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

DirectorView.propTypes = {
  directorDetails: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
  }),
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps)(DirectorView);
