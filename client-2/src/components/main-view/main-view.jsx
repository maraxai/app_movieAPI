// creates variable React with React module, as a part of the React library
import React from 'react';

// manages HTTP client requests
import axios from 'axios';

//imports the designated components from the files wherein they reside, bootstrap, router and app-specific ones
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Link } from 'react-router-dom';

// make it pretty
import './main-view.scss'

// exports the stateful class component which is inherited from the 'prototype' react componentDidMount
export class MainView extends React.Component {
  // applies constructor function including object reference to 'prototype' object through 'this'
  constructor() {
    super();

      //initiates the state for designated properties upon page load
      this.state = {
        movies: [],
        selectedMovieId: null,
        user: null,
        register: false,
        token: null,
        profiledata : [],
      };
  }

  //life-cycle method, once react component is mounted, the http client axios GETS the db data
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let user = localStorage.getItem('user');
      this.setState({
      user : user
      });
      console.log(user);
      this.getMovies(accessToken);
      this.getUser(user, accessToken);
    }
  }

  // when a user logs in, he is 'set to state'
  login(authData) {
    console.log(authData);
    this.setState({
      user : authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token)
    window.open('/','_self');
  }

  // upon logout, localStorage is cleared
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // switches to login view
    window.open('/', '_self');
  }

  // GET request for movies data with token authorization
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

  // GET request for user data with token authorization
  getUser(token) {
    axios.get('https://stark-headland-48507.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {

      const profiledata = response.data;
      //assign the result to the state
      this.setState({
       profiledata : profiledata
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // the render function displays the data, must-part of class component
  render() {
  // the state has to been initialized before data is initially loaded
  // ES6 refracturing extracts the properties of the props/state (instead of this.state.user, you can use user)
  const { movies, user, username, password, email, birthday, token, profiledata } = this.state;

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    // return statement contains routes to views/components
    return (
      <Router>
        <div className="main-view">
          <Navbar bg="warning" expand="lg">
          <Navbar.Brand >Hello {user}!</Navbar.Brand>
          <Link to={`/profile`}>
            <Button variant="link">Your Profile</Button>
          </Link>
          <Link to={`/register`}>
            <Button variant="link">Register</Button>
          </Link>
          <Link to={`/login`}>
            <Button variant="link">Login</Button>
          </Link>
          <Link to={`/logout`}>
            <Button variant="link" onClick={this.logout}>Logout</Button>
          </Link>
          </Navbar >
          <Route exact path="/" render={() => {
            if (!user) return <LoginView login={user => this.login(user)} />
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
          }/>
          <Route path="/directors/:name" render={({match}) => <DirectorView movie={movies.filter(movie => movie.director.name === match.params.name)} director={movies.find(movie => movie.director.name === match.params.name).director}/>} />
          <Route path="/genres/:name" render={({match}) => <GenreView movie={movies.filter(movie => movie.genre.name === match.params.name)} genre={movies.find(movie => movie.genre.name === match.params.name).genre}/>} />
          <Route path="/register" render={() => <RegistrationView login={(user) => this.login(user)} />} />
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/profile" render={() => <ProfileView movies={movies} />} />
          <Route path="/login" render={() => <LoginView login={user => this.login(user)} />} />
        </div>
      </Router>
    );
  }
}
