/** GenreView is ready for JSDoc documentation */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './genre-view.scss';

/** @function GenreView */
function GenreView(props) {
  const { genre, movies } = props;
  if (!movies || !movies.length) return null;
  let genreMovies = movies.find(m => m.genre.name == genre).genre;
  let moviesOfGenre = movies.filter(m => m.genre.name == genre).map((row, index) => {
    return <li key={index}>{row.title}</li>
  });
    return (
      <div>
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
            <Card.Title>genre: {genreMovies.name}</Card.Title>
            <Card.Text>{genreMovies.description}</Card.Text>
            <Card.Subtitle>More movies of the genre {genreMovies.name}:</Card.Subtitle>
            <Card.Text>{moviesOfGenre}</Card.Text>
            <Link to={`/`}>
              <Button variant="outline-secondary">back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
}

export default connect(({movies}) => ({movies}))(GenreView);
