// import the react library
import React from 'react';

// manages HTTP requests
import axios from 'axios';

//imports the designated components from the files wherein they reside
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
        selectedMovieId: null,
        user: null,
        register: false
      };
  }

  //life-cycle method, once react component is mounted, the http client axios GETS the db data
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

/*
  //parses the hash
  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#V?|V$/g,'').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }
*/
/*
  // changes to MovieView of selected movie
  onMovieClick(movie) {
    window.location.hash='#' + movie._id;

      this.setState({
      selectedMovie: movie._id
    });
  }
*/

  // when a user logs in, he is set to state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user : authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token)
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
/*
  // switches from MovieView back to MainView
  backToMainView() {
    this.setState({
      selectedMovieId: null
    });
  }
*/

  getMovies(token) {
    axios.get('https://stark-headland-48507.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // the render function displays the data
  render() {
  // the state has to been initialized before data is initially loaded
  // refracturing extracts the properties of the props/state (instead of this.state.user, you can use user)
  const { movies, user } = this.state;

  // if there is no user logged in, LoginView is displayed

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    //<div className="login-view"><LoginView user={user} onClick={user => this.onLoggedIn(user)}/></div>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    return (
      <Router>
        <div className="main-view">
        <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
        <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
        </div>
      </Router>
    );
  }
}
