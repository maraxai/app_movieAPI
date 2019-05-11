import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// make it pretty
import './movie-view.scss'

// exports the stateful class component which in inherited from the React component
export class MovieView extends React.Component {
  // constructer function, super refers to the 'Super' object of the React component
  // 'this' refers to the function's object, which is internally mutable
  constructor() {
    super();
    this.state = {}
  };

    // render function displays the props
  render() {
    const { movie, onClick } = this.props;

    if (!movie) {
      return null;
    }

  return (
    // React Bootstrap Component Container
    <Container>
      <Row>
      </Row>
      <Row>
        <Col lg={1} md={1} sm={1} xs={1} className="label">Title:</Col>
        <Col>{movie.title}</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col lg={2} md={1} sm={1} xs={1} className="label">Description:</Col>
        <Col>{movie.description}</Col>
        <Col>
          <img className="movie-poster" src={movie.imagePath} />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={1} sm={1} xs={1} className="label">Genre:</Col>
        <Col>{movie.genre.name}</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col lg={2} md={1} sm={1} xs={1} className="label">Director:</Col>
        <Col>{movie.director.name}</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-secondary" size="sm" onClick={() => onClick()}>Back to Main View</Button>
        </Col>
      </Row>
      <Row>
      </Row>
    </Container>
    );
  }
}

MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    genre: PropTypes.shape({name: PropTypes.string}).isRequired,
    director: PropTypes.shape({name: PropTypes.string}).isRequired
  }).isRequired
};
