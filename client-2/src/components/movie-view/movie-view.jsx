import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';


// make it pretty
import './movie-view.scss'

import { Link } from 'react-router-dom';

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
    const { movie } = this.props;

    if (!movie) {
      return null;
    }

    return (
      // React Bootstrap Component Card
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Img style={{ width: '20%' }} variant="top" src={movie.imagePath} />
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={'/'}>
            <Button variant="outline-secondary">Back to Movie List</Button>
          </Link><span>&nbsp;</span>
          <Link to={`/directors/${movie.director.name}`}>
            <Button variant="outline-secondary">Director</Button>
          </Link><span>&nbsp;</span>
          <Link to={`/genres/${movie.genre.name}`}>
            <Button variant="outline-secondary">Genre</Button>
          </Link><span>&nbsp;</span><br />
        </Card.Body>
      </Card>
    );
  }
}
//<div class="custom-control custom-checkbox">
//<input type="checkbox" className="custom-control-input" id="favoritemovie"  />
//<label class="custom-control-label" for="favoritemovie">Favorite Movie</label>
//</div>

MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    genre: PropTypes.shape({name: PropTypes.string}).isRequired,
    director: PropTypes.shape({name: PropTypes.string}).isRequired
  }).isRequired
};
