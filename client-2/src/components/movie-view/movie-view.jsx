/** MovieView is ready for JSDoc documentation */
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainView from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';


function MovieView(props) {
  const { movies, id } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id == id);
  console.log(movies)

  return (
    <div className="movie-view">
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Img style={{ width: '20%' }} variant="top" src={movie.imagePath} />
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={'/'}>
              <Button variant="outline-secondary" size="sm">back to movie list</Button>
            </Link><span>&nbsp;</span>
            <Link to={`/directors/${movie.director.name}`}>
              <Button variant="outline-secondary" size="sm">director</Button>
            </Link><span>&nbsp;</span>
            <Link to={`/genres/${movie.genre.name}`}>
              <Button variant="outline-secondary" size="sm">genre</Button>
            </Link><span>&nbsp;</span>
          </Card.Body>
        </Card>
    </div>

  )
}

export default connect( ({movies, users}) => ({movies, users}) )(MovieView);
