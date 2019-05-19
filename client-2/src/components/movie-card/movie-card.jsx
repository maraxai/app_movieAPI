import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom'

// make it pretty
import './movie-card.scss'

// export state-less class component
export class MovieCard extends React.Component {
  render() {

    // destructuring - assign 'movie' and 'onClick' as this components object
    const { movie } = this.props;
    // returns the movie title
    return (
      <Card bg="light" style={{ width: '90%' }}>
        <Card.Body>
          <Card.Img style={{ width: '30%' }} variant="top" src={movie.imagePath} />
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
//<Button onClick={() => onClick(movie)} variant="outline-secondary" size="sm">Open</Button>

MovieCard.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
