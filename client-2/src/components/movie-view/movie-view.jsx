import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import { FavMovieButton } from '../button/toggleButton';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

import axios from 'axios';

// make it pretty
import './movie-view.scss'

import { Link } from 'react-router-dom';

// exports the stateful class component which in inherited from the React component
export class MovieView extends React.Component {
  // constructer function, super refers to the 'Super' object of the React component
  // 'this' refers to the function's object, which is internally mutable
  constructor(props) {
    super(props);
    this.state = {
      //favoritemovies: this.state.favoritemovies
    }
  };

//this.handleOnClick = this.handleOnClick.bind(this);
  //  this.handleAddMovie = this.handleAddMovie.bind(this);
  //  this.handleRemoveMovie = this.handleRemoveMovie.bind(this);

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

/*
  // adds movie to favoritemovies list
  handleAddMovie(event) {
    this.setState({
      favoritemovies.push(movie._id) : this.state.favoritemovies
    });
    alert('You added this movie to your list of favorite movies.');
    return (
      <Button variant="outline-secondary" size="sm" onClick={this.handleOnClick} className="toggle-fav-movie-status">Add To Your Favorite Movie List</Button><br />
    );
  }

 // removes movie to favoritemovies list
  handleRemoveMovie() {
   this.setState({
     favoritemovies.filter(id => id !== movie._id) : this.state.favoritemovies
   });
   alert('You removed this movie from your list of favorite movies.');
   return (
     <Button variant="secondary" size="sm" onClick={this.handleOnClick} className="toggle-fav-movie-status">Remove from your Favorite Movie List</Button><br />
   );
  }

  // event handler for clickOn event button when adding/removing a movie to favoritemovies
  handleOnClick(event) {
    users.favoritemovies.includes(this.props.movie._id) ? this.handleAddMovie() : this.handleRemoveMovie();
  }
*/
  // note: favoritemovies is added as 'state' ; see constructor()
  render() {
   const { movie } = this.props;
   const { favoritemovies } = this.state;

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
          {/* this should be a toggle button, IF movie is not in the array users.favoritemovies, onClick event adds the movie to array users.favoritemovies and checkbox is 'checked'
          IF movie is is in the array users.favoritemovie, onClick event removes the movie from users.favoritemovies and checkbox is 'un-checked'
           in addition the label of the toggle button changes according to true false
          */}
          <FavMovieButton /><br />
          <div class="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="favoritemovie" />
          <label class="custom-control-label" for="favoritemovie">Add to Your Favorite Movie List</label>
          </div>
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
