/** VisibilityFilterInput is ready for JSDoc documentation */
import React from 'react';
import PropTypes from 'prop-types';
// 'connect' to store
import { connect } from 'react-redux';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
// actions
import { setFilter } from '../../actions/actions';
import { setSortColumn } from '../../actions/actions';

// make it pretty
import './visibility-filter-input.scss'


function VisibilityFilterInput(props) {
  return (
    <div className="search-bar">
      <Form.Group className="filter-group">
        <Form.Label className="search-label">search by: </Form.Label>
        <Form.Control
        className="filter-categories"
        as="select"
        onChange={e => props.setSortColumn(e.target.value)}
        value={props.sortColumn}
        >
        <option id="cat-title">title</option>
        <option id="cat-director">director</option>
        <option id="cat-genre">genre</option>
        </Form.Control>

        <Form.Control
          className="filter"
          onChange={e => props.setFilter(e.target.value)}
          value={props.visibilityFilter}
          placeholder="search by"
        />
      </Form.Group>
    </div>
  )
}

export default connect(
  ( ({visibilityFilter}) => ({visibilityFilter}),
    ({sortColumn}) => ({sortColumn})
  ), { setFilter, setSortColumn }
)
(VisibilityFilterInput);
