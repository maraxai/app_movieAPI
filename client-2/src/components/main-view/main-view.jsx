// creates variable React with react module, as a part of the React library
import React from 'react';
// manages HTTP client requests
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// import the 'action' setMovies
import { setMovies } from '../../actions/actions';
// import the 'action' setUsers
import { setUsers } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';

//imports the designated components from the files wherein they reside, bootstrap, router and app-specific ones
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import ProfileView  from '../profile-view/profile-view';
import  DirectorView  from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
// creates links
import { Link } from 'react-router-dom';

// make it pretty
import './main-view.scss'

// exports the stateful class component which is inherited from the 'prototype' react componentDidMount
class MainView extends React.Component {
  // applies constructor function including object reference to 'prototype' object through 'this'
  constructor() {
    super();

      //initiates the state for *designated properties upon page load
      this.state = {
        fav: '',
        movies: [],
        user: null,
        register: false,
        token: null,
        userdata : {},
        favorite: [],
        favoritemovies: [],
        favorites: []
      };

      // change functions to ES6 and no explict binding is necessary
      this.addToFavMovieList = this.addToFavMovieList.bind(this);
      this.removeFromFavMovieList = this.removeFromFavMovieList.bind(this);
  }

    //life-cycle method, once react component is mounted, the http client axios GETS the db data
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let user = localStorage.getItem('user');
      this.setState({
      user : localStorage.getItem('user'),
      fav: this.state.fav
      });
      console.log(user);
      this.getMovies(accessToken);
      this.getUser(localStorage.getItem("user"), accessToken);
    }
  }

  // event handler will add movie to favoritemovies
  addToFavMovieList(movie) {
    //https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
    let favorites = this.state.userdata.favoritemovies;
    if (favorites.indexOf(movie) < 0) {
      favorites.push(movie);
    }

    let userdata = {...this.state.userdata};
    userdata.favoritemovies = favorites;

    this.setState({userdata});

  }

  // event handler will remove added movie from favoritemovies
  removeFromFavMovieList(id) {
    let currFavorites = this.state.userdata.favoritemovies;
    let favorites = currFavorites.filter(mId => mId !== id);

    let userdata = {...this.state.userdata};
    userdata.favoritemovies = favorites;

    this.setState({userdata});
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
     this.props.setMovies(response.data);
     console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  // GET request for user data with token authorization
  getUser(user, token) {
    let username = localStorage.getItem('user');
    axios.get(`https://stark-headland-48507.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
    this.props.setUsers(response.data);
    console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }
  // the render function displays the data, must-part of class component
  render() {
  // the state has to been initialized before data is initially loaded
  // ES6 refracturing extracts the properties of the props/state (instead of this.state.user, you can use user)
  const { addToFavMovieList, removeFromMovieList, fav, favorite, favorites, movies, user, username, password, email, birthday, token, userdata} = this.state;

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    // return statement contains routes to views/components
    return (
      <Router>
        <div className="main-view">
          <Navbar bg="warning" expand="lg">
          <Navbar.Brand >Hello {user}!</Navbar.Brand>
          <Link to={`/profile`}>
            <Button variant="link">Your profile</Button>
          </Link>
          <Link to={`/register`}>
            <Button variant="link">register</Button>
          </Link>
          <Link to={`/login`}>
            <Button variant="link">login</Button>
          </Link>
          <Link to={`/logout`}>
            <Button variant="link" onClick={this.logout}>logout</Button>
          </Link>
          </Navbar >
          <Route exact path="/" render={() => {
            if (!user) return <LoginView login={user => this.login(user)} />
            return <MoviesList
            addToFavMovieList={this.addToFavMovieList}
            removeFromFavMovieList={this.removeFromFavMovieList}
            userdata={userdata}
            />
              }
            }/>

          <Route path="/directors/:name" render={({match}) => <DirectorView director={match.params.name}/>} />
          <Route path="/genres/:name" render={({match}) => <GenreView genre={match.params.name}/>} />
          <Route path="/register" render={() => <RegistrationView login={(user) => this.login(user)} />} />
          <Route path="/movies/:id" render={({match}) => <MovieView id={match.params.id} />} />
          <Route path="/profile" render={() => <ProfileView movies={movies} userdata={userdata} addToFavMovieList={this.addToFavMovieList} removeFromFavMovieList={this.removeFromFavMovieList} />} />
          <Route path="/login" render={() => <LoginView login={user => this.login(user)} />} />
        </div>
      </Router>
    );
  }
}

export default connect(null, { setMovies, setUsers } )(MainView);
