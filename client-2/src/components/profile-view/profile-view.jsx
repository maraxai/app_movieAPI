import React, { useState } from 'react';
import { MainView } from '../main-view/main-view';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom'

import axios from 'axios';
// make it pretty
import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoritemovies: [],
      userdata: null,
      usernameForm: null,
      passwordForm: null,
      emailForm: null,
      birthdayForm: null,
      movies: [],
      favorite: []
  };
}

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user
  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://stark-headland-48507.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        userdata: response.data,
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favoritemovies: response.data.favoritemovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //handle the changes
  handleChange(e) {
    this.setState( {[e.target.name]: e.target.value} )
  }

  //update user data
  updateProfile(e) {
    e.preventDefault();
    console.log(this.state.username);
    axios.put(`https://stark-headland-48507.herokuapp.com/users/${localStorage.getItem('user')}`, {
      username: this.state.usernameForm,
      password: this.state.passwordForm,
      email: this.state.emailForm,
      birthday: this.state.birthdayForm
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Updated!');
      //update localStorage
      localStorage.setItem('user', this.state.usernameForm);
      // call getUser() to dusplay changed userdata after submission
      this.getUser(localStorage.getItem('token'));
      // reset form after submitting data
      document.getElementsByClassName('changeProfileData')[0].reset();
    })
    .catch(e => {
      console.log('no update performed, error');
      alert('please check, error');
    });
  };

  //delete user
    deleteProfile(e) {
      e.preventDefault();
      axios.delete(`https://stark-headland-48507.herokuapp.com/users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => {
        alert('Your Account has been deleted!');
        //clears storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //opens login view
        window.open('/', '_self');
      })
      .catch(e => {
        alert('failed to delete user');
      });
    }

    // does not work! attempt to display user's favorite movies as titles and not ids, instead <ShowFavMovies />
    /*showFavMovies() {
      var favMovieList = [];
      console.log(this.state.favoritemovies);
      const favMoviesTitles = this.state.movies.filter(x => this.state.favoritemovies.includes(x._id)).map(x => x.title);
        console.log('movies[0]: ' + this.state.movies);
        console.log('favMoviesTitles: ' + favMoviesTitles);

      if (favMoviesTitles.length === 0) {
        return <p>{'You have not added any movies yet.'}</p>
      }
      else {
      const rows = this.state.favMovieTitles.map((movie, index) => {
        return <li key={index}>{movie}</li>
      });
      return <ul>{rows}</ul>
      }
    }
    */

/*
  dateFormat () {
      var day = this.state.birthday.getDate();
      var month = this.state.birthday.getMonth();
      var year = this.state.birthday.getFullYear();
    var dateFormat_us = month + '/' + day + '/' + year;
    console.log(dateFormat_us);
    return dateFormat_us;
    }
*/
/*
const ChangeDateFormat = (props) => {
        var day = props.birthday.getDate();
        var month = props.birthday.getMonth();
        var year = props.birthday.getFullYear();
      var dateFormat_us = month + '/' + day + '/' + year;
      console.log(dateFormat_us);
      return dateFormat_us;
      }
};
*/

  render() {
    const { userdata, username, password, email, birthday, favoritemovies, usernameForm, passwordForm, emailForm, birthdayForm } = this.state
    const { movies, favoriteMovies, favorites } = this.props;
    const favoriteMoviesList = movies.filter(m => favoritemovies.includes(m._id));
    //const favorites = movies.filter(movie => favoritemovies.indexOf(movie._id) > -1)

    if(!userdata) return null;
    console.log(userdata)

    return (
      <div className="profile-view">
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
          <Card.Title>Profile Data:</Card.Title>
          <Card.Text>Username: {this.state.username}</Card.Text>
          <Card.Text>Password:********</Card.Text>
          <Card.Text>Email: {this.state.email}</Card.Text>
          <Card.Text>Birthday: {this.state.birthday}</Card.Text>
          <Card.Text>Your Favorite Movie List:</Card.Text>
          <div className="fav-movies-links">Your favorite movies:</div>
          <Card.Text>{
            favoriteMoviesList.map(m => (
              <Link key={m._id} to={`/movies/${m._id}`}>
              <div className='fav-movies-link'><Button variant="link">{m.title}</Button></div>
              </Link>
            ))
          }
          </Card.Text>
          <Link to={`/`}>
          <Button variant="outline-secondary" size="sm">Back</Button>
          </Link>
          <span>&nbsp;</span>
          <Button type="button" variant="outline-secondary" size="sm" onClick={this.deleteProfile}>Delete Account</Button>
          </Card.Body>

          <h2>Change your Profile Data:</h2>

          <Form className="changeProfileData">
            <Form.Group controlId="formBasicText">
              <Form.Label>Your Username</Form.Label>
              <Form.Control type="text" name="usernameForm" onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>your password</Form.Label>
              <Form.Control type="password" name="passwordForm" onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>email adress</Form.Label>
              <Form.Control type="email" name="emailForm" onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Your birthday</Form.Label>
              <Form.Control type="date" name="birthdayForm" onChange={e => this.handleChange(e)}  />
            </Form.Group>

            <Button type="button" variant="outline-secondary" size="sm" onClick={e => this.updateProfile(e)}>Update</Button>
          </Form>
          </Card>
      </div>
    )
  }
}
