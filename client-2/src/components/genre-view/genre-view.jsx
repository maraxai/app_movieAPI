import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom'

import './genre-view.scss'

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props;
    return (
        <Card bg="light" style={{ width: '90%' }}>
        <Card.Body>
          <Card.Title>{genre.name}</Card.Title>
          <Card.Text>{genre.description}</Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
