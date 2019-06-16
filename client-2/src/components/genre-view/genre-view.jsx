//import of modules
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './genre-view.scss';

// function component that creates a list with all movies of this particular genre
const MoviesOfGenre = (props) => {
  const rows = props.movieByGenre.map((row, index) => {
    return <li key={index}>{row.title}</li>
  });
  return <ul>{rows}</ul>
}

// class component for genre of the selected movie
export class GenreView extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { genre, movies } = this.props;
    console.log(genre);
    console.log(movies);

    //if (!movies) return null;
    let genreMovies = movies.filter(m => m.genre.name == genre);
    let genreData = {...this.props.movies.genre};

    return (
      <div>
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
            <Card.Title>Genre: {genreData.name}</Card.Title>
            <Card.Title>Genre: {genre.name}</Card.Title>
            <Card.Text>{genre.description}</Card.Text>
            <Card.Subtitle>Movies of the category {genre.name}:</Card.Subtitle>
            <MoviesOfGenre movieByGenre={genreMovies}/>
            <Link to={`/`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect(({movies}) => ({movies}))(GenreView);
