import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// http client handler axios
import axios from 'axios'

// make it pretty
import './registration-view.scss'

/* function component with the Hook useState */
export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the server for authentication */
    /* then call this.props.onSignedIn(username) */
    props.onSignedIn(username);
    };

    return (
      // React Bootstrap Component Form
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>your password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email adress</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Your birthday</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter Birthday" />
        </Form.Group>

        <Button type="button" variant="outline-secondary" size="sm" onClick={handleSubmit}>Submit</Button>
      </Form>
    );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.date
};
