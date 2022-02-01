// genre-view.jsx

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";

import "./genre-view.scss";

let mapStateToProps = (state) => {
  return { genreDetails: state.genreDetails };
};

class GenreView extends React.Component {
  render() {
    const { genreDetails, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{genreDetails.Name}</Card.Title>
          <Card.Text>{genreDetails.Description}</Card.Text>
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

GenreView.propTypes = {
  genreDetails: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps)(GenreView);
