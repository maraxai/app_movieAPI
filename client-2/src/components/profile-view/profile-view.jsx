import React, { useState } from 'react';
import MainView from '../main-view/main-view';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import axios from 'axios';
// make it pretty
import './profile-view.scss'

class ProfileView extends React.Component {
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

  // lifecyle component to mount
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user by GET axios GET request and setState
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
      console.log('not updated, error');
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

  render() {
    const { userdata, username, password, email, birthday, favoritemovies, usernameForm, passwordForm, emailForm, birthdayForm } = this.state
    console.log(favoritemovies, '!!favoritemovies')
    const { movies, favoriteMovies, favorite } = this.props;
    const favoriteMoviesList = movies.filter(m => favoritemovies.includes(m._id));
    console.log(favoritemovies)
    //const favorites = movies.filter(movie => favoritemovies.indexOf(movie._id) > -1)

    if(!userdata) return null;
    console.log(userdata)

    return (
      <div className="profile-view">
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
          <Card.Title>user profile:</Card.Title>
          <Card.Text>username: {this.state.username}</Card.Text>
          <Card.Text>password:********</Card.Text>
          <Card.Text>email: {this.state.email}</Card.Text>
          <Card.Text>birthday: {this.state.birthday}</Card.Text>
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
          <Button type="button" variant="outline-secondary" size="sm" onClick={this.deleteProfile}>delete account</Button>
          </Card.Body>

          <h2>Change your profile data:</h2>
          {/* form for user data update*/}
          <Form className="changeProfileData">
            <Form.Group controlId="formBasicText">
              <Form.Label>your username</Form.Label>
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
              <Form.Label>your birthday</Form.Label>
              <Form.Control type="date" name="birthdayForm" onChange={e => this.handleChange(e)}  />
            </Form.Group>

            <Button type="button" variant="outline-secondary" size="sm" onClick={e => this.updateProfile(e)}>Update</Button>
          </Form>
          </Card>
      </div>
    )
  }
}

export default connect(({ movies, users }) => ({ movies, users }) )(ProfileView);
