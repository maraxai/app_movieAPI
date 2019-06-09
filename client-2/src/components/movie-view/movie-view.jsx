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

import axios from 'axios';

import './movie-view.scss'

import { Link } from 'react-router-dom';

// exports the stateful class component which in inherited from the React component
export class MovieView extends React.Component {
  // constructer function, super refers to the 'Super' object of the React component
  // 'this' refers to the function's object, which is internally mutable
  constructor(props) {
    super(props);
    this.state = {
      favoritemovies: [],
      movies: []
    }
  };

  //update user data
  updateProfile(e) {
    e.preventDefault();
    console.log(this.state.username);
    axios.put(`https://stark-headland-48507.herokuapp.com/users/${localStorage.getItem('user')}`, {
      favoritemovies: this.state.favoritemovies
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Movie added!');
      //update localStorage
      localStorage.setItem('user', this.state.favoritemovies);
      this.getUser(localStorage.getItem('token'));
    })
    .catch(e => {
      console.log('error, the movie has not been added, try again');
      alert('please check, error');
    });
  }

// note: favoritemovies is added as 'state' ; see constructor()
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
            <Button variant="outline-secondary" size="sm">Back to Movie List</Button>
          </Link><span>&nbsp;</span>
          <Link to={`/directors/${movie.director.name}`}>
            <Button variant="outline-secondary" size="sm">Director</Button>
          </Link><span>&nbsp;</span>
          <Link to={`/genres/${movie.genre.name}`}>
            <Button variant="outline-secondary" size="sm">Genre</Button>
          </Link><span>&nbsp;</span>
        </Card.Body>
      </Card>
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
