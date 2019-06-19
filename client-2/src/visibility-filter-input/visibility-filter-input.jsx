import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { setFilter } from '../actions/actions';

// make it pretty
import './visibility-filter-input.scss'

function VisibilityFilterInput(props) {
  return (
    <div className="search-bar">
  {/*  <Dropdown>
    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
    search by
    </Dropdown.Toggle>

    <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">title</Dropdown.Item>
    <Dropdown.Item href="#/action-2">genre</Dropdown.Item>
    <Dropdown.Item href="#/action-3">director</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>

    <Form.Control
  onChange={e => props.setFilter(e.target.value)}
  value={props.visibilityFilter}
  placeholder="search for movie title..."

  />;
*/}

  <Form.Group className="filter-group">

      <Form.Control
        className="filter"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="search by"
      />

      <Form.Control
      className="filter"
      as="select"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      >
      <option id="cat-title">title</option>
      <option id="cat-director">director</option>
      <option id="cat-genre">genre</option>
      </Form.Control>
    </Form.Group>


</div>
)

}

export default connect(({visibilityFilter}) => ({visibilityFilter}), { setFilter })(VisibilityFilterInput);
