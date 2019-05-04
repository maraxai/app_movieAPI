// import the react library
import React from 'react';
// manages HTTP requests
import axios from 'axios';
//imports the designated components from the files wherein they reside
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// exports the stateful class component which is inherited from the 'prototype' react componentDidMount
export class MainView extends React.Component {
  // applies constructor function including object reference to 'prototype' object through 'this'
  constructor() {
    super();

      this.state = {
        movies: null,
        selectedMovie: null
      };
  }

  //one of the 'hooks' available in a React component
  componentDidMount() {
    //fill in https://stark-headland-48507.herokuapp.com for '<my-api-endpoint>'?
    // axios uses promises
    axios.get('https://stark-headland-48507.herokuapp.com/movies')
      .then(response => {
        // assign the result to the state
        this.setState({
          movies : response.data
      });
    })
      .catch(function (error) {
        console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // the render function displays the data
  render() {
    // the state has to been initialized before data is initially loaded
    // ?? this.state has already been set earlier, why again?
  const { movies, selectedMovie } = this.state;

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} /> : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
      ))}
      </div>
    );
  }
}
