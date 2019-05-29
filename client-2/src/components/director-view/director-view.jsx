import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom'

// make it pretty
import './director-view.scss'

const MoviesOfDirector = (props) => {
  const rows = props.moviesByDirector.map((row, index) => {
    return <li key={index}>{row.title}</li>;
  });
  return <ul>{rows}</ul>;
};



export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {}
  }
  render() {

    // destructuring - assign 'movie' and 'onClick' as this components object
    const { director, movie } = this.props;
    //<Card.Img style={{ width: '30%' }} variant="top" src={movie.imagePath} />

    if (!director) return null;

    return (
      <Card bg="light" style={{ width: '90%' }}>
        <Card.Body>
          <Card.Title>{director.name}</Card.Title>
          <Card.Text>born: {director.birth}</Card.Text>
          <Card.Text>{director.death}</Card.Text>
          <Card.Text>{director.bio}</Card.Text>
          <Card.Subtitle>Movies directed by {director.name}:</Card.Subtitle>
          <MoviesOfDirector moviesByDirector={movie} />
          <Link to={`/`}>
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string,
    Movies: PropTypes.array
  }).isRequired
};
