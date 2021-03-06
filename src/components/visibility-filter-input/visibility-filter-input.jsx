// visibility-filter-input.jsx

import React from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Find a Movie"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
