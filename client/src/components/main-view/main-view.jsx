// import the react library
import React from 'react';

// manages HTTP requests
import axios from 'axios';

//imports the designated components from the files wherein they reside
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// make it pretty
import './main-view.scss'

// exports the stateful class component which is inherited from the 'prototype' react componentDidMount
export class MainView extends React.Component {
  // applies constructor function including object reference to 'prototype' object through 'this'
  constructor() {
    super();

      //initiates the state for designated properties upon page load
      this.state = {
        movies: null,
        selectedMovie: null,
        user: null,
        register: false
      };
  }

  //life-cycle method, once react component is mounted, the http client axios GETS the db data
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

  // changes to MovieView of selected movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // when user is logged in, user is set
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //when user is registered, he does not need to register any more
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  //RegistrationView is not working
  register() {
    this.setState({
      register: true
    })
  }

  // switches from MovieView back to MainView
  backToMainView() {
    this.setState({
      selectedMovie: null
    });
  }

  // the render function displays the data
  render() {
  // the state has to been initialized before data is initially loaded
  const { movies, selectedMovie, user, register } = this.state;

  if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

  if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />

    // if there is no user, the LoginView is displayed (or in other words: as long as there is no user, the LoginView is returned)
    //if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    //<div className="login-view"><LoginView user={user} onClick={user => this.onLoggedIn(user)}/></div>


    return (
      <div className="main-view">
        {selectedMovie ? <MovieView movie={selectedMovie} onClick={() => this.backToMainView()} /> : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
        ))}
        </div>
    );
  }
}
