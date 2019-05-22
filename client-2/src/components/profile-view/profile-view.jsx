import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MainView } from '../main-view/main-view';

import { Link } from 'react-router-dom'

// make it pretty
import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
//    const { data, user } = this.state;

    return (
      <div>
        <h1>Hej Svenja,</h1>
        <p>lines 29 to 39, I tried to use but they throw an error. I am not sure in what direction I need to continue going.</p>
        <p>Solution #1: I need to GET the user data in the profileView with axios placed in profile-view</p>
        <p>Solution #2: I can get the user data that is available in LoginView or RegistrationView and pass it through the mainView down to ProfileView</p>
        <h3>Is the solution of these two or am I completely wrong and need to search in another direction?</h3>
      </div>
  )
  }
}
/*
<Card bg="light" style={{ width: '90%' }}>
<Card.Body>
<Card.Title>{user.username}</Card.Title>
<Card.Text>born: {user.password}</Card.Text>
<Card.Text>{user.email}</Card.Text>
<Card.Text>{user.birthday}</Card.Text>
<Link to={`/`}>
<Button variant="link">Back</Button>
</Link>
</Card.Body>
</Card>
*/
