import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// make it pretty
import './director-view.scss'

function DirectorView(props) {
  const { director, movies } = props;

  if (!movies || !movies.length) return null;
  const movieDirector = movies.find(m => m.director.name == director).director;
  const directorMovies = movies.filter(m => m.director.name == director).map((row, index) => {
    return <li key={index}>{row.title}</li>
  })

    return (
      <Card bg="light" style={{ width: '90%' }}>
        <Card.Body>
          <Card.Title>{movieDirector.name}</Card.Title>
          <Card.Text>born: {movieDirector.birth}</Card.Text>
          <Card.Text>death: {movieDirector.death}</Card.Text>
          <Card.Text>bio: {movieDirector.bio}</Card.Text>
          <Card.Subtitle>movies by {movieDirector.name}:</Card.Subtitle>
          <Card.Text>{directorMovies}</Card.Text>
          <Link to={`/`}>
            <Button variant="outline-secondary">back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
}

export default connect(({movies}) => ({movies}))(DirectorView)
