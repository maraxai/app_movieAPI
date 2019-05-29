import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './genre-view.scss';

const MoviesOfGenre = (props) => {
  const rows = props.movieByGenre.map((row, index) => {
    return <li key={index}>{row.title}</li>
  });
  return <ul>{rows}</ul>
}

export class GenreView extends React.Component {
  render() {
    const { genre, movie, test } = this.props;

    return (
      <div>
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
            <Card.Title>Genre: {genre.name}</Card.Title>
            <Card.Text>{genre.description}</Card.Text>
            <Card.Subtitle>Movies of the category {genre.name}:</Card.Subtitle>
            <MoviesOfGenre movieByGenre={movie}/>
            <Link to={`/`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
