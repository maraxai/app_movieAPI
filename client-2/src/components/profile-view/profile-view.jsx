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
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      usernameForm: null,
      passwordForm: null,
      emailForm: null,
      birthdayForm: null,
      favoriteMovies: []
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
    this.setState( {[e.target.name]: e} )
  }

  //update user data
  updateProfile(e) {
    e.preventDefault();
    axios.put(`https://stark-headland-48507.herokuapp.com/users${localStorage.getItem('user')}`, {
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
      localStorage.setItem('user', this.state.username);
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

  render() {
    const { userdata, username, password, email, birthday, favoritemovies, usernameForm, passwordForm, emailForm, birthdayForm } = this.state

    if(!userdata) return null;

    return (
      <div className="profile-view">
        <Card bg="light" style={{ width: '90%' }}>
          <Card.Body>
          <Card.Title>Profile Data:</Card.Title>
          <Card.Text>Username: {this.state.username}</Card.Text>
          <Card.Text>Password: {this.state.password}</Card.Text>
          <Card.Text>Email: {this.state.email}</Card.Text>
          <Card.Text>Birthday: {this.state.birthday}</Card.Text>
          <Card.Text>Favorite Movies: {this.state.favoritemovies}</Card.Text>
          <Link to={`/`}>
          <Button variant="outline-secondary" size="sm">Back</Button>
          </Link>
          <span>&nbsp;</span>
          <Button type="button" variant="outline-secondary" size="sm" onClick={this.deleteProfile}>Delete Account</Button>
          </Card.Body>
          </Card>

          <h2>Change your Profile Data:</h2>

          <Form className="changeProfileData">
            <Form.Group controlId="formBasicText">
              <Form.Label>Your Username</Form.Label>
              <Form.Control type="text" name={usernameForm} onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>your password</Form.Label>
              <Form.Control type="password" name={passwordForm} onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>email adress</Form.Label>
              <Form.Control type="email" name={emailForm} onChange={e => this.handleChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicBirthdate">
              <Form.Label>Your birthday</Form.Label>
              <Form.Control type="date" name={birthdayForm} onChange={e => this.handleChange(e)}  />
            </Form.Group>

            <Button type="button" variant="outline-secondary" size="sm" onClick={this.updateProfile}>Update</Button>
          </Form>
      </div>
    )
  }
}
