import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// for API GET requests of http client handler axios
import axios from 'axios'

// make it pretty
import './login-view.scss'



/* function component with the hook useState */
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

    return (
      <Form className='m-5 p-5'>
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
          <Form.Text className="text-muted">
          Type your username here.
        </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Button type="button" variant="outline-secondary" size="sm" onClick={handleSubmit}>Submit</Button>
      </Form>
    );
  }

  LoginView.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }; 
